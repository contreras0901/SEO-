#!/usr/bin/env python3
"""
Clearvow 36-month financial scenario model.

Every number here is an ASSUMPTION unless the comment says otherwise. The model is
deliberately simple: a vendor-count funnel per market, a paid-conversion rate, a
monthly churn rate, blended ARPU per paid vendor, pay-per-inquiry revenue from free
vendors, and a cost stack. Run it to regenerate the tables in
docs/04-revenue-pricing-financials.md:

    python3 financial_model.py            # prints markdown
    python3 financial_model.py --csv out  # also writes out/<scenario>.csv
"""
from __future__ import annotations

import argparse
import csv
import os
from dataclasses import dataclass, field


@dataclass
class Scenario:
    name: str
    # Market expansion: month index (1-based) when each metro opens.
    market_open_months: list[int]
    # Net new FREE vendor profiles claimed per open market per month, by year.
    new_vendors_per_market_per_month: tuple[int, int, int]
    # Share of active free vendors that convert to a paid plan each month.
    monthly_paid_conversion: float
    # Monthly churn of paid vendors.
    monthly_paid_churn: float
    # Blended monthly revenue per paid vendor (mix of Pro $59 and Preferred $149,
    # with ~20% annual-prepay discount drag).
    paid_arpu: float
    # Verified inquiries per free vendor per month that the vendor pays to unlock.
    unlocked_inquiries_per_free_vendor: float
    inquiry_unlock_price: float
    # Featured "Spotlight" slots sold per open market per month (capped) and price.
    spotlight_slots_per_market: tuple[int, int, int]
    spotlight_price: float
    # Couple-side affiliate/partner revenue per active couple account per month.
    couple_partner_rev: float
    couples_per_market_per_month: tuple[int, int, int]
    # Year-3 only: vendor tools (CRM-lite) attach rate on paid vendors and price.
    tools_attach_rate_y3: float
    tools_price: float
    # Costs
    founder_salary: float  # monthly, starts month 7
    engineer_cost: tuple[float, float, float]  # monthly contractor/hire cost by year
    content_cost: tuple[float, float, float]  # writers, photographers, real-wedding sourcing
    paid_marketing: tuple[float, float, float]  # monthly
    sales_cost: tuple[float, float, float]  # vendor success / sales rep
    infra_base: float  # hosting, email, search, AI, tooling
    infra_per_paid_vendor: float
    payment_fee_rate: float = 0.032  # Stripe blended
    notes: list[str] = field(default_factory=list)


def year_of(month: int) -> int:
    return min(2, (month - 1) // 12)


def run(s: Scenario, months: int = 36) -> list[dict]:
    free_vendors = 0.0
    paid_vendors = 0.0
    couples = 0.0
    cum_cash = 0.0
    rows = []
    for m in range(1, months + 1):
        y = year_of(m)
        open_markets = sum(1 for om in s.market_open_months if om <= m)
        # Vendor funnel
        new_free = open_markets * s.new_vendors_per_market_per_month[y]
        free_vendors += new_free
        converted = free_vendors * s.monthly_paid_conversion
        churned = paid_vendors * s.monthly_paid_churn
        free_vendors -= converted
        # churned paid vendors fall back to free profiles (they rarely delete)
        free_vendors += churned
        paid_vendors += converted - churned
        couples += open_markets * s.couples_per_market_per_month[y]
        # Only ~55% of couple accounts are in an active planning window at any time
        active_couples = couples * 0.55

        # Revenue
        sub_rev = paid_vendors * s.paid_arpu
        inquiry_rev = free_vendors * s.unlocked_inquiries_per_free_vendor * s.inquiry_unlock_price
        spotlight_rev = open_markets * s.spotlight_slots_per_market[y] * s.spotlight_price
        partner_rev = active_couples * s.couple_partner_rev
        tools_rev = paid_vendors * (s.tools_attach_rate_y3 if y == 2 else 0.0) * s.tools_price
        gross = sub_rev + inquiry_rev + spotlight_rev + partner_rev + tools_rev
        fees = gross * s.payment_fee_rate

        # Costs
        founder = s.founder_salary if m >= 7 else 0.0
        eng = s.engineer_cost[y]
        content = s.content_cost[y]
        marketing = s.paid_marketing[y]
        sales = s.sales_cost[y]
        infra = s.infra_base + paid_vendors * s.infra_per_paid_vendor
        opex = founder + eng + content + marketing + sales + infra + fees
        net = gross - opex
        cum_cash += net
        rows.append(
            dict(
                month=m,
                markets=open_markets,
                free_vendors=round(free_vendors),
                paid_vendors=round(paid_vendors),
                couples=round(couples),
                sub_rev=sub_rev,
                inquiry_rev=inquiry_rev,
                spotlight_rev=spotlight_rev,
                partner_rev=partner_rev,
                tools_rev=tools_rev,
                revenue=gross,
                opex=opex,
                net=net,
                cum_cash=cum_cash,
            )
        )
    return rows


CONSERVATIVE = Scenario(
    name="Conservative",
    market_open_months=[1, 13, 25],  # San Diego, Orange County, Los Angeles
    new_vendors_per_market_per_month=(20, 25, 30),
    monthly_paid_conversion=0.025,
    monthly_paid_churn=0.06,
    paid_arpu=66.0,
    unlocked_inquiries_per_free_vendor=0.15,
    inquiry_unlock_price=15.0,
    spotlight_slots_per_market=(2, 4, 6),
    spotlight_price=249.0,
    couple_partner_rev=0.60,
    couples_per_market_per_month=(60, 120, 180),
    tools_attach_rate_y3=0.10,
    tools_price=29.0,
    founder_salary=4000.0,
    engineer_cost=(3000.0, 6000.0, 9000.0),
    content_cost=(800.0, 1500.0, 2500.0),
    paid_marketing=(500.0, 1500.0, 3000.0),
    sales_cost=(0.0, 3500.0, 7000.0),
    infra_base=350.0,
    infra_per_paid_vendor=1.2,
    notes=[
        "Vendor growth relies on founder network and SEO only; paid ads minimal.",
        "Paid conversion 2.5%/mo of free base; churn 6%/mo (close to small-directory norms).",
        "One market per year.",
    ],
)

BASE = Scenario(
    name="Base",
    market_open_months=[1, 10, 16, 22, 28, 34],  # SD, OC, LA, Phoenix, Las Vegas, Austin
    new_vendors_per_market_per_month=(35, 45, 55),
    monthly_paid_conversion=0.04,
    monthly_paid_churn=0.045,
    paid_arpu=72.0,
    unlocked_inquiries_per_free_vendor=0.25,
    inquiry_unlock_price=15.0,
    spotlight_slots_per_market=(3, 6, 9),
    spotlight_price=249.0,
    couple_partner_rev=0.90,
    couples_per_market_per_month=(120, 250, 400),
    tools_attach_rate_y3=0.18,
    tools_price=29.0,
    founder_salary=5000.0,
    engineer_cost=(4500.0, 11000.0, 24000.0),
    content_cost=(1200.0, 3000.0, 7000.0),
    paid_marketing=(1000.0, 4000.0, 12000.0),
    sales_cost=(0.0, 6000.0, 20000.0),
    infra_base=450.0,
    infra_per_paid_vendor=1.2,
    notes=[
        "Six metros by month 34; each new metro seeded with a local launch partner (planner or venue).",
        "Paid conversion 4%/mo; churn 4.5%/mo, helped by annual plans and inquiry value.",
        "Vendor tools (CRM-lite) launch in year 3 at 18% attach.",
    ],
)

AGGRESSIVE = Scenario(
    name="Aggressive",
    market_open_months=[1, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
    new_vendors_per_market_per_month=(50, 70, 90),
    monthly_paid_conversion=0.055,
    monthly_paid_churn=0.035,
    paid_arpu=78.0,
    unlocked_inquiries_per_free_vendor=0.35,
    inquiry_unlock_price=15.0,
    spotlight_slots_per_market=(4, 8, 12),
    spotlight_price=299.0,
    couple_partner_rev=1.20,
    couples_per_market_per_month=(200, 450, 700),
    tools_attach_rate_y3=0.25,
    tools_price=29.0,
    founder_salary=6000.0,
    engineer_cost=(6000.0, 24000.0, 60000.0),
    content_cost=(2000.0, 8000.0, 20000.0),
    paid_marketing=(2500.0, 15000.0, 50000.0),
    sales_cost=(2500.0, 20000.0, 60000.0),
    infra_base=600.0,
    infra_per_paid_vendor=1.2,
    notes=[
        "Assumes a seed round (~$750k-$1.5M) by month 9 to fund sales and 11 metros.",
        "Paid conversion 5.5%/mo; churn 3.5%/mo. These are top-quartile marketplace numbers.",
        "Requires the qualified-inquiry promise to hold at scale; biggest execution risk.",
    ],
)


def money(x: float) -> str:
    return f"${x:,.0f}"


def summarize(rows: list[dict]) -> dict:
    be = next((r["month"] for r in rows if r["net"] > 0), None)
    trough = min(r["cum_cash"] for r in rows)
    y = {}
    for yi in range(3):
        yr = rows[yi * 12 : (yi + 1) * 12]
        y[yi + 1] = dict(
            revenue=sum(r["revenue"] for r in yr),
            opex=sum(r["opex"] for r in yr),
            net=sum(r["net"] for r in yr),
            exit_mrr=yr[-1]["revenue"],
            exit_paid=yr[-1]["paid_vendors"],
            exit_free=yr[-1]["free_vendors"],
            exit_couples=yr[-1]["couples"],
        )
    return dict(breakeven_month=be, cash_trough=trough, years=y)


def print_markdown(scenarios: list[Scenario]) -> None:
    print("## Scenario summary (36 months)\n")
    print("| Scenario | First profitable month | Cash trough (capital needed) | Y1 revenue | Y2 revenue | Y3 revenue | Month-36 MRR | Month-36 paid vendors | Month-36 couple accounts |")
    print("|---|---|---|---|---|---|---|---|---|")
    for s in scenarios:
        rows = run(s)
        sm = summarize(rows)
        y = sm["years"]
        print(
            f"| {s.name} | {sm['breakeven_month'] or 'none in 36'} | {money(sm['cash_trough'])} | {money(y[1]['revenue'])} | {money(y[2]['revenue'])} | {money(y[3]['revenue'])} | {money(y[3]['exit_mrr'])} | {y[3]['exit_paid']:,} | {y[3]['exit_couples']:,} |"
        )
    print()
    for s in scenarios:
        rows = run(s)
        print(f"### {s.name}: quarterly detail\n")
        print("| Quarter | Markets | Free vendors | Paid vendors | Couples | Quarter revenue | Quarter opex | Quarter net | Cumulative cash |")
        print("|---|---|---|---|---|---|---|---|---|")
        for q in range(12):
            qr = rows[q * 3 : (q + 1) * 3]
            last = qr[-1]
            print(
                f"| Q{q+1} | {last['markets']} | {last['free_vendors']:,} | {last['paid_vendors']:,} | {last['couples']:,} | {money(sum(r['revenue'] for r in qr))} | {money(sum(r['opex'] for r in qr))} | {money(sum(r['net'] for r in qr))} | {money(last['cum_cash'])} |"
            )
        print()
        last = rows[-1]
        print("Month-36 revenue mix: "
              f"subscriptions {money(last['sub_rev'])}, inquiry unlocks {money(last['inquiry_rev'])}, "
              f"spotlights {money(last['spotlight_rev'])}, couple partners {money(last['partner_rev'])}, "
              f"vendor tools {money(last['tools_rev'])}.\n")
        print("Assumptions: " + " ".join(s.notes) + "\n")


def write_csv(scenarios: list[Scenario], out_dir: str) -> None:
    os.makedirs(out_dir, exist_ok=True)
    for s in scenarios:
        rows = run(s)
        path = os.path.join(out_dir, f"{s.name.lower()}.csv")
        with open(path, "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
            w.writeheader()
            for r in rows:
                w.writerow({k: (round(v, 2) if isinstance(v, float) else v) for k, v in r.items()})


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--csv", help="directory to write per-scenario CSVs")
    args = ap.parse_args()
    scenarios = [CONSERVATIVE, BASE, AGGRESSIVE]
    print_markdown(scenarios)
    if args.csv:
        write_csv(scenarios, args.csv)

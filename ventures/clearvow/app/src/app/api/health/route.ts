import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(): Promise<Response> {
  try {
    const vendors = await db.vendor.count({ where: { status: "LIVE" } });
    return NextResponse.json({ ok: true, liveVendors: vendors, time: new Date().toISOString() });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

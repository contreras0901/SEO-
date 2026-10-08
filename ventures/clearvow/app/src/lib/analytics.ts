import "server-only";
import { db } from "./db";

/** First-party product events. Never stores PII beyond the user id. */
export async function track(name: string, props: Record<string, unknown> = {}, userId?: string | null, vendorId?: string | null): Promise<void> {
  try {
    await db.analyticsEvent.create({
      data: { name, propsJson: JSON.stringify(props), userId: userId ?? null, vendorId: vendorId ?? null },
    });
  } catch (e) {
    console.error("[analytics] failed", e);
  }
}

export async function audit(actorId: string | null, action: string, entityType: string, entityId: string, diff: Record<string, unknown> = {}): Promise<void> {
  await db.auditLog.create({ data: { actorId, action, entityType, entityId, diffJson: JSON.stringify(diff) } });
}

import db from "../db/index.js"
import { urlTable } from '../models/url.model.js';
import { eq, and } from "drizzle-orm";

export async function createUrl(target, shortCode, userId) {
    const [url] = await db
    .insert(urlTable)
    .values({
      shortCode,
      target,
      userId
    })
    .returning({
      id: urlTable.id,
      shortCode: urlTable.shortCode,
      target: urlTable.target,
    });

    return url
}

export async function getAllUrl(userId) {
  const result = await db.select().from(urlTable).where(eq(urlTable.userId, userId))

  return result
}

export async function deleteUrl(deletingId, userId) {
  const result = await db
    .delete(urlTable)
    .where(
      and(
        eq(urlTable.userId, userId),
        eq(urlTable.id, deletingId)
      )
    )
    .returning({ id: urlTable.id })

  return result.length > 0
}
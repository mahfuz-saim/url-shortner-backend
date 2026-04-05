import db from "../db/index.js"
import { urlTable } from '../models/url.model.js';
import { eq } from "drizzle-orm";

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
  const result = await db.select().from(urlTable).where(eq(userId, urlTable.userId))

  return result
}
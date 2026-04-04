import db from "../db/index.js"
import { urlTable } from '../models/url.model.js';

export async function createUrl(target, shortCode, userId) {
    const [url] = await db
    .insert(urlTable)
    .values({
      shortCode,
      target,
      userId
    })
    .returning({ id: urlTable.id, shortCode: shortCode, target: target  });

    return url
}
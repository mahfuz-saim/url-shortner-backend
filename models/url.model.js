import {
  pgTable,
  varchar,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";

export const urlTable = pgTable("urls", {
    id: uuid("id").primaryKey().defaultRandom(),
    shortCode: varchar({length: 100}).notNull().unique(),
    target: text().notNull(),

    userId: uuid("userId").references(()=> usersTable.id).notNull(),

    createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
})
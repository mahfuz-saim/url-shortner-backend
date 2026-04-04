import {
  pgTable,
  varchar,
  text,
  timestamp,
  uuid
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

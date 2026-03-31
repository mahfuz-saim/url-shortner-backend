import db from "../db/index.js";
import { eq } from "drizzle-orm";
import { usersTable } from "../models/schema.js";

export async function existingUserByEmail(email){
    const [existingUser] = await db
    .select({ 
      id: usersTable.id, 
      email: usersTable.email,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      salt: usersTable.salt,
      password: usersTable.password })
    .from(usersTable)
    .where(eq(usersTable.email, email));

    return existingUser
}

export async function createUser(email, firstName, lastName, salt, password){
    const [user] = await db
    .insert(usersTable)
    .values({
      email,
      firstName,
      lastName,
      salt,
      password
    })
    .returning({ id: usersTable.id });

    return user
}
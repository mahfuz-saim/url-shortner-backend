import { randomBytes, createHmac } from "crypto";

export function hashPassword(password, testingSalt = undefined) {
  const salt = testingSalt ?? randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  return { salt, hashedPassword };
}

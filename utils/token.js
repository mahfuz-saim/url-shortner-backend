import jwt from "jsonwebtoken";
import { tokenValidation } from "../validations/token.validation.js";

const JWT_SECRET = process.env.JWT_SECRET

export async function createToken(payload) {
    const validationResponse = await tokenValidation.safeParseAsync(payload)

    if (validationResponse.error) throw new Error(validationResponse.error.message)

    const token = jwt.sign(validationResponse.data, JWT_SECRET)
    return token
}
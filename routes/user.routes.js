import express from "express";
import { signupPostRequestValidation } from "../validations/request.validation.js";
import { hashPassword } from "../utils/hash.js";
import {existingUserByEmail, createUser} from "../services/user.services.js"

const router = express.Router();

router.post("/signup", async (req, res) => {
  const validationResponse = await signupPostRequestValidation.safeParseAsync(
    req.body,
  );

  if (validationResponse.error) {
    return res.status(400).json({ error: validationResponse.error.format() });
  }

  const { firstName, lastName, email, password } = validationResponse.data;

  const existingUser = await existingUserByEmail(email)

  console.log('existing?', existingUser)

  if (existingUser)
    return res.status(400).json({ error: `User with ${email} already exists` });

  const { salt, hashedPassword } = hashPassword(password);

    const user = await createUser(email, firstName, lastName, salt, hashedPassword)
    
    console.log(user)

  return res.status(201).json({ data: { user } });
});

export default router;

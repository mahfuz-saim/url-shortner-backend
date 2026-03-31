import express from "express";
import { signupPostRequestValidation, loginPostValidation } from "../validations/request.validation.js";
import { hashPassword } from "../utils/hash.js";
import { existingUserByEmail, createUser } from "../services/user.services.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const validationResponse = await signupPostRequestValidation.safeParseAsync(
    req.body,
  );

  if (validationResponse.error) {
    return res.status(400).json({ error: validationResponse.error.format() });
  }

  const { firstName, lastName, email, password } = validationResponse.data;

  const existingUser = await existingUserByEmail(email);

  if (existingUser)
    return res.status(400).json({ error: `User with ${email} already exists` });

  const { salt, hashedPassword } = hashPassword(password);

  const user = await createUser(
    email,
    firstName,
    lastName,
    salt,
    hashedPassword,
  );

  return res.status(201).json({ data: { user } });
});

router.post('/login', async(req, res) => {
  const validationResponse = await loginPostValidation.safeParseAsync(
    req.body,
  );

  if (validationResponse.error) {
    return res.status(400).json({ error: validationResponse.error.format() });
  }

  const {email, password} = validationResponse.data

  const existingUser = await existingUserByEmail(email);

  if (!existingUser)
    return res.status(400).json({ error: `User with ${email} doesn't exists` });

  const { salt, hashedPassword } = hashPassword(password, existingUser.salt);

  if (hashedPassword !== existingUser.password) {
    return res.status(400).json({ error: `Incorrect Password` });
  }

  const token = jwt.sign({id: existingUser.id}, process.env.JWT_SECRET)

  return res.json({token})

})

export default router;

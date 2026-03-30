import express from 'express'
import db from '../db/index.js'
import {eq} from 'drizzle-orm'
import {usersTable} from '../models/schema.js'
import {randomBytes, createHmac} from 'crypto'
import {signupPostRequestValidation} from '../validations/request.validation.js'

const router = express.Router()

router.post('/signup', async(req, res) => {
    const validationResponse = await signupPostRequestValidation.safeParseAsync(req.body)

    if (validationResponse.error) {
        return res.status(400).json({error: validationResponse.error.format()})
    }

    const {firstName, lastName, email, password} = validationResponse.data

    const [existingUser] = await db.select({id : usersTable.id}).from(usersTable).where(eq(usersTable.email, email))

    if (existingUser) return res.status(400).json({error : `User with ${email} already exists`})

    const salt = randomBytes(256).toString('hex')
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex')
    const [user] = await db.insert(usersTable).values({
        email,
        firstName,
        lastName,
        salt,
        password: hashedPassword
    }).returning({id: usersTable.id})
    
    return res.status(201).json({data : {userId: user.id}})
})

export default router
import express from 'express';
import { shortenValidation } from '../validations/url.validation.js';
import { nanoid } from 'nanoid';
import { createUrl } from '../services/url.services.js';
import { ensureAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.post('/shorten', ensureAuthenticated, async function (req, res) {
    const validationResult = await shortenValidation.safeParseAsync(req.body)

    if(validationResult.error) return res.status(400).json({error: validationResult.error})
 
    const {url, code} = validationResult.data

    const shortenCode = code ?? nanoid(6);

    const urlResult = await createUrl(url, shortenCode, userId)

    return res.status(201).json({id: urlResult.id, shortCode: urlResult.shortCode, target: urlResult.target})
})

export default router
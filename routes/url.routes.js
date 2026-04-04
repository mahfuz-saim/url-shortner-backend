import express from 'express';
import { shortenValidation } from '../validations/url.validation.js';
import { v4 as uuidv4 } from 'uuid';
import { createUrl } from '../services/url.services.js';

const router = express.Router()

router.post('/shorten', async function (req, res) {
    const userId = req.user.id

    if (!userId) return res.status(401).json({error: 'You are not authenticated to access'})
    
    const validationResult = shortenValidation.safeParseAsync(req.body)

    if(validationResult.error) return res.status(400).json({error: validationResult.error})

    
    const {url, code} = validationResult.data

    const shortenCode = code ?? uuidv4(6);

    const urlResult = await createUrl(url, shortenCode, req.user.id)

    return res.status(201).json({id: urlResult.id, shortCode: urlResult.shortCode, target: urlResult.target})
})

export default router
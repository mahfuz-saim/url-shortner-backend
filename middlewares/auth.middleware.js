import { validationToken } from "../utils/token.js"

export function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']

    if (!authHeader) next()

    if (!authHeader.startsWith('Bearer')){
        return res.status(400).json({error: 'Auth header must start with Bearer'})
    }

    const [_, token] = authHeader.split(' ')

    const payload = validationToken(token)

    req.user = payload

    next()
}
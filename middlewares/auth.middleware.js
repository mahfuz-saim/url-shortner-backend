import { validationToken } from "../utils/token.js"

export function authenticationMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return next()
    }

    if (!authHeader.startsWith('Bearer ')){
        return res.status(400).json({error: 'Auth header must start with Bearer'})
    }

    const [_, token] = authHeader.split(' ')

    const payload = validationToken(token)

    req.user = payload

    return next()
}

export function ensureAuthenticated(req, res, next) {
    if (!req.user || !req.user.id) return res.status(401).json({error: 'You are not authenticated to access'})

    return next()
}
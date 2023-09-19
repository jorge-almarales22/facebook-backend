import jwt from "jsonwebtoken"
import 'dotenv/config'
export const generateJWT = (data) => {
    return new Promise((resolve, reject) => {
        const payload = data
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject(null)
            } else {
                resolve(token)
            }
        })
    })
}
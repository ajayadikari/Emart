import jwt from 'jsonwebtoken'

const generateToken = async(payload) => {
    const token =  await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    return token
}

export default generateToken
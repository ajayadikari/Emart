import jwt from 'jsonwebtoken'
import users from '../models/userModel.js'

const isUserLoggedIn = async (req, res, next) => {
    try {
        let token = ""
        if (req.headers.authorization.includes('Bearer')) token = req.headers.authorization.split(' ')[1];
        else token = req.headers.authorization + ''

        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode;

        next();
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: 400,
            message: 'login to access'
        })
    }
}

const isAdmin = async (req, res, next) => {
    try {
        console.log('checking if admin')
        const user = await users.findById(req.user.id)
        console.log(user)
        if (user.role !== 1) {
            return res.status(400).json({
                success: false,
                message: "Only admins are allowed"
            })
        }
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'error in admin middleware'
        })
    }
}

export { isUserLoggedIn, isAdmin }
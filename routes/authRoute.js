import express from 'express'
import { registerController, loginController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getAllUsers } from '../controllers/authController.js';
import { isUserLoggedIn, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router();

//routing

router.route('/register')
    .post(registerController);

router.route('/login')
    .post(loginController);

router.route('/user-auth')
    .get(isUserLoggedIn, (req, res) => {
        res.status(200).json({
            success: true,
            message: 'ok',
        })
    })

router.route('/admin-auth')
    .get(isUserLoggedIn, isAdmin, (req, res) => {
        console.log('is admin')
        res.status(200).json({
            success: true,
            message: 'ok',
        })
    })


router.route('/profile')
    .put(isUserLoggedIn, updateProfileController)

//user orders
router.route('/orders')
    .get(isUserLoggedIn, getOrdersController)

//all orders for admin
router.route('/all-orders')
    .get(isUserLoggedIn, isAdmin, getAllOrdersController)

//order status updating route
router.route('/order-status/:orderId')
    .put(isUserLoggedIn, isAdmin, orderStatusController)

router.route('/users')
    .get(isUserLoggedIn, isAdmin, getAllUsers)

export default router
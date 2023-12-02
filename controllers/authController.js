import users from "../models/userModel.js";
import { hashPassword, comparePassword } from '../helpers/authHelper.js'
import generateToken from '../helpers/tokenGenerator.js'
import userModel from "../models/userModel.js";
import orderModel from '../models/orderModel.js'




const registerController = async (req, res) => {
    try {
        const { name, email, password, address, contact } = req.body;

        if (!name || !email || !password || !address || !contact) {
            res.status(400).json({
                success: false,
                message: "All field are required",
            })
        }


        const user = await users.findOne({ email: email });

        if (user) {
            // console.log(user)
            res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await new users({
            name,
            email,
            address,
            contact,
            password: hashedPassword
        }).save();

        newUser.password = undefined;

        res.status(201).json({
            success: true,
            message: "user profile created successfully",
            data: newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        })
    }
}



const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: 'false',
                message: "required are missing",
            })
        }

        const user = await users.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(200).json({
                success: false,
                message: 'user does not exists'
            })
        }

        const passMatched = await comparePassword(user.password, password);

        if (!passMatched) {
            return res.status(400).json({
                success: false,
                message: "wrong password"
            })
        }

        const payload = {
            id: user._id,
            email: user.email
        }

        const token = await generateToken(payload);

        return res.status(200).json({
            success: true,
            message: 'user logged in successfully',
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}


const updateProfileController = async (req, res) => {
    try {
        console.log(req.body, 'in auth controller')
        const { name, email, password, address, contact } = req.body;
        const user = await userModel.findById(req.body.id);
        console.log(user, "user details from db", req.body.id)
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                contact: contact || user.contact,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};

//orders
const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//all orders
const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            // .sort({ createdAt: "-1" });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//order status
const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};

const getAllUsers = async(req, res) =>{
    try {
        const users = await userModel.find({})
        res.status(200).json({
            success: true,
            message: ' All users fetched successfully', 
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Error occured while fetching the existing users"
        })
    }
    
}


export { registerController, loginController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getAllUsers }
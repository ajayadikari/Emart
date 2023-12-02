import express from "express";
import { isAdmin, isUserLoggedIn } from "../middlewares/authMiddleware.js";
import { createCategory, updateCategory, categoryController, getCategory, deleteCategory } from "../controllers/categoryController.js";
const categoryRouter = express.Router();


//routes
categoryRouter.post('/create-category', isUserLoggedIn, isAdmin, createCategory);
categoryRouter.put('/update-category/:id', isUserLoggedIn, isAdmin, updateCategory);
categoryRouter.get('/categories', categoryController)
categoryRouter.get('/get-category/:slug', getCategory)
categoryRouter.delete('/delete-category/:id', isUserLoggedIn, isAdmin, deleteCategory)

export default categoryRouter
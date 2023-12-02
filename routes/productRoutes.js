import express from "express";
import { isAdmin, isUserLoggedIn } from "../middlewares/authMiddleware.js";
import { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, braintreePaymentController } from "../controllers/productController.js";
import formidable from "express-formidable";


const router = express.Router();
router.post('/create-product', isUserLoggedIn, isAdmin, formidable(), createProductController)
router.get('/get-product', getProductController);
router.get('/get-product/:slug', getSingleProductController)
router.get('/product-photo/:pid', productPhotoController)
router.delete('/delete-product/:pid', deleteProductController)
router.put('/update-product/:pid', isUserLoggedIn, isAdmin, updateProductController)
router.get('/product-filters', productFiltersController)
router.get('/product-count', productCountController);
router.get('/product-list/:page', productListController);
router.get('/search/:keyword', searchProductController);
router.get('/related-product/:pid/:cid', relatedProductController)
router.get('/product-category/:slug', productCategoryController)
router.get('/braintree/token', braintreeTokenController)
router.post('/braintree/payment', isUserLoggedIn, braintreePaymentController)


export default router
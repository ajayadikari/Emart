import slugify from "slugify";
import categoryModel from "../models/categoryModel.js"

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) res.status(401).json({ message: "category name is required" })
        const categoryExists = await categoryModel.findOne({ name });
        if (categoryExists) {
            return res.status(401).json({
                success: false,
                message: "category already exists",
            })
        }
        const category = new categoryModel({ name: name, slug: slugify(name) }).save();
        return res.status(201).json({
            success: true,
            message: 'category created successfully',
            data: { ...category }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'error in category',
            error
        })
    }
}


const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { name: name, slug: slugify(name) }, { new: true });
        res.status(200).json({
            success: true,
            message: "category updation successfull",
            updateCategory: updateCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "error while updating the category",
            error
        })
    }
}


const categoryController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).json({
            success: true,
            message: "All categories are fetched successfully",
            categories
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "error while getting categories",
            error
        })
    }
}

const getCategory = async (req, res) => {
    try {
        const slug = req.params.slug;
        const category = await categoryModel.findOne({ slug: slug });
        res.status(200).json({
            success: true,
            message: "category fetched successfull",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "error occured while fetching the category",
            error
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "category deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "error occurred while deleting category",
            error
        })
    }
}




export { createCategory, updateCategory, categoryController, getCategory, deleteCategory }
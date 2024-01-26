"use server";

import { CreateCategoryParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Category from "../database/models/category.model";

// create a new category
export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
    try {
        await connectToDatabase();

        const newCategory = await Category.create({ name: categoryName });
        console.log("newCategory: ", newCategory);

        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        handleError(error)
    }
}


// get all categories
export const getAllCategories = async () => {
    try {
        await connectToDatabase();

        const categories = await Category.find();

        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        handleError(error)
    }
}

// get category by name
export const getCategoryByName = async (name: string) => Category.findOne({ name: { $regex: name, $options: 'i' } })
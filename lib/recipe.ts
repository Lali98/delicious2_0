'use server'

import {prisma} from '@/lib/prisma';
import {Prisma} from "@/app/generated/prisma/client";

export async function getRecipeById(id: number) {
    return await prisma.recipe.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            category: true,
            comments: true,
            recipeIngredients: true
        }
    });
}

export async function createRecipe(recipe: Prisma.RecipeUncheckedCreateInput) {
    return await prisma.recipe.create({
        data: recipe,
    });
}

export async function getAllRecipes() {
    return await prisma.recipe.findMany({
        include: {
            user: true,
            category: true,
            comments: true,
            recipeIngredients: true
        }
    });
}

export async function getRecipeByName(name: string) {
    return await prisma.recipe.findMany({
        where: {
            name: {
                contains: name
            }
        },
        include: {
            user: true,
            category: true,
            comments: true,
            recipeIngredients: true
        }
    });
}

export async function getRecipesByCategoryId(categoryId: number) {
    return await prisma.category.findUnique({
        where: {
            id: categoryId
        },
        include: {
            recipes: {
                include: {
                    user: true,
                    comments: true,
                    recipeIngredients: true
                }
            }
        }
    });
}

export async function updateRecipe(id: number, data: Prisma.RecipeUncheckedUpdateInput) {
    const recipe = await prisma.recipe.findUnique({
        where: {id}
    });

    if (!recipe) {
        return null;
    }

    return await prisma.recipe.update({
        where: {id},
        data
    });
}

export async function deleteRecipe(id: number) {
    const recipe = await prisma.recipe.findUnique({
        where: {id}
    });

    if (!recipe) {
        return null;
    }

    await prisma.recipe.delete({
        where: {id}
    });
    return "Recept törölve!";
}

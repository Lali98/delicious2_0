'use server';

import {prisma} from '@/lib/prisma';
import {Prisma} from "@/app/generated/prisma/client";

export async function createCategory(data: Prisma.CategoryUncheckedCreateInput) {
    return await prisma.category.create({
        data,
    });
}

export async function getAllCategory() {
    return await prisma.category.findMany({
        include: {
            recipes: {
                include: {
                    user: true,
                    recipeIngredients: true,
                    comments: true,
                }
            }
        }
    });
}

export async function updateCategory(id: number, data: Prisma.CategoryUncheckedUpdateInput) {
    return await prisma.category.update({
        where: {id},
        data,
    })
}

export async function deleteCategory(id: number) {
    const recipe = await prisma.category.findUnique({
        where: {id},
    });

    if (!recipe) {
        return null;
    }

    await prisma.category.delete({
        where: {id}
    });
    return "Kategoria törölve!";
}

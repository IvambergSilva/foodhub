import { db } from "../_lib/prisma";
import CategoryItem from "./categoryItem";

export default async function CategoryList() {
    const categories = await db.category.findMany({
        select: {
            id: true,
            name: true,
            imageUrl: true
        }
    });

    return (
        <CategoryItem categories={categories} />
    )
}
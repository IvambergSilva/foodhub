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
        <div
            className="flex items-center gap-3 w-full overflow-x-scroll px-4 pb-2 [&::-webkit-scrollbar]:hidden"
        >
            {categories.map((category) => (
                <CategoryItem category={category} />
            ))}
        </div>
    )
}
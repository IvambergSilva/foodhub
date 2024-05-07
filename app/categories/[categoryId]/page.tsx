import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/productItem";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface CategoryPageProps {
    params: {
        categoryId: string;
    }
}

export default async function CategoryPage({ params: { categoryId } }: CategoryPageProps) {
    const products = await db.product.findMany({
        where: {
            category: {
                id: categoryId
            },
        },
        include: {
            restaurant: {
                select: {
                    name: true
                }
            },
        },
        distinct: "name",
        take: 6,
    })

    const category = await db.category.findUnique({
        where: {
            id: categoryId
        },
        select: {
            name: true
        }
    })

    if (!category) return notFound()

    return (
        <div className="px-5 w-full py-5">
            <Header />

            <h2 className="text-lg font-semibold py-6">{category.name}</h2>
            <div className="grid grid-cols-2 gap-y-3 gap-x-5">
                {products.map((product) => (
                    <ProductItem product={product} />
                ))}
            </div>
        </div>
    )
}

import Header from "@/app/_components/header"
import ProductItem from "@/app/_components/productItem"
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";

interface PopularOrdersProps {
    params: {
        id: string;
    }
}

export default async function PopularOrders({ params: { id } }: PopularOrdersProps) {
    const products = await db.product.findMany({
        where: {
            restaurant: {
                id
            }
        },
        include: {
            restaurant: {
                select: {
                    name: true
                },
            },
        },
        orderBy: {
            category: {
                name: 'asc'
            }
        }
    })

    if (!products) return notFound()

    return (
        <div className="px-5 w-full py-5">
            <Header />

            <h2 className="text-lg font-semibold py-6">Os mais pedidos</h2>
            <div className="grid grid-cols-2 gap-y-3 gap-x-5">
                {products.map((product) => (
                    <ProductItem product={product} />
                ))}
            </div>
        </div>
    )
}

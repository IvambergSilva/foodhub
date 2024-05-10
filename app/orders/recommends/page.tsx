import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/productItem";
import { db } from "@/app/_lib/prisma";

export default async function page() {
    const products = await db.product.findMany({
        take: 10,
        include: {
            restaurant: true
        },
    })

    return (
        <div className="p-5 w-full">
            <Header />

            <h2 className="text-lg font-semibold py-6">Pedidos Recomendados</h2>
            <div className="grid grid-cols-2 gap-y-3 gap-x-5">
                {products.map((product) => (
                    <ProductItem product={product} />
                ))}
            </div>
        </div>
    )
}

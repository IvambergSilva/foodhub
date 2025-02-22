import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/productImage";
import ProductDetails from "./_components/productDetails";

interface ProductPageProps {
    params: {
        id: string;
    }
}

export default async function ProductPage({ params: { id } }: ProductPageProps) {
    const product = await db.product.findUnique({
        where: {
            id
        },
        include: {
            restaurant: {
                select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    deliveryFee: true,
                    deliveryTimeMinutes: true
                }
            }
        }
    })

    if (!product) return notFound();

    const complementaryProducts = await db.product.findMany({
        where: {
            restaurantId: product.restaurantId
        },
        include: {
            restaurant: true,
        }
    })

    return (
        <div>
            <ProductImage
                product={product}
            />

            <ProductDetails
                product={product}
                complementaryProducts={complementaryProducts}
            />
        </div>
    )
}

import { Prisma } from "@prisma/client";
import ProductItem from "./productItem";

interface ProductListProps {
    products: Prisma.ProductGetPayload<{
        include: {
            restaurant: true
        }
    }>[],
}

export default function ProductList({ products }: ProductListProps) {
    return (
        <div className="flex gap-4 mt-4 overflow-x-scroll pl-5 [&::-webkit-scrollbar]:hidden">
            {products.map((product) => (
                <ProductItem
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    )
}

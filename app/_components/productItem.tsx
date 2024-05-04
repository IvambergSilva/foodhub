import { Prisma } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import Link from "next/link";

interface ProductItemProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true
                }
            }
        }
    }>,
}

export default function ProductItem({ product }: ProductItemProps) {
    return (
        <Link href={`/products/${product.id}`} className="w-[150px] min-w-[150px]">
            <div className="relative w-full h-[150px] mb-2">
                <Image src={product.imageUrl} alt={product.name} fill className="object-cover rounded-lg" />

                {product.discountPercentage && (
                    <div className="absolute text-xs top-2 left-2 bg-primary flex items-center justify-center text-white rounded-md px-2 py-0.5 gap-0.5">
                        <ArrowDownIcon size={10} />
                        <span className="text-xs font-semibold">{product.discountPercentage}%</span>
                    </div>
                )}
            </div>
            <p className="text-sm">{product.name}</p>
            <div className="flex gap-2 items-center">
                <span className="text-base font-semibold">
                    {formatCurrency(Number(product.price))}
                </span>
                {product.discountPercentage > 0 && (
                    <span className="text-sm line-through text-muted-foreground">
                        {formatCurrency(Number(calculateProductTotalPrice(product)))}
                    </span>
                )}
            </div>
            <span className="block text-xs text-muted-foreground">{product.restaurant.name}</span>
        </Link >
    )
}

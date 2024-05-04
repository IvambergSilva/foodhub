import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface BadgeProps {
    product: Pick<Product, 'discountPercentage'>
}

export default function DiscountBadge({ product }: BadgeProps) {
    return (
        <div className="text-xs w-fit bg-primary flex items-center justify-center text-white rounded-md px-2 py-0.5 gap-0.5">
            <ArrowDownIcon size={10} />
            <span className="text-xs font-semibold">{product.discountPercentage}%</span>
        </div>
    )
}

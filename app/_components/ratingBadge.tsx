import { Restaurant } from "@prisma/client";
import { StarIcon } from "lucide-react";

interface RatingBadgeProps {
    restaurant: Pick<Restaurant, 'ratings'>
}

export default function RatingBadge({ restaurant }: RatingBadgeProps) {
    return (
        <div className="flex items-center justify-center rounded-full px-2.5 py-1 min-w-14 w-14 gap-1">
            <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-semibold">{Number(restaurant.ratings).toFixed(1)}</span>
        </div>
    )
}

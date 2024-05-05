import { Restaurant } from "@prisma/client";
import { StarIcon } from "lucide-react";

interface RatingBadgeProps {
    restaurant: Pick<Restaurant, 'ratings'>
}

export default function RatingBadge({ restaurant }: RatingBadgeProps) {
    return (
        <div>
            <div className="text-xs flex items-center justify-center rounded-full px-2.5 py-1 gap-1 bg-foreground">
                <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
                <span className="text-xs font-semibold text-white">{Number(restaurant.ratings)}</span>
            </div>
        </div>
    )
}

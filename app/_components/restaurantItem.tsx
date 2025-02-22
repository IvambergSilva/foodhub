import { Restaurant } from "@prisma/client"
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react"
import Image from "next/image"
import { formatCurrency } from "../_helpers/price"
import Link from "next/link"
import { Button } from "./ui/button"
import RatingBadge from "./ratingBadge"

interface RestaurantItemsProps {
    restaurant: Restaurant
}

export default function RestaurantItem({ restaurant }: RestaurantItemsProps) {
    return (
        <Link href={`/restaurants/${restaurant.id}`}>
            <div className="min-w-[266px]">
                <div className="relative h-[136px] mb-3">
                    <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover rounded-lg" />

                    <div className="absolute top-2 left-2 bg-primary rounded-full bg-white">
                        <RatingBadge restaurant={restaurant} />
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 w-7 h-7 rounded-full bg-gray-700 hover:bg-transparent"
                    >
                        <HeartIcon size={16} className="fill-white" />
                    </Button>
                </div>

                <p className="text-sm font-semibold">{restaurant.name}</p>

                <div className="flex items-center text-muted-foreground gap-4 text-xs">
                    <div className="flex items-center gap-1">
                        <span className="text-primary">
                            <BikeIcon size={14} />
                        </span>
                        <span>{Number(restaurant.deliveryFee) === 0
                            ? 'Entrega Grátis'
                            : formatCurrency(Number(restaurant.deliveryFee))}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-primary">
                            <TimerIcon size={14} />
                        </span>
                        <span>{restaurant.deliveryTimeMinutes} min</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

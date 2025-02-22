'use client'

import { Button } from "@/app/_components/ui/button"
import { Restaurant } from "@prisma/client"
import { ChevronLeftIcon, HeartIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface RestaurantImageProps {
    restaurant: Pick<Restaurant, 'name' | 'imageUrl'>
}

export default function RestaurantImage({ restaurant }: RestaurantImageProps) {
    const router = useRouter()

    const handleBackClick = () => router.back()

    return (
        <div className="relative h-[360px] w-full">
            <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover" />

            <Button
                className="rounded-full absolute left-4 top-4 text-foreground bg-white hover:text-white"
                size="icon"
                onClick={handleBackClick}
            >
                <ChevronLeftIcon />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 w-10 h-10 bg-gray-700 hover:bg-transparent rounded-full"
            >
                <HeartIcon size={26} className="fill-white" />
            </Button>
        </div>
    )
}

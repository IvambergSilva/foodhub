import { db } from "@/app/_lib/prisma";
import RestaurantImage from "./_components/restaurantImage";
import { notFound } from "next/navigation";
import ProductDetails from "./_components/restaurantDetails";

interface RestaurantProps {
    params: {
        id: string
    }
}

export default async function RestaurantPage({ params: { id } }: RestaurantProps) {
    const restaurant = await db.restaurant.findUnique({
        where: {
            id
        },
        include: {
            categories: {
                include: {
                    products: {
                        where: {
                            restaurantId: id
                        },
                        include: {
                            restaurant: true
                        }
                    }
                },
            },
            products: {
                take: 10,
                include: {
                    restaurant: true
                }
            }
        }
    })

    if (!restaurant) return notFound()

    return (
        <div>
            <RestaurantImage
                restaurant={restaurant}
            />
            <ProductDetails restaurant={restaurant} />
        </div>
    )
}

import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurantItem";
import { db } from "@/app/_lib/prisma";

export default async function RecommendsRestaurants() {
    const restaurants = await db.restaurant.findMany({ take: 10 })

    return (
        <div className="px-5 w-full py-5">
            <Header />

            <h2 className="text-lg font-semibold py-6">Restaurantes Recomendados</h2>
            <div className="flex flex-col gap-6">
                {restaurants.map((restaurant) => (
                    <RestaurantItem
                        key={restaurant.id}
                        restaurant={restaurant}
                    />
                ))}
            </div>
        </div>
    )
}

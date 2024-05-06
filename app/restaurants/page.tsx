"use client"

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchRestaurants from "./_actions/search";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurantItem";
import Search from "../_components/search";

export default function SearchRestaurantsPage() {
    const searchParams = useSearchParams();
    const [restaurants, setRestaurants] = useState<Restaurant[]>([])

    const search = searchParams.get("name");

    useEffect(() => {
        const fetchRestaurantes = async () => {
            if (!search) return;
            const foundRestaurants = await SearchRestaurants(search)
            setRestaurants(foundRestaurants)
        }

        fetchRestaurantes();
    }, [search])

    if (!search) notFound();

    return (
        <div className="px-5 w-full py-5">
            <Header />

            <div className="py-6">
                <Search />
            </div>

            <span className="text-sm text-muted-foreground pb-3 block">
                {restaurants.length === 0
                    ? 'Nenhum resultado '
                    : restaurants.length === 1
                        ? `1 resultado `
                        : `${restaurants.length} resultados `}
                para "{search}"
            </span>

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

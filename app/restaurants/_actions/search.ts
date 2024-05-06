"use server"

import { db } from "@/app/_lib/prisma";

export default async function SearchRestaurants(search: string) {
    const resturants = await db.restaurant.findMany({
        where: {
            name: {
                contains: search,
                mode: "insensitive"
            },
        },
    });

    return resturants
}
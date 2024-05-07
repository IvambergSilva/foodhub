import DeliveryInfo from "@/app/_components/deliveryInfo"
import ProductList from "@/app/_components/productList"
import RatingBadge from "@/app/_components/ratingBadge"
import SectionTitle from "@/app/_components/sectionTitle"
import { Prisma } from "@prisma/client"
import Image from "next/image"

interface RestaurantDetailsProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            categories: {
                include: {
                    products: {
                        include: {
                            restaurant: true
                        },
                    },
                },
                orderBy: {
                    name: 'desc'
                }
            },
            products: {
                include: {
                    restaurant: true
                },
            },
        },
    }>
}

export default function RestaurantDetails({ restaurant }: RestaurantDetailsProps) {
    return (
        <div className="py-5 rounded-tl-3xl rounded-tr-3xl relative mt-[-1.5rem] z-1 bg-white">
            <div className="flex items-center justify-between px-5 pb-3">
                <div className="flex items-center gap-1.5">
                    <div className="relative h-[30px] w-[30px]">
                        <Image src={restaurant.imageUrl} alt={restaurant.name} fill className="object-cover rounded-full" />
                    </div>

                    <span className="text-xl font-semibold">{restaurant.name}</span>
                </div>
                <RatingBadge restaurant={restaurant} />
            </div>

            <div className="px-5">
                <DeliveryInfo restaurant={restaurant} />
            </div>

            <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
                {
                    restaurant.categories.map((category) => (
                        <div className="bg-[#E8E8E8] text-xs py-1 min-w-[167px] w-[167px] text-center rounded-lg">{category.name}</div>
                    ))
                }
            </div>

            <div>
                <SectionTitle
                    title="Os mais pedidos"
                    href={`/orders/popular/${restaurant.id}`}
                />

                <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                    <ProductList products={restaurant.products} />
                </div>
            </div>

            {
                restaurant.categories.map((category) => (
                    <div key={category.id}>
                        <SectionTitle href={`/categories/${category.id}/${restaurant.id}`} title={category.name} />

                        <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                            <ProductList products={category.products} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

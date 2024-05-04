import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/categoryList";
import ProductList from "./_components/productList";
import PromoBanner from "./_components/promoBanner";
import { db } from "./_lib/prisma";
import RestaurantList from "./_components/restaurantList";
import { Button } from "./_components/ui/button";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export default async function Home() {
    const products = await db.product.findMany({
        where: {
            discountPercentage: {
                gt: 0
            },
            restaurant: {
                deliveryFee: 0
            }
        },
        take: 10,
        include: {
            restaurant: true
        }
    })

    return (
        <>
            <div className="px-5 py-6">
                <Header />
            </div>
            <div className="px-5">
                <Search />
            </div>
            <div className="py-6">
                <CategoryList />
            </div>

            <div className="px-5">
                <PromoBanner
                    src="/banner-01.png"
                    alt="Até 30% de esconto em pizzas!"
                />
            </div>

            <div className="py-6">
                <ProductList products={products} />
            </div>

            <div className="px-5">
                <PromoBanner
                    src="/banner-02.png"
                    alt="A partir de R$ 17,90 em lanches"
                />
            </div>

            <div className="space-y-4 py-6">
                <div className="flex items-center justify-between px-5">
                    <h2 className="text-base font-semibold">Restaurante recomendados</h2>

                    <Button
                        variant="ghost"
                        className="h-fit p-0 text-primary hover:bg-transparent"
                        asChild
                    >
                        <Link href="">
                            <span>Ver todos</span>
                            <ChevronRightIcon size={16} />
                        </Link>
                    </Button>
                </div>

                <RestaurantList />
            </div>
        </>
    );
}
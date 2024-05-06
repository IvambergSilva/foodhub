import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/categoryList";
import ProductList from "./_components/productList";
import PromoBanner from "./_components/promoBanner";
import { db } from "./_lib/prisma";
import RestaurantList from "./_components/restaurantList";
import SectionTitle from "./_components/sectionTitle";

export default async function Home() {
    const products = await db.product.findMany({
        where: {
            discountPercentage: {
                gt: 0
            },
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
                <SectionTitle
                    title="Pedidos Recomendados"
                    href={`/orders/recommends`}
                />
                <ProductList products={products} />
            </div>

            <div className="px-5">
                <PromoBanner
                    src="/banner-02.png"
                    alt="A partir de R$ 17,90 em lanches"
                />
            </div>

            <div className="space-y-4 py-6">
                <SectionTitle
                    title="Restaurantes Recomendados"
                    href="/restaurants/recommends"
                />
                <RestaurantList />
            </div>
        </>
    );
}
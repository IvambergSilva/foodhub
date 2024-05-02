import Header from "./_components/header";
import Search from "./_components/search";
import CategoryList from "./_components/categoryList";
import Image from "next/image";

export default function Home() {
    return (
        <div>
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
                <Image src="/banner-01.png" alt="Até 30% de esconto em pizzas!" width={0} height={0} className="h-auto w-full object-contain" quality={100} sizes="100vw" />
            </div>

            <div className="py-6 px-5">
                <Image src="/banner-02.png" alt="A partir de R$ 17,90 em lanches" width={0} height={0} className="h-auto w-full object-contain" quality={100} sizes="100vw" />
            </div>
        </div>
    );
}
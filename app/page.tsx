import Image from "next/image";
import Header from "./_components/header";
import Search from "./_components/search";

export default function Home() {
    return (
        <div>
            <div className="px-5 pt-6">
                <Header />
            </div>
            <div className="px-5 mt-6">
                <Search />
            </div>
        </div>
    );
}
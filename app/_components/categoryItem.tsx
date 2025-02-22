import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
    category: {
        id: string;
        name: string;
        imageUrl: string;
    }
}

export default function CategoryItem({ category }: CategoryItemProps) {
    return (
        <Link href={`categories/${category.id}`}>
            <div className="flex items-center gap-3 bg-white rounded-full p-4 min-w-fit shadow-[0_5px_5px_0px_#0000000F]">
                <div className="relative w-[30px] h-[30px]">
                    <Image src={category.imageUrl} alt={category.name} fill />
                </div>
                <span className="font-semibold text-sm">{category.name}</span>
            </div>
        </Link>
    )
}
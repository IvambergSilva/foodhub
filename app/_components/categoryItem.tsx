'use client'

import React from "react";
import Image from "next/image";

interface CategoryProps {
    id: string;
    name: string;
    imageUrl: string;
}

interface CategoryItemProps {
    categories: CategoryProps[]
}

export default function CategoryItem({ categories }: CategoryItemProps) {
    return (
        <div
            className="flex items-center gap-3 w-full overflow-x-scroll px-4 pb-2 [&::-webkit-scrollbar]:hidden"
        >
            {categories.map((category) => (
                <div className="flex items-center gap-3 bg-white rounded-full p-4 min-w-fit shadow-[0_5px_5px_0px_#0000000F]">
                    <div className="relative w-[30px] h-[30px]">
                        <Image src={category.imageUrl} alt={category.name} fill />
                    </div>
                    <span className="font-semibold text-sm">{category.name}</span>
                </div>
            ))}
        </div>
    )
}
'use client'

import React, { useEffect, useRef, useState } from "react";
import { api } from "../_lib/api";
import CategoryItem from "./categoryItem";

interface CategoriesProps {
    id: string;
    name: string;
    imageUrl: string;
}

export default function CategoryList() {
    const [categories, setCategories] = useState<CategoriesProps[]>([]);
    const categoriesContainerRef = useRef<HTMLDivElement>(null)

    const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        const container = categoriesContainerRef.current;
        if (container) {
            container.scrollTo({
                left: container.scrollLeft + e.deltaY,
                behavior: "smooth",
            });
        }
    }

    useEffect(() => {
        const url = `${api}/categories`
        fetch(url)
            .then(response => response.json()
                .then(data => {
                    console.log(data);
                    setCategories(data.categories)
                }))
    }, [])

    return (
        <div
            ref={categoriesContainerRef}
            onWheel={handleScroll}
            className="flex items-center gap-3 w-full overflow-x-hidden px-4 pb-2"
        >
            {categories.map((category) => (
                <CategoryItem
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    imageUrl={category.imageUrl}
                />
            ))}
        </div>
    )
}

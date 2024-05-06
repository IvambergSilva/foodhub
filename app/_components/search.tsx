'use client'

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
    }

    function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if(!search) return

        router.push(`/restaurants?name=${search}`)
    };

    return (
        <form className="flex items-center gap-2" onSubmit={handleSearchSubmit}>
            <Input
                placeholder="Buscar Restaurantes"
                className="border-none flex-1"
                onChange={handleSearch}
                value={search}
            />
            <Button size="icon" className="w-10" type="submit">
                <SearchIcon size={20} />
            </Button>
        </form>
    )
}

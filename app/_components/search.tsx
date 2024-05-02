import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Search() {
    return (
        <div className="flex items-center gap-2">
            <Input placeholder="Buscar Restaurantes" className="border-none flex-1" />

            <Button size="icon" className="w-10">
                <SearchIcon size={20} />
            </Button>
        </div>
    )
}

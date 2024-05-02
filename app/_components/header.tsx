import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"

export default function Header() {
    return (
        <header className="flex justify-between">
            <Link href="/">
                <Image src="/logo.png" alt="Logo do FoodHub" width={60} height={60} className="object-cover" />
            </Link>
            <Button size="icon" variant="outline" className="border-none bg-transparent">
                <MenuIcon />
            </Button>
        </header>
    )
}

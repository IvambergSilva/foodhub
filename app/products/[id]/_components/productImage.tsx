'use client'

import { Button } from "@/app/_components/ui/button"
import { Product } from "@prisma/client"
import { ChevronLeftIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ProductImageProps {
    product: Pick<Product, 'name' | 'imageUrl'>
}

export default function ProductImage({ product }: ProductImageProps) {
    const router = useRouter()

    const handleBackClick = () => router.back()

    return (
        <div className="relative h-[360px] w-full">
            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
            
            <Button
                className="rounded-full absolute left-4 top-4 text-foreground bg-white hover:text-white"
                size="icon"
                onClick={handleBackClick}
            >
                <ChevronLeftIcon />
            </Button>
        </div>
    )
}

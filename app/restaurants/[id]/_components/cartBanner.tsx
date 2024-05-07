'use client'

import Cart from "@/app/_components/cart"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet"
import { CartContext } from "@/app/_context/cart"
import { formatCurrency } from "@/app/_helpers/price"
import Image from "next/image"
import { useContext, useState } from "react"


export default function CartBanner() {
    const { products, subTotalPrice, totalQuantity } = useContext(CartContext)

    const [isCartOpen, setIsCartOpen] = useState(false)

    return (
        <div className="fixed bottom-0 left-0 p-5 bg-white w-full flex items-center justify-between border border-t border-[#EEEEEE] z-50">
            <div className="flex flex-col gap-0.5">
                <span className="text-xs">Total sem entrega</span>
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{formatCurrency(subTotalPrice)}</span>
                    <span className="text-xs text-muted-foreground">
                        / {totalQuantity} {totalQuantity === 1
                            ? 'item'
                            : 'itens'
                        }
                    </span>
                </div>
                <div className="flex items-center gap-1.5 w-fit">
                    <div className="relative w-5 h-5">
                        <Image
                            src={products[0]?.restaurant.imageUrl}
                            alt={products[0]?.restaurant.name}
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>
                    <span className="text-xs text-muted-foreground">{products[0]?.restaurant.name}</span>
                </div>
            </div>

            <Button
                onClick={() => setIsCartOpen(true)}
            >Ver Sacola</Button>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetContent className="w-[80vw]">
                    <SheetHeader>
                        <SheetTitle className="text-left">Sacola</SheetTitle>
                    </SheetHeader>
                    <Cart />
                </SheetContent>
            </Sheet>
        </div>
    )
}

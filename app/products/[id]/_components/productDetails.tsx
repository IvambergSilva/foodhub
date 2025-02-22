'use client'

import Cart from "@/app/_components/cart"
import DeliveryInfo from "@/app/_components/deliveryInfo"
import DiscountBadge from "@/app/_components/discountBadge"
import ProductList from "@/app/_components/productList"
import SectionTitle from "@/app/_components/sectionTitle"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/_components/ui/alert-dialog"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/app/_components/ui/sheet"
import { CartContext } from "@/app/_context/cart"
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price"
import CartBanner from "@/app/restaurants/[id]/_components/cartBanner"
import { Prisma } from "@prisma/client"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useContext, useState } from "react"

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    deliveryFee: true,
                    deliveryTimeMinutes: true
                }
            }
        },
    }>;

    complementaryProducts: Prisma.ProductGetPayload<{
        include: {
            restaurant: true,
        }
    }>[];
}

export default function ProductDetails({ product, complementaryProducts }: ProductDetailsProps) {
    const [quantity, setQuantity] = useState(1)

    const { products, addProductToCart, totalQuantity } = useContext(CartContext)

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [isCartOpen, setIsCartOpen] = useState(false)

    function addToCart({ emptyCart = false }: { emptyCart?: boolean }) {
        addProductToCart({ product, quantity, emptyCart })
        setIsCartOpen(true)
    }

    function handleAddProductToCart() {
        const hasDifferentRestaurantProduct = products.some(
            (cartProduct) => cartProduct.restaurantId !== product.restaurantId
        )

        if (hasDifferentRestaurantProduct) return setIsDialogOpen(true)

        addToCart({
            emptyCart: false
        })
    }

    const handleIncreaseQuantityClick = () => setQuantity(currentState => currentState + 1)
    const handleDecreaseQuantityClick = () => {
        if (quantity > 1) {
            setQuantity(currentState => currentState - 1)
        }
    }

    return (
        <>
            <div className={`${totalQuantity > 0 && 'pb-32'} py-5 rounded-tl-3xl rounded-tr-3xl relative mt-[-1.5rem] z-1 bg-white`}>
                <section className="px-5">
                    <Link
                        href={`/restaurants/${product.restaurantId}`}
                        className="flex items-center gap-1.5 w-fit"
                    >
                        <div className="relative w-6 h-6">
                            <Image
                                src={product.restaurant.imageUrl}
                                alt={product.restaurant.name}
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                        <span className="text-sm text-muted-foreground">{product.restaurant.name}</span>
                    </Link>

                    <p className="font-semibold text-xl mb-3 mt-2">{product.name}</p>

                    <div className="flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-xl">{formatCurrency(Number(product.price))}</span>

                                {product.discountPercentage > 0 && (
                                    <DiscountBadge product={product} />
                                )}
                            </div>

                            {product.discountPercentage > 0 && (
                                <span className="text-sm text-muted-foreground">De: {formatCurrency(Number(calculateProductTotalPrice(product)))}</span>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={handleDecreaseQuantityClick}
                                className="border border-muted-foreground"
                            >
                                <ChevronLeftIcon />
                            </Button>

                            <span className="w-8 text-center text-sm">{quantity}</span>

                            <Button
                                size="icon"
                                onClick={handleIncreaseQuantityClick}
                            >
                                <ChevronRightIcon />
                            </Button>
                        </div>
                    </div>
                </section>
                <div className="my-6 px-5">
                    <DeliveryInfo restaurant={product.restaurant} />
                </div>
                <section className="px-5">
                    <h3 className="text-base font-semibold mb-3">Sobre</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                </section>
                <section className="mb-6">
                    <SectionTitle title="Confira mais produtos"
                        href={`/orders/popular/${product.restaurantId}`}
                    />
                    <ProductList products={complementaryProducts} />
                </section>
                <div className="px-5">
                    <Button
                        className="w-full font-semibold text-sm"
                        onClick={handleAddProductToCart}
                    >
                        <span className="p-3">Adicionar à sacola</span>
                    </Button>
                </div>
            </div>

            {totalQuantity > 0 && (<CartBanner />)}

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetContent className="w-[80vw]">
                    <SheetHeader>
                        <SheetTitle className="text-left">Sacola</SheetTitle>
                    </SheetHeader>
                    <Cart />
                </SheetContent>
            </Sheet>

            <AlertDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            >
                <AlertDialogContent className="w-4/5 rounded-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Somente itens de um restaurante por vez na sua sacola</AlertDialogTitle>
                        <AlertDialogDescription>
                            Deseja mesmo adicionar este produto? Isso limpará sua sacola atual
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>Esvaziar Sacola e Adiconar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
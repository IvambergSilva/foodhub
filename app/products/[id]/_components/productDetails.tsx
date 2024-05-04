'use client'

import DiscountBadge from "@/app/_components/discountBadge"
import ProductList from "@/app/_components/productList"
import SectionTitle from "@/app/_components/sectionTitle"
import { Button } from "@/app/_components/ui/button"
import { Card } from "@/app/_components/ui/card"
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price"
import { Prisma } from "@prisma/client"
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
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

    const handleIncreaseQuantityClick = () => setQuantity(currentState => currentState + 1)
    const handleDecreaseQuantityClick = () => {
        if (quantity > 1) {
            setQuantity(currentState => currentState - 1)
        }
    }

    return (
        <div className="py-5 rounded-tl-3xl rounded-tr-3xl relative mt-[-1.5rem] z-1 bg-white">
            <section className="px-5">
                <div className="flex items-center gap-1.5">
                    <div className="relative w-6 h-6">
                        <Image
                            src={product.restaurant.imageUrl}
                            alt={product.restaurant.name}
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>
                    <span className="text-sm text-muted-foreground">{product.restaurant.name}</span>
                </div>

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
                <Card>
                    <div className="flex items-center justify-around p-2.5">
                        <div className="flex flex-col items-center gap-0.5">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="text-sm">Entrega</span>
                                <BikeIcon size={16} />
                            </div>
                            <span className="text-sm font-semibold">
                                {Number(product.restaurant.deliveryFee) > 0
                                    ? formatCurrency(Number(product.restaurant.deliveryFee))
                                    : 'Grátis'}
                            </span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="text-sm">Entrega</span>
                                <ClockIcon size={16} />
                            </div>
                            <span className="text-sm font-semibold">{Number(product.restaurant.deliveryTimeMinutes)} min</span>
                        </div>
                    </div>
                </Card>
            </div>
            <section className="px-5">
                <h3 className="text-base font-semibold mb-3">Sobre</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
            </section>
            <section className="mb-6">
                <SectionTitle title="Confira mais produtos" />
                <ProductList products={complementaryProducts} />
            </section>
            <div className="px-5">
                <Button className="w-full font-semibold text-sm">
                    <span className="p-3">Adicionar à sacola</span>
                </Button>
            </div>
        </div>
    )
}

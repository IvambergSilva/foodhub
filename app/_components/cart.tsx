import { useContext } from "react"
import { CartContext } from "../_context/cart"
import CartItem from "./cartItem"
import { Card, CardContent } from "./ui/card"
import { formatCurrency } from "../_helpers/price"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

export default function Cart() {
    const { products, subTotalPrice, totalDiscount, totalPrice } = useContext(CartContext)

    return (
        <div className="flex flex-col gap-5 py-5 justify-between h-full">
            {products.length > 0 ?
                <>
                    {products.map((product) => (
                        <CartItem product={product} />
                    ))}
                </>
                : <span className="text-sm text-muted-foreground pb-3 block italic">Seu carrinho vazio, adicione alguns pedidos...</span>
            }

            {products.length > 0 && (
                <div className="flex flex-col gap-6">
                    <Card>
                        <CardContent className="py-2.5">
                            <div className="flex justify-between items-center py-2.5 text-xs text-muted-foreground">
                                <span >Subtotal</span>
                                <span>{formatCurrency(subTotalPrice)}</span>
                            </div>

                            <Separator className="h-[0.75px]" />

                            <div className="flex justify-between items-center py-2.5 text-xs text-muted-foreground">
                                <span>Entrega</span>
                                <span>
                                    {Number(products[0].restaurant.deliveryFee) === 0
                                        ? 'GRÁTIS'
                                        : formatCurrency(Number(products[0].restaurant.deliveryFee))
                                    }
                                </span>
                            </div>

                            <Separator className="h-[0.75px]" />

                            <div className="flex justify-between items-center py-2.5 text-xs text-muted-foreground">
                                <span>Descontos</span>
                                <span>- {formatCurrency(totalDiscount)}</span>
                            </div>

                            <Separator className="h-[0.75px]" />

                            <div className="flex justify-between items-center py-2.5 text-sm font-semibold">
                                <span>Total</span>
                                <span>{formatCurrency(totalPrice)}</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Button
                        className="w-full font-semibold text-sm"
                    >
                        <span className="p-3">Finalizar Pedido</span>
                    </Button>
                </div>
            )}
        </div>
    )
}

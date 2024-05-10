import { useContext, useState } from "react"
import { CartContext } from "../_context/cart"
import CartItem from "./cartItem"
import { Card, CardContent } from "./ui/card"
import { formatCurrency } from "../_helpers/price"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { createOrder } from "../_actions/order"
import { useSession } from "next-auth/react"
import { Check, Loader2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"

export default function Cart() {
    const { data } = useSession();
    const { products, subTotalPrice, totalDiscount, totalPrice, clearCart } = useContext(CartContext)

    const [isSubmitLoading, setIsSubmitLoading] = useState(false)

    const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);

    const [isConfirmaedDialogOpen, setIsConfirmedDialogOpen] = useState(false)

    async function handleFinishOrderClick() {
        if (!data?.user) return;

        const restaurant = products[0].restaurant

        try {
            setIsSubmitLoading(true)

            await createOrder({
                deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
                deliveryFee: restaurant.deliveryFee,
                subTotalPrice,
                totalDiscount,
                totalPrice,
                restaurant: {
                    connect: {
                        id: restaurant.id
                    }
                },
                status: "CONFIRMED",
                user: {
                    connect: {
                        id: data.user.id,
                    }
                },
                products: {
                    createMany: {
                        data: products.map((product) => ({
                            productId: product.id,
                            quantity: product.quantity,
                        })),
                    },
                },
            })
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitLoading(false)
            setIsConfirmedDialogOpen(true)
            clearCart()
        }
    }

    return (
        <>
            <div className="flex flex-col gap-5 py-5 justify-between h-full">
                {products.length > 0 ?
                    <div className="flex flex-col gap-4">
                        {products.map((product, index) => (
                            <>
                                <CartItem product={product} />
                                {index !== products.length - 1 && <Separator className="h-[2px]" />}
                            </>
                        ))}
                    </div>
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
                            onClick={() => setIsConfirmationDialogOpen(true)}
                        >
                            <span className="p-3">Finalizar Pedido</span>
                        </Button>
                    </div>
                )}
            </div>

            <AlertDialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
                <AlertDialogContent
                    className="w-4/5 rounded-xl"
                >
                    <AlertDialogHeader>
                        <AlertDialogTitle>Finalizar o Pedido</AlertDialogTitle>
                        <AlertDialogDescription>
                            Chegou o momento de concluir o seu pedido. Está pronto para finalizá-lo?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleFinishOrderClick}
                            disabled={isSubmitLoading}
                        >
                            {isSubmitLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Confirmar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={isConfirmaedDialogOpen} onOpenChange={setIsConfirmedDialogOpen}>
                <AlertDialogContent
                    className="w-3/5 rounded-xl"
                >
                    <AlertDialogHeader>
                        <div className="w-14 h-14 rounded-full bg-[#4BB543] flex items-center justify-center m-auto mb-3 animate-success">
                            <Check size={35} className="text-white" />
                        </div>
                        <AlertDialogTitle>Pedido Efetuado!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Seu pedido foi realizado com sucesso.
                        </AlertDialogDescription>
                        <AlertDialogFooter className="mt-4">
                            <AlertDialogCancel>
                                Confirmar
                            </AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

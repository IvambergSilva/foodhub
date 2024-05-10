import { ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { formatDate } from "../_helpers/formattedDate";

interface OrderProps {
    order: Prisma.OrderGetPayload<{
        include: {
            restaurant: true,
            products: {
                include: {
                    product: true
                }
            }
        }
    }>
}

export default function Order({ order }: OrderProps) {

    function getOrderStatusInfo(status: String) {
        switch (status) {
            case "CONFIRMED":
                return { label: "Confirmado", color: "#44913E" };
            case "PREPARING":
                return { label: "Preparando", color: "#CAD05D" };
            case "DELIVERING":
                return { label: "Em transporte", color: "#4BB543" };
            case "CANCELED":
                return { label: "Cancelado", color: "#E83737" };
            case "COMPLETED":
                return { label: "Completo", color: "#7E8392" };
            default:
                return { label: "Status Desconhecido", color: "#00000080" };
        }
    }

    console.log("order?.createdAt: ", order?.createdAt);


    return (
        <Card>
            <CardContent className="p-3">
                <span className={`bg-[${getOrderStatusInfo(order.status).color.toString()}] rounded-full w-fit py-0.5 px-1.5 text-xs font-semibold text-white`}>
                    {getOrderStatusInfo(order.status).label}
                </span>

                <Link href={`/restaurants/${order.restaurantId}`}
                    className="flex justify-between items-center mt-3"
                >
                    <div className="flex justify-between items-center gap-1.5">
                        <div className="relative w-5 h-5">
                            <Image
                                src={order.restaurant.imageUrl}
                                alt={order.restaurant.name}
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                        <span className="text-sm font-semibold text-foreground">{order.restaurant.name}</span>
                    </div>
                    <ChevronRightIcon size={24} />
                </Link>

                <div className="py-3">
                    <Separator />
                </div>

                <div className="flex flex-col gap-2">
                    {order.products.map(product => (
                        <div className="flex items-center gap-1.5">
                            <div className="rounded-full bg-muted-foreground h-6 w-6 flex justify-center items-center text-white text-xs">
                                <span>{product.quantity}</span>
                            </div>
                            <span className="text-muted-foreground text-sm">{product.product.name}</span>
                        </div>
                    ))}
                </div>

                <div className="py-3">
                    <Separator />
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-foreground">{formatCurrency(Number(order.totalPrice))}</span>
                        <div className="text-xs text-foreground flex gap-1">
                            <span className="font-semibold">Pedido Realizado:</span>
                            <span>{formatDate(order.createdAt.toString())}</span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-xs text-primary font-semibold"
                        disabled={order.status !== 'COMPLETED'}
                    >
                        Adicionar à Sacola
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

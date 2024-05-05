import { Prisma } from "@prisma/client";
import { BikeIcon, ClockIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Card } from "./ui/card";

interface DeliveryInfoProps {
    restaurant: Prisma.RestaurantGetPayload<{
        select: {
            deliveryFee: true,
            deliveryTimeMinutes: true
        }
    }>
}

export default function DeliveryInfo({ restaurant }: DeliveryInfoProps) {
    return (
        <Card>
            <div className="flex items-center justify-around p-2.5">
                <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-sm">Entrega</span>
                        <BikeIcon size={16} />
                    </div>
                    <span className="text-sm font-semibold">
                        {Number(restaurant.deliveryFee) > 0
                            ? formatCurrency(Number(restaurant.deliveryFee))
                            : 'Grátis'}
                    </span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-sm">Entrega</span>
                        <ClockIcon size={16} />
                    </div>
                    <span className="text-sm font-semibold">{Number(restaurant.deliveryTimeMinutes)} min</span>
                </div>
            </div>
        </Card>
    )
}

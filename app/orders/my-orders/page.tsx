import Header from "@/app/_components/header";
import Order from "@/app/_components/order";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { Separator } from "../../_components/ui/separator";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function MyOrdes() {
    const session = await getServerSession(authOptions)
    if (!session?.user) return redirect("/");

    const orders = await db.order.findMany({
        where: {
            userId: session.user.id,
        },
        include: {
            restaurant: true,
            products: {
                include: {
                    product: true
                },
            }
        },
    })

    if (!orders) return notFound()

    return (
        <div className="p-5">
            <Header />
            <h2 className="text-lg font-semibold py-6">Meus Pedidos</h2>

            <div className="flex flex-col gap-3">
                {orders.map((order, index) => (
                    <>
                        <Order order={order} />
                        {index < (orders.length -1) && (
                            <div className="py-0.5">
                                <Separator />
                            </div>
                        )}
                    </>
                ))}
            </div>
        </div>
    )
}

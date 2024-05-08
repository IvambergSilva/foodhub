import Image from "next/image"
import { CartContext, CartProduct } from "../_context/cart"
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price"
import { Button } from "./ui/button"
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react"
import { useContext } from "react"

interface CartItemProps {
    product: CartProduct
}

export default function CartItem({ product }: CartItemProps) {
    const { decreaseProductQuantity, increaseQuantityClick, removeProductFromCart } = useContext(CartContext)

    const handleDecreaseQuantityClick = () => decreaseProductQuantity(product.id)
    const handleIncreaseQuantityClick = () => increaseQuantityClick(product.id)
    const handleRemoveProductClick = () => removeProductFromCart(product.id)

    return (
        <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center justify-between">
                <div className="relative w-[77px] h-[77px] mr-4">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover rounded-lg" />
                </div>

                <div className="flex flex-col justify-between h-[77px]">
                    <span className="text-xs">{product.name}</span>

                    <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm w-[70px]">{formatCurrency(Number(product.price) * product.quantity)}</span>

                        {product.discountPercentage > 0 && (
                            <span className="text-sm text-muted-foreground line-through"> {formatCurrency(Number(calculateProductTotalPrice(product)) * product.quantity)}</span>
                        )}
                    </div>

                    <div className="flex items-center">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleDecreaseQuantityClick}
                            className="border border-muted-foreground w-8 h-8"
                        >
                            <ChevronLeftIcon size={18} />
                        </Button>

                        <span className="w-8 text-center text-xs">{product.quantity}</span>

                        <Button
                            size="icon"
                            className="w-8 h-8"
                            onClick={handleIncreaseQuantityClick}
                        >
                            <ChevronRightIcon size={18} />
                        </Button>
                    </div>
                </div>
            </div>
            <Button
                size="icon"
                variant="ghost"
                className="border border-muted-foreground w-8 h-8"
                onClick={handleRemoveProductClick}
            >
                <TrashIcon size={18} />
            </Button>
        </div>
    )
}

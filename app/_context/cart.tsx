'use client'

import { Prisma } from "@prisma/client"
import { ReactNode, createContext, useMemo, useState } from "react";
import { calculateProductTotalPrice } from "../_helpers/price";

export interface CartProduct extends Prisma.ProductGetPayload<{
    include: {
        restaurant: {
            select: {
                deliveryFee: true
            }
        }
    }
}> {
    quantity: number;
}

interface ICartContext {
    products: CartProduct[];
    subTotalPrice: number;
    totalPrice: number;
    totalDiscount: number;
    addProductToCart: ({
        product,
        quantity,
        emptyCart
    }: {
        product: Prisma.ProductGetPayload<{
            include: {
                restaurant: {
                    select: {
                        deliveryFee: true;
                    };
                };
            };
        }>;
        quantity: number;
        emptyCart?: boolean;
    }) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseQuantityClick: (productId: string) => void;
    removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    products: [],
    subTotalPrice: 0,
    totalPrice: 0,
    totalDiscount: 0,
    addProductToCart: () => { },
    decreaseProductQuantity: () => { },
    increaseQuantityClick: () => { },
    removeProductFromCart: () => { }
})

export default function CartProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<CartProduct[]>([])

    const subTotalPrice = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + Number(product.price) * product.quantity
        }, 0)
    }, [products]);

    const totalPrice = useMemo(() => {
        return products.reduce((acc, product) => {
            return acc + Number(calculateProductTotalPrice(product)) * product.quantity
        }, 0)
    }, [products]);

    const totalDiscount = totalPrice - subTotalPrice;

    function addProductToCart(
        { product, quantity, emptyCart }: {
            product: Prisma.ProductGetPayload<{
                include: {
                    restaurant: {
                        select: {
                            deliveryFee: true
                        }
                    }
                }
            }>,
            quantity: number,
            emptyCart?: boolean
        }
    ) {

        if (emptyCart) setProducts([])

        const isProductAlreadyOnCart = products.some(
            (cartProduct) => cartProduct.id === product.id
        )

        if (isProductAlreadyOnCart) {
            return setProducts((prev) =>
                prev.map((cartProduct) => {
                    if (cartProduct.id === product.id) {
                        return {
                            ...cartProduct,
                            quantity: cartProduct.quantity + quantity
                        }
                    }
                    return cartProduct
                })
            )
        }

        setProducts((prev) => [...prev, { ...product, quantity: quantity }])
    }

    function increaseQuantityClick(productId: string) {
        return setProducts((prev) =>
            prev.map((cartProduct) => {
                if (cartProduct.id === productId) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + 1
                    }
                }
                return cartProduct
            })
        )
    }

    function decreaseProductQuantity(productId: string) {
        return setProducts((prev) =>
            prev.map((cartProduct) => {
                if (cartProduct.quantity > 1) {
                    if (cartProduct.id === productId) {
                        return {
                            ...cartProduct,
                            quantity: cartProduct.quantity - 1
                        }
                    }
                }
                return cartProduct
            })
        )
    }

    function removeProductFromCart(productId: string) {
        return setProducts((prev) =>
            prev.filter((cartProduct) => cartProduct.id !== productId)
        )
    }

    return (
        <CartContext.Provider value={{
            products,
            addProductToCart,
            decreaseProductQuantity,
            increaseQuantityClick,
            removeProductFromCart,
            subTotalPrice,
            totalDiscount,
            totalPrice
        }}>
            {children}
        </CartContext.Provider >
    )
}

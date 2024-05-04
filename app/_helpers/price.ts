import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product) => {
    if (product.discountPercentage === 0) return product.price;

    return Number(product.price) * (1 + product.discountPercentage / 100)
}

export const formatCurrency = (value: number) => {
    return `R$ ${Intl.NumberFormat("pt-BR", {
        currency: 'BRL',
        minimumFractionDigits: 2
    }).format(value)}`
}
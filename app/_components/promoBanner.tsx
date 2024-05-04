import Image, { ImageProps } from 'next/image'
import React from 'react'

export default function PromoBanner({ src, alt }: ImageProps) {
    return (
        <Image src={src} alt={alt} width={0} height={0} className="h-auto w-full object-contain" quality={100} sizes="100vw" />
    )
}

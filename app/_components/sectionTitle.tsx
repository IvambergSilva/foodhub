import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'

interface SectionTitleProps {
    title: string
    href: string
}

export default function SectionTitle({ title, href }: SectionTitleProps) {
    return (
        <div className="flex items-center justify-between mt-6 px-5">
            <h2 className="text-base font-semibold">{title}</h2>
            <Button
                variant="ghost"
                className="h-fit p-0 text-primary hover:bg-transparent"
                asChild
            >
                <Link href={href}>
                    <span>Ver todos</span>
                    <ChevronRightIcon size={16} />
                </Link>
            </Button>
        </div>
    )
}

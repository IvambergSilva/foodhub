'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { CupSoda, Fish, Grape, Heart, HomeIcon, IceCream, LogIn, LogOut, MenuIcon, Pizza, Sandwich, ScrollTextIcon, Utensils } from "lucide-react"
import { signIn, signOut, useSession } from 'next-auth/react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"
import ButtonMenu from "./buttonMenu"
import { useState } from "react"

export default function Header() {
    const { data } = useSession();

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="flex justify-between">
            <Link href="/">
                <Image src="/logo.png" alt="Logo do FoodHub" width={60} height={60} className="object-cover" />
            </Link>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <Button
                    size="icon"
                    variant="outline"
                    className="border-none bg-transparent"
                    onClick={() => setIsMenuOpen(true)}
                >
                    <MenuIcon />
                </Button>
                <SheetContent className="w-[80vw]">
                    <SheetHeader>
                        <SheetTitle className="text-left">Menu</SheetTitle>

                        <div className="flex justify-between items-center pt-4">
                            {data?.user
                                ? (
                                    <div className="flex items-center gap-3">
                                        <Avatar
                                            className="border-2 border-primary"
                                        >
                                            <AvatarImage src={data?.user?.image as string | undefined} />
                                            <AvatarFallback>
                                                {data?.user?.name?.split(' ')[0][0]}
                                                {data?.user?.name?.split(' ')[1][0]}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex flex-col items-start">
                                            <span className="text-base font-semibold">{data?.user?.name}</span>

                                            <span className="text-xs text-muted-foreground">{data?.user?.email}</span>
                                        </div>
                                    </div>
                                )
                                : (
                                    <>
                                        <span className="text-base font-semibold">Olá! Faça o seu login!</span>
                                        <Button
                                            size="icon"
                                            onClick={() => signIn()}
                                        >
                                            <LogIn size={20} />
                                        </Button>
                                    </>
                                )}
                        </div>
                    </SheetHeader>

                    <SheetDescription>
                        {data?.user && (
                            <>
                                <div className="py-5">
                                    <Separator
                                        className="h-[1px] bg-[#EEE]"
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Button
                                        className="rounded-full flex justify-start gap-3"
                                        asChild
                                    >
                                        <Link href="/">
                                            <HomeIcon size={16} />
                                            <span className="text-sm font-normal">Início</span>
                                        </Link>
                                    </Button>

                                    <ButtonMenu text="Meus Pedidos">
                                        <Link href={`/orders/my-orders`}>
                                            <ScrollTextIcon size={16} />
                                        </Link>
                                    </ButtonMenu>

                                    <ButtonMenu text="Restaurantes favoritos">
                                        <Link href="">
                                            <Heart size={16} />
                                        </Link>
                                    </ButtonMenu>
                                </div>
                            </>
                        )}

                        <div className="py-5">
                            <Separator
                                className="h-[1px] bg-[#EEE]"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <ButtonMenu text="Pratos">
                                <Utensils size={16} />
                            </ButtonMenu>
                            <ButtonMenu text="Lanches">
                                <Sandwich size={16} />
                            </ButtonMenu>
                            <ButtonMenu text="Pizza">
                                <Pizza size={16} />
                            </ButtonMenu>
                            <ButtonMenu text="Japonesa">
                                <Fish size={16} />
                            </ButtonMenu>
                            <ButtonMenu text="Sobremesa">
                                <IceCream size={16} />
                            </ButtonMenu>
                            <ButtonMenu text="Sucos">
                                <Grape size={16} />
                            </ButtonMenu>
                            <ButtonMenu text="Refrigerantes">
                                <CupSoda size={16} />
                            </ButtonMenu>
                        </div>

                        {data?.user && (
                            <>
                                <div className="py-5">
                                    <Separator
                                        className="h-[1px] bg-[#EEE]"
                                    />
                                </div>
                                <ButtonMenu
                                    text="Sair da conta"
                                    onClick={() => signOut()}
                                >
                                    <LogOut size={16} />
                                </ButtonMenu>
                            </>
                        )}
                    </SheetDescription>
                </SheetContent >
            </Sheet>
        </header>
    )
}

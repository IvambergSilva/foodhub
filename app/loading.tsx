import Image from "next/image";

export default function Loading() {
    return (
        <div className="relative w-full h-[100vh] flex items-center justify-center animate-pulse">
            <Image alt='Ícone de uma bandeija' src="/plate.svg" width={200} height={200} className="animate-bounce" />
        </div>
    )
}

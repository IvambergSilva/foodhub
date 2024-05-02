import Image from "next/image";

interface CategoryItemProps {
    id: string;
    name: string;
    imageUrl: string;
}

export default function CategoryItem({ id, name, imageUrl }: CategoryItemProps) {
    return (
        <div className="flex items-center gap-3 bg-white rounded-full p-4 min-w-fit shadow-[0_5px_5px_0px_#0000000F]">
            <div className="relative w-[30px] h-[30px]">
                <Image src={imageUrl} alt={name} fill />
            </div>
            <span className="font-semibold text-sm">{name}</span>
        </div>
    )
}

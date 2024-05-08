import { ComponentProps, ReactNode } from "react";
import { Button } from "./ui/button";

interface ButtonMenuProps extends ComponentProps<'button'> {
    text: string;
    children: ReactNode;
}

export default function ButtonMenu({ text, children, ...props }: ButtonMenuProps) {
    return (
        <Button
            variant="ghost"
            className="rounded-full flex justify-start gap-3 w-full text-foreground"
            {...props}
        >
            {children}
            <span className="text-sm font-normal">{text}</span>
        </Button>
    )
}

import { ReactNode } from "react";

interface ServicesLayoutProps {
    children: ReactNode;
}

export default function AuthenticatedLayout({ children }: ServicesLayoutProps) {
    return <div>{children}</div>
}
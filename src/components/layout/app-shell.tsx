import type { ReactNode } from "react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface AppShellProps {
	children: ReactNode;
	className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
	return (
		<div className="flex min-h-screen flex-col bg-background">
			<SiteHeader />
			<main className={cn("flex-1 pb-20 md:pb-0", className)}>{children}</main>
			<SiteFooter />
			<MobileNav />
			<Toaster position="top-center" richColors />
		</div>
	);
}

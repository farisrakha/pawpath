import { Link } from "@tanstack/react-router";
import {
	ClipboardList,
	Home,
	type LucideIcon,
	User as UserIcon,
} from "lucide-react";

interface NavItem {
	to: string;
	label: string;
	icon: LucideIcon;
	exact?: boolean;
}

const ITEMS: NavItem[] = [
	{ to: "/jelajahi", label: "Jelajahi", icon: Home, exact: true },
	{ to: "/my-applications", label: "Lamaranku", icon: ClipboardList },
	{ to: "/account", label: "Akun", icon: UserIcon },
];

export function MobileNav() {
	return (
		<nav
			className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden"
			aria-label="Navigasi utama"
		>
			<ul className="mx-auto flex max-w-md items-stretch justify-around">
				{ITEMS.map((item) => {
					const Icon = item.icon;
					return (
						<li key={item.to} className="flex-1">
							<Link
								to={item.to}
								activeOptions={{ exact: item.exact }}
								className="flex min-h-14 flex-col items-center justify-center gap-0.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors [&.active]:text-primary"
								aria-label={item.label}
							>
								<Icon className="size-5" />
								{item.label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

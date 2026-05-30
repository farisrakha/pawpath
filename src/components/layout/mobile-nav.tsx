import { Link } from "@tanstack/react-router";
import {
	ClipboardList,
	Home,
	type LucideIcon,
	User as UserIcon,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

interface NavItemDef {
	to: string;
	tKey: string;
	icon: LucideIcon;
	exact?: boolean;
}

const ITEM_DEFS: NavItemDef[] = [
	{ to: "/jelajahi", tKey: "nav.browse", icon: Home, exact: true },
	{ to: "/my-applications", tKey: "nav.myApplications", icon: ClipboardList },
	{ to: "/account", tKey: "nav.account", icon: UserIcon },
];

export function MobileNav() {
	const { t } = useLanguage();

	return (
		<nav
			className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden"
			aria-label="Navigasi utama"
		>
			<ul className="mx-auto flex max-w-md items-stretch justify-around">
				{ITEM_DEFS.map((item) => {
					const Icon = item.icon;
					const label = t(item.tKey);
					return (
						<li key={item.to} className="flex-1">
							<Link
								to={item.to}
								activeOptions={{ exact: item.exact }}
								className="flex min-h-14 flex-col items-center justify-center gap-0.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors [&.active]:text-primary"
								aria-label={label}
							>
								<Icon className="size-5" aria-hidden="true" />
								{label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

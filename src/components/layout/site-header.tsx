import { Link } from "@tanstack/react-router";
import {
	ClipboardList,
	LayoutDashboard,
	LogOut,
	Menu,
	PawPrint,
	User as UserIcon,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";

const NAV_LINK_DEFS = [
	{ to: "/jelajahi", tKey: "nav.browse" },
	{ to: "/my-applications", tKey: "nav.myApplications" },
] as const;

function Wordmark() {
	return (
		<Link
			to="/"
			className="flex items-center gap-1.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
		>
			<PawPrint className="size-6 text-primary" aria-hidden="true" />
			<span className="font-display text-xl font-bold tracking-tight text-primary">
				PawPath
			</span>
		</Link>
	);
}

function AccountAffordance() {
	const { isAuthenticated, user, logout } = useAuth();
	const { t } = useLanguage();

	if (!isAuthenticated || !user) {
		return (
			<Button
				variant="outline"
				size="lg"
				className="h-10"
				render={<Link to="/login" />}
			>
				<UserIcon className="size-4" />
				<span className="hidden sm:inline">{t("nav.login")}</span>
			</Button>
		);
	}

	const initials = user.displayName
		.split(" ")
		.filter((p) => p.length > 0)
		.map((p) => p[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	const isDashboardUser =
		user.role === "shelter_admin" || user.role === "private_lister";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="ghost"
						size="icon-lg"
						className="rounded-full"
						aria-label="Menu akun"
					>
						<Avatar className="size-9">
							<AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-semibold">
								{initials}
							</AvatarFallback>
						</Avatar>
					</Button>
				}
			/>
			<DropdownMenuContent align="end" className="w-52">
				<DropdownMenuLabel className="truncate">
					{user.displayName}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem render={<Link to="/account" />}>
					Akun saya
				</DropdownMenuItem>
				<DropdownMenuItem render={<Link to="/my-applications" />}>
					<ClipboardList className="size-4" />
					{t("nav.myApplications")}
				</DropdownMenuItem>
				{isDashboardUser ? (
					<DropdownMenuItem render={<Link to="/dashboard" />}>
						<LayoutDashboard className="size-4" />
						{t("nav.dashboard")}
					</DropdownMenuItem>
				) : null}
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => logout()}>
					<LogOut className="size-4" />
					{t("nav.logout")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function MobileMenu() {
	const [open, setOpen] = useState(false);
	const { t } = useLanguage();

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger
				render={
					<Button
						variant="ghost"
						size="icon-lg"
						className="md:hidden"
						aria-label="Buka menu"
					>
						<Menu className="size-5" />
					</Button>
				}
			/>
			<SheetContent side="left" className="w-72">
				<SheetHeader>
					<SheetTitle>
						<Wordmark />
					</SheetTitle>
				</SheetHeader>
				<nav className="flex flex-col gap-1 px-4">
					{NAV_LINK_DEFS.map((link) => (
						<SheetClose
							key={link.to}
							render={
								<Link
									to={link.to}
									activeOptions={{
										exact: "exact" in link ? link.exact : false,
									}}
									className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted [&.active]:text-primary"
								/>
							}
						>
							{t(link.tKey)}
						</SheetClose>
					))}
				</nav>
				<div className="mt-4 px-4">
					<LanguageToggle />
				</div>
			</SheetContent>
		</Sheet>
	);
}

export function SiteHeader() {
	const { t } = useLanguage();

	return (
		<header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
			<div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
				<MobileMenu />
				<Wordmark />

				<nav className="ml-4 hidden items-center gap-1 md:flex">
					{NAV_LINK_DEFS.map((link) => (
						<Link
							key={link.to}
							to={link.to}
							activeOptions={{ exact: "exact" in link ? link.exact : false }}
							className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&.active]:text-primary"
						>
							{t(link.tKey)}
						</Link>
					))}
				</nav>

				<div className="ml-auto flex items-center gap-2">
					<div className="hidden md:flex">
						<LanguageToggle />
					</div>
					<AccountAffordance />
				</div>
			</div>
		</header>
	);
}

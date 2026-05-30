import { Link } from "@tanstack/react-router";
import { PawPrint } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

const ADOPT_LINK_DEFS = [
	{ to: "/jelajahi", tKey: "footer.browse" },
	{ to: "/my-applications", tKey: "footer.myApps" },
	{ to: "/dashboard", tKey: "footer.shelterDash" },
] as const;

const ACCOUNT_LINK_DEFS = [
	{ to: "/account", tKey: "footer.myAccount" },
	{ to: "/login", tKey: "footer.login" },
	{ to: "/register", tKey: "footer.register" },
] as const;

export function SiteFooter() {
	const { t } = useLanguage();

	return (
		<footer className="border-t border-border bg-muted/40">
			<div className="mx-auto max-w-7xl px-4 py-12">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div className="lg:col-span-2">
						<div className="flex items-center gap-1.5">
							<PawPrint className="size-6 text-primary" aria-hidden="true" />
							<span className="font-display text-xl font-bold text-primary">
								PawPath
							</span>
						</div>
						<p className="mt-3 max-w-sm text-sm text-muted-foreground">
							{t("footer.tagline")}
						</p>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-foreground">
							{t("footer.adopt")}
						</h3>
						<ul className="mt-3 space-y-2">
							{ADOPT_LINK_DEFS.map((link) => (
								<li key={link.to}>
									<Link
										to={link.to}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{t(link.tKey)}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-foreground">
							{t("footer.account")}
						</h3>
						<ul className="mt-3 space-y-2">
							{ACCOUNT_LINK_DEFS.map((link) => (
								<li key={link.to}>
									<Link
										to={link.to}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{t(link.tKey)}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-10 border-t border-border pt-6">
					<p className="text-xs text-muted-foreground">
						&copy; {new Date().getFullYear()} PawPath. {t("footer.copyright")}
					</p>
				</div>
			</div>
		</footer>
	);
}

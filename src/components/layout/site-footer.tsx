import { Link } from "@tanstack/react-router";
import { PawPrint } from "lucide-react";

const ADOPT_LINKS = [
	{ to: "/jelajahi", label: "Jelajahi hewan" },
	{ to: "/my-applications", label: "Lamaranku" },
	{ to: "/dashboard", label: "Dashboard shelter" },
] as const;

const ACCOUNT_LINKS = [
	{ to: "/account", label: "Akun saya" },
	{ to: "/login", label: "Masuk" },
	{ to: "/register", label: "Daftar" },
] as const;

export function SiteFooter() {
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
							Marketplace adopsi anjing dan kucing di Jabodetabek. Temukan hewan
							yang membutuhkan rumah baru dan ajukan lamaran dengan mudah.
						</p>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-foreground">Adopsi</h3>
						<ul className="mt-3 space-y-2">
							{ADOPT_LINKS.map((link) => (
								<li key={link.label}>
									<Link
										to={link.to}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-foreground">Akun</h3>
						<ul className="mt-3 space-y-2">
							{ACCOUNT_LINKS.map((link) => (
								<li key={link.label}>
									<Link
										to={link.to}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="mt-10 border-t border-border pt-6">
					<p className="text-xs text-muted-foreground">
						&copy; {new Date().getFullYear()} PawPath. Prototipe untuk tujuan
						peragaan. Layanan mencakup Jabodetabek.
					</p>
				</div>
			</div>
		</footer>
	);
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ClipboardList, LogOut } from "lucide-react";
import { toast } from "sonner";

import { AuthGate } from "@/components/account/auth-gate";
import { ProfileDetails } from "@/components/account/profile-details";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";

export const Route = createFileRoute("/account/")({ component: AccountPage });

function AccountInner() {
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	if (!user) return null;

	const initials = user.displayName
		.split(" ")
		.map((p) => p[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();

	const handleLogout = () => {
		logout();
		toast.success("Kamu telah keluar.");
		navigate({ to: "/" });
	};

	const roleLabel: Record<string, string> = {
		adopter: "Adopter",
		shelter_admin: "Admin Shelter",
		private_lister: "Penitip Mandiri",
	};

	return (
		<div className="py-8">
			<header className="mb-8 flex flex-wrap items-center justify-between gap-4">
				<div className="flex items-center gap-4">
					<span className="flex size-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
						{initials}
					</span>
					<div>
						<h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
							{user.displayName}
						</h1>
						<p className="text-sm text-muted-foreground">{user.email}</p>
						<span className="mt-1 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
							{roleLabel[user.role] ?? user.role}
						</span>
					</div>
				</div>
				<Button variant="outline" size="lg" onClick={handleLogout}>
					<LogOut className="size-4" />
					Keluar
				</Button>
			</header>

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="flex flex-col gap-6 lg:col-span-2">
					<section className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10 md:p-6">
						<h2 className="font-display mb-4 text-lg font-semibold text-foreground">
							Informasi akun
						</h2>
						<ProfileDetails />
					</section>
				</div>

				<div className="flex flex-col gap-3">
					<Link
						to="/my-applications"
						className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-muted/50"
					>
						<span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
							<ClipboardList className="size-5" aria-hidden="true" />
						</span>
						<span className="min-w-0 flex-1">
							<span className="block font-medium text-foreground">
								Lamaran adopsi
							</span>
							<span className="block text-sm text-muted-foreground">
								Pantau status semua lamaranmu
							</span>
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
}

function AccountPage() {
	return (
		<AuthGate
			title="Masuk untuk melihat akunmu"
			description="Kelola profil dan pantau lamaran adopsimu setelah masuk."
		>
			<AccountInner />
		</AuthGate>
	);
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	CheckCircle2,
	ClipboardList,
	Handshake,
	Hourglass,
	PawPrint,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApplications, useAuth } from "@/context";
import {
	type Application,
	type ApplicationStatus,
	listers,
	pets,
} from "@/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/")({
	component: DashboardPage,
});

// ── Config ────────────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<ApplicationStatus, string> = {
	submitted: "Terkirim",
	under_review: "Sedang ditinjau",
	meet_greet: "Meet & Greet",
	approved: "Disetujui",
	adopted: "Diadopsi",
	rejected: "Ditolak",
	withdrawn: "Dicabut",
};

const STATUS_COLOR: Record<ApplicationStatus, string> = {
	submitted: "bg-muted text-muted-foreground",
	under_review: "bg-primary/10 text-primary",
	meet_greet: "bg-status-warning-bg text-status-warning-fg",
	approved: "bg-status-success-bg text-status-success-fg",
	adopted: "bg-status-success-bg text-status-success-fg",
	rejected: "bg-destructive/10 text-destructive",
	withdrawn: "bg-muted text-muted-foreground",
};

type NextAction = {
	label: string;
	next: ApplicationStatus;
	variant?: "default" | "outline" | "destructive";
};

const NEXT_ACTIONS: Partial<Record<ApplicationStatus, NextAction[]>> = {
	submitted: [
		{ label: "Tinjau", next: "under_review" },
		{ label: "Tolak", next: "rejected", variant: "destructive" },
	],
	under_review: [
		{ label: "Undang Meet & Greet", next: "meet_greet" },
		{ label: "Tolak", next: "rejected", variant: "destructive" },
	],
	meet_greet: [
		{ label: "Setujui adopsi", next: "approved" },
		{ label: "Tolak", next: "rejected", variant: "destructive" },
	],
	approved: [{ label: "Tandai diadopsi", next: "adopted" }],
};

const TAB_STATUSES: Record<string, ApplicationStatus[] | null> = {
	semua: null,
	menunggu: ["submitted", "under_review"],
	"meet-greet": ["meet_greet"],
	disetujui: ["approved", "adopted"],
};

function formatDate(iso: string): string {
	return new Intl.DateTimeFormat("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric",
	}).format(new Date(iso));
}

// ── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({
	icon: Icon,
	label,
	value,
	accent,
	index,
}: {
	icon: React.ElementType;
	label: string;
	value: number;
	accent?: string;
	index: number;
}) {
	return (
		<div
			className="rounded-2xl border border-border bg-card p-4 md:p-5"
			style={{
				animationName: "pawFadeUp",
				animationDuration: "0.4s",
				animationFillMode: "both",
				animationTimingFunction: "ease",
				animationDelay: `${index * 60}ms`,
			}}
		>
			<div
				className={cn(
					"mb-3 inline-flex size-9 items-center justify-center rounded-xl",
					accent ?? "bg-muted text-muted-foreground",
				)}
			>
				<Icon className="size-4" />
			</div>
			<p className="text-2xl font-bold tracking-tight text-foreground">
				{value}
			</p>
			<p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
		</div>
	);
}

// ── Application row ───────────────────────────────────────────────────────────

function AppRow({ app, index }: { app: Application; index: number }) {
	const { updateApplicationStatus } = useApplications();

	const pet = pets.find((p) => p.id === app.petId);
	const actions = NEXT_ACTIONS[app.status] ?? [];

	return (
		<div
			className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm md:flex-row md:items-center md:gap-5"
			style={{
				animationName: "pawFadeUp",
				animationDuration: "0.35s",
				animationFillMode: "both",
				animationTimingFunction: "ease",
				animationDelay: `${index * 45}ms`,
			}}
		>
			{/* Pet photo + info */}
			<div className="flex min-w-0 flex-1 items-center gap-3">
				{pet ? (
					<div className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
						<img
							src={pet.photos[0]}
							alt={pet.name}
							className="size-full object-cover"
							loading="lazy"
						/>
					</div>
				) : null}
				<div className="min-w-0">
					<p className="truncate font-semibold text-foreground">
						{pet?.name ?? app.petId}
					</p>
					<p className="text-xs text-muted-foreground">
						{pet?.breed} · {formatDate(app.createdAt)}
					</p>
				</div>
			</div>

			{/* Applicant */}
			<div className="hidden w-36 min-w-0 md:block">
				<p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
					Pelamar
				</p>
				<p className="truncate text-sm font-medium text-foreground">
					{app.applicantId === "user-demo" ? "Demo Adopter" : app.applicantId}
				</p>
			</div>

			{/* Status badge */}
			<span
				className={cn(
					"shrink-0 self-start rounded-full px-2.5 py-0.5 text-xs font-semibold md:self-auto",
					STATUS_COLOR[app.status],
				)}
			>
				{STATUS_LABEL[app.status]}
			</span>

			{/* Actions */}
			{actions.length > 0 ? (
				<div className="flex shrink-0 flex-wrap gap-2">
					{actions.map((action) => (
						<Button
							key={action.next}
							size="sm"
							variant={action.variant ?? "outline"}
							onClick={() => updateApplicationStatus(app.id, action.next)}
						>
							{action.label}
						</Button>
					))}
				</div>
			) : (
				<p className="shrink-0 text-xs text-muted-foreground">
					{app.status === "adopted" ||
					app.status === "rejected" ||
					app.status === "withdrawn"
						? "Selesai"
						: null}
				</p>
			)}
		</div>
	);
}

// ── Skeleton loader ───────────────────────────────────────────────────────────

function DashboardSkeleton() {
	return (
		<div className="py-8">
			{/* Header */}
			<div className="mb-8">
				<div className="h-9 w-44 animate-pulse rounded-lg bg-muted" />
				<div className="mt-2 h-4 w-56 animate-pulse rounded-md bg-muted" />
			</div>
			{/* Stat cards */}
			<div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
				{[...Array(4)].map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
					<div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
				))}
			</div>
			{/* Rows */}
			<div className="flex flex-col gap-3">
				{[...Array(3)].map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders
					<div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />
				))}
			</div>
		</div>
	);
}

// ── Page inner ────────────────────────────────────────────────────────────────

function DashboardInner() {
	const { user } = useAuth();
	const { applications } = useApplications();

	const lister = listers.find((l) => l.userId === user?.id);

	const myPetIds = pets
		.filter((p) => p.listerId === lister?.id)
		.map((p) => p.id);

	const myApps = applications.filter(
		(a) => myPetIds.includes(a.petId) && a.status !== "withdrawn",
	);

	const filterApps = (tab: string) => {
		const statuses = TAB_STATUSES[tab];
		if (!statuses) return myApps;
		return myApps.filter((a) => statuses.includes(a.status));
	};

	const pendingCount = myApps.filter(
		(a) => a.status === "submitted" || a.status === "under_review",
	).length;

	const meetGreetCount = myApps.filter((a) => a.status === "meet_greet").length;
	const adoptedCount = myApps.filter((a) => a.status === "adopted").length;

	if (!lister) {
		return (
			<div className="py-20 text-center">
				<p className="font-display text-xl font-semibold text-foreground">
					Profil lister tidak ditemukan
				</p>
				<p className="mt-2 text-sm text-muted-foreground">
					Akunmu belum terdaftar sebagai shelter atau penitip.
				</p>
				<Button className="mt-6" render={<Link to="/" />}>
					Kembali ke beranda
				</Button>
			</div>
		);
	}

	return (
		<div
			className="py-8"
			style={{ animation: "pawFadeIn 0.3s ease both" } as React.CSSProperties}
		>
			{/* Header */}
			<div className="mb-8 flex flex-wrap items-start justify-between gap-4">
				<div>
					<h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
						Dashboard
					</h1>
					<p className="mt-1 text-muted-foreground">{lister.displayName}</p>
				</div>
				{pendingCount > 0 ? (
					<span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
						{pendingCount} perlu ditinjau
					</span>
				) : null}
			</div>

			{/* Stat cards */}
			<div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
				<StatCard
					icon={ClipboardList}
					label="Total lamaran"
					value={myApps.length}
					accent="bg-muted text-foreground"
					index={0}
				/>
				<StatCard
					icon={Hourglass}
					label="Perlu ditinjau"
					value={pendingCount}
					accent="bg-primary/10 text-primary"
					index={1}
				/>
				<StatCard
					icon={Handshake}
					label="Meet & Greet"
					value={meetGreetCount}
					accent="bg-status-warning-bg text-status-warning-fg"
					index={2}
				/>
				<StatCard
					icon={CheckCircle2}
					label="Berhasil diadopsi"
					value={adoptedCount}
					accent="bg-status-success-bg text-status-success-fg"
					index={3}
				/>
			</div>

			{/* Pet chips */}
			<section className="mb-8">
				<h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
					Hewanmu ({myPetIds.length})
				</h2>
				<div className="flex flex-wrap gap-2.5">
					{pets
						.filter((p) => p.listerId === lister.id)
						.map((pet) => {
							const appCount = applications.filter(
								(a) => a.petId === pet.id && a.status !== "withdrawn",
							).length;
							return (
								<Link
									key={pet.id}
									to="/pets/$petId"
									params={{ petId: pet.id }}
									className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2 text-sm transition-colors hover:border-primary/40"
								>
									<div className="size-8 shrink-0 overflow-hidden rounded-lg bg-muted">
										<img
											src={pet.photos[0]}
											alt={pet.name}
											className="size-full object-cover"
											loading="lazy"
										/>
									</div>
									<div>
										<span className="block font-medium text-foreground">
											{pet.name}
										</span>
										<span className="block text-xs text-muted-foreground">
											{appCount} lamaran
										</span>
									</div>
									{pet.status === "adopted" ? (
										<PawPrint className="size-3.5 shrink-0 text-green-600" />
									) : null}
								</Link>
							);
						})}
				</div>
			</section>

			{/* Inbox tabs */}
			<Tabs defaultValue="semua">
				<TabsList className="mb-4">
					<TabsTrigger value="semua">
						Semua
						{myApps.length > 0 ? (
							<span className="ml-1.5 rounded-full bg-muted px-1.5 text-xs">
								{myApps.length}
							</span>
						) : null}
					</TabsTrigger>
					<TabsTrigger value="menunggu">
						Menunggu
						{pendingCount > 0 ? (
							<span className="ml-1.5 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
								{pendingCount}
							</span>
						) : null}
					</TabsTrigger>
					<TabsTrigger value="meet-greet">Meet &amp; Greet</TabsTrigger>
					<TabsTrigger value="disetujui">Disetujui</TabsTrigger>
				</TabsList>

				{Object.keys(TAB_STATUSES).map((tab) => {
					const tabApps = filterApps(tab);
					return (
						<TabsContent key={tab} value={tab}>
							{tabApps.length === 0 ? (
								<div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center">
									<p className="text-sm text-muted-foreground">
										Tidak ada lamaran di kategori ini.
									</p>
								</div>
							) : (
								<div className="flex flex-col gap-3">
									{tabApps.map((app, idx) => (
										<AppRow key={app.id} app={app} index={idx} />
									))}
								</div>
							)}
						</TabsContent>
					);
				})}
			</Tabs>
		</div>
	);
}

// ── Page ──────────────────────────────────────────────────────────────────────

function DashboardPage() {
	const { user, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <DashboardSkeleton />;

	if (
		!isAuthenticated ||
		(user?.role !== "shelter_admin" && user?.role !== "private_lister")
	) {
		navigate({ to: "/" });
		return null;
	}

	return <DashboardInner />;
}

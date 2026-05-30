import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowRight,
	CheckCircle2,
	ChevronDown,
	Circle,
	XCircle,
} from "lucide-react";
import { useState } from "react";

import { AuthGate } from "@/components/account/auth-gate";
import { WhatsAppCta } from "@/components/common/whatsapp-cta";
import { Button } from "@/components/ui/button";
import { useApplications } from "@/context";
import { useLanguage } from "@/context/LanguageContext";
import { type Application, listers, pets } from "@/data";
import { formatDateID } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my-applications/")({
	component: MyApplicationsPage,
});

// ── Status config ─────────────────────────────────────────────────────────────

type StatusConfig = {
	badge: string;
	icon: "check" | "circle" | "x";
};

const STATUS_CONFIG: Record<string, StatusConfig> = {
	submitted: { badge: "bg-muted text-muted-foreground", icon: "circle" },
	under_review: { badge: "bg-primary/10 text-primary", icon: "circle" },
	meet_greet: {
		badge: "bg-status-warning-bg text-status-warning-fg",
		icon: "check",
	},
	approved: {
		badge: "bg-status-success-bg text-status-success-fg",
		icon: "check",
	},
	adopted: {
		badge: "bg-status-success-bg text-status-success-fg",
		icon: "check",
	},
	rejected: { badge: "bg-destructive/10 text-destructive", icon: "x" },
	withdrawn: { badge: "bg-muted text-muted-foreground", icon: "x" },
};

// ── Application card ──────────────────────────────────────────────────────────

function ApplicationCard({ app }: { app: Application }) {
	const [expanded, setExpanded] = useState(false);
	const [confirmWithdraw, setConfirmWithdraw] = useState(false);
	const { withdrawApplication } = useApplications();
	const { t } = useLanguage();

	const pet = pets.find((p) => p.id === app.petId);
	const lister = pet ? listers.find((l) => l.id === pet.listerId) : null;
	const config = STATUS_CONFIG[app.status] ?? STATUS_CONFIG.submitted;

	const canWithdraw =
		app.status === "submitted" || app.status === "under_review";
	const showWa = app.status === "meet_greet" && lister;

	const latestNote = app.statusLog[app.statusLog.length - 1]?.note;

	return (
		<article className="overflow-hidden rounded-2xl border border-border bg-card">
			{/* Card body */}
			<div className="flex items-start gap-4 p-4 md:p-5">
				{/* Pet photo */}
				{pet ? (
					<div className="size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
						<img
							src={pet.photos[0]}
							alt={pet.name}
							className="size-full object-cover"
							loading="lazy"
							onError={(e) => {
								e.currentTarget.onerror = null;
								e.currentTarget.src = "/images/placeholder.svg";
							}}
						/>
					</div>
				) : null}

				<div className="min-w-0 flex-1">
					<div className="flex flex-wrap items-start justify-between gap-2">
						<div>
							<p className="font-semibold text-foreground">
								{pet?.name ?? app.petId}
							</p>
							<p className="mt-0.5 text-sm text-muted-foreground">
								{pet?.breed}
								{lister ? ` · ${lister.displayName}` : null}
							</p>
						</div>
						<span
							className={cn(
								"shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold",
								config.badge,
							)}
						>
							{t(`status.${app.status}`)}
						</span>
					</div>

					<p className="mt-2 text-xs text-muted-foreground">
						{t("myapp.sentOn")} {formatDateID(app.createdAt)}
					</p>

					{/* Latest note */}
					{latestNote ? (
						<p className="mt-2.5 rounded-lg bg-muted/60 px-3 py-2 text-xs leading-relaxed text-foreground">
							{latestNote}
						</p>
					) : null}
				</div>
			</div>

			{/* Actions bar */}
			<div className="flex flex-wrap items-center gap-2 border-t border-border px-4 py-3">
				<button
					type="button"
					aria-expanded={expanded}
					aria-controls={`status-history-${app.id}`}
					onClick={() => setExpanded((v) => !v)}
					className="flex min-h-11 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
				>
					<ChevronDown
						className={cn(
							"size-4 transition-transform duration-200",
							expanded && "rotate-180",
						)}
					/>
					{t("myapp.statusHistory")}
				</button>

				<div className="ml-auto flex flex-wrap gap-2">
					{pet ? (
						<Button
							variant="outline"
							size="sm"
							render={<Link to="/pets/$petId" params={{ petId: pet.id }} />}
						>
							{t("myapp.viewProfile")}
						</Button>
					) : null}

					{showWa ? (
						<WhatsAppCta phone={lister.waNumber} label="WhatsApp" size="sm" />
					) : null}

					{canWithdraw ? (
						confirmWithdraw ? (
							<div className="flex items-center gap-1.5">
								<span className="text-xs text-muted-foreground">
									{t("myapp.withdrawConfirm")}
								</span>
								<Button
									variant="ghost"
									size="sm"
									className="text-destructive hover:bg-destructive/5 hover:text-destructive"
									onClick={() => withdrawApplication(app.id)}
								>
									{t("myapp.withdrawYes")}
								</Button>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setConfirmWithdraw(false)}
								>
									{t("common.cancel")}
								</Button>
							</div>
						) : (
							<Button
								variant="ghost"
								size="sm"
								className="text-destructive hover:bg-destructive/5 hover:text-destructive"
								onClick={() => setConfirmWithdraw(true)}
							>
								{t("myapp.withdrawBtn")}
							</Button>
						)
					) : null}
				</div>
			</div>

			{/* Status timeline */}
			<div
				id={`status-history-${app.id}`}
				hidden={!expanded}
				className="border-t border-border bg-muted/30 px-4 py-4 md:px-5"
			>
				<p className="label-eyebrow mb-3 text-muted-foreground">
					{t("myapp.history")}
				</p>
				<ol className="flex flex-col gap-3.5">
					{[...app.statusLog].reverse().map((entry, idx) => {
						const cfg = STATUS_CONFIG[entry.status];
						const isLatest = idx === 0;
						return (
							<li
								key={`${entry.status}-${entry.timestamp}`}
								className="flex gap-3"
							>
								<span className="mt-0.5 shrink-0">
									{entry.status === "rejected" ||
									entry.status === "withdrawn" ? (
										<XCircle className="size-4 text-destructive" />
									) : isLatest ? (
										<CheckCircle2 className="size-4 text-primary" />
									) : (
										<Circle className="size-4 text-muted-foreground/40" />
									)}
								</span>
								<div className="min-w-0">
									<p className="text-sm font-medium text-foreground">
										{cfg ? t(`status.${entry.status}`) : entry.status}
									</p>
									<p className="text-xs text-muted-foreground">
										{formatDateID(entry.timestamp)}
									</p>
									{entry.note ? (
										<p className="mt-1 text-xs leading-relaxed text-muted-foreground">
											{entry.note}
										</p>
									) : null}
								</div>
							</li>
						);
					})}
				</ol>
			</div>
		</article>
	);
}

// ── Page ──────────────────────────────────────────────────────────────────────

function MyApplicationsInner() {
	const { getMyApplications } = useApplications();
	const { t } = useLanguage();
	const apps = getMyApplications();

	const active = apps.filter(
		(a) =>
			a.status !== "adopted" &&
			a.status !== "rejected" &&
			a.status !== "withdrawn",
	);
	const closed = apps.filter(
		(a) =>
			a.status === "adopted" ||
			a.status === "rejected" ||
			a.status === "withdrawn",
	);

	if (apps.length === 0) {
		return (
			<div className="py-20 text-center">
				<p className="font-display text-2xl font-bold text-foreground">
					{t("myapp.empty")}
				</p>
				<p className="mt-3 text-sm text-muted-foreground">
					{t("myapp.emptyHint")}
				</p>
				<Button className="mt-6 gap-2" render={<Link to="/jelajahi" />}>
					{t("myapp.browseCTA")}
					<ArrowRight className="size-4" />
				</Button>
			</div>
		);
	}

	return (
		<div className="py-8">
			<header className="mb-8">
				<h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
					{t("myapp.title")}
				</h1>
				<p className="mt-2 text-muted-foreground">{t("myapp.subtitle")}</p>
			</header>

			{active.length > 0 ? (
				<section className="mb-10">
					<h2 className="label-eyebrow mb-4 text-muted-foreground">
						{t("myapp.active")} ({active.length})
					</h2>
					<div className="flex flex-col gap-4">
						{active.map((app) => (
							<ApplicationCard key={app.id} app={app} />
						))}
					</div>
				</section>
			) : null}

			{closed.length > 0 ? (
				<section>
					<h2 className="label-eyebrow mb-4 text-muted-foreground">
						{t("myapp.closed")} ({closed.length})
					</h2>
					<div className="flex flex-col gap-4 opacity-70">
						{closed.map((app) => (
							<ApplicationCard key={app.id} app={app} />
						))}
					</div>
				</section>
			) : null}
		</div>
	);
}

function MyApplicationsPage() {
	const { t } = useLanguage();

	return (
		<div className="mx-auto max-w-4xl px-4">
			<AuthGate title={t("myapp.authTitle")} description={t("myapp.authDesc")}>
				<MyApplicationsInner />
			</AuthGate>
		</div>
	);
}

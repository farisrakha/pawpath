import {
	createFileRoute,
	Link,
	notFound,
	useNavigate,
} from "@tanstack/react-router";
import {
	ArrowLeft,
	CheckCircle2,
	Heart,
	MapPin,
	ShieldCheck,
	XCircle,
} from "lucide-react";
import { useState } from "react";

import { WhatsAppCta } from "@/components/common/whatsapp-cta";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useApplications, useAuth } from "@/context";
import { useLanguage } from "@/context/LanguageContext";
import { listers, type PetListing, pets } from "@/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pets/$petId")({
	component: PetDetailPage,
});

// ── Helpers ────────────────────────────────────────────────────────────────────

function ageLabel(pet: PetListing, t: (key: string) => string): string {
	const { years, months } = pet.age;
	if (years === 0) return `${months} ${t("pet.age.months")}`;
	if (months === 0) return `${years} ${t("pet.age.years")}`;
	return `${years} ${t("pet.age.years")} ${months} ${t("pet.age.months")}`;
}

const STATUS_COLOR: Record<string, string> = {
	submitted: "bg-muted text-muted-foreground",
	under_review: "bg-primary/10 text-primary",
	meet_greet: "bg-status-warning-bg text-status-warning-fg",
	approved: "bg-status-success-bg text-status-success-fg",
	adopted: "bg-status-success-bg text-status-success-fg",
	rejected: "bg-destructive/10 text-destructive",
	withdrawn: "bg-muted text-muted-foreground",
};

const MEDICAL_KEYS: (keyof PetListing["medicalStatus"])[] = [
	"vaksinasi",
	"sterilisasi",
	"microchip",
	"obatCacing",
	"suratKesehatan",
];

// ── Page ──────────────────────────────────────────────────────────────────────

function PetDetailPage() {
	const { petId } = Route.useParams();
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const { getApplicationByPet } = useApplications();
	const { t } = useLanguage();

	const pet = pets.find((p) => p.id === petId);
	if (!pet) throw notFound();

	const lister = listers.find((l) => l.id === pet.listerId);
	const existingApp = getApplicationByPet(petId);
	const [photoIdx, setPhotoIdx] = useState(0);

	const isUnavailable = pet.status !== "active";

	const handleApply = () => {
		if (!isAuthenticated) {
			navigate({ to: "/login" });
			return;
		}
		navigate({ to: "/apply/$petId", params: { petId } });
	};

	return (
		<div
			className="mx-auto max-w-4xl px-4 py-6 md:py-10"
			style={{ animation: "pawFadeIn 0.35s ease both" } as React.CSSProperties}
		>
			{/* Back link */}
			<Link
				to="/jelajahi"
				className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft className="size-4" />
				{t("pet.backToList")}
			</Link>

			<div className="grid gap-10 lg:grid-cols-[56fr_44fr]">
				{/* ── Left: photos + story ── */}
				<div className="flex flex-col gap-7">
					{/* Main photo */}
					<div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted ring-1 ring-border">
						<img
							src={pet.photos[photoIdx]}
							alt={`${pet.name} foto ${photoIdx + 1}`}
							className="size-full object-cover transition-opacity duration-200"
							onError={(e) => {
								e.currentTarget.onerror = null;
								e.currentTarget.src = "/images/placeholder.svg";
							}}
						/>
					</div>

					{/* Thumbnails */}
					{pet.photos.length > 1 ? (
						<div className="flex gap-2.5 overflow-x-auto pb-1">
							{pet.photos.map((src, idx) => (
								<button
									key={src}
									type="button"
									onClick={() => setPhotoIdx(idx)}
									className={cn(
										"shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
										photoIdx === idx
											? "border-primary shadow-sm"
											: "border-transparent opacity-70 hover:border-border hover:opacity-100",
									)}
									aria-label={`Foto ${idx + 1}`}
									aria-pressed={photoIdx === idx}
								>
									<img
										src={src}
										alt=""
										className="h-16 w-24 object-cover"
										loading="lazy"
										onError={(e) => {
											e.currentTarget.onerror = null;
											e.currentTarget.src = "/images/placeholder.svg";
										}}
									/>
								</button>
							))}
						</div>
					) : null}

					{/* Story */}
					<section>
						<h2 className="font-display mb-3 text-xl font-bold text-foreground">
							{t("pet.story")} {pet.name}
						</h2>
						<p className="text-[0.92rem] leading-relaxed text-muted-foreground">
							{pet.story}
						</p>
					</section>

					{/* Known requirements */}
					{pet.knownRequirements ? (
						<div className="rounded-xl border border-status-warning-border bg-status-warning-bg/60 p-4">
							<p className="text-sm font-semibold text-status-warning-fg">
								{t("pet.requirements.label")}
							</p>
							<p className="mt-1 text-sm leading-relaxed text-status-warning-fg">
								{pet.knownRequirements}
							</p>
						</div>
					) : null}

					{/* Medical status */}
					<section>
						<h2 className="font-display mb-4 text-xl font-bold text-foreground">
							{t("pet.medicalStatus")}
						</h2>
						<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
							{MEDICAL_KEYS.map((key) => {
								const ok = pet.medicalStatus[key];
								return (
									<div
										key={key}
										className={cn(
											"flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm",
											ok
												? "border-status-success-border bg-status-success-bg text-status-success-fg"
												: "border-border bg-muted/40 text-muted-foreground",
										)}
									>
										{ok ? (
											<CheckCircle2 className="size-4 shrink-0 text-status-success-fg" />
										) : (
											<XCircle className="size-4 shrink-0 text-muted-foreground/50" />
										)}
										{t(`pet.medical.${key}`)}
									</div>
								);
							})}
						</div>
					</section>
				</div>

				{/* ── Right: info + CTA ── */}
				<div className="flex flex-col gap-5">
					{/* Pet info card */}
					<div className="rounded-2xl border border-border bg-card p-5 md:p-6">
						{/* Status badges */}
						<div className="mb-3 flex flex-wrap items-center gap-2">
							{pet.urgency === "urgent" ? (
								<span className="rounded-full bg-destructive px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-primary-foreground">
									{t("browse.urgentBadge")}
								</span>
							) : null}
							{isUnavailable ? (
								<span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
									{t("pet.adopted")}
								</span>
							) : null}
						</div>

						<h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
							{pet.name}
						</h1>
						<p className="mt-1 text-muted-foreground">
							{pet.breed} &middot;{" "}
							{pet.species === "cat"
								? t("pet.species.cat")
								: t("pet.species.dog")}
						</p>

						<Separator className="my-4" />

						{/* Vitals grid */}
						<dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
							<div>
								<dt className="label-eyebrow text-muted-foreground">
									{t("pet.vitals.age")}
								</dt>
								<dd className="mt-1 font-medium text-foreground">
									{ageLabel(pet, t)}
								</dd>
							</div>
							<div>
								<dt className="label-eyebrow text-muted-foreground">
									{t("pet.vitals.sex")}
								</dt>
								<dd className="mt-1 font-medium text-foreground">
									{pet.sex === "male" ? t("pet.sex.male") : t("pet.sex.female")}
								</dd>
							</div>
							<div>
								<dt className="label-eyebrow text-muted-foreground">
									{t("pet.vitals.size")}
								</dt>
								<dd className="mt-1 font-medium text-foreground">
									{t(`pet.size.${pet.size}`)}
								</dd>
							</div>
							<div>
								<dt className="label-eyebrow text-muted-foreground">
									{t("pet.vitals.location")}
								</dt>
								<dd className="mt-1 flex items-center gap-1 font-medium text-foreground">
									<MapPin className="size-3.5 text-muted-foreground" />
									{pet.locationDistrict}
								</dd>
							</div>
						</dl>

						{/* Temperament tags */}
						{pet.temperamentTags.length > 0 ? (
							<>
								<Separator className="my-4" />
								<div>
									<p className="label-eyebrow mb-2.5 text-muted-foreground">
										{t("pet.temperament")}
									</p>
									<div className="flex flex-wrap gap-1.5">
										{pet.temperamentTags.map((tag) => (
											<span
												key={tag}
												className="rounded-full border border-secondary bg-secondary/80 px-3 py-1 text-xs font-medium text-secondary-foreground"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</>
						) : null}

						<Separator className="my-4" />

						{/* CTA */}
						{existingApp ? (
							<div className="rounded-xl bg-muted/60 p-4">
								<p className="text-sm font-semibold text-foreground">
									{t("pet.existingApp")}
								</p>
								<span
									className={cn(
										"mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold",
										STATUS_COLOR[existingApp.status] ??
											"bg-muted text-muted-foreground",
									)}
								>
									{t(`status.${existingApp.status}`)}
								</span>
								<Button
									variant="outline"
									size="lg"
									className="mt-3 w-full"
									render={<Link to="/my-applications" />}
								>
									{t("pet.viewApp")}
								</Button>
							</div>
						) : isUnavailable ? (
							<p className="text-center text-sm text-muted-foreground">
								{t("pet.unavailable")}
							</p>
						) : (
							<div className="flex flex-col gap-2">
								<Button size="lg" className="w-full" onClick={handleApply}>
									<Heart className="size-4" />
									{t("pet.applyButton")}
								</Button>
								{!isAuthenticated ? (
									<p className="text-center text-xs text-muted-foreground">
										{t("pet.loginHint")}
									</p>
								) : null}
							</div>
						)}
					</div>

					{/* Lister card */}
					{lister ? (
						<div className="overflow-hidden rounded-2xl border border-border bg-card">
							{/* Verified top bar */}
							{lister.verificationStatus === "verified" ? (
								<div
									className={cn(
										"flex items-center gap-2 px-5 py-3 text-xs font-semibold",
										lister.type === "shelter"
											? "border-b border-border bg-status-info-bg text-status-info-fg"
											: "border-b border-border bg-status-warning-bg/60 text-status-warning-fg",
									)}
								>
									<ShieldCheck className="size-4" />
									{lister.type === "shelter"
										? t("pet.listerCard.shelter")
										: t("pet.listerCard.private")}
								</div>
							) : null}

							<div className="p-5">
								<p className="label-eyebrow mb-3 text-muted-foreground">
									{t("pet.listerCard.by")}
								</p>

								<p className="font-semibold text-foreground">
									{lister.displayName}
								</p>
								<p className="mt-0.5 text-xs text-muted-foreground">
									{lister.type === "shelter"
										? t("pet.listerCard.shelterLabel")
										: t("pet.listerCard.privateLabel")}
									{lister.type === "shelter" && lister.adoptionCount > 0
										? ` · ${lister.adoptionCount} ${t("pet.listerCard.adoptions")}`
										: null}
								</p>

								<p className="mt-3 line-clamp-4 text-[0.85rem] leading-relaxed text-muted-foreground">
									{lister.type === "private" && lister.rehomingStory
										? lister.rehomingStory
										: lister.bio}
								</p>

								{lister.type === "shelter" ? (
									<WhatsAppCta
										phone={lister.waNumber}
										label={t("pet.listerCard.contactShelter")}
										className="mt-4"
									/>
								) : null}

								{/* Private: WA hidden message */}
								{lister.type === "private" && !existingApp ? (
									<p className="mt-4 rounded-lg bg-muted/60 px-3 py-2.5 text-xs text-muted-foreground">
										{t("pet.listerCard.privateHint")}
									</p>
								) : null}

								{/* Private: WA revealed at meet_greet */}
								{lister.type === "private" &&
								existingApp?.status === "meet_greet" ? (
									<WhatsAppCta
										phone={lister.waNumber}
										label={t("pet.listerCard.contactPrivate")}
										className="mt-4"
									/>
								) : null}
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

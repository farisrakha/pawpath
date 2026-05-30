import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle, Heart, PawPrint, ShieldCheck } from "lucide-react";
import { Fragment } from "react";

import { useLanguage } from "@/context/LanguageContext";
import { pets } from "@/data";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: LandingPage });

// ── Shared primitives ─────────────────────────────────────────────────────────

function TwoToneHeading({
	line1,
	line2,
	className,
	as: Tag = "h2",
}: {
	line1: string;
	line2: string;
	className?: string;
	as?: "h1" | "h2";
}) {
	return (
		<Tag
			className={cn(
				"font-jakarta text-3xl font-bold uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl",
				className,
			)}
		>
			<span className="text-foreground">{line1}</span>
			<br />
			<span className="text-primary">{line2}</span>
		</Tag>
	);
}

// ── Section 01: Hero ──────────────────────────────────────────────────────────

function HeroSection() {
	const { t } = useLanguage();

	return (
		<section className="w-full py-16">
			<div className="mx-auto max-w-6xl px-6">
				{/* Mobile: photo on top */}
				<div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl lg:hidden">
					<img
						src="/images/pets/miko-1.webp"
						alt="Anjing tersedia untuk adopsi"
						className="h-full w-full object-cover object-top"
						loading="eager"
						onError={(e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.src = "/images/placeholder.svg";
						}}
					/>
				</div>

				<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
					{/* Left */}
					<div className="flex flex-col gap-6">
						{/* Headline */}
						<h1 className="font-jakarta text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
							{t("landing.hero.line1")}
							<br />
							<em className="italic text-primary">{t("landing.hero.line2")}</em>
						</h1>

						{/* Sub */}
						<p className="max-w-sm text-base leading-relaxed text-muted-foreground">
							{t("landing.hero.sub")}
						</p>

						{/* CTAs */}
						<div className="flex flex-col items-start gap-2">
							<Link
								to="/jelajahi"
								onClick={() =>
									track("landing_cta_click", { cta: "hero_primary" })
								}
								className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.97]"
							>
								{t("landing.hero.cta")}
							</Link>
							<Link
								to="/jelajahi"
								onClick={() =>
									track("landing_cta_click", { cta: "hero_secondary" })
								}
								className="text-sm text-primary transition-colors hover:text-primary/80"
							>
								{t("landing.hero.ctaSecondary")}
							</Link>
						</div>

						{/* Social proof badge */}
						<div>
							<div className="inline-flex items-center gap-2.5 rounded-full bg-card px-4 py-2.5 ring-1 ring-border/60">
								<div className="flex -space-x-1.5">
									{(
										["bg-primary/30", "bg-accent/30", "bg-wa-green/25"] as const
									).map((c) => (
										<div
											key={c}
											className={cn(
												"h-6 w-6 rounded-full ring-2 ring-white",
												c,
											)}
										/>
									))}
								</div>
								<span className="text-sm font-medium text-foreground">
									{t("landing.trust.stat1value")} {t("landing.hero.badge")}
								</span>
							</div>
						</div>
					</div>

					{/* Right: photo + floating overlay — desktop only */}
					<div className="relative hidden overflow-visible lg:block">
						{/* Main photo */}
						<img
							src="/images/pets/miko-1.webp"
							alt="Anjing tersedia untuk adopsi"
							className="h-[480px] w-full rounded-3xl object-cover object-top"
							loading="eager"
							onError={(e) => {
								e.currentTarget.onerror = null;
								e.currentTarget.src = "/images/placeholder.svg";
							}}
						/>

						{/* Honey accent square — peeks behind floating photo */}
						<div className="absolute -right-2 -top-2 h-44 w-44 rounded-2xl bg-accent/20" />

						{/* Floating cat photo — top-right corner */}
						<div className="absolute -right-5 -top-5 h-44 w-44 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
							<img
								src="/images/pets/oranye-1.webp"
								alt="Kucing tersedia untuk adopsi"
								className="h-full w-full object-cover object-top"
								loading="eager"
								onError={(e) => {
									e.currentTarget.onerror = null;
									e.currentTarget.src = "/images/placeholder.svg";
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ── Section 02: Trust bar ─────────────────────────────────────────────────────

function TrustBar() {
	const { t } = useLanguage();

	const stats = [
		{
			icon: PawPrint,
			value: t("landing.trust.stat1value"),
			label: t("landing.trust.stat1label"),
		},
		{
			icon: ShieldCheck,
			value: t("landing.trust.stat2value"),
			label: t("landing.trust.stat2label"),
		},
		{
			icon: Heart,
			value: t("landing.trust.stat3value"),
			label: t("landing.trust.stat3label"),
		},
	];

	return (
		<section className="relative z-10 -mt-8">
			<div className="mx-auto max-w-6xl px-6">
				<div className="rounded-2xl border border-border/40 bg-card px-4 py-5 sm:px-6 sm:py-8 md:px-10">
					<div className="flex divide-x divide-border/40">
						{stats.map(({ icon: Icon, value, label }) => (
							<div
								key={label}
								className="flex flex-1 flex-col items-center gap-1 px-4 md:px-8"
							>
								<Icon className="h-5 w-5 text-primary/60" />
								<p className="font-display text-xl font-bold text-primary sm:text-3xl">
									{value}
								</p>
								<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
									{label}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

// ── Section 03: How it works ──────────────────────────────────────────────────

const STEPS = [
	{
		num: "1",
		bg: "bg-primary/5",
		titleKey: "landing.steps.s1title",
		bodyKey: "landing.steps.s1body",
		tags: ["Gratis", "2 menit"],
	},
	{
		num: "2",
		bg: "bg-status-success-bg",
		titleKey: "landing.steps.s2title",
		bodyKey: "landing.steps.s2body",
		tags: ["Terverifikasi", "Jabodetabek"],
	},
	{
		num: "3",
		bg: "bg-accent/10",
		titleKey: "landing.steps.s3title",
		bodyKey: "landing.steps.s3body",
		tags: ["Via WhatsApp", "Tanpa biaya"],
	},
] as const;

function HowItWorksSection() {
	const { t } = useLanguage();

	return (
		<section className="w-full bg-white py-20">
			<div className="mx-auto max-w-6xl px-6">
				<div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<TwoToneHeading
							line1={t("landing.steps.headline1")}
							line2={t("landing.steps.headline2")}
						/>
					</div>
					<p className="max-w-xs text-sm leading-relaxed text-muted-foreground lg:text-right">
						{t("landing.steps.body")}
					</p>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
					{STEPS.map((step) => (
						<div
							key={step.num}
							className={cn(
								"flex flex-col rounded-2xl border border-border/40 p-6",
								step.bg,
							)}
						>
							<div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-sm font-semibold text-foreground shadow-sm border border-border/30 mb-4">
								{step.num}
							</div>
							<h3 className="mb-2 mt-3 text-lg font-bold text-foreground">
								{t(step.titleKey)}
							</h3>
							<p className="flex-1 text-sm leading-relaxed text-muted-foreground">
								{t(step.bodyKey)}
							</p>
							<div className="mt-4 flex flex-wrap gap-1.5">
								{step.tags.map((tag) => (
									<span
										key={tag}
										className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs text-muted-foreground"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="mt-10 text-center">
					<Link
						to="/jelajahi"
						onClick={() => track("landing_cta_click", { cta: "steps" })}
						className="inline-flex min-h-11 items-center justify-center rounded-lg border-2 border-primary px-8 py-3 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary/5 active:scale-[0.97]"
					>
						{t("landing.steps.cta")}
					</Link>
				</div>
			</div>
		</section>
	);
}

// ── Section 04: Featured animals ──────────────────────────────────────────────

const FEATURED_IDS = ["pet-001", "pet-006", "pet-003", "pet-005"] as const;

const PANEL_COLORS = [
	"bg-primary/10",
	"bg-accent/20",
	"bg-muted",
	"bg-status-success-bg",
] as const;

function FeaturedCard({
	petId,
	panelColor,
}: {
	petId: string;
	panelColor: string;
}) {
	const { t } = useLanguage();
	const pet = pets.find((p) => p.id === petId);
	if (!pet) return null;

	return (
		<Link
			to="/pets/$petId"
			params={{ petId: pet.id }}
			className="group block"
			onClick={() =>
				track("landing_cta_click", { cta: "featured_card", petId: pet.id })
			}
		>
			<div
				className={cn(
					"relative aspect-square overflow-hidden rounded-xl",
					panelColor,
				)}
			>
				<img
					src={pet.photos[0]}
					alt={pet.name}
					className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
					loading="lazy"
					onError={(e) => {
						e.currentTarget.onerror = null;
						e.currentTarget.src = "/images/placeholder.svg";
					}}
				/>
				{pet.urgency === "urgent" && (
					<div className="absolute right-3 top-3">
						<span className="rounded-full bg-destructive px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
							{t("browse.urgentBadge")}
						</span>
					</div>
				)}
				<div className="absolute bottom-3 left-3">
					<span className="rounded-full bg-black/35 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
						{pet.species === "cat"
							? t("browse.species.catCard")
							: t("browse.species.dogCard")}
					</span>
				</div>
			</div>
			<div className="mt-3 px-0.5">
				<p className="truncate font-semibold leading-tight text-foreground">
					{pet.name}
				</p>
				<p className="mt-0.5 truncate text-sm text-muted-foreground">
					{pet.breed}
				</p>
			</div>
		</Link>
	);
}

function FeaturedSection() {
	const { t } = useLanguage();

	return (
		<section className="w-full py-20">
			<div className="mx-auto max-w-6xl px-6">
				<div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
					<div>
						<TwoToneHeading
							line1={t("landing.featured.headline1")}
							line2={t("landing.featured.headline2")}
						/>
					</div>
					<Link
						to="/jelajahi"
						className="shrink-0 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						{t("landing.featured.viewAll")} →
					</Link>
				</div>

				<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
					{FEATURED_IDS.map((id, i) => (
						<FeaturedCard key={id} petId={id} panelColor={PANEL_COLORS[i]} />
					))}
				</div>
			</div>
		</section>
	);
}

// ── Section 05: Shelter promise ───────────────────────────────────────────────

const PROMISE_STATS = [
	{
		valueKey: "landing.trust.stat1value",
		labelKey: "landing.trust.stat1label",
	},
	{
		valueKey: "landing.trust.stat2value",
		labelKey: "landing.trust.stat2label",
	},
	{
		valueKey: "landing.trust.stat3value",
		labelKey: "landing.trust.stat3label",
	},
] as const;

const SHELTER_NAMES = [
	"Paws Rescue Jakarta",
	"Yayasan Sahabat Hewan Depok",
] as const;

function ShelterPromiseSection() {
	const { t } = useLanguage();

	return (
		<section className="w-full bg-white py-20">
			<div className="mx-auto max-w-6xl px-6">
				<div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
					{/* Photo mosaic: tall portrait left + two squares right */}
					<div className="grid h-[360px] grid-cols-2 gap-3 lg:h-[460px]">
						<div className="relative row-span-2 overflow-hidden rounded-2xl">
							<img
								src="/images/pets/brownie-1.webp"
								alt="Hewan di shelter"
								className="absolute inset-0 h-full w-full object-cover"
								loading="lazy"
								onError={(e) => {
									e.currentTarget.onerror = null;
									e.currentTarget.src = "/images/placeholder.svg";
								}}
							/>
						</div>
						<div className="relative overflow-hidden rounded-2xl">
							<img
								src="/images/pets/manis-1.webp"
								alt="Hewan menunggu adopsi"
								className="absolute inset-0 h-full w-full object-cover"
								loading="lazy"
								onError={(e) => {
									e.currentTarget.onerror = null;
									e.currentTarget.src = "/images/placeholder.svg";
								}}
							/>
						</div>
						<div className="relative overflow-hidden rounded-2xl">
							<img
								src="/images/pets/kopi-1.webp"
								alt="Kucing di shelter"
								className="absolute inset-0 h-full w-full object-cover"
								loading="lazy"
								onError={(e) => {
									e.currentTarget.onerror = null;
									e.currentTarget.src = "/images/placeholder.svg";
								}}
							/>
						</div>
					</div>

					{/* Text */}
					<div>
						<TwoToneHeading
							line1={t("landing.shelter.headline1")}
							line2={t("landing.shelter.headline2")}
						/>
						<p className="mt-5 text-base leading-relaxed text-muted-foreground">
							{t("landing.shelter.body")}
						</p>

						{/* Stats row */}
						<div className="mt-8 flex flex-wrap items-center gap-6">
							{PROMISE_STATS.map((s, i) => (
								<Fragment key={s.valueKey}>
									{i > 0 && <div className="h-8 w-px bg-border" />}
									<div>
										<p className="font-display text-2xl font-bold text-foreground">
											{t(s.valueKey)}
										</p>
										<p className="text-xs text-muted-foreground">
											{t(s.labelKey)}
										</p>
									</div>
								</Fragment>
							))}
						</div>

						{/* Shelter pills */}
						<div className="mt-6 flex flex-wrap gap-2">
							{SHELTER_NAMES.map((name) => (
								<div
									key={name}
									className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
								>
									<CheckCircle className="h-3.5 w-3.5 shrink-0 text-primary" />
									{name}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// ── Section 06: Final CTA banner ──────────────────────────────────────────────

function FinalCTASection() {
	const { t } = useLanguage();

	return (
		<section className="w-full overflow-hidden bg-primary">
			<div className="grid grid-cols-1 lg:grid-cols-[1fr_420px]">
				{/* Left: text — padding aligns with max-w-6xl mx-auto px-6 */}
				<div
					className="flex flex-col justify-center gap-4 py-10 pr-6 lg:py-16 lg:pr-12"
					style={{
						paddingLeft: "max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))",
					}}
				>
					<h2 className="font-jakarta text-3xl font-bold uppercase leading-tight text-white md:text-4xl lg:text-5xl">
						{t("landing.cta.headline1")}
						<br />
						{t("landing.cta.headline2")}
					</h2>
					<p className="max-w-sm text-sm leading-relaxed text-white/75">
						{t("landing.cta.sub")}
					</p>
					<div className="mt-4">
						<Link
							to="/jelajahi"
							onClick={() => track("landing_cta_click", { cta: "final" })}
							className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-8 py-3.5 text-sm font-bold text-primary transition-all duration-200 hover:bg-white/95 active:scale-[0.97]"
						>
							{t("landing.cta.button")}
						</Link>
					</div>
				</div>

				{/* Right: photo bleeds to right edge, full section height */}
				<div className="relative hidden min-h-[400px] lg:block">
					<img
						src="/images/pets/miko-1.webp"
						alt=""
						aria-hidden="true"
						className="absolute inset-0 h-full w-full object-cover object-top"
						loading="lazy"
						onError={(e) => {
							e.currentTarget.onerror = null;
							e.currentTarget.src = "/images/placeholder.svg";
						}}
					/>
				</div>
			</div>
		</section>
	);
}

// ── Page ──────────────────────────────────────────────────────────────────────

function LandingPage() {
	return (
		<div>
			<HeroSection />
			<TrustBar />
			<HowItWorksSection />
			<FeaturedSection />
			<ShelterPromiseSection />
			<FinalCTASection />
		</div>
	);
}

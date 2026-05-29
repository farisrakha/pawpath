import { createFileRoute, Link } from "@tanstack/react-router";
import {
	MapPin,
	RotateCcw,
	ShieldCheck,
	SlidersHorizontal,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	type ActivityLevelFilter,
	type ExperienceFilter,
	type HouseholdType,
	type HousingType,
	type OtherPetsFilter,
	type SizePreference,
	useMatchProfile,
} from "@/context";
import { useLanguage } from "@/context/LanguageContext";
import { type PetListing, pets, type Species } from "@/data";
import { computeMatch, type MatchLevel } from "@/lib/match";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: BrowsePage });

// ── Helpers ────────────────────────────────────────────────────────────────────

function ageLabel(
	pet: PetListing,
	t: (key: string) => string,
): string {
	const { years, months } = pet.age;
	if (years === 0) return `${months} ${t("pet.age.months")}`;
	if (months === 0) return `${years} ${t("pet.age.years")}`;
	return `${years} ${t("pet.age.years")}`;
}

// ── Filter option lists (values only; labels resolved via t()) ──────────────

const HOUSING_OPTIONS: HousingType[] = [
	"apartemen",
	"rumah_tanpa_halaman",
	"rumah_dengan_halaman",
];

const HOUSEHOLD_OPTIONS: HouseholdType[] = [
	"dewasa_tunggal",
	"pasangan",
	"keluarga_anak_kecil",
	"keluarga_anak_remaja",
];

const OTHER_PETS_OPTIONS: OtherPetsFilter[] = [
	"tidak_ada",
	"ada_anjing",
	"ada_kucing",
	"ada_anjing_kucing",
];

const ACTIVITY_OPTIONS: ActivityLevelFilter[] = ["rendah", "sedang", "tinggi"];

const SIZE_OPTIONS: { value: SizePreference; descKey: string }[] = [
	{ value: "small", descKey: "<10 kg" },
	{ value: "medium", descKey: "10–25" },
	{ value: "large", descKey: ">25 kg" },
];

const EXPERIENCE_OPTIONS: ExperienceFilter[] = [
	"pemula",
	"berpengalaman",
	"ahli",
];

// ── FilterSection ─────────────────────────────────────────────────────────────

function FilterSection({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div>
			<p className="mb-2.5 text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground">
				{title}
			</p>
			{children}
		</div>
	);
}

// ── FilterPanel ───────────────────────────────────────────────────────────────

function FilterPanel({ onClose }: { onClose?: () => void }) {
	const { matchProfile, updateFilter, resetFilters, hasActiveFilters } =
		useMatchProfile();
	const { t } = useLanguage();

	return (
		<div className="flex flex-col gap-5">
			<div className="flex items-center justify-between">
				<p className="font-display text-sm font-bold text-foreground">
					{t("browse.matchProfile")}
				</p>
				{hasActiveFilters() ? (
					<button
						type="button"
						onClick={resetFilters}
						className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
					>
						<RotateCcw className="size-3" />
						{t("browse.filterReset")}
					</button>
				) : null}
			</div>

			<Separator />

			{/* Size */}
			<FilterSection title={t("browse.filterSection.size")}>
				<div className="flex gap-1.5">
					{SIZE_OPTIONS.map((opt) => {
						const active = matchProfile.sizePreference === opt.value;
						return (
							<button
								key={opt.value}
								type="button"
								onClick={() =>
									updateFilter("sizePreference", active ? null : opt.value)
								}
								className={cn(
									"flex-1 rounded-xl border px-2 py-2.5 text-center transition-colors",
									active
										? "border-primary bg-primary/5 text-primary"
										: "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
								)}
							>
								<p className="text-xs font-semibold">
									{t(`browse.size.${opt.value}`)}
								</p>
								<p className="mt-0.5 text-[0.6rem] opacity-70">{opt.descKey}</p>
							</button>
						);
					})}
				</div>
			</FilterSection>

			{/* Housing */}
			<FilterSection title={t("browse.filterSection.housing")}>
				<RadioGroup
					value={matchProfile.housingType ?? ""}
					onValueChange={(v) =>
						updateFilter("housingType", v ? (v as HousingType) : null)
					}
					className="flex flex-col gap-1.5"
				>
					{HOUSING_OPTIONS.map((opt) => (
						<Label
							key={opt}
							htmlFor={`ht-${opt}`}
							className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-[0.82rem] font-normal transition-colors hover:border-primary/40 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
						>
							<RadioGroupItem id={`ht-${opt}`} value={opt} />
							{t(`filter.${opt}`)}
						</Label>
					))}
				</RadioGroup>
			</FilterSection>

			{/* Household */}
			<FilterSection title={t("browse.filterSection.household")}>
				<RadioGroup
					value={matchProfile.householdType ?? ""}
					onValueChange={(v) =>
						updateFilter("householdType", v ? (v as HouseholdType) : null)
					}
					className="flex flex-col gap-1.5"
				>
					{HOUSEHOLD_OPTIONS.map((opt) => (
						<Label
							key={opt}
							htmlFor={`hh-${opt}`}
							className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-[0.82rem] font-normal transition-colors hover:border-primary/40 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
						>
							<RadioGroupItem id={`hh-${opt}`} value={opt} />
							{t(`filter.${opt}`)}
						</Label>
					))}
				</RadioGroup>
			</FilterSection>

			{/* Other pets */}
			<FilterSection title={t("browse.filterSection.otherPets")}>
				<RadioGroup
					value={matchProfile.otherPets ?? ""}
					onValueChange={(v) =>
						updateFilter("otherPets", v ? (v as OtherPetsFilter) : null)
					}
					className="flex flex-col gap-1.5"
				>
					{OTHER_PETS_OPTIONS.map((opt) => (
						<Label
							key={opt}
							htmlFor={`op-${opt}`}
							className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-[0.82rem] font-normal transition-colors hover:border-primary/40 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
						>
							<RadioGroupItem id={`op-${opt}`} value={opt} />
							{t(`filter.${opt}`)}
						</Label>
					))}
				</RadioGroup>
			</FilterSection>

			{/* Activity */}
			<FilterSection title={t("browse.filterSection.activity")}>
				<div className="flex gap-1.5">
					{ACTIVITY_OPTIONS.map((opt) => {
						const active = matchProfile.activityLevel === opt;
						return (
							<button
								key={opt}
								type="button"
								onClick={() =>
									updateFilter("activityLevel", active ? null : opt)
								}
								className={cn(
									"flex-1 rounded-xl border py-2.5 text-center text-[0.82rem] transition-colors",
									active
										? "border-primary bg-primary/5 font-semibold text-primary"
										: "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
								)}
							>
								{t(`filter.${opt}`)}
							</button>
						);
					})}
				</div>
			</FilterSection>

			{/* Experience */}
			<FilterSection title={t("browse.filterSection.experience")}>
				<div className="flex flex-col gap-1.5">
					{EXPERIENCE_OPTIONS.map((opt) => {
						const active = matchProfile.experience === opt;
						return (
							<button
								key={opt}
								type="button"
								onClick={() => updateFilter("experience", active ? null : opt)}
								className={cn(
									"rounded-lg border px-3 py-2.5 text-left text-[0.82rem] transition-colors",
									active
										? "border-primary bg-primary/5 font-medium text-primary"
										: "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
								)}
							>
								{t(`filter.${opt}`)}
							</button>
						);
					})}
				</div>
			</FilterSection>

			{onClose ? (
				<Button onClick={onClose} size="lg" className="mt-2">
					{t("browse.filterApply")}
				</Button>
			) : null}
		</div>
	);
}

// ── MatchBadge ────────────────────────────────────────────────────────────────

function MatchBadge({ level, label }: { level: MatchLevel; label: string }) {
	if (level === "none" || level === "low") return null;
	return (
		<span
			className={cn(
				"shrink-0 rounded-full px-2 py-0.5 text-[0.62rem] font-semibold",
				level === "high" && "bg-green-100 text-green-800",
				level === "medium" && "bg-amber-100 text-amber-800",
			)}
		>
			{label}
		</span>
	);
}

// ── PetCard ───────────────────────────────────────────────────────────────────

function PetCard({
	pet,
	index,
	matchResult,
}: {
	pet: PetListing;
	index: number;
	matchResult: ReturnType<typeof computeMatch>;
}) {
	const { t } = useLanguage();

	return (
		<Link
			to="/pets/$petId"
			params={{ petId: pet.id }}
			style={
				{
					animationName: "pawFadeUp",
					animationDuration: "0.45s",
					animationFillMode: "both",
					animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
					animationDelay: `${index * 55}ms`,
				} as React.CSSProperties
			}
			className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
		>
			{/* Photo */}
			<div className="relative aspect-[4/3] overflow-hidden bg-muted">
				<img
					src={pet.photos[0]}
					alt={pet.name}
					className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
					loading="lazy"
					onError={(e) => {
						e.currentTarget.onerror = null;
						e.currentTarget.src =
							pet.species === "dog"
								? "https://place.dog/800/600"
								: "https://cataas.com/cat?width=800&height=600";
					}}
				/>
				<div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
					{pet.urgency === "urgent" ? (
						<span className="rounded-full bg-destructive px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wide text-white shadow-sm">
							{t("browse.urgentBadge")}
						</span>
					) : (
						<span />
					)}
					<span className="rounded-full bg-black/40 px-2.5 py-1 text-[0.65rem] font-medium text-white backdrop-blur-sm">
						{pet.species === "cat"
							? t("browse.species.catCard")
							: t("browse.species.dogCard")}
					</span>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col gap-2 p-4">
				<div className="flex items-start justify-between gap-2">
					<h3 className="font-display text-xl font-bold leading-tight text-foreground">
						{pet.name}
					</h3>
					{pet.medicalStatus.vaksinasi ? (
						<ShieldCheck
							className="mt-0.5 size-4 shrink-0 text-primary"
							aria-label={t("browse.vaccinated")}
						/>
					) : null}
				</div>

				<p className="text-sm text-muted-foreground">{pet.breed}</p>
				<p className="text-xs text-muted-foreground">
					{ageLabel(pet, t)} ·{" "}
					{pet.sex === "male" ? t("browse.sex.male") : t("browse.sex.female")} ·{" "}
					{t(`browse.size.${pet.size}`)}
				</p>

				{pet.temperamentTags.length > 0 ? (
					<div className="flex flex-wrap gap-1">
						{pet.temperamentTags.slice(0, 2).map((tag) => (
							<span
								key={tag}
								className="rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[0.62rem] text-muted-foreground"
							>
								{tag}
							</span>
						))}
					</div>
				) : null}

				<div className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-muted-foreground">
					<MapPin className="size-3.5 shrink-0 opacity-70" />
					<span className="flex-1 truncate">{pet.locationDistrict}</span>
					<MatchBadge level={matchResult.level} label={matchResult.label} />
				</div>
			</div>
		</Link>
	);
}

// ── Page ──────────────────────────────────────────────────────────────────────

function BrowsePage() {
	const [species, setSpecies] = useState<"all" | Species>("all");
	const [filterSheetOpen, setFilterSheetOpen] = useState(false);
	const { matchProfile, hasActiveFilters } = useMatchProfile();
	const { t } = useLanguage();

	const filtersActive = hasActiveFilters();

	const speciesOptions: { value: "all" | Species; label: string }[] = [
		{ value: "all", label: t("browse.species.all") },
		{ value: "dog", label: t("browse.species.dog") },
		{ value: "cat", label: t("browse.species.cat") },
	];

	const visible = pets
		.filter(
			(p) =>
				p.status === "active" && (species === "all" || p.species === species),
		)
		.map((p) => ({ pet: p, match: computeMatch(p, matchProfile) }))
		.sort((a, b) => {
			if (a.pet.urgency === "urgent" && b.pet.urgency !== "urgent") return -1;
			if (b.pet.urgency === "urgent" && a.pet.urgency !== "urgent") return 1;
			if (filtersActive) return b.match.score - a.match.score;
			return 0;
		});

	return (
		<div className="py-8 md:py-12">
			{/* Page header */}
			<header className="mb-10">
				<h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground md:text-[2.8rem]">
					{t("browse.header.title").replace(
						t("browse.header.accentPhrase"),
						"",
					) || t("browse.header.title").split(t("browse.header.accentPhrase"))[0]}
					<span className="italic text-primary">
						{t("browse.header.accentPhrase")}
					</span>
				</h1>
				<p className="mt-3 max-w-lg text-base leading-relaxed text-muted-foreground">
					{t("browse.header.subtitle")}
				</p>
			</header>

			<div className="lg:grid lg:grid-cols-[268px_1fr] lg:gap-10">
				{/* Sidebar — desktop */}
				<aside className="hidden lg:block">
					<div className="sticky top-[80px] max-h-[calc(100vh-96px)] overflow-y-auto rounded-2xl border border-border bg-card p-5 [scrollbar-width:thin]">
						<FilterPanel />
					</div>
				</aside>

				{/* Main content */}
				<div>
					{/* Controls bar */}
					<div className="mb-6 flex flex-wrap items-center gap-3">
						<div className="flex gap-1.5">
							{speciesOptions.map((opt) => (
								<button
									key={opt.value}
									type="button"
									onClick={() => setSpecies(opt.value)}
									className={cn(
										"rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
										species === opt.value
											? "bg-primary text-primary-foreground"
											: "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
									)}
								>
									{opt.label}
								</button>
							))}
						</div>

						{/* Mobile filter trigger */}
						<Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
							<SheetTrigger
								render={
									<Button
										variant={filtersActive ? "default" : "outline"}
										size="sm"
										className="gap-1.5 lg:hidden"
									>
										<SlidersHorizontal className="size-3.5" />
										{t("browse.filterButton")}
										{filtersActive ? (
											<span className="rounded-full bg-white/20 px-1.5 text-xs font-bold">
												{t("browse.filterActive")}
											</span>
										) : null}
									</Button>
								}
							/>
							<SheetContent
								side="bottom"
								className="h-[88dvh] overflow-y-auto rounded-t-2xl"
							>
								<SheetHeader className="mb-5">
									<SheetTitle className="text-left">
										{t("browse.filterSheetTitle")}
									</SheetTitle>
								</SheetHeader>
								<div className="pb-8">
									<FilterPanel onClose={() => setFilterSheetOpen(false)} />
								</div>
							</SheetContent>
						</Sheet>

						<span className="ml-auto text-sm text-muted-foreground">
							{visible.length}{" "}
							{t("browse.species.all") === "All" ? "animals" : "hewan"}
						</span>
					</div>

					{/* Match-active notice */}
					{filtersActive ? (
						<div
							className="mb-5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3"
							style={{
								animation: "pawFadeIn 0.3s ease both",
							}}
						>
							<p className="text-sm font-medium text-primary">
								{t("browse.matchSorted")}
							</p>
						</div>
					) : null}

					{/* Pet grid */}
					{visible.length === 0 ? (
						<div className="rounded-2xl border border-dashed border-border bg-muted/40 py-20 text-center">
							<p className="font-display text-lg font-semibold text-foreground">
								{t("browse.noResults.title")}
							</p>
							<p className="mt-2 text-sm text-muted-foreground">
								{t("browse.noResults.hint")}
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
							{visible.map(({ pet, match }, idx) => (
								<PetCard
									key={pet.id}
									pet={pet}
									index={idx}
									matchResult={match}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

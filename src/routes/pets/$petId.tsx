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
import { listers, type PetListing, pets } from "@/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pets/$petId")({
	component: PetDetailPage,
});

// ── Helpers ────────────────────────────────────────────────────────────────────

function ageLabel(pet: PetListing): string {
	const { years, months } = pet.age;
	if (years === 0) return `${months} bulan`;
	if (months === 0) return `${years} tahun`;
	return `${years} tahun ${months} bulan`;
}

const STATUS_LABEL: Record<string, string> = {
	submitted: "Terkirim",
	under_review: "Sedang ditinjau",
	meet_greet: "Meet & Greet",
	approved: "Disetujui",
	adopted: "Diadopsi",
	rejected: "Ditolak",
	withdrawn: "Dicabut",
};

const STATUS_COLOR: Record<string, string> = {
	submitted: "bg-muted text-muted-foreground",
	under_review: "bg-primary/10 text-primary",
	meet_greet: "bg-status-warning-bg text-status-warning-fg",
	approved: "bg-status-success-bg text-status-success-fg",
	adopted: "bg-status-success-bg text-status-success-fg",
	rejected: "bg-destructive/10 text-destructive",
	withdrawn: "bg-muted text-muted-foreground",
};

const SIZE_LABEL: Record<string, string> = {
	small: "Kecil (<10 kg)",
	medium: "Sedang (10–25 kg)",
	large: "Besar (>25 kg)",
};

const MEDICAL_ITEMS: {
	key: keyof PetListing["medicalStatus"];
	label: string;
}[] = [
	{ key: "vaksinasi", label: "Vaksinasi lengkap" },
	{ key: "sterilisasi", label: "Sterilisasi" },
	{ key: "microchip", label: "Microchip" },
	{ key: "obatCacing", label: "Obat cacing" },
	{ key: "suratKesehatan", label: "Surat kesehatan" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

function PetDetailPage() {
	const { petId } = Route.useParams();
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const { getApplicationByPet } = useApplications();

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
				to="/"
				className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft className="size-4" />
				Kembali ke daftar
			</Link>

			<div className="grid gap-10 lg:grid-cols-[56fr_44fr]">
				{/* ── Left: photos + story ── */}
				<div className="flex flex-col gap-7">
					{/* Main photo */}
					<div className="overflow-hidden rounded-2xl bg-muted aspect-[4/3] ring-1 ring-border">
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
											: "border-transparent opacity-70 hover:opacity-100 hover:border-border",
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
							Tentang {pet.name}
						</h2>
						<p className="text-[0.92rem] leading-relaxed text-muted-foreground">
							{pet.story}
						</p>
					</section>

					{/* Known requirements */}
					{pet.knownRequirements ? (
						<div className="rounded-xl border border-status-warning-border bg-status-warning-bg/60 p-4">
							<p className="text-sm font-semibold text-status-warning-fg">
								Persyaratan khusus
							</p>
							<p className="mt-1 text-sm leading-relaxed text-status-warning-fg">
								{pet.knownRequirements}
							</p>
						</div>
					) : null}

					{/* Medical status */}
					<section>
						<h2 className="font-display mb-4 text-xl font-bold text-foreground">
							Status kesehatan
						</h2>
						<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
							{MEDICAL_ITEMS.map(({ key, label }) => {
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
										{label}
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
									Mendesak
								</span>
							) : null}
							{isUnavailable ? (
								<span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
									Sudah diadopsi
								</span>
							) : null}
						</div>

						<h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
							{pet.name}
						</h1>
						<p className="mt-1 text-muted-foreground">
							{pet.breed} · {pet.species === "cat" ? "Kucing" : "Anjing"}
						</p>

						<Separator className="my-4" />

						{/* Vitals grid */}
						<dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
							<div>
								<dt className="label-eyebrow text-muted-foreground">Umur</dt>
								<dd className="mt-1 font-medium text-foreground">
									{ageLabel(pet)}
								</dd>
							</div>
							<div>
								<dt className="label-eyebrow text-muted-foreground">
									Jenis kelamin
								</dt>
								<dd className="mt-1 font-medium text-foreground">
									{pet.sex === "male" ? "Jantan" : "Betina"}
								</dd>
							</div>
							<div>
								<dt className="label-eyebrow text-muted-foreground">Ukuran</dt>
								<dd className="mt-1 font-medium text-foreground">
									{SIZE_LABEL[pet.size]}
								</dd>
							</div>
							<div>
								<dt className="label-eyebrow text-muted-foreground">Lokasi</dt>
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
									<p className="mb-2.5 label-eyebrow text-muted-foreground">
										Karakter
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
									Status lamaranmu
								</p>
								<span
									className={cn(
										"mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold",
										STATUS_COLOR[existingApp.status] ??
											"bg-muted text-muted-foreground",
									)}
								>
									{STATUS_LABEL[existingApp.status] ?? existingApp.status}
								</span>
								<Button
									variant="outline"
									size="lg"
									className="mt-3 w-full"
									render={<Link to="/my-applications" />}
								>
									Lihat lamaran
								</Button>
							</div>
						) : isUnavailable ? (
							<p className="text-center text-sm text-muted-foreground">
								Hewan ini sudah tidak tersedia untuk adopsi.
							</p>
						) : (
							<div className="flex flex-col gap-2">
								<Button size="lg" className="w-full" onClick={handleApply}>
									<Heart className="size-4" />
									Ajukan lamaran adopsi
								</Button>
								{!isAuthenticated ? (
									<p className="text-center text-xs text-muted-foreground">
										Kamu perlu masuk terlebih dahulu.
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
										? "Organisasi Terverifikasi"
										: "Individu Terverifikasi"}
								</div>
							) : null}

							<div className="p-5">
								<p className="mb-3 label-eyebrow text-muted-foreground">
									Dititipkan oleh
								</p>

								<p className="font-semibold text-foreground">
									{lister.displayName}
								</p>
								<p className="mt-0.5 text-xs text-muted-foreground">
									{lister.type === "shelter" ? "Shelter" : "Penitip mandiri"}
									{lister.type === "shelter" && lister.adoptionCount > 0
										? ` · ${lister.adoptionCount} adopsi berhasil`
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
										label="Hubungi shelter via WhatsApp"
										className="mt-4"
									/>
								) : null}

								{/* Private: WA hidden message */}
								{lister.type === "private" && !existingApp ? (
									<p className="mt-4 rounded-lg bg-muted/60 px-3 py-2.5 text-xs text-muted-foreground">
										Kontak penitip akan diberikan setelah lamaran mencapai tahap
										Meet &amp; Greet.
									</p>
								) : null}

								{/* Private: WA revealed at meet_greet */}
								{lister.type === "private" &&
								existingApp?.status === "meet_greet" ? (
									<WhatsAppCta
										phone={lister.waNumber}
										label="Hubungi penitip via WhatsApp"
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

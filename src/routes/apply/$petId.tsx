import {
	createFileRoute,
	Link,
	notFound,
	useNavigate,
} from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AuthGate } from "@/components/account/auth-gate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useApplications } from "@/context";
import {
	type ActivityLevel,
	type HomeType,
	type HouseholdType,
	listers,
	type OtherPetsType,
	type PetExperience,
	pets,
} from "@/data";
import { formatIDR } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/apply/$petId")({
	component: ApplyPageWrapper,
});

// ── Step data types ───────────────────────────────────────────────────────────

interface Step1 {
	homeType: HomeType | "";
	household: HouseholdType | "";
}

interface Step2 {
	otherPets: OtherPetsType | "";
	hoursAlone: string;
	activityLevel: ActivityLevel | "";
}

interface Step3 {
	experience: PetExperience | "";
	whyAdopt: string;
	dailyRoutine: string;
	additionalInfo: string;
}

// ── Option lists ──────────────────────────────────────────────────────────────

const HOME_TYPES: HomeType[] = [
	"Apartemen",
	"Rumah tanpa halaman",
	"Rumah dengan halaman bersama",
	"Rumah dengan halaman pribadi",
];

const HOUSEHOLD_TYPES: HouseholdType[] = [
	"Dewasa tunggal",
	"Pasangan tanpa anak",
	"Keluarga dengan anak kecil (<10 tahun)",
	"Keluarga dengan anak remaja",
];

const OTHER_PETS_OPTIONS: OtherPetsType[] = [
	"Tidak ada",
	"Ada anjing",
	"Ada kucing",
	"Ada anjing dan kucing",
];

const ACTIVITY_LEVELS: ActivityLevel[] = ["Rendah", "Sedang", "Tinggi"];

const EXPERIENCE_OPTIONS: PetExperience[] = [
	"Pemula (belum pernah punya hewan)",
	"Berpengalaman (pernah punya hewan)",
	"Ahli (pernah bekerja dengan hewan)",
];

const DONATION_AMOUNTS = [0, 50000, 100000, 200000];

// ── Step indicator ────────────────────────────────────────────────────────────

const STEP_LABELS = ["Hunian", "Gaya hidup", "Pernyataan", "Konfirmasi"];

function StepIndicator({ current }: { current: number }) {
	return (
		<div className="mb-10 flex items-center">
			{STEP_LABELS.map((label, idx) => {
				const step = idx + 1;
				const done = step < current;
				const active = step === current;
				return (
					<div key={label} className="flex flex-1 items-center">
						<div className="flex flex-col items-center gap-1.5">
							<span
								className={cn(
									"flex size-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-200",
									done
										? "bg-primary text-primary-foreground shadow-sm"
										: active
											? "bg-primary/10 text-primary ring-2 ring-primary ring-offset-2"
											: "bg-muted text-muted-foreground",
								)}
							>
								{done ? <Check className="size-4" /> : step}
							</span>
							<span
								className={cn(
									"text-[0.62rem] font-semibold",
									active
										? "text-primary"
										: done
											? "text-foreground"
											: "text-muted-foreground",
								)}
							>
								{label}
							</span>
						</div>
						{idx < STEP_LABELS.length - 1 ? (
							<div
								className={cn(
									"mx-2 mb-5 h-px flex-1 transition-colors duration-300",
									done ? "bg-primary" : "bg-border",
								)}
							/>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

// ── Radio card (reusable) ─────────────────────────────────────────────────────

function RadioCard({
	id,
	value,
	label,
}: {
	id: string;
	value: string;
	label: string;
}) {
	return (
		<Label
			htmlFor={id}
			className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3.5 text-sm font-normal transition-colors hover:border-primary/40 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
		>
			<RadioGroupItem id={id} value={value} />
			{label}
		</Label>
	);
}

// ── Steps ─────────────────────────────────────────────────────────────────────

function Step1Form({
	data,
	onChange,
	onNext,
}: {
	data: Step1;
	onChange: (d: Step1) => void;
	onNext: () => void;
}) {
	const [errors, setErrors] = useState<Partial<Step1>>({});

	const validate = () => {
		const errs: Partial<Step1> = {};
		if (!data.homeType) errs.homeType = "" as HomeType;
		if (!data.household) errs.household = "" as HouseholdType;
		setErrors(errs);
		return Object.keys(errs).length === 0;
	};

	return (
		<div className="flex flex-col gap-6">
			<div>
				<Label className="mb-3 block text-sm font-semibold">
					Jenis hunianmu saat ini
				</Label>
				{!data.homeType && errors.homeType !== undefined ? (
					<p className="mb-2 text-xs text-destructive">Pilih salah satu.</p>
				) : null}
				<RadioGroup
					value={data.homeType}
					onValueChange={(v) => onChange({ ...data, homeType: v as HomeType })}
					className="flex flex-col gap-2"
				>
					{HOME_TYPES.map((opt) => (
						<RadioCard key={opt} id={`home-${opt}`} value={opt} label={opt} />
					))}
				</RadioGroup>
			</div>

			<div>
				<Label className="mb-3 block text-sm font-semibold">
					Komposisi rumah tangga
				</Label>
				{!data.household && errors.household !== undefined ? (
					<p className="mb-2 text-xs text-destructive">Pilih salah satu.</p>
				) : null}
				<RadioGroup
					value={data.household}
					onValueChange={(v) =>
						onChange({ ...data, household: v as HouseholdType })
					}
					className="flex flex-col gap-2"
				>
					{HOUSEHOLD_TYPES.map((opt) => (
						<RadioCard key={opt} id={`hh-${opt}`} value={opt} label={opt} />
					))}
				</RadioGroup>
			</div>

			<Button
				size="lg"
				className="mt-2"
				onClick={() => {
					if (validate()) onNext();
				}}
			>
				Lanjut
				<ArrowRight className="size-4" />
			</Button>
		</div>
	);
}

function Step2Form({
	data,
	onChange,
	onNext,
	onBack,
}: {
	data: Step2;
	onChange: (d: Step2) => void;
	onNext: () => void;
	onBack: () => void;
}) {
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = () => {
		const errs: Record<string, string> = {};
		if (!data.otherPets) errs.otherPets = "Pilih salah satu.";
		const hours = Number(data.hoursAlone);
		if (!data.hoursAlone || Number.isNaN(hours) || hours < 0 || hours > 24)
			errs.hoursAlone = "Masukkan angka antara 0 dan 24.";
		if (!data.activityLevel) errs.activityLevel = "Pilih salah satu.";
		setErrors(errs);
		return Object.keys(errs).length === 0;
	};

	return (
		<div className="flex flex-col gap-6">
			<div>
				<Label className="mb-3 block text-sm font-semibold">
					Hewan peliharaan lain di rumah
				</Label>
				{errors.otherPets ? (
					<p className="mb-2 text-xs text-destructive">{errors.otherPets}</p>
				) : null}
				<RadioGroup
					value={data.otherPets}
					onValueChange={(v) =>
						onChange({ ...data, otherPets: v as OtherPetsType })
					}
					className="flex flex-col gap-2"
				>
					{OTHER_PETS_OPTIONS.map((opt) => (
						<RadioCard key={opt} id={`op-${opt}`} value={opt} label={opt} />
					))}
				</RadioGroup>
			</div>

			<div className="flex flex-col gap-1.5">
				<Label htmlFor="hours-alone" className="text-sm font-semibold">
					Berapa jam hewan akan sendirian per hari?
				</Label>
				<Input
					id="hours-alone"
					type="number"
					min={0}
					max={24}
					value={data.hoursAlone}
					onChange={(e) => onChange({ ...data, hoursAlone: e.target.value })}
					placeholder="Contoh: 6"
					className="h-11 max-w-xs"
					aria-invalid={!!errors.hoursAlone}
				/>
				{errors.hoursAlone ? (
					<p className="text-xs text-destructive">{errors.hoursAlone}</p>
				) : (
					<p className="text-xs text-muted-foreground">
						Rata-rata pada hari kerja.
					</p>
				)}
			</div>

			<div>
				<Label className="mb-3 block text-sm font-semibold">
					Tingkat aktivitas fisikmu
				</Label>
				{errors.activityLevel ? (
					<p className="mb-2 text-xs text-destructive">
						{errors.activityLevel}
					</p>
				) : null}
				<RadioGroup
					value={data.activityLevel}
					onValueChange={(v) =>
						onChange({ ...data, activityLevel: v as ActivityLevel })
					}
					className="flex flex-col gap-2"
				>
					{ACTIVITY_LEVELS.map((opt) => (
						<RadioCard key={opt} id={`al-${opt}`} value={opt} label={opt} />
					))}
				</RadioGroup>
			</div>

			<div className="flex gap-3">
				<Button variant="outline" size="lg" onClick={onBack}>
					<ArrowLeft className="size-4" />
					Kembali
				</Button>
				<Button
					size="lg"
					className="flex-1"
					onClick={() => {
						if (validate()) onNext();
					}}
				>
					Lanjut
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</div>
	);
}

function Step3Form({
	data,
	onChange,
	onNext,
	onBack,
}: {
	data: Step3;
	onChange: (d: Step3) => void;
	onNext: () => void;
	onBack: () => void;
}) {
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = () => {
		const errs: Record<string, string> = {};
		if (!data.experience) errs.experience = "Pilih salah satu.";
		if (data.whyAdopt.trim().length < 50)
			errs.whyAdopt = "Ceritakan lebih detail, minimal 50 karakter.";
		if (data.dailyRoutine.trim().length < 50)
			errs.dailyRoutine = "Ceritakan lebih detail, minimal 50 karakter.";
		setErrors(errs);
		return Object.keys(errs).length === 0;
	};

	return (
		<div className="flex flex-col gap-6">
			<div>
				<Label className="mb-3 block text-sm font-semibold">
					Pengalamanmu merawat hewan
				</Label>
				{errors.experience ? (
					<p className="mb-2 text-xs text-destructive">{errors.experience}</p>
				) : null}
				<RadioGroup
					value={data.experience}
					onValueChange={(v) =>
						onChange({ ...data, experience: v as PetExperience })
					}
					className="flex flex-col gap-2"
				>
					{EXPERIENCE_OPTIONS.map((opt) => (
						<RadioCard key={opt} id={`exp-${opt}`} value={opt} label={opt} />
					))}
				</RadioGroup>
			</div>

			<div className="flex flex-col gap-1.5">
				<Label htmlFor="why-adopt" className="text-sm font-semibold">
					Mengapa kamu ingin mengadopsi hewan ini?
				</Label>
				<Textarea
					id="why-adopt"
					rows={4}
					value={data.whyAdopt}
					onChange={(e) => onChange({ ...data, whyAdopt: e.target.value })}
					placeholder="Ceritakan alasanmu dan apa yang membuatmu tertarik dengan hewan ini..."
					aria-invalid={!!errors.whyAdopt}
				/>
				{errors.whyAdopt ? (
					<p className="text-xs text-destructive">{errors.whyAdopt}</p>
				) : (
					<p className="text-xs text-muted-foreground">
						{data.whyAdopt.length} karakter
					</p>
				)}
			</div>

			<div className="flex flex-col gap-1.5">
				<Label htmlFor="daily-routine" className="text-sm font-semibold">
					Bagaimana rutinitas harianmu?
				</Label>
				<Textarea
					id="daily-routine"
					rows={4}
					value={data.dailyRoutine}
					onChange={(e) => onChange({ ...data, dailyRoutine: e.target.value })}
					placeholder="Ceritakan jadwal harianmu dan bagaimana hewan akan masuk ke dalam rutinitas itu..."
					aria-invalid={!!errors.dailyRoutine}
				/>
				{errors.dailyRoutine ? (
					<p className="text-xs text-destructive">{errors.dailyRoutine}</p>
				) : (
					<p className="text-xs text-muted-foreground">
						{data.dailyRoutine.length} karakter
					</p>
				)}
			</div>

			<div className="flex flex-col gap-1.5">
				<Label htmlFor="additional-info" className="text-sm font-semibold">
					Informasi tambahan{" "}
					<span className="font-normal text-muted-foreground">(opsional)</span>
				</Label>
				<Textarea
					id="additional-info"
					rows={3}
					value={data.additionalInfo}
					onChange={(e) =>
						onChange({ ...data, additionalInfo: e.target.value })
					}
					placeholder="Hal lain yang ingin kamu sampaikan kepada pemilik..."
				/>
			</div>

			<div className="flex gap-3">
				<Button variant="outline" size="lg" onClick={onBack}>
					<ArrowLeft className="size-4" />
					Kembali
				</Button>
				<Button
					size="lg"
					className="flex-1"
					onClick={() => {
						if (validate()) onNext();
					}}
				>
					Lanjut
					<ArrowRight className="size-4" />
				</Button>
			</div>
		</div>
	);
}

function Step4Form({
	onSubmit,
	onBack,
	petName,
	shelterName,
	submitting,
}: {
	onSubmit: (amount: number | null) => void;
	onBack: () => void;
	petName: string;
	shelterName: string;
	submitting: boolean;
}) {
	const [customDonation, setCustomDonation] = useState("");
	const [selectedAmount, setSelectedAmount] = useState<
		number | "custom" | null
	>(null);

	const resolvedAmount = (): number | null => {
		if (selectedAmount === null || selectedAmount === 0) return null;
		if (selectedAmount === "custom")
			return customDonation ? Number(customDonation) : null;
		return selectedAmount;
	};

	return (
		<div className="flex flex-col gap-6">
			{/* Next steps callout */}
			<div className="rounded-xl border border-border bg-muted/40 p-4">
				<p className="text-sm font-semibold text-foreground">
					Langkah berikutnya
				</p>
				<p className="mt-1 text-sm leading-relaxed text-muted-foreground">
					Setelah kamu kirim, {shelterName} akan meninjau lamaranmu. Jika cocok,
					kamu akan diundang untuk sesi Meet &amp; Greet.
				</p>
			</div>

			<Separator />

			{/* Donation */}
			<div>
				<p className="mb-1 text-sm font-semibold text-foreground">
					Donasi sukarela untuk {petName}
				</p>
				<p className="mb-4 text-sm text-muted-foreground">
					Membantu biaya perawatan selama proses adopsi. Sepenuhnya opsional dan
					tidak mempengaruhi keputusan adopsi.
				</p>
				<div className="flex flex-wrap gap-2">
					{DONATION_AMOUNTS.map((amount) => {
						const active = selectedAmount === amount;
						return (
							<button
								key={amount}
								type="button"
								onClick={() => setSelectedAmount(active ? null : amount)}
								className={cn(
									"rounded-full border px-4 py-2 text-sm font-medium transition-colors",
									active
										? "border-primary bg-primary text-primary-foreground"
										: "border-border hover:border-primary/40",
								)}
							>
								{amount === 0 ? "Tidak" : formatIDR(amount)}
							</button>
						);
					})}
					<button
						type="button"
						onClick={() =>
							setSelectedAmount(selectedAmount === "custom" ? null : "custom")
						}
						className={cn(
							"rounded-full border px-4 py-2 text-sm font-medium transition-colors",
							selectedAmount === "custom"
								? "border-primary bg-primary text-primary-foreground"
								: "border-border hover:border-primary/40",
						)}
					>
						Jumlah lain
					</button>
				</div>
				{selectedAmount === "custom" ? (
					<div className="mt-3 flex flex-col gap-1.5">
						<Label htmlFor="custom-donation">Jumlah donasi (Rp)</Label>
						<Input
							id="custom-donation"
							type="number"
							min={1}
							value={customDonation}
							onChange={(e) => setCustomDonation(e.target.value)}
							placeholder="Contoh: 75000"
							className="h-11 max-w-xs"
						/>
					</div>
				) : null}
			</div>

			<div className="flex gap-3">
				<Button
					variant="outline"
					size="lg"
					onClick={onBack}
					disabled={submitting}
				>
					<ArrowLeft className="size-4" />
					Kembali
				</Button>
				<Button
					size="lg"
					className="flex-1"
					onClick={() => onSubmit(resolvedAmount())}
					disabled={submitting}
				>
					{submitting ? "Mengirim..." : "Kirim lamaran"}
				</Button>
			</div>
		</div>
	);
}

// ── Root page ─────────────────────────────────────────────────────────────────

function ApplyForm({ petId }: { petId: string }) {
	const navigate = useNavigate();
	const { submitApplication, getApplicationByPet } = useApplications();

	const [step, setStep] = useState(1);
	const [s1, setS1] = useState<Step1>({ homeType: "", household: "" });
	const [s2, setS2] = useState<Step2>({
		otherPets: "",
		hoursAlone: "",
		activityLevel: "",
	});
	const [s3, setS3] = useState<Step3>({
		experience: "",
		whyAdopt: "",
		dailyRoutine: "",
		additionalInfo: "",
	});
	const [submitting, setSubmitting] = useState(false);

	const pet = pets.find((p) => p.id === petId);
	if (!pet) throw notFound();

	const existingApp = getApplicationByPet(petId);
	if (existingApp) {
		navigate({ to: "/my-applications" });
		return null;
	}

	if (pet.status !== "active") {
		return (
			<div className="py-12 text-center">
				<p className="font-display text-xl font-semibold text-foreground">
					Hewan ini sudah tidak tersedia
				</p>
				<p className="mt-2 text-sm text-muted-foreground">
					Cari hewan lain yang membutuhkan rumah baru.
				</p>
				<Button className="mt-5" render={<Link to="/" />}>
					Kembali ke daftar
				</Button>
			</div>
		);
	}

	const handleSubmit = (donationAmount: number | null) => {
		setSubmitting(true);
		try {
			submitApplication(
				petId,
				{
					homeType: s1.homeType as import("@/data").HomeType,
					household: s1.household as import("@/data").HouseholdType,
					otherPets: s2.otherPets as import("@/data").OtherPetsType,
					hoursAlone: Number(s2.hoursAlone),
					activityLevel: s2.activityLevel as import("@/data").ActivityLevel,
					experience: s3.experience as import("@/data").PetExperience,
				},
				{
					whyAdopt: s3.whyAdopt,
					dailyRoutine: s3.dailyRoutine,
					additionalInfo: s3.additionalInfo || undefined,
				},
				donationAmount,
			);
			toast.success(`Lamaran untuk ${pet.name} berhasil dikirim!`);
			navigate({ to: "/my-applications" });
		} catch {
			toast.error("Gagal mengirim lamaran. Coba lagi.");
			setSubmitting(false);
		}
	};

	const listerName =
		listers.find((l) => l.id === pet.listerId)?.displayName ?? "pemilik";

	return (
		<div className="py-6 md:py-10">
			<Link
				to="/pets/$petId"
				params={{ petId }}
				className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft className="size-4" />
				Kembali ke profil {pet.name}
			</Link>

			<div className="mx-auto max-w-xl">
				{/* Header */}
				<div className="mb-8 flex items-start gap-4">
					<div className="size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
						<img
							src={pet.photos[0]}
							alt={pet.name}
							className="size-full object-cover"
							onError={(e) => {
								e.currentTarget.onerror = null;
								e.currentTarget.src =
									pet.species === "dog"
										? "https://place.dog/800/600"
										: "https://cataas.com/cat?width=800&height=600";
							}}
						/>
					</div>
					<div>
						<h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
							Lamaran adopsi
						</h1>
						<p className="mt-0.5 text-muted-foreground">
							Untuk{" "}
							<span className="font-semibold text-foreground">{pet.name}</span>{" "}
							di {pet.locationDistrict}
						</p>
					</div>
				</div>

				<StepIndicator current={step} />

				{step === 1 ? (
					<Step1Form data={s1} onChange={setS1} onNext={() => setStep(2)} />
				) : step === 2 ? (
					<Step2Form
						data={s2}
						onChange={setS2}
						onNext={() => setStep(3)}
						onBack={() => setStep(1)}
					/>
				) : step === 3 ? (
					<Step3Form
						data={s3}
						onChange={setS3}
						onNext={() => setStep(4)}
						onBack={() => setStep(2)}
					/>
				) : (
					<Step4Form
						onSubmit={handleSubmit}
						onBack={() => setStep(3)}
						petName={pet.name}
						shelterName={listerName}
						submitting={submitting}
					/>
				)}
			</div>
		</div>
	);
}

function ApplyPageWrapper() {
	const { petId } = Route.useParams();
	return (
		<AuthGate
			title="Masuk untuk mengajukan lamaran"
			description="Kamu perlu masuk terlebih dahulu sebelum mengajukan lamaran adopsi."
		>
			<ApplyForm petId={petId} />
		</AuthGate>
	);
}

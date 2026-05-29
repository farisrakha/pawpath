export type ApplicationStatus =
	| "submitted"
	| "under_review"
	| "meet_greet"
	| "approved"
	| "adopted"
	| "rejected"
	| "withdrawn";

export type HomeType =
	| "Apartemen"
	| "Rumah tanpa halaman"
	| "Rumah dengan halaman bersama"
	| "Rumah dengan halaman pribadi";

export type HouseholdType =
	| "Dewasa tunggal"
	| "Pasangan tanpa anak"
	| "Keluarga dengan anak kecil (<10 tahun)"
	| "Keluarga dengan anak remaja";

export type OtherPetsType =
	| "Tidak ada"
	| "Ada anjing"
	| "Ada kucing"
	| "Ada anjing dan kucing";

export type ActivityLevel = "Rendah" | "Sedang" | "Tinggi";

export type PetExperience =
	| "Pemula (belum pernah punya hewan)"
	| "Berpengalaman (pernah punya hewan)"
	| "Ahli (pernah bekerja dengan hewan)";

export type LifestyleData = {
	homeType: HomeType;
	household: HouseholdType;
	otherPets: OtherPetsType;
	hoursAlone: number;
	activityLevel: ActivityLevel;
	experience: PetExperience;
};

export type PersonalStatement = {
	whyAdopt: string;
	dailyRoutine: string;
	additionalInfo?: string;
};

export type StatusLogEntry = {
	status: ApplicationStatus;
	timestamp: string;
	note?: string;
};

export type Application = {
	id: string;
	petId: string;
	applicantId: string;
	lifestyleData: LifestyleData;
	personalStatement: PersonalStatement;
	donationAmount: number | null;
	status: ApplicationStatus;
	statusLog: StatusLogEntry[];
	createdAt: string;
	updatedAt: string;
};

export const applications: Application[] = [
	{
		id: "app-001",
		petId: "pet-004",
		applicantId: "user-demo",
		lifestyleData: {
			homeType: "Apartemen",
			household: "Dewasa tunggal",
			otherPets: "Tidak ada",
			hoursAlone: 7,
			activityLevel: "Sedang",
			experience: "Berpengalaman (pernah punya hewan)",
		},
		personalStatement: {
			whyAdopt:
				"Saya sudah lama ingin mengadopsi kucing dan Kopi langsung membuat saya tertarik dari foto pertama. Saya tinggal sendiri di apartemen dan merasa siap untuk memberikan rumah yang hangat bagi seekor kucing dewasa yang mandiri seperti dia.",
			dailyRoutine:
				"Saya bekerja dari rumah tiga hari dalam seminggu dan sisanya dari kantor. Pagi hari saya biasanya sarapan santai sebelum mulai kerja. Sore hari saya sering berjalan kaki sekitar komplek. Malam hari adalah waktu santai di rumah.",
		},
		donationAmount: 50000,
		status: "submitted",
		statusLog: [{ status: "submitted", timestamp: "2026-05-20T09:14:00Z" }],
		createdAt: "2026-05-20T09:14:00Z",
		updatedAt: "2026-05-20T09:14:00Z",
	},
	{
		id: "app-002",
		petId: "pet-005",
		applicantId: "user-demo",
		lifestyleData: {
			homeType: "Rumah tanpa halaman",
			household: "Pasangan tanpa anak",
			otherPets: "Tidak ada",
			hoursAlone: 5,
			activityLevel: "Sedang",
			experience: "Berpengalaman (pernah punya hewan)",
		},
		personalStatement: {
			whyAdopt:
				"Saya dan pasangan sudah sepakat untuk mengadopsi kucing sebagai teman di rumah. Susu terlihat cocok untuk kami karena karakternya yang ramah dan tidak terlalu manja.",
			dailyRoutine:
				"Pagi hari kami biasanya sarapan bersama sebelum berangkat kerja. Sore sekitar jam 5 kami sudah pulang. Akhir pekan kami sering ada di rumah dan senang menghabiskan waktu santai.",
			additionalInfo:
				"Rumah kami memiliki taman kecil di belakang yang tertutup pagar, jadi ada ruang ekstra untuk Susu jika ingin keluar.",
		},
		donationAmount: null,
		status: "under_review",
		statusLog: [
			{ status: "submitted", timestamp: "2026-05-15T14:30:00Z" },
			{
				status: "under_review",
				timestamp: "2026-05-16T10:00:00Z",
				note: "Lamaran diterima dan sedang kami tinjau.",
			},
		],
		createdAt: "2026-05-15T14:30:00Z",
		updatedAt: "2026-05-16T10:00:00Z",
	},
	{
		id: "app-003",
		petId: "pet-001",
		applicantId: "user-demo",
		lifestyleData: {
			homeType: "Rumah dengan halaman pribadi",
			household: "Keluarga dengan anak remaja",
			otherPets: "Tidak ada",
			hoursAlone: 4,
			activityLevel: "Tinggi",
			experience: "Berpengalaman (pernah punya hewan)",
		},
		personalStatement: {
			whyAdopt:
				"Keluarga kami sudah lama ingin adopsi anjing besar. Anak-anak saya yang remaja sangat antusias dan siap ikut membantu merawat. Rumah kami memiliki halaman cukup luas dan kami aktif berolahraga setiap pagi.",
			dailyRoutine:
				"Pagi hari ada sesi jogging keluarga sekitar 30 menit. Anak-anak pulang sekolah jam 2, jadi anjing tidak akan terlalu lama sendiri. Malam hari selalu ada anggota keluarga di rumah.",
		},
		donationAmount: 100000,
		status: "meet_greet",
		statusLog: [
			{ status: "submitted", timestamp: "2026-05-10T08:00:00Z" },
			{
				status: "under_review",
				timestamp: "2026-05-11T09:00:00Z",
				note: "Profil kehidupan sangat cocok untuk Miko.",
			},
			{
				status: "meet_greet",
				timestamp: "2026-05-14T11:30:00Z",
				note: "Kami ingin mengatur sesi pertemuan. Silakan hubungi kami via WhatsApp untuk menjadwalkan kunjungan.",
			},
		],
		createdAt: "2026-05-10T08:00:00Z",
		updatedAt: "2026-05-14T11:30:00Z",
	},
	{
		id: "app-004",
		petId: "pet-002",
		applicantId: "user-demo",
		lifestyleData: {
			homeType: "Rumah dengan halaman bersama",
			household: "Keluarga dengan anak kecil (<10 tahun)",
			otherPets: "Ada kucing",
			hoursAlone: 6,
			activityLevel: "Sedang",
			experience: "Berpengalaman (pernah punya hewan)",
		},
		personalStatement: {
			whyAdopt:
				"Kami sudah punya satu kucing dan ingin menambah anggota keluarga berupa anjing. Brownie terlihat seperti anjing yang mau belajar dan anak saya yang berumur 7 tahun sudah sangat tidak sabar untuk bertemu.",
			dailyRoutine:
				"Saya bekerja dari rumah penuh waktu, jadi anjing tidak akan pernah sendiri terlalu lama. Sore hari kami selalu keluar jalan-jalan di area perumahan.",
		},
		donationAmount: 25000,
		status: "approved",
		statusLog: [
			{ status: "submitted", timestamp: "2026-05-01T16:45:00Z" },
			{ status: "under_review", timestamp: "2026-05-02T09:00:00Z" },
			{
				status: "meet_greet",
				timestamp: "2026-05-05T14:00:00Z",
				note: "Jadwal kunjungan Sabtu 10 Mei 2026 sudah dikonfirmasi.",
			},
			{
				status: "approved",
				timestamp: "2026-05-10T17:00:00Z",
				note: "Pertemuan berjalan sangat baik. Brownie langsung akrab. Proses serah terima dijadwalkan minggu depan.",
			},
		],
		createdAt: "2026-05-01T16:45:00Z",
		updatedAt: "2026-05-10T17:00:00Z",
	},
	{
		id: "app-005",
		petId: "pet-006",
		applicantId: "user-demo",
		lifestyleData: {
			homeType: "Apartemen",
			household: "Dewasa tunggal",
			otherPets: "Ada anjing",
			hoursAlone: 9,
			activityLevel: "Rendah",
			experience: "Pemula (belum pernah punya hewan)",
		},
		personalStatement: {
			whyAdopt:
				"Saya tertarik dengan Oranye karena warnanya yang cerah dan ingin mencoba memelihara kucing pertama kali.",
			dailyRoutine:
				"Saya bekerja di kantor dari jam 8 pagi sampai 6 sore. Pulang kerja biasanya langsung istirahat.",
		},
		donationAmount: null,
		status: "rejected",
		statusLog: [
			{ status: "submitted", timestamp: "2026-05-18T10:00:00Z" },
			{
				status: "under_review",
				timestamp: "2026-05-19T09:00:00Z",
			},
			{
				status: "rejected",
				timestamp: "2026-05-20T10:00:00Z",
				note: "Kami khawatir dengan jam tinggal sendiri yang terlalu panjang untuk anak kucing seenergetik Oranye. Kami menyarankan untuk mempertimbangkan kucing dewasa yang lebih mandiri.",
			},
		],
		createdAt: "2026-05-18T10:00:00Z",
		updatedAt: "2026-05-20T10:00:00Z",
	},
];

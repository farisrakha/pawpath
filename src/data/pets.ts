export type Species = "dog" | "cat";
export type Sex = "male" | "female";
export type Size = "small" | "medium" | "large";
export type Urgency = "standard" | "urgent";
export type PetStatus = "active" | "adopted" | "paused";

export type TemperamentTag =
	| "Energetik"
	| "Tenang"
	| "Ramah dengan anak"
	| "Cocok bersama hewan lain"
	| "Terlatih di rumah"
	| "Mandiri"
	| "Perlu perhatian ekstra";

export type MedicalStatus = {
	vaksinasi: boolean;
	sterilisasi: boolean;
	microchip: boolean;
	obatCacing: boolean;
	suratKesehatan: boolean;
};

export type PetAge = {
	years: number;
	months: number;
};

export type PetListing = {
	id: string;
	listerId: string;
	species: Species;
	name: string;
	breed: string;
	age: PetAge;
	sex: Sex;
	size: Size;
	photos: [string, string, string, ...string[]];
	temperamentTags: TemperamentTag[];
	medicalStatus: MedicalStatus;
	urgency: Urgency;
	locationDistrict: string;
	status: PetStatus;
	story: string;
	knownRequirements?: string;
};

export const pets: PetListing[] = [
	{
		id: "pet-001",
		listerId: "lister-001",
		species: "dog",
		name: "Miko",
		breed: "Golden Retriever",
		age: { years: 3, months: 2 },
		sex: "male",
		size: "large",
		photos: [
			"/images/pets/miko-1.webp",
			"/images/pets/miko-2.webp",
			"/images/pets/miko-3.webp",
		],
		temperamentTags: [
			"Energetik",
			"Ramah dengan anak",
			"Cocok bersama hewan lain",
			"Terlatih di rumah",
		],
		medicalStatus: {
			vaksinasi: true,
			sterilisasi: false,
			microchip: true,
			obatCacing: true,
			suratKesehatan: true,
		},
		urgency: "urgent",
		locationDistrict: "Jakarta Selatan",
		status: "active",
		story:
			"Miko adalah Golden Retriever jantan berusia tiga tahun yang tumbuh besar di rumah keluarga dengan halaman luas. Ia penuh semangat di luar ruangan tapi bisa sangat lembut dan tenang di dalam rumah. Miko sudah terlatih duduk, berbaring, dan datang saat dipanggil. Ia sangat menyukai anak-anak dan tidak pernah menunjukkan agresi terhadap anjing lain yang pernah ia temui.",
		knownRequirements:
			"Membutuhkan rumah dengan halaman atau akses rutin ke area terbuka. Tidak cocok untuk apartemen.",
	},
	{
		id: "pet-002",
		listerId: "lister-002",
		species: "dog",
		name: "Brownie",
		breed: "Campuran Lokal",
		age: { years: 1, months: 8 },
		sex: "male",
		size: "medium",
		photos: [
			"/images/pets/brownie-1.webp",
			"/images/pets/brownie-2.webp",
			"/images/pets/brownie-3.webp",
		],
		temperamentTags: [
			"Energetik",
			"Ramah dengan anak",
			"Perlu perhatian ekstra",
		],
		medicalStatus: {
			vaksinasi: true,
			sterilisasi: true,
			microchip: false,
			obatCacing: true,
			suratKesehatan: false,
		},
		urgency: "standard",
		locationDistrict: "Depok",
		status: "active",
		story:
			"Brownie ditemukan di pinggir jalan Depok dalam kondisi kurus dan ketakutan, tapi setelah beberapa minggu di shelter ia berubah menjadi anjing yang ceria dan penuh kasih sayang. Ia sangat senang bermain bola dan bisa betah di dalam rumah selama ada yang menemaninya. Brownie masih butuh kesabaran ekstra untuk belajar aturan rumah, tapi ia cepat belajar.",
	},
	{
		id: "pet-003",
		listerId: "lister-002",
		species: "dog",
		name: "Cleo",
		breed: "Shih Tzu Campuran",
		age: { years: 4, months: 0 },
		sex: "female",
		size: "small",
		photos: [
			"/images/pets/cleo-1.webp",
			"/images/pets/cleo-2.webp",
			"/images/pets/cleo-3.webp",
		],
		temperamentTags: ["Tenang", "Terlatih di rumah", "Mandiri"],
		medicalStatus: {
			vaksinasi: true,
			sterilisasi: true,
			microchip: true,
			obatCacing: true,
			suratKesehatan: true,
		},
		urgency: "standard",
		locationDistrict: "Tangerang Selatan",
		status: "active",
		story:
			"Cleo adalah anjing Shih Tzu campuran yang sangat bersih dan tertib. Ia sudah terbiasa hidup di apartemen dan tidak pernah menggonggong berlebihan. Cleo suka tidur di sofa dan sesekali bermain dengan mainan berbunyi. Ia cocok untuk pemilik yang sibuk karena tidak butuh aktivitas fisik yang intens, cukup dua kali jalan singkat per hari.",
	},
	{
		id: "pet-004",
		listerId: "lister-001",
		species: "cat",
		name: "Kopi",
		breed: "Domestik Shorthair",
		age: { years: 2, months: 5 },
		sex: "male",
		size: "medium",
		photos: [
			"/images/pets/kopi-1.webp",
			"/images/pets/kopi-2.webp",
			"/images/pets/kopi-3.webp",
		],
		temperamentTags: ["Tenang", "Mandiri", "Terlatih di rumah"],
		medicalStatus: {
			vaksinasi: true,
			sterilisasi: true,
			microchip: false,
			obatCacing: true,
			suratKesehatan: false,
		},
		urgency: "standard",
		locationDistrict: "Jakarta Selatan",
		status: "active",
		story:
			"Kopi adalah kucing jantan berwarna cokelat gelap dengan mata kuning kehijauan yang hangat. Karakternya tenang dan tidak rewel. Ia senang berada di dekat manusia tapi tidak terlalu minta perhatian. Kopi sudah terbiasa hidup di dalam ruangan dan selalu menggunakan kotak pasirnya dengan konsisten. Ia cocok untuk penghuni apartemen maupun rumah.",
	},
	{
		id: "pet-005",
		listerId: "lister-002",
		species: "cat",
		name: "Susu",
		breed: "Persia Campuran",
		age: { years: 1, months: 3 },
		sex: "female",
		size: "small",
		photos: [
			"/images/pets/susu-1.webp",
			"/images/pets/susu-2.webp",
			"/images/pets/susu-3.webp",
		],
		temperamentTags: [
			"Tenang",
			"Ramah dengan anak",
			"Cocok bersama hewan lain",
		],
		medicalStatus: {
			vaksinasi: true,
			sterilisasi: false,
			microchip: false,
			obatCacing: true,
			suratKesehatan: false,
		},
		urgency: "standard",
		locationDistrict: "Depok",
		status: "active",
		story:
			"Susu adalah kucing betina berbulu putih bersih dengan sedikit bercak oranye di telinga. Umurnya masih muda dan ia sangat suka bermain dengan bola benang atau mainan berbulu. Ia tidak penakut dan langsung mau didekati orang asing setelah beberapa menit. Susu sudah hidup berdampingan dengan kucing lain di shelter dan tidak pernah ada konflik.",
	},
	{
		id: "pet-006",
		listerId: "lister-003",
		species: "cat",
		name: "Oranye",
		breed: "Domestik Shorthair",
		age: { years: 0, months: 7 },
		sex: "male",
		size: "small",
		photos: [
			"/images/pets/oranye-1.webp",
			"/images/pets/oranye-2.webp",
			"/images/pets/oranye-3.webp",
		],
		temperamentTags: [
			"Energetik",
			"Ramah dengan anak",
			"Cocok bersama hewan lain",
			"Perlu perhatian ekstra",
		],
		medicalStatus: {
			vaksinasi: true,
			sterilisasi: false,
			microchip: false,
			obatCacing: true,
			suratKesehatan: false,
		},
		urgency: "urgent",
		locationDistrict: "Tangerang",
		status: "active",
		story:
			"Oranye adalah anak kucing jantan berbulu jingga cerah yang ditemukan sendirian di depan minimarket. Usianya sekitar tujuh bulan dan ia masih dalam fase aktif bermain. Ia sangat antusias dan suka memanjat serta berlari-larian. Oranye sudah divaksinasi dasar dan sehat. Ia butuh rumah sebelum akhir bulan karena tempat sementara kami sudah penuh.",
		knownRequirements:
			"Diutamakan adopter yang sudah berpengalaman dengan anak kucing.",
	},
	{
		id: "pet-007",
		listerId: "lister-004",
		species: "cat",
		name: "Biscuit",
		breed: "Domestik Shorthair",
		age: { years: 5, months: 1 },
		sex: "female",
		size: "medium",
		photos: [
			"https://cataas.com/cat?width=800&height=600&tag=cute&i=10",
			"https://cataas.com/cat?width=800&height=600&tag=cute&i=11",
			"https://cataas.com/cat?width=800&height=600&tag=cute&i=12",
		],
		temperamentTags: ["Mandiri", "Tenang", "Terlatih di rumah"],
		medicalStatus: {
			vaksinasi: true,
			sterilisasi: true,
			microchip: true,
			obatCacing: true,
			suratKesehatan: true,
		},
		urgency: "standard",
		locationDistrict: "Jakarta Timur",
		status: "adopted",
		story:
			"Biscuit adalah kucing betina dewasa berwarna krem dengan kepribadian yang tenang dan penuh percaya diri. Ia sudah terbiasa hidup sendiri dan tidak membutuhkan perhatian berlebihan. Biscuit sangat cocok untuk pemilik yang bekerja dari rumah atau yang menginginkan teman yang tidak rewel. Ia sudah diadopsi dan tinggal bahagia bersama keluarga barunya.",
	},
	{
		id: "pet-008",
		listerId: "lister-001",
		species: "cat",
		name: "Manis",
		breed: "Domestik Longhair",
		age: { years: 3, months: 9 },
		sex: "female",
		size: "medium",
		photos: [
			"/images/pets/manis-1.webp",
			"/images/pets/manis-2.webp",
			"/images/pets/manis-3.webp",
		],
		temperamentTags: [
			"Tenang",
			"Ramah dengan anak",
			"Terlatih di rumah",
			"Cocok bersama hewan lain",
		],
		medicalStatus: {
			vaksinasi: true,
			sterilisasi: true,
			microchip: true,
			obatCacing: true,
			suratKesehatan: false,
		},
		urgency: "standard",
		locationDistrict: "Bekasi",
		status: "active",
		story:
			"Manis adalah kucing betina berbulu panjang berwarna abu-abu belang dengan karakter yang sangat mudah bergaul. Ia tidak pernah menggaruk atau menggigit bahkan saat digendong oleh anak kecil. Manis sudah tinggal di shelter selama delapan bulan dan sudah siap untuk pindah ke rumah yang lebih permanen. Ia akan sangat bahagia di rumah yang hangat dengan manusia yang suka memeluk.",
	},
];

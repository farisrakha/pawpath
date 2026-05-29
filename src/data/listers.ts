export type ListerType = "shelter" | "private";
export type VerificationStatus = "pending" | "verified" | "rejected";

export type ListerProfile = {
	id: string;
	userId: string;
	type: ListerType;
	displayName: string;
	bio: string;
	waNumber: string;
	verificationStatus: VerificationStatus;
	adoptionCount: number;
	registrationId: string;
	/** Only present for type: "private" */
	rehomingStory?: string;
};

export const listers: ListerProfile[] = [
	{
		id: "lister-001",
		userId: "user-lister-001",
		type: "shelter",
		displayName: "Paws Rescue Jakarta",
		bio: "Kami adalah yayasan non-profit yang berdiri sejak 2018, berfokus pada penyelamatan dan rehabilitasi anjing dan kucing terlantar di wilayah Jakarta. Tim kami terdiri dari relawan aktif dan dokter hewan mitra yang melakukan pemeriksaan rutin. Setiap hewan yang kami titipkan sudah melalui proses kesehatan dan sosialisasi sebelum siap diadopsi.",
		waNumber: "6281234567001",
		verificationStatus: "verified",
		adoptionCount: 147,
		registrationId: "NIB-8120000741234",
	},
	{
		id: "lister-002",
		userId: "user-lister-002",
		type: "shelter",
		displayName: "Yayasan Sahabat Hewan Depok",
		bio: "Berdiri sejak 2020, Yayasan Sahabat Hewan Depok menampung hewan-hewan terlantar dari wilayah Depok dan sekitarnya. Kami percaya setiap hewan berhak mendapatkan rumah yang penuh kasih sayang. Program adopsi kami melibatkan proses seleksi adopter untuk memastikan hewan mendapatkan lingkungan yang tepat.",
		waNumber: "6281234567002",
		verificationStatus: "verified",
		adoptionCount: 83,
		registrationId: "NIB-9230001852345",
	},
	{
		id: "lister-003",
		userId: "user-lister-003",
		type: "private",
		displayName: "Dian Rahayu",
		bio: "Pecinta kucing selama lebih dari sepuluh tahun. Saya sangat menyayangi Oranye tapi kondisi saat ini tidak memungkinkan saya untuk merawatnya lebih lama.",
		waNumber: "6281234567003",
		verificationStatus: "verified",
		adoptionCount: 1,
		registrationId: "KTP-HASH-a3f7c2d1",
		rehomingStory:
			"Saya harus pindah ke kos yang tidak mengizinkan hewan peliharaan setelah kontrak rumah saya berakhir bulan depan. Saya sudah merawat Oranye sejak ia ditemukan di depan minimarket tujuh bulan lalu. Ia sehat dan sudah divaksinasi. Saya ingin memastikan ia pergi ke tangan yang benar-benar akan merawatnya.",
	},
	{
		id: "lister-004",
		userId: "user-lister-004",
		type: "private",
		displayName: "Hendri Santoso",
		bio: "Saya adalah pemilik hewan yang bertanggung jawab dan ingin memastikan Miko mendapatkan rumah baru yang terbaik sebelum saya pindah ke luar negeri.",
		waNumber: "6281234567004",
		verificationStatus: "verified",
		adoptionCount: 0,
		registrationId: "KTP-HASH-b9e4a1f8",
		rehomingStory:
			"Saya harus relocasi ke luar negeri untuk pekerjaan akhir tahun ini dan tidak ada anggota keluarga yang bisa merawat Miko. Saya sudah merawatnya sejak ia berumur dua bulan dan ia adalah anjing yang sangat baik. Saya ingin menitipkannya ke keluarga yang punya halaman dan waktu untuk memberinya aktivitas fisik yang cukup. Ini bukan keputusan mudah bagi saya.",
	},
];

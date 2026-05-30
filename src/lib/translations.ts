export type Lang = "id" | "en";

export const translations: Record<string, Record<Lang, string>> = {
	// ── nav ────────────────────────────────────────────────────────────────────
	"nav.browse": { id: "Jelajahi", en: "Browse" },
	"nav.myApplications": { id: "Lamaranku", en: "My Applications" },
	"nav.account": { id: "Akun", en: "Account" },
	"nav.dashboard": { id: "Dasbor", en: "Dashboard" },
	"nav.login": { id: "Masuk", en: "Login" },
	"nav.register": { id: "Daftar", en: "Register" },
	"nav.logout": { id: "Keluar", en: "Logout" },

	// ── home ───────────────────────────────────────────────────────────────────
	"home.title": { id: "Temukan sahabat barumu", en: "Find your new companion" },
	"home.subtitle": { id: "Adopsi, bukan beli.", en: "Adopt, don't shop." },
	"home.filterTitle": { id: "Filter pencarian", en: "Search filters" },
	"home.noResults": {
		id: "Tidak ada hewan yang cocok",
		en: "No matching pets found",
	},

	// ── browse page ─────────────────────────────────────────────────────────────
	"browse.header.title": {
		id: "Hewan yang mencari rumah baru",
		en: "Animals looking for a new home",
	},
	"browse.header.accentPhrase": { id: "rumah baru", en: "a new home" },
	"browse.header.subtitle": {
		id: "Anjing dan kucing dari shelter dan penitip terverifikasi di Jabodetabek. Isi profil di sebelah kiri untuk hasil yang lebih relevan.",
		en: "Dogs and cats from verified shelters and listers in Jabodetabek. Fill in the profile on the left for more relevant results.",
	},
	"browse.species.all": { id: "Semua", en: "All" },
	"browse.species.cat": { id: "Kucing", en: "Cats" },
	"browse.species.dog": { id: "Anjing", en: "Dogs" },
	"browse.species.catCard": { id: "Kucing", en: "Cat" },
	"browse.species.dogCard": { id: "Anjing", en: "Dog" },
	"browse.sex.male": { id: "Jantan", en: "Male" },
	"browse.sex.female": { id: "Betina", en: "Female" },
	"browse.size.small": { id: "Kecil", en: "Small" },
	"browse.size.medium": { id: "Sedang", en: "Medium" },
	"browse.size.large": { id: "Besar", en: "Large" },
	"browse.vaccinated": { id: "Sudah vaksin", en: "Vaccinated" },
	"browse.matchSorted": {
		id: "Diurutkan berdasarkan profil kecocokanmu.",
		en: "Sorted by your match profile.",
	},
	"browse.matchProfile": { id: "Profil kecocokan", en: "Match profile" },
	"browse.filterSheetTitle": { id: "Filter kecocokan", en: "Match filters" },
	"browse.filterApply": { id: "Lihat hasil", en: "See results" },
	"browse.filterActive": { id: "Aktif", en: "Active" },
	"browse.filterReset": { id: "Reset semua", en: "Reset all" },
	"browse.filterButton": { id: "Filter", en: "Filter" },
	"browse.filterSection.size": { id: "Ukuran hewan", en: "Pet size" },
	"browse.filterSection.housing": { id: "Jenis hunian", en: "Housing type" },
	"browse.filterSection.household": { id: "Penghuni rumah", en: "Household" },
	"browse.filterSection.otherPets": {
		id: "Hewan lain di rumah",
		en: "Other pets at home",
	},
	"browse.filterSection.activity": {
		id: "Tingkat aktivitas",
		en: "Activity level",
	},
	"browse.filterSection.experience": {
		id: "Pengalamanmu",
		en: "Your experience",
	},
	"browse.countUnit": { id: "hewan", en: "animals" },
	"browse.noResults.title": {
		id: "Tidak ada hewan yang tersedia",
		en: "No animals available",
	},
	"browse.noResults.hint": {
		id: "Coba ganti filter spesies atau ubah profil kecocokan.",
		en: "Try changing the species filter or adjusting your match profile.",
	},
	"browse.urgentBadge": { id: "Mendesak", en: "Urgent" },
	"browse.sortNote": {
		id: "Mendesak ditampilkan lebih awal",
		en: "Urgent listings shown first",
	},
	"browse.filter.housing": { id: "Tempat Tinggal", en: "Housing Type" },
	"browse.filter.household": { id: "Penghuni Rumah", en: "Household" },
	"browse.filter.otherPets": { id: "Hewan Lain", en: "Other Pets" },
	"browse.filter.activity": { id: "Tingkat Aktivitas", en: "Activity Level" },
	"browse.filter.experience": { id: "Pengalaman", en: "Experience" },
	"browse.filter.size": { id: "Ukuran Hewan", en: "Pet Size" },
	"browse.filter.reset": { id: "Reset Filter", en: "Reset Filters" },

	// ── filter option values ────────────────────────────────────────────────────
	"filter.apartemen": { id: "Apartemen", en: "Apartment" },
	"filter.rumah_tanpa_halaman": {
		id: "Rumah tanpa halaman",
		en: "House without yard",
	},
	"filter.rumah_dengan_halaman": {
		id: "Rumah dengan halaman",
		en: "House with yard",
	},
	"filter.dewasa_tunggal": { id: "Dewasa tunggal", en: "Single adult" },
	"filter.pasangan": {
		id: "Pasangan tanpa anak",
		en: "Couple without children",
	},
	"filter.keluarga_anak_kecil": {
		id: "Keluarga dengan anak kecil",
		en: "Family with young children",
	},
	"filter.keluarga_anak_remaja": {
		id: "Keluarga dengan anak remaja",
		en: "Family with teenagers",
	},
	"filter.tidak_ada": { id: "Tidak ada", en: "None" },
	"filter.ada_anjing": { id: "Ada anjing", en: "Have a dog" },
	"filter.ada_kucing": { id: "Ada kucing", en: "Have a cat" },
	"filter.ada_anjing_kucing": {
		id: "Ada anjing dan kucing",
		en: "Have dogs and cats",
	},
	"filter.rendah": { id: "Rendah", en: "Low" },
	"filter.sedang": { id: "Sedang", en: "Moderate" },
	"filter.tinggi": { id: "Tinggi", en: "High" },
	"filter.pemula": { id: "Pemula", en: "Beginner" },
	"filter.berpengalaman": { id: "Berpengalaman", en: "Experienced" },
	"filter.ahli": { id: "Ahli", en: "Expert" },
	"filter.small": { id: "Kecil (<10 kg)", en: "Small (<10 kg)" },
	"filter.medium": { id: "Sedang (10–25 kg)", en: "Medium (10–25 kg)" },
	"filter.large": { id: "Besar (>25 kg)", en: "Large (>25 kg)" },

	// ── pet detail page ─────────────────────────────────────────────────────────
	"pet.applyButton": { id: "Ajukan Adopsi", en: "Apply to Adopt" },
	"pet.adopted": { id: "Sudah Diadopsi", en: "Already Adopted" },
	"pet.urgent": { id: "Mendesak", en: "Urgent" },
	"pet.story": { id: "Tentang", en: "About" },
	"pet.medicalStatus": { id: "Status Kesehatan", en: "Medical Status" },
	"pet.requirements": { id: "Syarat Khusus", en: "Special Requirements" },
	"pet.requirements.label": {
		id: "Persyaratan khusus",
		en: "Special requirements",
	},
	"pet.temperament": { id: "Karakter", en: "Temperament" },
	"pet.listerCard.shelter": {
		id: "Organisasi Terverifikasi",
		en: "Verified Organisation",
	},
	"pet.listerCard.private": {
		id: "Individu Terverifikasi",
		en: "Verified Individual",
	},
	"pet.listerCard.adoptions": {
		id: "adopsi berhasil",
		en: "successful adoptions",
	},
	"pet.listerCard.rehomingStory": {
		id: "Alasan rehoming",
		en: "Rehoming reason",
	},
	"pet.listerCard.contactShelter": {
		id: "Hubungi Shelter",
		en: "Contact Shelter",
	},
	"pet.listerCard.contactPrivate": {
		id: "Hubungi penitip via WhatsApp",
		en: "Contact lister via WhatsApp",
	},
	"pet.listerCard.privateHint": {
		id: "Kontak penitip akan diberikan setelah lamaran mencapai tahap Meet & Greet.",
		en: "Lister contact will be shared once your application reaches the Meet & Greet stage.",
	},
	"pet.listerCard.by": { id: "Dititipkan oleh", en: "Listed by" },
	"pet.listerCard.shelterLabel": { id: "Shelter", en: "Shelter" },
	"pet.listerCard.privateLabel": {
		id: "Penitip mandiri",
		en: "Private lister",
	},
	"pet.alreadyApplied": {
		id: "Anda sudah melamar untuk hewan ini",
		en: "You already applied for this pet",
	},
	"pet.age.year": { id: "tahun", en: "year" },
	"pet.age.years": { id: "tahun", en: "years" },
	"pet.age.month": { id: "bulan", en: "month" },
	"pet.age.months": { id: "bulan", en: "months" },
	"pet.backToList": { id: "Kembali ke daftar", en: "Back to listings" },
	"pet.vitals.age": { id: "Umur", en: "Age" },
	"pet.vitals.sex": { id: "Jenis kelamin", en: "Sex" },
	"pet.vitals.size": { id: "Ukuran", en: "Size" },
	"pet.vitals.location": { id: "Lokasi", en: "Location" },
	"pet.sex.male": { id: "Jantan", en: "Male" },
	"pet.sex.female": { id: "Betina", en: "Female" },
	"pet.species.cat": { id: "Kucing", en: "Cat" },
	"pet.species.dog": { id: "Anjing", en: "Dog" },
	"pet.size.small": { id: "Kecil (<10 kg)", en: "Small (<10 kg)" },
	"pet.size.medium": { id: "Sedang (10–25 kg)", en: "Medium (10–25 kg)" },
	"pet.size.large": { id: "Besar (>25 kg)", en: "Large (>25 kg)" },
	"pet.medical.vaksinasi": { id: "Vaksinasi lengkap", en: "Full vaccination" },
	"pet.medical.sterilisasi": { id: "Sterilisasi", en: "Sterilized" },
	"pet.medical.microchip": { id: "Microchip", en: "Microchip" },
	"pet.medical.obatCacing": { id: "Obat cacing", en: "Dewormed" },
	"pet.medical.suratKesehatan": {
		id: "Surat kesehatan",
		en: "Health certificate",
	},
	"pet.existingApp": { id: "Status lamaranmu", en: "Your application status" },
	"pet.viewApp": { id: "Lihat lamaran", en: "View application" },
	"pet.loginHint": {
		id: "Kamu perlu masuk terlebih dahulu.",
		en: "You need to sign in first.",
	},
	"pet.unavailable": {
		id: "Hewan ini sudah tidak tersedia untuk adopsi.",
		en: "This animal is no longer available for adoption.",
	},

	// ── status labels ──────────────────────────────────────────────────────────
	"status.submitted": { id: "Terkirim", en: "Submitted" },
	"status.under_review": { id: "Sedang Ditinjau", en: "Under Review" },
	"status.meet_greet": { id: "Meet & Greet", en: "Meet & Greet" },
	"status.approved": { id: "Disetujui", en: "Approved" },
	"status.adopted": { id: "Diadopsi", en: "Adopted" },
	"status.rejected": { id: "Ditolak", en: "Rejected" },
	"status.withdrawn": { id: "Dibatalkan", en: "Withdrawn" },

	// ── apply form ─────────────────────────────────────────────────────────────
	"apply.title": { id: "Formulir Adopsi", en: "Adoption Application" },
	"apply.step1.title": { id: "Informasi Pelamar", en: "Applicant Information" },
	"apply.step1.fullName": { id: "Nama Lengkap", en: "Full Name" },
	"apply.step1.phone": { id: "Nomor Telepon", en: "Phone Number" },
	"apply.step1.region": { id: "Wilayah", en: "Region" },
	"apply.step1.housingStatus": { id: "Status Hunian", en: "Housing Status" },
	"apply.step1.rent": { id: "Sewa", en: "Renting" },
	"apply.step1.own": { id: "Milik Sendiri", en: "Own Property" },
	"apply.step1.housingSection": {
		id: "Jenis hunianmu saat ini",
		en: "Your current housing type",
	},
	"apply.step1.householdSection": {
		id: "Komposisi rumah tangga",
		en: "Household composition",
	},
	"apply.step2.title": { id: "Profil Kehidupan", en: "Lifestyle Profile" },
	"apply.step2.housingType": {
		id: "Jenis Tempat Tinggal",
		en: "Housing Type",
	},
	"apply.step2.householdType": {
		id: "Penghuni Rumah",
		en: "Household Composition",
	},
	"apply.step2.otherPets": {
		id: "Hewan Peliharaan Lain",
		en: "Other Pets",
	},
	"apply.step2.activityLevel": {
		id: "Tingkat Aktivitas",
		en: "Activity Level",
	},
	"apply.step2.experience": {
		id: "Pengalaman dengan Hewan",
		en: "Pet Experience",
	},
	"apply.step2.hoursAlone": {
		id: "Jam Ditinggal Sendirian per Hari",
		en: "Hours Left Alone per Day",
	},
	"apply.step2.otherPetsSection": {
		id: "Hewan peliharaan lain di rumah",
		en: "Other pets at home",
	},
	"apply.step2.hoursLabel": {
		id: "Berapa jam hewan akan sendirian per hari?",
		en: "How many hours will the pet be alone per day?",
	},
	"apply.step2.hoursHint": {
		id: "Rata-rata pada hari kerja.",
		en: "Average on weekdays.",
	},
	"apply.step2.hoursError": {
		id: "Masukkan angka antara 0 dan 24.",
		en: "Enter a number between 0 and 24.",
	},
	"apply.step2.hoursPlaceholder": { id: "Contoh: 6", en: "Example: 6" },
	"apply.step2.activitySection": {
		id: "Tingkat aktivitas fisikmu",
		en: "Your physical activity level",
	},
	"apply.step3.title": { id: "Pernyataan Pribadi", en: "Personal Statement" },
	"apply.step3.whyAdopt": {
		id: "Mengapa Anda ingin mengadopsi hewan ini?",
		en: "Why do you want to adopt this pet?",
	},
	"apply.step3.dailyRoutine": {
		id: "Ceritakan rutinitas harian Anda bersama hewan peliharaan.",
		en: "Describe your daily routine with a pet.",
	},
	"apply.step3.additional": {
		id: "Apakah ada yang perlu kami ketahui?",
		en: "Is there anything else we should know?",
	},
	"apply.step3.experienceSection": {
		id: "Pengalamanmu merawat hewan",
		en: "Your experience caring for animals",
	},
	"apply.step3.whyLabel": {
		id: "Mengapa kamu ingin mengadopsi hewan ini?",
		en: "Why do you want to adopt this animal?",
	},
	"apply.step3.routineLabel": {
		id: "Bagaimana rutinitas harianmu?",
		en: "What is your daily routine?",
	},
	"apply.step3.additionalLabel": {
		id: "Informasi tambahan",
		en: "Additional information",
	},
	"apply.step3.additionalOptional": { id: "opsional", en: "optional" },
	"apply.step3.whyPlaceholder": {
		id: "Ceritakan alasanmu dan apa yang membuatmu tertarik dengan hewan ini...",
		en: "Share your reasons and what drew you to this animal...",
	},
	"apply.step3.routinePlaceholder": {
		id: "Ceritakan jadwal harianmu dan bagaimana hewan akan masuk ke dalam rutinitas itu...",
		en: "Describe your daily schedule and how a pet would fit into your routine...",
	},
	"apply.step3.additionalPlaceholder": {
		id: "Hal lain yang ingin kamu sampaikan kepada pemilik...",
		en: "Anything else you'd like to share with the lister...",
	},
	"apply.step3.detailError": {
		id: "Ceritakan lebih detail, minimal 50 karakter.",
		en: "Please elaborate, minimum 50 characters.",
	},
	"apply.step4.title": { id: "Ringkasan & Donasi", en: "Summary & Donation" },
	"apply.step4.donation": {
		id: "Donasi untuk shelter (opsional)",
		en: "Donate to shelter (optional)",
	},
	"apply.step4.donationNote": {
		id: "100% untuk shelter, tidak mempengaruhi seleksi.",
		en: "100% to the shelter, does not affect selection.",
	},
	"apply.step4.submit": { id: "Kirim Lamaran", en: "Submit Application" },
	"apply.step4.skip": { id: "Lewati donasi", en: "Skip donation" },
	"apply.step4.nextSteps": { id: "Langkah berikutnya", en: "Next steps" },
	"apply.step4.donationFor": {
		id: "Donasi sukarela untuk",
		en: "Voluntary donation for",
	},
	"apply.step4.donationHint": {
		id: "Membantu biaya perawatan selama proses adopsi. Sepenuhnya opsional dan tidak mempengaruhi keputusan adopsi.",
		en: "Helps cover care costs during the adoption process. Fully optional and does not affect the adoption decision.",
	},
	"apply.step4.customAmount": { id: "Jumlah lain", en: "Custom amount" },
	"apply.step4.noDonation": { id: "Tidak", en: "No" },
	"apply.step4.customLabel": {
		id: "Jumlah donasi (Rp)",
		en: "Donation amount (Rp)",
	},
	"apply.step4.sending": { id: "Mengirim...", en: "Sending..." },
	"apply.step4.nextStepsDesc": {
		id: "Setelah kamu kirim, {lister} akan meninjau lamaranmu. Jika cocok, kamu akan diundang untuk sesi Meet & Greet.",
		en: "After you submit, {lister} will review your application. If it's a good match, you will be invited for a Meet & Greet session.",
	},
	"apply.back": { id: "Kembali", en: "Back" },
	"apply.next": { id: "Lanjut", en: "Next" },
	"apply.progress": { id: "Langkah", en: "Step" },
	"apply.applicationFor": { id: "Lamaran adopsi", en: "Adoption application" },
	"apply.forPet": { id: "Untuk", en: "For" },
	"apply.at": { id: "di", en: "in" },
	"apply.backToPet": { id: "Kembali ke profil", en: "Back to profile" },
	"apply.backToList": { id: "Kembali ke daftar", en: "Back to listings" },
	"apply.unavailable": {
		id: "Hewan ini sudah tidak tersedia",
		en: "This animal is no longer available",
	},
	"apply.unavailableHint": {
		id: "Cari hewan lain yang membutuhkan rumah baru.",
		en: "Find another animal that needs a new home.",
	},
	"apply.stepLabel.housing": { id: "Hunian", en: "Housing" },
	"apply.stepLabel.lifestyle": { id: "Gaya hidup", en: "Lifestyle" },
	"apply.stepLabel.statement": { id: "Pernyataan", en: "Statement" },
	"apply.stepLabel.confirm": { id: "Konfirmasi", en: "Confirm" },
	"apply.pickOne": { id: "Pilih salah satu.", en: "Choose one." },
	"apply.charCount": { id: "karakter", en: "characters" },
	"apply.authTitle": {
		id: "Masuk untuk mengajukan lamaran",
		en: "Sign in to apply",
	},
	"apply.authDesc": {
		id: "Kamu perlu masuk terlebih dahulu sebelum mengajukan lamaran adopsi.",
		en: "You need to sign in before you can apply to adopt.",
	},
	"apply.toast.success": {
		id: "Lamaran untuk {name} berhasil dikirim!",
		en: "Application for {name} sent successfully!",
	},
	"apply.toast.error": {
		id: "Gagal mengirim lamaran. Coba lagi.",
		en: "Failed to send application. Please try again.",
	},
	// apply form option values (enum values stored in localStorage — value unchanged, label translated)
	"apply.homeType.apt": { id: "Apartemen", en: "Apartment" },
	"apply.homeType.noYard": {
		id: "Rumah tanpa halaman",
		en: "House without yard",
	},
	"apply.homeType.sharedYard": {
		id: "Rumah dengan halaman bersama",
		en: "House with shared yard",
	},
	"apply.homeType.privateYard": {
		id: "Rumah dengan halaman pribadi",
		en: "House with private yard",
	},
	"apply.household.single": { id: "Dewasa tunggal", en: "Single adult" },
	"apply.household.couple": {
		id: "Pasangan tanpa anak",
		en: "Couple without children",
	},
	"apply.household.youngKids": {
		id: "Keluarga dengan anak kecil (<10 tahun)",
		en: "Family with young children (<10 years)",
	},
	"apply.household.teens": {
		id: "Keluarga dengan anak remaja",
		en: "Family with teenagers",
	},
	"apply.otherPets.none": { id: "Tidak ada", en: "None" },
	"apply.otherPets.dog": { id: "Ada anjing", en: "Have a dog" },
	"apply.otherPets.cat": { id: "Ada kucing", en: "Have a cat" },
	"apply.otherPets.both": {
		id: "Ada anjing dan kucing",
		en: "Have dogs and cats",
	},
	"apply.activity.low": { id: "Rendah", en: "Low" },
	"apply.activity.moderate": { id: "Sedang", en: "Moderate" },
	"apply.activity.high": { id: "Tinggi", en: "High" },
	"apply.experience.beginner": {
		id: "Pemula (belum pernah punya hewan)",
		en: "Beginner (never had a pet)",
	},
	"apply.experience.experienced": {
		id: "Berpengalaman (pernah punya hewan)",
		en: "Experienced (have had pets)",
	},
	"apply.experience.expert": {
		id: "Ahli (pernah bekerja dengan hewan)",
		en: "Expert (have worked with animals)",
	},

	// ── my applications ─────────────────────────────────────────────────────────
	"myapp.title": { id: "Lamaran Saya", en: "My Applications" },
	"myapp.empty": { id: "Belum ada lamaran", en: "No applications yet" },
	"myapp.emptyHint": {
		id: "Temukan hewan yang cocok dan ajukan adopsi.",
		en: "Find a matching pet and apply to adopt.",
	},
	"myapp.browseCTA": { id: "Jelajahi Hewan", en: "Browse Pets" },
	"myapp.appliedOn": { id: "Diajukan pada", en: "Applied on" },
	"myapp.viewWA": { id: "Hubungi via WhatsApp", en: "Contact via WhatsApp" },
	"myapp.withdraw": { id: "Batalkan Lamaran", en: "Withdraw Application" },
	"myapp.statusLog": { id: "Riwayat Status", en: "Status History" },
	"myapp.lifestyle": { id: "Profil Kehidupan", en: "Lifestyle Profile" },
	"myapp.statement": { id: "Pernyataan Pribadi", en: "Personal Statement" },
	"myapp.subtitle": {
		id: "Pantau status semua lamaran adopsimu di satu tempat.",
		en: "Track all your adoption applications in one place.",
	},
	"myapp.active": { id: "Aktif", en: "Active" },
	"myapp.closed": { id: "Selesai", en: "Completed" },
	"myapp.sentOn": { id: "Dikirim", en: "Submitted" },
	"myapp.viewProfile": { id: "Lihat profil", en: "View profile" },
	"myapp.statusHistory": { id: "Riwayat status", en: "Status history" },
	"myapp.history": { id: "Riwayat", en: "History" },
	"myapp.withdrawBtn": { id: "Cabut lamaran", en: "Withdraw" },
	"myapp.withdrawConfirm": {
		id: "Yakin cabut?",
		en: "Sure you want to withdraw?",
	},
	"myapp.withdrawYes": { id: "Ya, cabut", en: "Yes, withdraw" },
	"myapp.authTitle": {
		id: "Masuk untuk melihat lamaranmu",
		en: "Sign in to see your applications",
	},
	"myapp.authDesc": {
		id: "Lamaran adopsimu tersimpan di akun ini. Masuk untuk memantaunya.",
		en: "Your adoption applications are stored in this account. Sign in to track them.",
	},

	// ── dashboard ──────────────────────────────────────────────────────────────
	"dashboard.title": { id: "Dasbor Shelter", en: "Shelter Dashboard" },
	"dashboard.tabs.all": { id: "Semua", en: "All" },
	"dashboard.tabs.review": { id: "Ditinjau", en: "Under Review" },
	"dashboard.tabs.meetgreet": { id: "Meet & Greet", en: "Meet & Greet" },
	"dashboard.tabs.approved": { id: "Disetujui", en: "Approved" },
	"dashboard.tabs.waiting": { id: "Menunggu", en: "Pending" },
	"dashboard.action.advance": {
		id: "Lanjut ke Meet & Greet",
		en: "Advance to Meet & Greet",
	},
	"dashboard.action.approve": { id: "Setujui", en: "Approve" },
	"dashboard.action.reject": { id: "Tolak", en: "Reject" },
	"dashboard.action.markAdopted": {
		id: "Tandai Diadopsi",
		en: "Mark as Adopted",
	},
	"dashboard.action.review": { id: "Tinjau", en: "Review" },
	"dashboard.action.inviteMeetGreet": {
		id: "Undang Meet & Greet",
		en: "Invite to Meet & Greet",
	},
	"dashboard.action.approveAdoption": {
		id: "Setujui adopsi",
		en: "Approve adoption",
	},
	"dashboard.action.rejectReason": {
		id: "Alasan penolakan (opsional)",
		en: "Rejection reason (optional)",
	},
	"dashboard.empty": {
		id: "Belum ada lamaran masuk.",
		en: "No applications received yet.",
	},
	"dashboard.noAppsTab": {
		id: "Tidak ada lamaran di kategori ini.",
		en: "No applications in this category.",
	},
	"dashboard.stats.total": { id: "Total lamaran", en: "Total applications" },
	"dashboard.stats.pending": { id: "Perlu ditinjau", en: "Needs review" },
	"dashboard.stats.meetgreet": { id: "Meet & Greet", en: "Meet & Greet" },
	"dashboard.stats.adopted": {
		id: "Berhasil diadopsi",
		en: "Successfully adopted",
	},
	"dashboard.myPets": { id: "Hewanmu", en: "Your animals" },
	"dashboard.applications": { id: "lamaran", en: "applications" },
	"dashboard.done": { id: "Selesai", en: "Done" },
	"dashboard.applicant": { id: "Pelamar", en: "Applicant" },
	"dashboard.pendingBadge": { id: "perlu ditinjau", en: "pending review" },
	"dashboard.listerNotFound": {
		id: "Profil lister tidak ditemukan",
		en: "Lister profile not found",
	},
	"dashboard.listerNotFoundHint": {
		id: "Akunmu belum terdaftar sebagai shelter atau penitip.",
		en: "Your account is not registered as a shelter or lister.",
	},
	"dashboard.backHome": { id: "Kembali ke beranda", en: "Back to home" },

	// ── auth pages ─────────────────────────────────────────────────────────────
	"auth.login.title": { id: "Masuk ke PawPath", en: "Sign in to PawPath" },
	"auth.login.email": { id: "Email", en: "Email" },
	"auth.login.password": { id: "Kata Sandi", en: "Password" },
	"auth.login.submit": { id: "Masuk", en: "Sign in" },
	"auth.login.noAccount": {
		id: "Belum punya akun?",
		en: "Don't have an account?",
	},
	"auth.register.title": {
		id: "Buat akun PawPath",
		en: "Create a PawPath account",
	},
	"auth.register.submit": { id: "Daftar", en: "Register" },
	"auth.register.hasAccount": {
		id: "Sudah punya akun?",
		en: "Already have an account?",
	},

	// login page
	"login.welcomeBack": { id: "Selamat datang kembali", en: "Welcome back" },
	"login.subtitle": {
		id: "Masuk untuk melihat lamaran adopsimu dan memantau statusnya.",
		en: "Sign in to view your adoption applications and track their status.",
	},
	"login.email": { id: "Email", en: "Email" },
	"login.password": { id: "Kata sandi", en: "Password" },
	"login.forgotPassword": { id: "Lupa Password?", en: "Forgot Password?" },
	"login.passwordPlaceholder": {
		id: "Masukkan kata sandi",
		en: "Enter password",
	},
	"login.submit": { id: "Masuk", en: "Sign in" },
	"login.noAccount": { id: "Belum punya akun?", en: "Don't have an account?" },
	"login.registerNow": { id: "Daftar sekarang", en: "Register now" },
	"login.emailPlaceholder": { id: "nama@email.com", en: "name@email.com" },
	"login.demoPrompt": {
		id: "Ingin mencoba dulu? Gunakan akun demo",
		en: "Want to try first? Use the demo account",
	},
	"login.demoFill": {
		id: "Isi otomatis akun demo",
		en: "Auto-fill demo account",
	},
	"login.demoAnyPassword": {
		id: "dengan kata sandi apa pun.",
		en: "with any password.",
	},
	"login.emailError": {
		id: "Masukkan alamat emailmu.",
		en: "Enter your email address.",
	},
	"login.passwordError": {
		id: "Masukkan kata sandimu.",
		en: "Enter your password.",
	},
	"login.defaultError": {
		id: "Email atau kata sandi salah.",
		en: "Incorrect email or password.",
	},
	"login.showPassword": { id: "Tampilkan kata sandi", en: "Show password" },
	"login.hidePassword": { id: "Sembunyikan kata sandi", en: "Hide password" },

	// register page
	"register.title": {
		id: "Buat akun PawPath",
		en: "Create a PawPath account",
	},
	"register.subtitle": {
		id: "Satu akun untuk mencari hewan, mengajukan adopsi, dan memantau prosesnya.",
		en: "One account to search for animals, apply to adopt, and track the process.",
	},
	"register.hasAccount": {
		id: "Sudah punya akun?",
		en: "Already have an account?",
	},
	"register.loginHere": { id: "Masuk di sini", en: "Sign in here" },
	"register.fullName": { id: "Nama lengkap", en: "Full name" },
	"register.fullNamePlaceholder": {
		id: "Contoh: Sari Wijaya",
		en: "Example: Jane Smith",
	},
	"register.email": { id: "Email", en: "Email" },
	"register.emailPlaceholder": {
		id: "nama@email.com",
		en: "name@email.com",
	},
	"register.password": { id: "Kata sandi", en: "Password" },
	"register.passwordPlaceholder": {
		id: "Minimal 8 karakter",
		en: "Minimum 8 characters",
	},
	"register.passwordHint": {
		id: "Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.",
		en: "Use at least 8 characters with a mix of letters and numbers.",
	},
	"register.termsPrefix": { id: "Saya menyetujui", en: "I agree to the" },
	"register.termsLink": { id: "Syarat Layanan", en: "Terms of Service" },
	"register.termsAnd": { id: "dan", en: "and" },
	"register.privacyLink": { id: "Kebijakan Privasi", en: "Privacy Policy" },
	"register.submit": { id: "Daftar", en: "Register" },
	"register.nameError": {
		id: "Nama lengkap wajib diisi.",
		en: "Full name is required.",
	},
	"register.emailError": { id: "Email wajib diisi.", en: "Email is required." },
	"register.emailInvalid": {
		id: "Format email tidak valid.",
		en: "Invalid email format.",
	},
	"register.termsError": {
		id: "Kamu perlu menyetujui Syarat Layanan dan Kebijakan Privasi.",
		en: "You need to agree to the Terms of Service and Privacy Policy.",
	},
	"register.passMin": {
		id: "Kata sandi minimal 8 karakter.",
		en: "Password must be at least 8 characters.",
	},
	"register.passLetter": {
		id: "Kata sandi harus memuat minimal satu huruf.",
		en: "Password must contain at least one letter.",
	},
	"register.passNumber": {
		id: "Kata sandi harus memuat minimal satu angka.",
		en: "Password must contain at least one number.",
	},
	"register.submitError": {
		id: "Pendaftaran gagal. Coba lagi.",
		en: "Registration failed. Please try again.",
	},
	"register.showPassword": {
		id: "Tampilkan kata sandi",
		en: "Show password",
	},
	"register.hidePassword": {
		id: "Sembunyikan kata sandi",
		en: "Hide password",
	},

	// forgot password page
	"forgotpw.title": { id: "Lupa kata sandi?", en: "Forgot your password?" },
	"forgotpw.subtitle": {
		id: "Masukkan emailmu dan kami kirimkan tautan untuk mengaturnya kembali.",
		en: "Enter your email and we will send you a link to reset it.",
	},
	"forgotpw.email": { id: "Email", en: "Email" },
	"forgotpw.emailPlaceholder": {
		id: "nama@email.com",
		en: "name@email.com",
	},
	"forgotpw.submit": { id: "Kirim tautan reset", en: "Send reset link" },
	"forgotpw.rememberPassword": {
		id: "Ingat kata sandimu?",
		en: "Remember your password?",
	},
	"forgotpw.loginHere": { id: "Masuk di sini", en: "Sign in here" },
	"forgotpw.emailError": {
		id: "Masukkan alamat emailmu.",
		en: "Enter your email address.",
	},
	"forgotpw.emailInvalid": {
		id: "Format email tidak valid.",
		en: "Invalid email format.",
	},
	"forgotpw.sentTitle": { id: "Cek emailmu", en: "Check your email" },
	"forgotpw.sentSubtitle": {
		id: "Ikuti tautan di email untuk membuat kata sandi baru.",
		en: "Follow the link in the email to create a new password.",
	},
	"forgotpw.sentDesc": {
		id: "Kami telah mengirim tautan reset ke emailmu di",
		en: "We have sent a reset link to your email at",
	},
	"forgotpw.spamHint": {
		id: "Tidak menerima email? Cek folder spam atau coba kirim ulang.",
		en: "Didn't receive the email? Check your spam folder or try again.",
	},
	"forgotpw.resend": { id: "Kirim ulang tautan", en: "Resend link" },
	"forgotpw.backToLogin": {
		id: "Kembali ke halaman masuk",
		en: "Back to sign in",
	},

	// auth gate
	"authgate.loading": { id: "Memuat", en: "Loading" },
	"authgate.defaultTitle": {
		id: "Masuk untuk melihat halaman ini",
		en: "Sign in to view this page",
	},
	"authgate.defaultDesc": {
		id: "Halaman ini berisi data akunmu. Masuk dulu untuk melanjutkan.",
		en: "This page contains your account data. Sign in to continue.",
	},
	"authgate.login": { id: "Masuk", en: "Sign in" },
	"authgate.register": { id: "Daftar", en: "Register" },

	// ── footer ─────────────────────────────────────────────────────────────────
	"footer.tagline": {
		id: "Marketplace adopsi anjing dan kucing di Jabodetabek. Temukan hewan yang membutuhkan rumah baru dan ajukan lamaran dengan mudah.",
		en: "Dog and cat adoption marketplace in Jabodetabek. Find animals that need a new home and apply with ease.",
	},
	"footer.adopt": { id: "Adopsi", en: "Adoption" },
	"footer.account": { id: "Akun", en: "Account" },
	"footer.browse": { id: "Jelajahi hewan", en: "Browse animals" },
	"footer.myApps": { id: "Lamaranku", en: "My Applications" },
	"footer.shelterDash": { id: "Dashboard shelter", en: "Shelter Dashboard" },
	"footer.myAccount": { id: "Akun saya", en: "My Account" },
	"footer.login": { id: "Masuk", en: "Sign in" },
	"footer.register": { id: "Daftar", en: "Register" },
	"footer.copyright": {
		id: "Prototipe untuk tujuan peragaan. Layanan mencakup Jabodetabek.",
		en: "Prototype for demonstration purposes. Service covers Jabodetabek.",
	},

	// ── landing page ───────────────────────────────────────────────────────────
	"landing.hero.eyebrow": {
		id: "Temukan sahabat yang menunggu",
		en: "Find a companion waiting for you",
	},
	"landing.hero.line1": {
		id: "Ada yang sedang menunggu",
		en: "Someone is waiting",
	},
	"landing.hero.line2": {
		id: "seseorang seperti kamu.",
		en: "for someone like you.",
	},
	"landing.hero.sub": {
		id: "Anjing dan kucing dari shelter terverifikasi di Jabodetabek. Isi profil kecocokan dan kami carikan yang paling pas.",
		en: "Dogs and cats from verified shelters in Jabodetabek. Fill your match profile and we'll find the best fit.",
	},
	"landing.hero.cta": { id: "Temukan hewanmu", en: "Find your companion" },
	"landing.hero.ctaSecondary": {
		id: "Atau isi profil kecocokan dulu",
		en: "Or fill your match profile first",
	},
	"landing.hero.badge": { id: "hewan menunggu", en: "animals waiting" },
	"landing.trust.stat1value": { id: "120+", en: "120+" },
	"landing.trust.stat1label": { id: "hewan tersedia", en: "animals available" },
	"landing.trust.stat2value": { id: "15", en: "15" },
	"landing.trust.stat2label": {
		id: "shelter terverifikasi",
		en: "verified shelters",
	},
	"landing.trust.stat3value": { id: "80+", en: "80+" },
	"landing.trust.stat3label": {
		id: "adopsi berhasil",
		en: "successful adoptions",
	},
	"landing.steps.label": { id: "Cara kerjanya", en: "How it works" },
	"landing.steps.headline1": {
		id: "Bingung harus mulai",
		en: "Not sure where",
	},
	"landing.steps.headline2": { id: "dari mana?", en: "to start?" },
	"landing.steps.body": {
		id: "Tidak semua hewan cocok untuk semua orang. PawPath punya profil kecocokan: beberapa pertanyaan singkat tentang hunian dan gaya hidupmu.",
		en: "Not every pet fits every person. PawPath has a match profile: a few quick questions about your home and lifestyle.",
	},
	"landing.steps.cta": {
		id: "Isi profil kecocokan",
		en: "Fill match profile",
	},
	"landing.steps.s1title": {
		id: "Isi profil kecocokan",
		en: "Fill your match profile",
	},
	"landing.steps.s1body": {
		id: "Beberapa pertanyaan singkat tentang rumah dan gaya hidupmu.",
		en: "A few quick questions about your home and lifestyle.",
	},
	"landing.steps.s2title": {
		id: "Lihat hewan yang cocok",
		en: "See matching pets",
	},
	"landing.steps.s2body": {
		id: "Hasil diurutkan berdasarkan kecocokan dengan profilmu.",
		en: "Results sorted by match with your profile.",
	},
	"landing.steps.s3title": {
		id: "Hubungi shelter",
		en: "Contact the shelter",
	},
	"landing.steps.s3body": {
		id: "Ajukan lamaran dan jadwalkan pertemuan langsung.",
		en: "Apply and schedule a meet and greet directly.",
	},
	"landing.featured.label": { id: "Sedang menunggu", en: "Currently waiting" },
	"landing.featured.headline1": { id: "Hewan yang", en: "Pets that are" },
	"landing.featured.headline2": {
		id: "sedang menunggu",
		en: "waiting for you",
	},
	"landing.featured.viewAll": {
		id: "Lihat semua hewan",
		en: "View all pets",
	},
	"landing.shelter.label": { id: "Janji kami", en: "Our promise" },
	"landing.shelter.headline1": { id: "Diadopsi dari", en: "Adopted from" },
	"landing.shelter.headline2": {
		id: "shelter terpercaya",
		en: "trusted shelters",
	},
	"landing.shelter.body": {
		id: "Setiap hewan yang terdaftar berasal dari shelter atau penitip yang sudah kami verifikasi langsung.",
		en: "Every listed animal comes from a shelter or rehomer we have verified directly.",
	},
	"landing.cta.headline1": {
		id: "Siapa tahu, hewanmu",
		en: "Your companion",
	},
	"landing.cta.headline2": {
		id: "sudah menunggu di sana.",
		en: "might already be waiting.",
	},
	"landing.cta.sub": {
		id: "Tidak perlu daftar untuk mulai melihat. Jelajahi langsung, gratis.",
		en: "No sign-up needed to start browsing. Explore now, free.",
	},
	"landing.cta.button": { id: "Mulai jelajahi", en: "Start browsing" },

	// ── common ─────────────────────────────────────────────────────────────────
	"common.loading": { id: "Memuat...", en: "Loading..." },
	"common.error": { id: "Terjadi kesalahan.", en: "Something went wrong." },
	"common.back": { id: "Kembali", en: "Back" },
	"common.save": { id: "Simpan", en: "Save" },
	"common.cancel": { id: "Batal", en: "Cancel" },
	"common.confirm": { id: "Konfirmasi", en: "Confirm" },
	"common.verified": { id: "Terverifikasi", en: "Verified" },
};

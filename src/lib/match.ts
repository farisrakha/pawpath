import type { MatchProfile } from "@/context/MatchProfileContext";
import type { PetListing, TemperamentTag } from "@/data/pets";

export type MatchLevel = "high" | "medium" | "low" | "none";

export type MatchResult = {
	score: number;
	level: MatchLevel;
	label: string;
};

const SIZE_ORDER: Record<string, number> = { small: 0, medium: 1, large: 2 };

const ENERGETIC_TAGS = new Set<TemperamentTag>(["Energetik"]);
const CALM_TAGS = new Set<TemperamentTag>(["Tenang", "Mandiri"]);

function petEnergyLevel(pet: PetListing): "tinggi" | "sedang" | "rendah" {
	const energetic = pet.temperamentTags.some((t) => ENERGETIC_TAGS.has(t));
	const calm = pet.temperamentTags.some((t) => CALM_TAGS.has(t));
	if (energetic && !calm) return "tinggi";
	if (calm && !energetic) return "rendah";
	return "sedang";
}

export function computeMatch(
	pet: PetListing,
	profile: MatchProfile,
): MatchResult {
	const activeCount = Object.values(profile).filter((v) => v !== null).length;
	if (activeCount === 0) return { score: -1, level: "none", label: "" };

	let score = 0;
	let max = 0;

	// Size preference — weight 25
	if (profile.sizePreference) {
		max += 25;
		if (pet.size === profile.sizePreference) {
			score += 25;
		} else {
			const diff = Math.abs(
				SIZE_ORDER[pet.size] - SIZE_ORDER[profile.sizePreference],
			);
			if (diff === 1) score += 10;
		}
	}

	// Activity level — weight 25
	if (profile.activityLevel) {
		max += 25;
		const petEnergy = petEnergyLevel(pet);
		if (petEnergy === profile.activityLevel) {
			score += 25;
		} else if (profile.activityLevel === "sedang" || petEnergy === "sedang") {
			score += 15;
		}
	}

	// Other pets — weight 20
	if (profile.otherPets && profile.otherPets !== "tidak_ada") {
		max += 20;
		if (pet.temperamentTags.includes("Cocok bersama hewan lain")) score += 20;
	}

	// Housing type — weight 20
	if (profile.housingType) {
		max += 20;
		if (profile.housingType === "apartemen") {
			if (pet.size === "small") score += 20;
			else if (
				pet.size === "medium" &&
				!pet.temperamentTags.includes("Energetik")
			)
				score += 14;
			else if (pet.size === "large") score += 4;
			else score += 10;
		} else if (profile.housingType === "rumah_dengan_halaman") {
			score += 20;
		} else {
			if (pet.size === "small") score += 20;
			else if (
				pet.size === "medium" &&
				!pet.temperamentTags.includes("Energetik")
			)
				score += 16;
			else score += 8;
		}
	}

	// Household composition — weight 10
	if (profile.householdType) {
		max += 10;
		const hasKids =
			profile.householdType === "keluarga_anak_kecil" ||
			profile.householdType === "keluarga_anak_remaja";
		if (hasKids) {
			score += pet.temperamentTags.includes("Ramah dengan anak") ? 10 : 4;
		} else {
			score += 10;
		}
	}

	const pct = max > 0 ? Math.round((score / max) * 100) : -1;

	let level: MatchLevel;
	let label: string;
	if (pct >= 80) {
		level = "high";
		label = "Sangat cocok";
	} else if (pct >= 55) {
		level = "medium";
		label = "Cocok";
	} else {
		level = "low";
		label = "Kurang cocok";
	}

	return { score: pct, level, label };
}

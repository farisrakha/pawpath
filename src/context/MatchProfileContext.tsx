import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { safeGet, safeSet } from "@/lib/storage";

// ── Types ─────────────────────────────────────────────────────────────────────

export type HousingType =
	| "apartemen"
	| "rumah_tanpa_halaman"
	| "rumah_dengan_halaman";

export type HouseholdType =
	| "dewasa_tunggal"
	| "pasangan"
	| "keluarga_anak_kecil"
	| "keluarga_anak_remaja";

export type OtherPetsFilter =
	| "tidak_ada"
	| "ada_anjing"
	| "ada_kucing"
	| "ada_anjing_kucing";

export type ActivityLevelFilter = "rendah" | "sedang" | "tinggi";

export type ExperienceFilter = "pemula" | "berpengalaman" | "ahli";

export type SizePreference = "small" | "medium" | "large";

export type MatchProfile = {
	housingType: HousingType | null;
	householdType: HouseholdType | null;
	otherPets: OtherPetsFilter | null;
	activityLevel: ActivityLevelFilter | null;
	experience: ExperienceFilter | null;
	sizePreference: SizePreference | null;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const MATCH_KEY = "pawpath_match_profile";

const DEFAULT_PROFILE: MatchProfile = {
	housingType: null,
	householdType: null,
	otherPets: null,
	activityLevel: null,
	experience: null,
	sizePreference: null,
};

// ── Context ───────────────────────────────────────────────────────────────────

interface MatchProfileContextValue {
	matchProfile: MatchProfile;
	updateFilter: <K extends keyof MatchProfile>(
		key: K,
		value: MatchProfile[K],
	) => void;
	resetFilters: () => void;
	hasActiveFilters: () => boolean;
}

const MatchProfileContext = createContext<MatchProfileContextValue | null>(
	null,
);

// ── Provider ──────────────────────────────────────────────────────────────────

export function MatchProfileProvider({ children }: { children: ReactNode }) {
	const [matchProfile, setMatchProfile] =
		useState<MatchProfile>(DEFAULT_PROFILE);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setMatchProfile(safeGet<MatchProfile>(MATCH_KEY, DEFAULT_PROFILE));
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (hydrated) safeSet(MATCH_KEY, matchProfile);
	}, [matchProfile, hydrated]);

	const updateFilter = useCallback(
		<K extends keyof MatchProfile>(key: K, value: MatchProfile[K]) => {
			setMatchProfile((prev) => ({ ...prev, [key]: value }));
		},
		[],
	);

	const resetFilters = useCallback(() => {
		setMatchProfile(DEFAULT_PROFILE);
	}, []);

	const hasActiveFilters = useCallback((): boolean => {
		return Object.values(matchProfile).some((v) => v !== null);
	}, [matchProfile]);

	const value = useMemo<MatchProfileContextValue>(
		() => ({
			matchProfile,
			updateFilter,
			resetFilters,
			hasActiveFilters,
		}),
		[matchProfile, updateFilter, resetFilters, hasActiveFilters],
	);

	return (
		<MatchProfileContext.Provider value={value}>
			{children}
		</MatchProfileContext.Provider>
	);
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useMatchProfile(): MatchProfileContextValue {
	const ctx = useContext(MatchProfileContext);
	if (!ctx)
		throw new Error(
			"useMatchProfile must be used within <MatchProfileProvider> (see <PawPathProviders>).",
		);
	return ctx;
}

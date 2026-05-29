import type { ReactNode } from "react";

import { ApplicationProvider } from "./ApplicationContext";
import { AuthProvider } from "./AuthContext";
import { LanguageProvider } from "./LanguageContext";
import { MatchProfileProvider } from "./MatchProfileContext";

// ── Hooks ─────────────────────────────────────────────────────────────────────

export type {
	Application,
	ApplicationStatus,
	LifestyleData,
	PersonalStatement,
} from "@/data/applications";
export { useApplications } from "./ApplicationContext";
export type { AuthUser, UserRole } from "./AuthContext";
export { DEMO_EMAIL, useAuth } from "./AuthContext";
export { useLanguage } from "./LanguageContext";
export type {
	ActivityLevelFilter,
	ExperienceFilter,
	HouseholdType,
	HousingType,
	MatchProfile,
	OtherPetsFilter,
	SizePreference,
} from "./MatchProfileContext";
export { useMatchProfile } from "./MatchProfileContext";

// ── Composed provider ─────────────────────────────────────────────────────────

/**
 * Wraps the entire app: LanguageProvider > AuthProvider > ApplicationProvider > MatchProfileProvider.
 * LanguageProvider is outermost so t() is available everywhere.
 * ApplicationProvider is nested inside AuthProvider because it calls useAuth internally.
 */
export function PawPathProviders({ children }: { children: ReactNode }) {
	return (
		<LanguageProvider>
			<AuthProvider>
				<ApplicationProvider>
					<MatchProfileProvider>{children}</MatchProfileProvider>
				</ApplicationProvider>
			</AuthProvider>
		</LanguageProvider>
	);
}

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import {
	type Application,
	type ApplicationStatus,
	type LifestyleData,
	type PersonalStatement,
	applications as seedApplications,
} from "@/data/applications";
import { uid } from "@/lib/ids";
import { safeGet, safeSet } from "@/lib/storage";

import { useAuth } from "./AuthContext";

// ── Constants ─────────────────────────────────────────────────────────────────

const APPS_KEY = "pawpath_applications";

// ── Context ───────────────────────────────────────────────────────────────────

interface ApplicationContextValue {
	applications: Application[];
	submitApplication: (
		petId: string,
		lifestyleData: LifestyleData,
		personalStatement: PersonalStatement,
		donationAmount: number | null,
	) => Application;
	withdrawApplication: (applicationId: string) => void;
	updateApplicationStatus: (
		applicationId: string,
		newStatus: ApplicationStatus,
	) => void;
	getApplicationByPet: (petId: string) => Application | undefined;
	getMyApplications: () => Application[];
}

const ApplicationContext = createContext<ApplicationContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function ApplicationProvider({ children }: { children: ReactNode }) {
	const { user } = useAuth();
	const [applications, setApplications] = useState<Application[]>([]);
	const [hydrated, setHydrated] = useState(false);

	// On first load seed from static data if nothing is in localStorage yet.
	useEffect(() => {
		const stored = safeGet<Application[] | null>(APPS_KEY, null);
		setApplications(stored ?? seedApplications);
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (hydrated) safeSet(APPS_KEY, applications);
	}, [applications, hydrated]);

	const submitApplication = useCallback(
		(
			petId: string,
			lifestyleData: LifestyleData,
			personalStatement: PersonalStatement,
			donationAmount: number | null,
		): Application => {
			const now = new Date().toISOString();
			const submitted: ApplicationStatus = "submitted";
			const newApp: Application = {
				id: uid("app"),
				petId,
				applicantId: user?.id ?? "anonymous",
				lifestyleData,
				personalStatement,
				donationAmount,
				status: submitted,
				statusLog: [{ status: submitted, timestamp: now }],
				createdAt: now,
				updatedAt: now,
			};
			setApplications((prev) => [...prev, newApp]);
			return newApp;
		},
		[user],
	);

	const updateApplicationStatus = useCallback(
		(applicationId: string, newStatus: ApplicationStatus) => {
			const now = new Date().toISOString();
			setApplications((prev) =>
				prev.map((a) => {
					if (a.id !== applicationId) return a;
					return {
						...a,
						status: newStatus,
						statusLog: [...a.statusLog, { status: newStatus, timestamp: now }],
						updatedAt: now,
					};
				}),
			);
		},
		[],
	);

	const withdrawApplication = useCallback((applicationId: string) => {
		const now = new Date().toISOString();
		const withdrawn: ApplicationStatus = "withdrawn";
		setApplications((prev) =>
			prev.map((a) => {
				if (a.id !== applicationId || a.status === "adopted") return a;
				return {
					...a,
					status: withdrawn,
					statusLog: [...a.statusLog, { status: withdrawn, timestamp: now }],
					updatedAt: now,
				};
			}),
		);
	}, []);

	const getApplicationByPet = useCallback(
		(petId: string): Application | undefined => {
			if (!user) return undefined;
			return applications.find(
				(a) => a.petId === petId && a.applicantId === user.id,
			);
		},
		[applications, user],
	);

	const getMyApplications = useCallback((): Application[] => {
		if (!user) return [];
		return applications.filter((a) => a.applicantId === user.id);
	}, [applications, user]);

	const value = useMemo<ApplicationContextValue>(
		() => ({
			applications,
			submitApplication,
			withdrawApplication,
			updateApplicationStatus,
			getApplicationByPet,
			getMyApplications,
		}),
		[
			applications,
			submitApplication,
			withdrawApplication,
			updateApplicationStatus,
			getApplicationByPet,
			getMyApplications,
		],
	);

	return (
		<ApplicationContext.Provider value={value}>
			{children}
		</ApplicationContext.Provider>
	);
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useApplications(): ApplicationContextValue {
	const ctx = useContext(ApplicationContext);
	if (!ctx)
		throw new Error(
			"useApplications must be used within <ApplicationProvider> (see <PawPathProviders>).",
		);
	return ctx;
}

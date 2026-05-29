import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

import { uid } from "@/lib/ids";
import { safeGet, safeRemove, safeSet } from "@/lib/storage";

// ── Types ────────────────────────────────────────────────────────────────────

export type UserRole = "adopter" | "shelter_admin" | "private_lister";

export type AuthUser = {
	id: string;
	email: string;
	displayName: string;
	role: UserRole;
};

// ── Constants ─────────────────────────────────────────────────────────────────

export const DEMO_EMAIL = "demo@pawpath.id";

const DEMO_USER: AuthUser = {
	id: "user-demo",
	email: DEMO_EMAIL,
	displayName: "Demo Adopter",
	role: "adopter",
};

const AUTH_KEY = "pawpath_auth";
const SESSION_KEY = "pawpath_session";

// ── Context ───────────────────────────────────────────────────────────────────

interface AuthContextValue {
	user: AuthUser | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => { ok: boolean; message?: string };
	register: (data: { name: string; email: string; password: string }) => {
		ok: boolean;
		message?: string;
	};
	logout: () => void;
	updateUser: (data: Partial<Pick<AuthUser, "displayName">>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [session, setSession] = useState(false);
	const [hydrated, setHydrated] = useState(false);

	// Hydrate from localStorage once on mount.
	useEffect(() => {
		setUser(safeGet<AuthUser | null>(AUTH_KEY, null));
		setSession(safeGet<boolean>(SESSION_KEY, false));
		setHydrated(true);
	}, []);

	useEffect(() => {
		if (!hydrated) return;
		if (user) safeSet(AUTH_KEY, user);
	}, [user, hydrated]);

	useEffect(() => {
		if (hydrated) safeSet(SESSION_KEY, session);
	}, [session, hydrated]);

	const login = useCallback(
		(email: string, _password: string): { ok: boolean; message?: string } => {
			const normalized = email.trim().toLowerCase();
			if (normalized === DEMO_EMAIL) {
				// Any password works for the demo account.
				setUser((prev) => prev ?? DEMO_USER);
				setSession(true);
				return { ok: true };
			}
			const stored = safeGet<AuthUser | null>(AUTH_KEY, null);
			if (stored && stored.email.toLowerCase() === normalized) {
				setUser(stored);
				setSession(true);
				return { ok: true };
			}
			return {
				ok: false,
				message:
					"Email tidak terdaftar. Gunakan demo@pawpath.id atau daftar terlebih dahulu.",
			};
		},
		[],
	);

	const register = useCallback(
		(data: {
			name: string;
			email: string;
			password: string;
		}): { ok: boolean; message?: string } => {
			const newUser: AuthUser = {
				id: uid("user"),
				email: data.email.trim().toLowerCase(),
				displayName: data.name.trim(),
				role: "adopter",
			};
			setUser(newUser);
			setSession(true);
			safeSet(AUTH_KEY, newUser);
			return { ok: true };
		},
		[],
	);

	const logout = useCallback(() => {
		setSession(false);
		safeRemove(SESSION_KEY);
	}, []);

	const updateUser = useCallback(
		(data: Partial<Pick<AuthUser, "displayName">>) => {
			setUser((prev) => (prev ? { ...prev, ...data } : prev));
		},
		[],
	);

	const value = useMemo<AuthContextValue>(
		() => ({
			user,
			isAuthenticated: session && user !== null,
			login,
			register,
			logout,
			updateUser,
		}),
		[user, session, login, register, logout, updateUser],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext);
	if (!ctx)
		throw new Error(
			"useAuth must be used within <AuthProvider> (see <PawPathProviders>).",
		);
	return ctx;
}

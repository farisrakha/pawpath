import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";

import { safeGet, safeSet } from "@/lib/storage";
import type { Lang } from "@/lib/translations";
import { translations } from "@/lib/translations";

interface LanguageContextValue {
	lang: Lang;
	setLang: (lang: Lang) => void;
	t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "pawpath_lang";

function getInitialLang(): Lang {
	const stored = safeGet<string>(STORAGE_KEY, "id");
	return stored === "en" ? "en" : "id";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [lang, setLangState] = useState<Lang>(getInitialLang);

	function setLang(next: Lang) {
		setLangState(next);
		safeSet(STORAGE_KEY, next);
	}

	function t(key: string): string {
		return translations[key]?.[lang] ?? key;
	}

	return (
		<LanguageContext.Provider value={{ lang, setLang, t }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage(): LanguageContextValue {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
	return ctx;
}

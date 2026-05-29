import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/lib/translations";

const OPTIONS: { value: Lang; label: string }[] = [
	{ value: "id", label: "ID" },
	{ value: "en", label: "EN" },
];

export function LanguageToggle() {
	const { lang, setLang } = useLanguage();

	return (
		<div className="flex items-center rounded-lg border border-border bg-muted/40 p-0.5">
			{OPTIONS.map(({ value, label }) => (
				<button
					key={value}
					type="button"
					onClick={() => setLang(value)}
					aria-pressed={lang === value}
					className={[
						"rounded-md px-2.5 py-1 text-xs font-semibold tracking-wider transition-all duration-150",
						lang === value
							? "bg-primary text-white shadow-sm"
							: "text-muted-foreground hover:text-foreground active:scale-95",
					].join(" ")}
				>
					{label}
				</button>
			))}
		</div>
	);
}

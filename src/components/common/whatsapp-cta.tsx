import { MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface WhatsAppCtaProps {
	phone: string;
	label: string;
	size?: "sm" | "default";
	className?: string;
}

export function WhatsAppCta({
	phone,
	label,
	size = "default",
	className,
}: WhatsAppCtaProps) {
	return (
		<a
			href={`https://wa.me/${phone}`}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"inline-flex min-h-11 items-center bg-wa-green font-semibold text-background transition-opacity hover:opacity-90",
				size === "default"
					? "w-full justify-center gap-2 rounded-xl px-4 py-2.5 text-sm"
					: "justify-start gap-1.5 rounded-lg px-3 py-1.5 text-xs",
				className,
			)}
		>
			<MessageCircle className={size === "default" ? "size-4" : "size-3.5"} />
			{label}
		</a>
	);
}

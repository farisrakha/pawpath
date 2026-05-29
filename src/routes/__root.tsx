import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { PawPathProviders } from "@/context";
import { track } from "@/lib/analytics";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover",
			},
			{
				name: "theme-color",
				content: "#d65a4a",
			},
			{
				title: "PawPath — Adopsi hewan peliharaan di Jabodetabek",
			},
			{
				name: "description",
				content:
					"PawPath adalah marketplace adopsi dan penitipan hewan di Jabodetabek. Temukan anjing dan kucing yang membutuhkan rumah baru, ajukan adopsi, dan pantau status lamaran Anda.",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
	}),
	shellComponent: RootDocument,
	component: RootComponent,
});

function RootComponent() {
	useEffect(() => {
		track("session_start");
	}, []);

	return (
		<PawPathProviders>
			<AppShell>
				<Outlet />
			</AppShell>
		</PawPathProviders>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="id">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

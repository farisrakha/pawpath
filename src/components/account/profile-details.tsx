import { Pencil } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context";

export function ProfileDetails() {
	const fieldId = useId();
	const { user, updateUser } = useAuth();
	const [editing, setEditing] = useState(false);
	const [draft, setDraft] = useState("");
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (user) setDraft(user.displayName);
	}, [user]);

	if (!user) return null;

	const startEdit = () => {
		setDraft(user.displayName);
		setError(null);
		setEditing(true);
	};

	const save = (e: React.FormEvent) => {
		e.preventDefault();
		if (!draft.trim()) {
			setError("Nama wajib diisi.");
			return;
		}
		updateUser({ displayName: draft.trim() });
		setEditing(false);
	};

	if (!editing) {
		return (
			<div className="flex flex-col gap-4">
				<dl className="grid gap-4 sm:grid-cols-2">
					<div>
						<dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
							Nama tampilan
						</dt>
						<dd className="mt-1 text-sm text-foreground">{user.displayName}</dd>
					</div>
					<div>
						<dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
							Email
						</dt>
						<dd className="mt-1 break-all text-sm text-foreground">
							{user.email}
						</dd>
					</div>
				</dl>
				<div>
					<Button variant="outline" size="sm" onClick={startEdit}>
						<Pencil className="size-3.5" />
						Ubah nama
					</Button>
				</div>
			</div>
		);
	}

	return (
		<form onSubmit={save} className="flex flex-col gap-4" noValidate>
			<div className="flex flex-col gap-1.5 sm:max-w-xs">
				<Label htmlFor={`${fieldId}-name`}>Nama tampilan</Label>
				<Input
					id={`${fieldId}-name`}
					value={draft}
					onChange={(e) => {
						setDraft(e.target.value);
						setError(null);
					}}
					className="h-10"
					aria-invalid={!!error}
				/>
				{error ? <p className="text-xs text-destructive">{error}</p> : null}
			</div>
			<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
				<Button
					type="button"
					variant="outline"
					size="lg"
					onClick={() => setEditing(false)}
				>
					Batal
				</Button>
				<Button type="submit" size="lg">
					Simpan
				</Button>
			</div>
		</form>
	);
}

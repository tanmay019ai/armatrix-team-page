"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { TeamCard } from "@/components/TeamCard";
import { getTeamMembers, type TeamMember } from "@/services/api";


export function TeamGrid() {
	const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://armatrix-team-page.onrender.com";
	const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

	const loadTeamMembers = useCallback(async () => {
		setIsLoading(true);
		setErrorMessage(null);

		try {
			const members = await getTeamMembers();
			setTeamMembers(members);
		} catch {
			const apiHint = apiBaseUrl.replace(/\/$/, "");
			setErrorMessage(
				`The team service is unavailable right now. Make sure the FastAPI backend is reachable at ${apiHint} and try again.`,
			);
		} finally {
			setIsLoading(false);
		}
	}, [apiBaseUrl]);

	useEffect(() => {
		loadTeamMembers();
	}, [loadTeamMembers]);

	useEffect(() => {
		if (!selectedMember) {
			return undefined;
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setSelectedMember(null);
			}
		}

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [selectedMember]);

	return (
		<>
			{isLoading ? (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
					{Array.from({ length: 4 }).map((_, index) => (
						<div
							key={index}
							className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-[0_24px_70px_rgba(2,6,23,0.38)] backdrop-blur"
						>
							<div className="aspect-[4/4.7] animate-pulse bg-slate-900/90" />
							<div className="space-y-3 p-6">
								<div className="h-3 w-24 animate-pulse rounded-full bg-slate-800" />
								<div className="h-7 w-40 animate-pulse rounded-full bg-slate-800" />
								<div className="h-4 w-32 animate-pulse rounded-full bg-slate-800" />
								<div className="h-4 w-full animate-pulse rounded-full bg-slate-800" />
								<div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-800" />
							</div>
						</div>
					))}
				</div>
			) : errorMessage ? (
				<div className="rounded-[1.75rem] border border-rose-400/20 bg-rose-500/10 p-6 shadow-[0_24px_70px_rgba(2,6,23,0.38)] backdrop-blur">
					<p className="text-base font-semibold text-rose-200">Unable to load team members</p>
					<p className="mt-2 max-w-2xl text-sm leading-6 text-rose-100/80">{errorMessage}</p>
					<button
						type="button"
						onClick={loadTeamMembers}
						className="mt-5 rounded-full bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-400"
					>
						Retry request
					</button>
				</div>
			) : (
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
					{teamMembers.map((member, index) => (
						<TeamCard key={member.id} member={member} index={index} onSelect={setSelectedMember} />
					))}
				</div>
			)}

			<AnimatePresence>
				{selectedMember ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm"
						onClick={() => setSelectedMember(null)}
					>
						<motion.aside
							initial={{ x: 120, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: 120, opacity: 0 }}
							transition={{ type: "spring", stiffness: 220, damping: 26 }}
							role="dialog"
							aria-modal="true"
							aria-labelledby="team-member-title"
							onClick={(event) => event.stopPropagation()}
							className="h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.98),rgba(7,15,31,0.96))] p-6 shadow-2xl md:p-8"
						>
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
										{selectedMember.department}
									</p>
									<h2 id="team-member-title" className="mt-3 text-3xl font-semibold text-white">
										{selectedMember.name}
									</h2>
									<p className="mt-2 text-base text-slate-300">{selectedMember.role}</p>
								</div>
								<button
									type="button"
									onClick={() => setSelectedMember(null)}
									className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/10"
								>
									Close
								</button>
							</div>

							<div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900">
								<img
									src={selectedMember.photo_url}
									alt={selectedMember.name}
									className="aspect-[5/4] w-full object-cover"
								/>
							</div>

							<div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.38)]">
								<p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">
									Bio
								</p>
								<p className="mt-4 text-base leading-8 text-slate-300">{selectedMember.bio}</p>

								{selectedMember.linkedin ? (
									<a
										href={selectedMember.linkedin}
										target="_blank"
										rel="noreferrer"
										className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100"
									>
										<LinkedInIcon className="h-4 w-4" />
										View LinkedIn profile
									</a>
								) : null}
							</div>
						</motion.aside>
					</motion.div>
				) : null}
			</AnimatePresence>
		</>
	);
}


type LinkedInIconProps = {
	className?: string;
};


function LinkedInIcon({ className }: LinkedInIconProps) {
	return (
		<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
			<path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3C4.17 3 3.5 3.72 3.5 4.67C3.5 5.6 4.15 6.33 5.21 6.33H5.23C6.33 6.33 7 5.6 7 4.67C6.98 3.72 6.33 3 5.25 3ZM20.5 12.49C20.5 9.12 18.71 7.55 16.32 7.55C14.39 7.55 13.53 8.62 13.05 9.36V8.5H9.67C9.71 9.07 9.67 19.5 9.67 19.5H13.05V13.36C13.05 13.03 13.07 12.69 13.17 12.45C13.43 11.79 14.03 11.1 15.03 11.1C16.34 11.1 16.87 12.1 16.87 13.57V19.5H20.25V13.18C20.25 9.79 18.45 8.5 16.05 8.5C14.66 8.5 13.78 9.27 13.44 9.8H13.41V9.75L13.44 9.8H13.41C13.42 9.77 13.43 9.76 13.44 9.75V8.5H10.06C10.1 9.07 10.06 19.5 10.06 19.5H13.44V13.36C13.44 13.03 13.46 12.69 13.56 12.45C13.82 11.79 14.42 11.1 15.42 11.1C16.73 11.1 17.26 12.1 17.26 13.57V19.5H20.64V12.49H20.5Z" />
		</svg>
	);
}

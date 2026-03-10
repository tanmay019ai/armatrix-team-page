"use client";

import { motion } from "framer-motion";

import type { TeamMember } from "@/services/api";


type TeamCardProps = {
  member: TeamMember;
  index: number;
  onSelect: (member: TeamMember) => void;
};


export function TeamCard({ member, index, onSelect }: TeamCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_24px_70px_rgba(2,6,23,0.45)] backdrop-blur transition-colors duration-300"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      {member.linkedin ? (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${member.name}'s LinkedIn profile`}
          onClick={(event) => event.stopPropagation()}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/12 bg-slate-950/70 p-2 text-slate-200 shadow-sm backdrop-blur transition hover:border-cyan-300/50 hover:text-cyan-200"
        >
          <LinkedInIcon className="h-4 w-4" />
        </a>
      ) : null}

      <motion.button
        type="button"
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => onSelect(member)}
        className="block w-full text-left"
      >
        <div className="relative aspect-[4/4.7] overflow-hidden">
          <img
            src={member.photo_url}
            alt={member.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent opacity-80" />
        </div>

        <div className="space-y-3 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
              {member.department}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{member.name}</h2>
            <p className="mt-2 text-sm font-medium text-slate-300">{member.role}</p>
          </div>

          <p className="line-clamp-3 text-sm leading-6 text-slate-400">
            {member.bio}
          </p>
        </div>
      </motion.button>
    </motion.article>
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
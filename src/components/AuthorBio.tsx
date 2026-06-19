import React from 'react';

interface AuthorBioProps {
    name: string;
    role: string;
    bio: string;
    avatarUrl: string;
}

export default function AuthorBio({ name, role, bio, avatarUrl }: AuthorBioProps) {
    return (
        <div className="mt-12 p-6 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center gap-4">
            <img
                src={avatarUrl}
                alt={name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white m-0">{name}</h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium m-0 mb-2">{role}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400 m-0 leading-relaxed">{bio}</p>
            </div>
        </div>
    );
}
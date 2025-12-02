import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Topbar = ({ title, user }) => {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <h1 className="text-xl font-bold text-slate-800">{title}</h1>

            <div className="flex items-center gap-6">
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none w-64"
                    />
                </div>

                <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-bold text-slate-700">{user?.name || 'User'}</div>
                        <div className="text-xs text-slate-500 capitalize">{user?.role || 'Role'}</div>
                    </div>
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <User className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;

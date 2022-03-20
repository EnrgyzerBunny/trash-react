import React from "react";

function Navigation() {
    return (
        <nav className="flex shadow-lg bg-stone-100 dark:bg-stone-500">
            <div className="flex flex-none group">
                <div className="flex py-2 rounded-lg group-hover:bg-stone-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-2 stroke-stone-500 dark:stroke-stone-300 group-hover:bg-stone-400 group-hover:stroke-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <a href="/homepage" className="rounded-lg px-3 text-stone-500 dark:text-stone-300 font-medium group-hover:bg-stone-400 group-hover:text-stone-900">DotaTrash</a>
                </div>
            </div>
            <div className="flex flex-auto sm:justify-center space-x-4">
                {[
                    ['Home', '/dashboard'],
                    ['Team', '/team'],
                    ['Players', '/players'],
                    ['Schedule', '/schedule'],
                ].map(([title, url]) => (
                    <a href={url} className="rounded-lg px-3 py-2 text-stone-500 dark:text-stone-300 font-medium hover:bg-stone-400 hover:text-stone-900">{title}</a>
                ))}
            </div>
            <div className="flex flex-none px-3">
                <div className="flex relative h-10 w-10 bg-stone-300 dark:bg-stone-400 rounded-full">
                    {/*<img className="inline-block mx-auto h-10 w-10 rounded-full sm:mx-0 sm:shrink-0 bg-stone-300" src="" alt="" />
                    */}
                    <span className="flex-auto font-medium text-xs text-center py-3">Profile</span>
                    <span className="absolute rounded-full h-3 w-3 bottom-0 right-0 bg-green-500"></span>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
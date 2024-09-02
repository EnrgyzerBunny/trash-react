import React from "react";
import OAuthButton from "./OAuthButton";
import DiscordAvatar from "./DiscordAvatar";
import { Link } from 'react-router-dom';
import { GetUser, IsAuth } from '../auth';

function Navigation() {

    var navItems = IsAuth()? 
    [ //if auth
        ['Home', '/'],
        ['Team', '/team'],
        ['Matchup', '/matchup'],
        ['Groups', '/groups'],
        ['Players', '/players'],
        //['Schedule', '/schedule'],
    ]
    :
    [ //if unauth
        ['Home', '/'],
        ['Matchup', '/matchup'],
        ['Groups', '/groups'],
        ['Players', '/players'],
        //['Schedule', '/schedule'],
    ];

    var id = JSON.parse(localStorage.getItem('discord-user')!);
    if (id !== null)
    {
        id = id.id;
    }
    if (id !== null && (
        id === "109498432921546752" ||
        id === "93387395000446976" ||
        id === "148123232254296065"
    ))
    {
        navItems.push(['Admin','/admindirect']);
    }

    return (
        <nav className="flex shadow-lg bg-stone-100 dark:bg-stone-500 min-w-fit ">
            <div className="flex flex-none group">
                <div className="flex space-x-2 px-2 py-2 rounded-lg group-hover:bg-stone-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-2 stroke-stone-500 dark:stroke-stone-300 group-hover:bg-stone-400 group-hover:stroke-stone-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <Link to="/" className="rounded-lg text-stone-500 dark:text-stone-300 font-medium group-hover:bg-stone-400 group-hover:text-stone-900">DotaTrash</Link>
                </div>
            </div>
            <div className="flex flex-auto sm:justify-center space-x-4">
                {navItems.map(([title, url]) => (
                    <Link to={url} key={title} className="rounded-lg px-3 py-2 text-stone-500 dark:text-stone-300 font-medium hover:bg-stone-400 hover:text-stone-900">{title}</Link>
                ))}
            </div>
            <div className="flex flex-none px-3 group">
                { localStorage.getItem('discord-token') === null ? <OAuthButton /> : <DiscordAvatar /> }
            </div>
        </nav>
    );
}

export default Navigation;
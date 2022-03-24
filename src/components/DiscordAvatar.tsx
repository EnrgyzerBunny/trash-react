import React, { useState, useEffect } from "react";

function DiscordAvatar() {
    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState((sessionStorage.getItem('discord-user') !== null));
    const [user, setUser]: any = useState(JSON.parse(sessionStorage.getItem('discord-user')!));
    console.log(isLoaded);

    let imgString: string = user !== null ? ("https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar) : "";

    useEffect(() => {
        if (sessionStorage.getItem('discord-token') !== null && !isLoaded) {
            let token = JSON.parse(sessionStorage.getItem('discord-token')!);
            let head = new Headers();
            head.append('Authorization', 'Bearer ' + token.access_token);

            const init = {
                method: 'GET',
                headers: head,
            };

            fetch("https://discord.com/api/v8/users/@me", init)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        sessionStorage.setItem('discord-user', JSON.stringify(result))
                        setUser(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }

    }, [isLoaded])


    return (
        <div className="flex relative h-10 w-10 bg-stone-300 dark:bg-stone-400 rounded-full">
            {(!isLoaded) ?
                <div className="animate-pulse inline-block mx-auto h-10 w-10 rounded-full sm:mx-0 sm:shrink-0 bg-stone-900" /> :
                <img className="inline-block mx-auto h-10 w-10 rounded-full sm:mx-0 sm:shrink-0 bg-stone-300" src={imgString} alt="" />}
            {/*<span className="absolute rounded-full h-3 w-3 bottom-0 right-0 bg-green-500"></span>*/}
        </div>
    );
}

export default DiscordAvatar;
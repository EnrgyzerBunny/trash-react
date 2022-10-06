import React, { useState, useEffect } from "react";
import { IsAuth, GetUser, Signout } from "../auth";

function DiscordAvatar() {
  //const [error, setError]: any = useState(null);
  const [isLoaded, setIsLoaded]: any = useState(
    localStorage.getItem("discord-user") !== null
  );
  const [user, setUser]: any = useState(
    JSON.parse(localStorage.getItem("discord-user")!)
  );
  //console.log(isLoaded);

  let imgString: string =
    user !== null
      ? "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar
      : "";

  useEffect(() => {
    if (IsAuth() && !isLoaded) {
      const callback = (user: any) => {
        if (user != null) {
          setIsLoaded(true);
          setUser(user);
        }
      };

      GetUser(callback);
    }
  }, [isLoaded]);

  return (
    <>
      <div className="flex relative h-10 w-10 bg-stone-300 dark:bg-stone-400 rounded-full">
        {!isLoaded ? (
          <div className="animate-pulse inline-block mx-auto h-10 w-10 rounded-full sm:mx-0 sm:shrink-0 bg-stone-900" />
        ) : (
          <img
            className="inline-block mx-auto h-10 w-10 rounded-full sm:mx-0 sm:shrink-0 bg-stone-300"
            src={imgString}
            alt=""
          />
        )}
        {/*<span className="absolute rounded-full h-3 w-3 bottom-0 right-0 bg-green-500"></span>*/}
      </div>
      <button
        onClick={() => Signout(() => window.location.reload())}
        className=" px-2 rounded-lg text-stone-500 dark:text-stone-300 font-medium group-hover:bg-stone-400 group-hover:text-stone-900"
      >
        Signout
      </button>
    </>
  );
}

export default DiscordAvatar;

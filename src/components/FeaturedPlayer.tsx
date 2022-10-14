import React, { useEffect, useState } from "react";
import ContentPanel from "./ContentPanel";
import ODLogo from '../assets/OD-logo.png';
import DBLogo from '../assets/DB-logo.png';
const seedrandom = require('seedrandom');


function FeaturedPlayer(props: any) {
    const [player, setPlayer]: any = useState({});
    //const [freeAgents, setFreeAgents] = useState(false);
    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [playerImg, setPlayerImg]: any = useState(null);



    const Role = (roleId: number) => {
        switch (roleId) {
            case 1:
                return "Core";
            case 2:
                return "Support";
            case 4:
                return "Mid";
            default:
                return "Unknown";
        }
    };

    useEffect(() => {
        //console.log("called");
        fetch("https://sea.ddns.net/api/players")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (result.length > 0) {
                        var ran = new seedrandom(new Date().toISOString().slice(0, 10));
                        var index = Math.round(ran.quick() * (result.length - 1));
                        setPlayer(result[index]);
                        setPlayerImg("https://cdn.cloudflare.steamstatic.com/apps/dota2/players/" + result[index].AccountID + ".png");
                    }

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                }
            )
    }, []);

    if (error) {
        return <ContentPanel><div>Error: {error.message}</div></ContentPanel>;
    } else if (!isLoaded) {
        return <ContentPanel><div>Loading...</div></ContentPanel>;
    } else {
        return (
            <ContentPanel>Today's Featured Player:
                <div className="flex flex-col min-w-full py-2">
                    <table className="flex-auto table-fixed">
                        <tbody>
                            <tr>
                                <td className="w-1/5">
                                    <img src={playerImg} alt="" className="bg-stone-600 shadow-lg" />
                                </td>
                                <td className="w-3/5 align-top px-4">
                                    <table className="w-full table-fixed border-collapse">
                                        <tbody>
                                            <tr className="">
                                                <td className="flex-auto text-left">
                                                    <div className="font-bold text-xl">
                                                        {player.PlayerName}
                                                    </div>
                                                </td>
                                                <td className="flex-none px-2 w-12">
                                                    <a href={"https://www.opendota.com/players/" + player.AccountID}>
                                                        <img src={ODLogo} alt="OpenDota" className="w-8" />
                                                    </a>
                                                </td>
                                                <td className="flex-none w-9">
                                                    <a href={"https://www.dotabuff.com/esports/players/" + player.AccountID}>
                                                        <img src={DBLogo} alt="Dotabuff" className="w-8" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="text-l">
                                                        {player.ProTeamName}
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="text-l">
                                                        {Role(player.FantasyRole)}
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="text-l">
                                                        {(player.TeamName != null) ? player.TeamName : "Free Agent"}
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </ContentPanel>
        );
    }
};

export default FeaturedPlayer;
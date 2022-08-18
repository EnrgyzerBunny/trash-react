import React, { useState, useEffect } from "react";
import {
    Routes,
    Route,
    useParams,
    Link
} from "react-router-dom";

import PageWrapper from "../components/PageWrapper"
import ContentPanel from "../components/ContentPanel"
import ODLogo from '../assets/OD-logo.png'
import DBLogo from '../assets/DB-logo.png'

type RosterListing = {
    TeamName: string,
    ProTeamName: string,
    ProTeamTag: string,
    PlayerID: number,
    PlayerName: string,
    AccountID: string,
    FantasyRole: number,
    PlayStatus: number
};

function PlayerPage() {

    return (
        <Routes>
            <Route path="/:id" element={<PlayerDetails />} />
        </Routes>
    );
};
//TODO: API call pulls info but page displays in teams page format - needs to be updated
//DB player url: https://www.dotabuff.com/esports/players/<id>
//OD player url: https://www.opendota.com/players/<id>
//Dota2 esports page play imgs: https://cdn.cloudflare.steamstatic.com/apps/dota2/players/<id>.png
function PlayerDetails() {
    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [player, setPlayer]: any = useState([]);
    const [teamName, setTeamName]: any = useState(null);
    const [playerImg, setPlayerImg]: any = useState(null);

    let { id }: any = useParams<"id">();

    const Role = (roleId: number) => {
        switch (roleId) {
            case 1:
                return "Core";
            case 2:
                return "Support";
            case 4:
                return "Offlane";
            default:
                return "Unknown";
        }
    };

    useEffect(() => {
        fetch("https://sea.ddns.net/api/playerdetails?id=" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (result.length > 0) {
                        setPlayer(result[0]);
                        setPlayerImg("https://cdn.cloudflare.steamstatic.com/apps/dota2/players/" + result[0].AccountID + ".png");
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [id])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <PageWrapper>
                <div className="col-start-3 col-end-7 flex flex-col">
                    <ContentPanel>
                        <div className="flex flex-col min-w-full">
                            <table className="flex-auto table-fixed">
                                <tr>
                                    <td className="w-2/5">
                                        <img src={playerImg} alt="" className="bg-stone-600 shadow-lg" />
                                    </td>
                                    <td className="w-3/5 align-top px-4">
                                        <table className="w-full table-fixed border-collapse">
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
                                                        {(player.TeamName != null)? player.TeamName : "Free Agent"}
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                            </table>

                        </div>
                    </ContentPanel>
                </div>
            </PageWrapper>
        );
    }
}

export default PlayerPage;
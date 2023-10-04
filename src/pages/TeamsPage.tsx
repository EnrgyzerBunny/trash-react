import React, { useState, useEffect } from "react";
import {
    Routes,
    Route,
    useParams
} from "react-router-dom";

import PageWrapper from "../components/PageWrapper"
import ContentPanel from "../components/ContentPanel"

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

function TeamsPage() {

    return (
        <Routes>
            <Route path="/:id" element={<TeamDetails />} />
        </Routes>
    );
};

function TeamDetails() {
    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [items, setItems]: any = useState([]);
    const [teamName, setTeamName]: any = useState(null);
    const [teamImg, setTeamImg]: any = useState("https://dotatrashblob.blob.core.windows.net/avatars/team-null.png");

    let { id }: any = useParams<"id">();

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
        fetch("https://sea.ddns.net/api/teamdetails?team=" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    result.sort((a: RosterListing, b: RosterListing) => { return a.FantasyRole - b.FantasyRole; })
                    if (result.length > 0) {
                        setTeamName(result[0].TeamName);
                        setTeamImg("https://dotatrashblob.blob.core.windows.net/avatars/team-" + result[0].TeamName + ".png");
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
                            <div className="w-2/5 pb-4">
                                <img src={teamImg} alt="" onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "https://dotatrashblob.blob.core.windows.net/avatars/team-null.png";
                                }} className="bg-stone-600 shadow-lg rounded-xl" />
                            </div>
                            <div className="font-bold text-xl py-4">
                                {teamName}
                            </div>
                            <div className="flex-auto py-4">
                                Active Players:
                            </div>
                            <table className="flex-auto table-fixed border-collapse border border-stone-500">
                                <thead>
                                    <tr>
                                        <th className="w-2/5 border border-stone-600 bg-stone-600">Player</th>
                                        <th className="w-2/5 border border-stone-600 bg-stone-600">Team</th>
                                        <th className="w-1/5 border border-stone-600 bg-stone-600">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item: RosterListing) => (
                                        (item.PlayStatus === 1) ?
                                            <tr key={"row" + item.PlayerID}>
                                                <td key={"name" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{item.PlayerName}</td>
                                                <td key={"team" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{item.ProTeamName}</td>
                                                <td key={"role" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{Role(item.FantasyRole)}</td>
                                            </tr>
                                            :
                                            null
                                    ))}
                                </tbody>
                            </table>
                            <div className="py-4 pt-6">
                                Benched Players:
                            </div>
                            <table className="flex-auto table-fixed border-collapse border border-stone-500">
                                <thead>
                                    <tr>
                                        <th className="w-2/5 border border-stone-600 bg-stone-600">Player</th>
                                        <th className="w-2/5 border border-stone-600 bg-stone-600">Team</th>
                                        <th className="w-1/5 border border-stone-600 bg-stone-600">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item: RosterListing) => (
                                        (item.PlayStatus === 0) ?
                                            <tr key={"row" + item.PlayerID}>
                                                <td key={"name" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{item.PlayerName}</td>
                                                <td key={"team" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{item.ProTeamName}</td>
                                                <td key={"role" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{Role(item.FantasyRole)}</td>
                                            </tr>
                                            :
                                            null
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ContentPanel>
                </div>
            </PageWrapper>
        );
    }
}

export default TeamsPage;
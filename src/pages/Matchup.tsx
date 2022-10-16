import React, { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import ContentPanel from '../components/ContentPanel';
import { Link } from 'react-router-dom';
import Chip from '../components/Chip';
import { IsAuth } from '../auth';

function MatchupPage() {
    const [matchups, setMatchups]: any = useState([]);
    const [playerRows, setPlayerRows]: any = useState([]);
    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [isLive, setIsLive]: any = useState(false);

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

    function GetTeamRows(teamID: any) {
        //console.log("searching " + teamID + "| team rows " + playerRows.length);
        for (var i = 0; i < playerRows.length; i++) {
            if (playerRows[i].TeamID === teamID) {
                return playerRows[i];
            }
        }

        return null;
    }

    function UserMatchup(index: any) {

        if (matchups[index] == null || playerRows.length <= 0) {
            return (<></>);
        }

        //console.log(JSON.stringify(matchups[index]));

        var teamA = GetTeamRows(matchups[index].TeamA_ID);
        var teamB = GetTeamRows(matchups[index].TeamB_ID);

        if (teamA === null) {
            //console.log("Team A Null");
            return (<></>);
        }

        return (
            <div>
                <table className="flex-auto table-fixed w-full border-collapse ">

                    <tbody>
                        <tr key={"row" + teamA.TeamID + "vs" + teamB.TeamID}>
                            <td key={"teamname-a" + teamA.TeamID} className="w-1/2 px-2 py-2 text-lg">{teamA.TeamName} - {teamA.Points.toFixed(2)}</td>
                            <td key={"teamname-a" + teamB.TeamID} className="w-1/2 text-right px-2 py-2 text-lg">{teamB.Points.toFixed(2)} - {teamB.TeamName}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="flex-auto table-auto w-full border-collapse border border-stone-500">
                    <thead>
                        <tr>
                            <th className=" border border-stone-600 bg-stone-600 text-sm">Player</th>
                            <th className=" border border-stone-600 bg-stone-600 text-sm">Team</th>
                            <th className=" border border-stone-600 bg-stone-600 text-sm">Games</th>
                            <th className=" border border-stone-600 bg-stone-600 text-sm">Points</th>
                            <th className=" border border-stone-600 bg-stone-600 text-sm"></th>
                            <th className=" border border-stone-600 bg-stone-600 text-sm">Points</th>
                            <th className=" border border-stone-600 bg-stone-600 text-sm">Games</th>
                            <th className=" border border-stone-600 bg-stone-600 text-sm">Team</th>
                            <th className=" border border-stone-600 bg-stone-600 text-sm">Player</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamA.Players.map((item: any, i: any) => (
                            <tr key={"row" + item.PlayerID + "-" + teamB.Players[i].PlayerID}>
                                <td key={"name-a" + item.PlayerID} className={`border w-2/12 px-2 py-2 border-stone-600 font-normal text-sm ${(item.PlayStatus === 1) ? '' : ' bg-stone-400 opacity-70'}`}><Link to={"/player/" + item.PlayerID}><Chip textSize="sm">{item.PlayerName}</Chip></Link></td>
                                <td key={"team-a" + item.PlayerID} className={`border w-1/12 text-center px-2 py-2 border-stone-600 font-normal text-sm ${(item.PlayStatus === 1) ? '' : ' bg-stone-400 opacity-70'}`}>{item.ProTeamTag}</td>
                                <td key={"points-a" + item.PlayerID} className={`border w-1/12 text-center px-2 py-2 border-stone-600 font-normal text-sm ${(item.PlayStatus === 1) ? '' : ' bg-stone-400 opacity-70'}`}>{item["Result Rows"]}</td>
                                <td key={"rows-a" + item.PlayerID} className={`border w-1/12 text-center px-2 py-2 border-stone-600 font-normal text-sm ${(item.PlayStatus === 1) ? '' : ' bg-stone-400 opacity-70'}`}>{item.Points}</td>
                                <td key={"vs" + item.PlayerID} className="border w-1/12 text-center px-2 py-2 border-stone-600 bg-stone-600 font-normal text-sm">{(item.FantasyRole === teamB.Players[i].FantasyRole) ? (Role(item.FantasyRole)) : ('<' + Role(item.FantasyRole) + "\n" + Role(teamB.Players[i].FantasyRole) + ">")}</td>
                                <td key={"rows-b" + item.PlayerID} className={`border w-1/12 text-center px-2 py-2 border-stone-600 font-normal text-sm ${(teamB.Players[i].PlayStatus === 1) ? '' : ' bg-stone-400 opacity-70'}`}>{teamB.Players[i].Points}</td>
                                <td key={"points-b" + item.PlayerID} className={`border w-1/12 text-center px-2 py-2 border-stone-600 font-normal text-sm ${(teamB.Players[i].PlayStatus === 1) ? '' : ' bg-stone-400 opacity-70'}`}>{teamB.Players[i]["Result Rows"]}</td>
                                <td key={"team-b" + item.PlayerID} className={`border w-1/12 text-center px-2 py-2 border-stone-600 font-normal text-sm ${(teamB.Players[i].PlayStatus === 1) ? '' : ' bg-stone-400 opacity-70'}`}>{teamB.Players[i].ProTeamTag}</td>
                                <td key={"name-b" + item.PlayerID} className={`border w-2/12 px-2 py-2 border-stone-600 font-normal text-sm ${(teamB.Players[i].PlayStatus === 1) ? '' : ' bg-stone-400 opacity-70'}`}><Link to={"/player/" + teamB.Players[i].PlayerID}><Chip align="end" textSize="sm">{teamB.Players[i].PlayerName}</Chip></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );

    };

    useEffect(() => {
        //console.log("called");
        fetch("https://sea.ddns.net/api/matchup?season=4")
            .then(res => res.json())
            .then(
                (result) => {

                    var playerRows = result.Rows;
                    if (playerRows.length > 0) {
                        var compiled: any = [];
                        var hashed: any = [];
                        for (var i = 0; i < playerRows.length; i++) {
                            if (!hashed[playerRows[i].TeamID]) {
                                compiled.push({
                                    "TeamName": playerRows[i].TeamName,
                                    "OwnerID": playerRows[i].OwnerID,
                                    "OwnerName": playerRows[i].OwnerName,
                                    "TeamID": playerRows[i].TeamID,
                                    "Points": 0,
                                    "Players": []
                                });
                                hashed[playerRows[i].TeamID] = true;
                            }
                            for (var x = 0; x < compiled.length; x++) {
                                if (compiled[x].TeamID === playerRows[i].TeamID) {
                                    compiled[x].Players.push(playerRows[i]);
                                    if (playerRows[i].PlayStatus === 1) {
                                        compiled[x].Points += playerRows[i].Points;
                                    }
                                }
                            }

                        }
                        setPlayerRows(compiled);




                    }
                    var matchupList = result.Matchups.Matchups;
                    if (IsAuth()) {
                        var id = JSON.parse(localStorage.getItem('discord-user')!).id;
                        matchupList.sort((a: any, b: any) => {
                            if (a.TeamA_OwnerName === id) {
                                return -1;
                            }
                            else if (a.TeamB_OwnerName === id) {
                                return -1;
                            }

                            return 0;
                        });
                        //console.log(matchupList[0].MatchupID);
                    }
                    setMatchups(matchupList);
                    setIsLive(result.Matchups.Live);
                    setIsLoaded(true);
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
            <PageWrapper>
                <div className="col-start-3 col-end-7 flex flex-col">
                    <ContentPanel>

                        <div className="pt-6">Current Matchups - Starting {new Date(matchups[0].Date).toDateString()}</div>
                        {matchups.map((item: any, i: any) => (
                            <div className='py-6'>
                                {UserMatchup(i)}
                            </div>
                        ))}
                    </ContentPanel>
                </div>
            </PageWrapper>
        );
    }



}

export default MatchupPage;
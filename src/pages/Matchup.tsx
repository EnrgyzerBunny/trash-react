import React, { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import ContentPanel from '../components/ContentPanel';
import { Link } from 'react-router-dom';
import Chip from '../components/Chip';

function MatchupPage() {
    const [matchups, setMatchups]: any = useState([]);
    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState(false);

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
        fetch("https://sea.ddns.net/api/matchup?season=4")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (result.length > 0) {
                        var compiled: any = [];
                        var hashed: any = [];
                        for (var i = 0; i < result.length; i++)
                        {   
                            if (!hashed[result[i].TeamID])
                            {
                                compiled.push({
                                    "TeamName": result[i].TeamName,
                                    "OwnerID": result[i].OwnerID,
                                    "OwnerName": result[i].OwnerName,
                                    "TeamID": result[i].TeamID,
                                    "Points": 0,
                                    "Players": []
                                });
                                hashed[result[i].TeamID] = true;
                            }
                            for (var x = 0; x < compiled.length; x++)
                            {
                                if (compiled[x].TeamID === result[i].TeamID)
                                {
                                    compiled[x].Players.push(result[i]);
                                    compiled[x].Points += result[i].Points;
                                }
                            }

                        }
                        setMatchups(compiled);
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
            <PageWrapper>
                <div className="col-start-3 col-end-7 flex flex-col">
                    <ContentPanel>
                        <div className="py-6">Current Matchups</div>
                        {matchups.map((matchup: any) => (
                            <div className='pb-6'>
                            <div className="">{matchup.TeamName} - Total: {matchup.Points.toFixed(2)}</div>
                            <table className="flex-auto table-auto w-full border-collapse border border-stone-500">
                            <thead>
                                <tr>
                                    <th className=" border border-stone-600 bg-stone-600">Player</th>
                                    <th className=" border border-stone-600 bg-stone-600">Team</th>
                                    <th className=" border border-stone-600 bg-stone-600">Role</th>
                                    <th className=" border border-stone-600 bg-stone-600">Points</th>
                                    <th className=" border border-stone-600 bg-stone-600">Result Rows</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchup.Players.map((item: any) => (
                                        <tr key={"row" + item.PlayerID}>
                                            <td key={"name" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal"><Link to={"/player/" + item.PlayerID}><Chip>{item.PlayerName}</Chip></Link></td>
                                            <td key={"team" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{item.ProTeamTag}</td>
                                            <td key={"role" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{Role(item.FantasyRole)}</td>
                                            <td key={"role" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{item.Points}</td>
                                            <td key={"role" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{item["Result Rows"]}</td>
                                        </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>

                        ))}     
                                 
    
                    </ContentPanel>
                </div>
            </PageWrapper>
        );
    }


    
}

export default MatchupPage;
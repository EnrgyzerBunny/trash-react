import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Chip from "./Chip";

type Leaderboard =
    {
        TeamName: string,
        TeamID: number,
        Win: number,
        Loss: number,
        Tie: number,
        Points: number
    };

function TeamsTable() {
    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [items, setItems]: any = useState([]);

    useEffect(() => {
        fetch("https://sea.ddns.net/api/leaderboard?season=5")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <table className="flex-auto shadow-lg table-auto border-collapse border border-stone-500">
                    <thead>
                        <tr>
                            <th className="border border-stone-600 bg-stone-600 text-stone-50">Team</th>
                            <th className="border border-stone-600 bg-stone-600 text-stone-50">Win</th>
                            <th className="border border-stone-600 bg-stone-600 text-stone-50">Loss</th>
                            <th className="border border-stone-600 bg-stone-600 text-stone-50">Tie</th>
                            <th className="border border-stone-600 bg-stone-600 text-stone-50">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item: Leaderboard) => (
                            <tr key={item.TeamID}>
                                <td key={"name" + item.TeamID} className="border px-4 py-2 text-stone-500 dark:text-stone-200 border-stone-600 bg-stone-300 dark:bg-stone-500 font-normal">
                                    <Link to={"/teams/" + item.TeamID}>
                                        
                                        <Chip>{item.TeamName}</Chip>
                                    </Link>
                                </td>
                                <td key={"win" + item.TeamID} className="border px-4 py-2 text-stone-500 dark:text-stone-200 border-stone-600 bg-stone-300 dark:bg-stone-500 font-normal text-right">{item.Win}</td>
                                <td key={"loss" + item.TeamID} className="border px-4 py-2 text-stone-500 dark:text-stone-200 border-stone-600 bg-stone-300 dark:bg-stone-500 font-normal text-right">{item.Loss}</td>
                                <td key={"tie" + item.TeamID} className="border px-4 py-2 text-stone-500 dark:text-stone-200 border-stone-600 bg-stone-300 dark:bg-stone-500 font-normal text-right">{item.Tie}</td>
                                <td key={"points" + item.TeamID} className="border px-4 py-2 text-stone-500 dark:text-stone-200 border-stone-600 bg-stone-300 dark:bg-stone-500 font-normal text-right">{item.Points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }

}

export default TeamsTable;
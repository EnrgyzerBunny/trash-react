import React, { useState, useEffect } from "react";

type Team =
    {
        TeamID: number,
        TeamName: string,
        SeasonID: number,
        OwnerID: number
    };

function TeamsTable() {
    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [items, setItems]: any = useState([]);

    useEffect(() => {
        fetch("https://sea.ddns.net/api/teams?season=3")
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
                <table className="flex-auto table-auto border-collapse border border-stone-500">
                    <thead>
                        <tr>
                            <th className="border border-stone-600 bg-stone-600">Team</th>
                            <th className="border border-stone-600 bg-stone-600">Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item: Team) => (
                            <tr>
                                <td key={item.TeamID} className="border px-4 py-2 border-stone-600 font-normal">{item.TeamName}</td>
                                <td key={item.TeamID} className="border px-4 py-2 border-stone-600 font-normal text-right">0</td>                        
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    }

}

export default TeamsTable;
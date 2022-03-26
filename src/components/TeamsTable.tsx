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
            <ul>
                {items.map((item: Team) => (
                    <li key={item.TeamID}>
                        {item.TeamName}
                    </li>
                ))}
            </ul>
        );
    }

}

export default TeamsTable;
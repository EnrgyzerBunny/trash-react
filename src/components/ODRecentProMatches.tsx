import React, { useState, useEffect } from "react";

type ProMatch =
    {
        match_id: number,
        duration: number,
        start_time: number,
        radiant_team_id: number,
        radiant_name: string,
        dire_team_id: number,
        dire_name: string,
        leagueid: number,
        league_name: string,
        series_id: number,
        series_type: number,
        radiant_score: number,
        dire_score: number,
        radiant_win: boolean,
        radiant: boolean
    };

function ODRecentProMatches() {
    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [items, setItems]: any = useState([]);

    useEffect(() => {
        fetch("https://api.opendota.com/api/proMatches")
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
                {items.map((item: ProMatch) => (
                    <li key={item.match_id}>
                        {item.match_id}
                    </li>
                ))}
            </ul>
        );
    }

}

export default ODRecentProMatches;
import React from "react";
import {
    Routes,
    Route,
    useParams
} from "react-router-dom";

function TeamsPage() {

    return (
        <Routes>
            <Route path="/:id" element={<TeamDetails />} />
        </Routes>
    );
};

function TeamDetails() {
    let { id }: any = useParams<"id">();
    let teams = ["testTeam", "test2"];
    if (teams.includes(id)) {
        return (
            <div>Team {id}</div>
        );
    }
    else {
        return <h3>Team not found</h3>;
    }
}

export default TeamsPage;
import { Combobox, Switch, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chip from "../components/Chip";
import ContentPanel from "../components/ContentPanel";
import PageWrapper from "../components/PageWrapper";

type RosterListing = {
    ProTeamName: string,
    ProTeamTag: string,
    PlayerID: number,
    PlayerName: string,
    AccountID: string,
    FantasyRole: number,
    PlayStatus: number,
    FantasyTeamID: number
};

function PlayersPage() {
    const [freeAgents, setFreeAgents] = useState(false);
    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [items, setItems]: any = useState([]);

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


    function FreeAgentToggle() {

        return (
            <Switch
                checked={freeAgents}
                onChange={setFreeAgents}
                className={`${freeAgents ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 my-1 mx-2 items-center rounded-full`}
            >
                <span className="sr-only">Filter by free agents</span>
                <span
                    className={`${freeAgents ? 'translate-x-6' : 'translate-x-1'
                        } inline-block h-4 w-4 transform rounded-full bg-white`}
                />
            </Switch>
        )
    }

    useEffect(() => {
        console.log("called");
        fetch("https://sea.ddns.net/api/players")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    result.sort((a: any, b: any) => {
                        if (a.ProTeamID === b.ProTeamID) {
                            return a.FantasyRole > b.FantasyRole ? 1 : -1;
                        }

                        return a.ProTeamID > b.ProTeamID ? 1 : -1;
                    });

                    setItems(result);

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                    //setModalIsOpen(true);
                }
            )
    }, []);


    const content = (() => {
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            return (
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
                            (!freeAgents || item.FantasyTeamID === 0) ?
                                <tr key={"row" + item.PlayerID}>
                                    <td key={"name" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal"><Link to={"/player/" + item.PlayerID}><Chip>{item.PlayerName}</Chip></Link></td>
                                    <td key={"team" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{item.ProTeamName}</td>
                                    <td key={"role" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{Role(item.FantasyRole)}</td>
                                </tr>
                                :
                                null
                        ))}
                    </tbody>
                </table>
            );

        }
    })();


    return (
        <PageWrapper>
            <div className="col-start-3 col-end-7 flex flex-col">
                <ContentPanel>
                    <div className="font-bold text-xl py-4">
                        Players
                    </div>
                    <div className="flex">
                        <div className="flex-none py-2">Free agents only <FreeAgentToggle /></div>
                        <div className="flex-auto"></div>
                        <div className="flex-none">
                            
                        </div>
                    </div>
                    {content}
                </ContentPanel>
            </div>
        </PageWrapper>
    );

}

export default PlayersPage;
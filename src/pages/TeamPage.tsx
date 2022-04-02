import React, { useState, Fragment, useEffect } from "react";
import ContentPanel from "../components/ContentPanel";
import PageWrapper from "../components/PageWrapper";
import { Switch, Dialog, Transition } from '@headlessui/react'
import { Console } from "console";

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

function TeamPage() {
    const [enabled, setEnabled] = useState(false);
    let [isOpen, setIsOpen] = useState(false);

    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [items, setItems]: any = useState([]);
    const [teamName, setTeamName]: any = useState(null);

    const closeModal = () => {
        setEnabled(false);
        setIsOpen(false);
    };

    const name = JSON.parse(sessionStorage.getItem('discord-user')!).id;

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

    const SetPlayStatus = (playerId: number, playStatus: number) => {
        
        let token = JSON.parse(sessionStorage.getItem('discord-token')!);
        let head = new Headers();
        head.append('Authorization', 'Bearer ' + token.access_token);
        head.append('id', name);

        const init = {
            method: 'POST',
            headers: head,
        };

        fetch("https://sea.ddns.net/api/playstatus?player=" + playerId + "&playstatus=" + playStatus, init)
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(playerId + " set to " + playStatus);
                },
                (error) => {
                    console.log("err: " + error);
                }
            );
    };

    const UpdateInline = (index: number, playStatus: number) => {
        items[index].PlayStatus = playStatus;
        setItems([...items]);
    };

    const ActivateSwitch = (index:number) => {

        return (
            <Switch
                checked={items[index].PlayStatus == 1}
                onChange={() => { let newStatus = (items[index].PlayStatus == 0) ? 1 : 0; SetPlayStatus(items[index].PlayerID, newStatus); UpdateInline(index, newStatus); }}
                className={`${items[index].PlayStatus == 1 ? 'bg-lime-700 opacity-100' : 'bg-stone-700 opacity-40'
                    } relative inline-flex items-center h-6 rounded-full w-11 transition ease-in-out duration-500 my-1`}
            >
                <span className="sr-only">Activate Player</span>
                <span
                    className={`${items[index].PlayStatus == 1 ? 'translate-x-6' : 'translate-x-1'
                        } inline-block w-4 h-4 transform bg-stone-100 rounded-full transition ease-in-out duration-500`}
                />
            </Switch>
        );
    };




    useEffect(() => {

        fetch("https://sea.ddns.net/api/roster?name=" + name)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    result.sort((a: RosterListing, b: RosterListing) => { return a.FantasyRole - b.FantasyRole; })
                    if (result.length > 0) {
                        setTeamName(result[0].TeamName);
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [name]);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            
            <PageWrapper>
                <div className="col-start-3 col-end-7 flex flex-col">
                    <ContentPanel>
                        <div className="">Manage Team - {teamName}</div>
                        <div className="flex-auto py-4">
                            Players:
                        </div>
                        <table className="flex-auto table-fixed border-collapse border border-stone-500">
                            <thead>
                                <tr>
                                    <th className="w-2/6 border border-stone-600 bg-stone-600">Player</th>
                                    <th className="w-2/6 border border-stone-600 bg-stone-600">Team</th>
                                    <th className="w-1/6 border border-stone-600 bg-stone-600">Role</th>
                                    <th className="w-1/6 border border-stone-600 bg-stone-600">Playing</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item: RosterListing, index:number) =>
                                    <tr key={"row" + item.PlayerID}>
                                        <td key={"name" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{item.PlayerName}</td>
                                        <td key={"team" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{item.ProTeamName}</td>
                                        <td key={"role" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{Role(item.FantasyRole)}</td>
                                        <td key={"active" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal">{(isLoaded) ? ActivateSwitch(index) : null}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </ContentPanel>
                </div>
            </PageWrapper>
        );
    }



}

export default TeamPage;
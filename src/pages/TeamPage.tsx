import React, { useState, Fragment, useEffect } from "react";
import ContentPanel from "../components/ContentPanel";
import PageWrapper from "../components/PageWrapper";
import { Switch } from '@headlessui/react';
import GlobalModal from "../components/GlobalModal";

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

    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [items, setItems]: any = useState([]);
    const [teamName, setTeamName]: any = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [lockInfo, setLockInfo]: any = useState({});

    const name = JSON.parse(localStorage.getItem('discord-user')!).id;
    //console.log(name);

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

    const UpdateInline = (index: number, playStatus: number) => {
        items[index].PlayStatus = playStatus;
        setItems([...items]);
    };

    const GetRolePlayCount = (role: number) => {
        return items.filter((x: RosterListing) => x.PlayStatus === 1 && x.FantasyRole === role).length;
    };

    const IsAtLimit = (role: number) => {
        switch (role) {
            case 1:
                return GetRolePlayCount(role) >= 2;
            case 2:
                return GetRolePlayCount(role) >= 2;
            case 4:
                return GetRolePlayCount(role) >= 1;
            default:
                return false;
        }
    };

    const SetPlayStatus = (playerId: number, playStatus: number, revertCallback: any) => {

        //reverify lock
        fetch("https://sea.ddns.net/api/rosterstatus?season=5")
            .then(res => res.json())
            .then(
                (result) => {
                    if (result && result.Value !== "OPEN") {
                        setIsLoaded(true);
                        setError("ROSTER IS LOCKED");
                        setModalIsOpen(true);
                        revertCallback();
                        return;
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                    setModalIsOpen(true);
                    revertCallback();
                    return;
                }
            ).then(() => {

                let token = JSON.parse(localStorage.getItem('discord-token')!);
                let head = new Headers();
                head.append('Authorization', 'Bearer ' + token.access_token);
                head.append('id', name);

                const init = {
                    method: 'POST',
                    headers: head,
                };

                fetch("https://sea.ddns.net/api/playstatus?player=" + playerId + "&playstatus=" + playStatus, init)
                    .then(res => {
                        if (!res.ok) {
                            console.log(res);
                            if (res.status === 401) {
                                setError(res.status + "-" + res.statusText + ": Token may have expired, please refresh login.");
                            }
                            else
                                setError(res.statusText);
                            setModalIsOpen(true);
                            revertCallback();
                            return;
                        }
                        return res.json();
                    })
                    .then(
                        (result) => {
                            if (result.changedRows != null && result.changedRows === 1) {
                                console.log(playerId + " set to " + playStatus);
                            }
                        },
                        (error) => {
                            console.log(error);
                            setError(error);
                            setModalIsOpen(true);
                            revertCallback();
                        }
                    );
            });
    };



    const ActivateSwitch = (index: number) => {

        return (
            <div className="flex">
                <div className="flex-auto"></div>
                <Switch disabled={(lockInfo.Value !== "OPEN") || (IsAtLimit(items[index].FantasyRole) && items[index].PlayStatus === 0)}
                    checked={items[index].PlayStatus === 1}
                    onChange={() => { let newStatus = (items[index].PlayStatus === 0) ? 1 : 0; let currentStatus = items[index].PlayStatus; UpdateInline(index, newStatus); SetPlayStatus(items[index].PlayerID, newStatus, () => { UpdateInline(index, currentStatus); }); }}
                    className={`${items[index].PlayStatus === 1 ? 'bg-lime-700 opacity-100 shadow-lg' : 'bg-stone-700 opacity-40'
                        } relative inline-flex items-center h-6 rounded-full w-11 transition ease-in-out duration-500 my-1 ${IsAtLimit(items[index].FantasyRole) && items[index].PlayStatus === 0 ? 'invisible' : 'visible'
                        }`}
                >
                    <span className="sr-only">Activate Player</span>
                    <span
                        className={`${items[index].PlayStatus === 1 ? 'translate-x-6' : 'translate-x-1'
                            } inline-block w-4 h-4 transform bg-stone-100 rounded-full transition ease-in-out duration-500 ${(lockInfo.Value !== "OPEN") || (IsAtLimit(items[index].FantasyRole) && items[index].PlayStatus === 0) ? 'invisible' : 'visible'}`}
                    />
                </Switch>
                <div className="flex-auto"></div>
            </div>
        );
    };

    let closeModal = () => { setModalIsOpen(false); };

    useEffect(() => {
        fetch("https://sea.ddns.net/api/rosterstatus?season=5")
            .then(res => res.json())
            .then(
                (result) => {
                    if (result) {
                        setLockInfo(result);
                    }
                    else {
                        setLockInfo({ "Value": "ERROR LOCK", "Start": "FORCED", "End": "FORCED" });
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                    setModalIsOpen(true);
                }
            );

        fetch("https://sea.ddns.net/api/roster?name=" + name)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    if (result.length > 0) {
                        setItems(result);
                        result.sort((a: RosterListing, b: RosterListing) => { return a.FantasyRole - b.FantasyRole; });
                        setTeamName(result[0].TeamName);
                    }
                    else {
                        setTeamName("N/A - Empty Team");
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                    setModalIsOpen(true);
                }
            );
    }, [name]);

    if (!isLoaded) {
        return (
            <>
                <PageWrapper>
                    <div className="col-start-3 col-end-7 flex flex-col">
                        <ContentPanel>
                            <div className="animate-pulse">Loading...</div>
                        </ContentPanel>
                    </div>
                </PageWrapper>
            </>
        );
    } else {
        return (
            <>
                <PageWrapper>
                    <div className="col-start-3 col-end-7 flex flex-col">
                        <ContentPanel>
                            <div className="">Manage Team - {teamName}</div>
                            <div className="py-4">Roster is: {lockInfo.Value} - Roster will {(lockInfo.Value !== "OPEN")? "unlock" : "lock"} at {(lockInfo.Value !== "OPEN")? lockInfo.End : lockInfo.Start} PT</div>
                            <div className="flex-auto py-4">
                                Players:
                            </div>
                            <table className="flex-auto shadow-lg table-fixed border-collapse border border-stone-500">
                                <thead>
                                    <tr>
                                        <th className="w-2/6 border border-stone-600 bg-stone-600 text-stone-50">Player</th>
                                        <th className="w-2/6 border border-stone-600 bg-stone-600 text-stone-50">Team</th>
                                        <th className="w-1/6 border border-stone-600 bg-stone-600 text-stone-50">Role</th>
                                        <th className="w-1/6 border border-stone-600 bg-stone-600 text-stone-50">Playing</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (items.length === 0) &&
                                        <tr><td></td><td></td><td></td><td></td></tr>
                                    }


                                    {items.map((item: RosterListing, index: number) =>
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
                <GlobalModal enabled={modalIsOpen} close={closeModal} title="Error" body={error} dismiss="Ok" />
            </>
        );
    }

}

export default TeamPage;
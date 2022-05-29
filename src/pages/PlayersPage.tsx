import { Combobox, Switch, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContentPanel from "../components/ContentPanel";
import PageWrapper from "../components/PageWrapper";

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

function PlayersPage() {
    const [freeAgents, setFreeAgents] = useState(false);
    const [error, setError]: any = useState(null);
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [items, setItems]: any = useState([]);
    const [people, setPeople]: any = useState([]);

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

    function SearchBox() {
        const [selected, setSelected] = useState(people[0])
        const [query, setQuery] = useState('')

        const filteredPeople =
            query === ''
                ? people
                : people.filter((person: RosterListing) =>
                    person.PlayerName
                        .toLowerCase()
                        .replace(/\s+/g, '')
                        .includes(query.toLowerCase().replace(/\s+/g, ''))
                )

        return (
            <div className="w-72">
                <Combobox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                            <Combobox.Input
                                className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                displayValue={(person: RosterListing) => person.PlayerName}
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredPeople.length === 0 && query !== '' ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredPeople.map((person: RosterListing) => (
                                        <Combobox.Option key={person.PlayerID} className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'}`
                                        }
                                            value={person}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`} >
                                                        {person.PlayerName}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                }`}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>
        )
    }

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
                            return a.PlayerID - b.PlayerID;
                        }

                        return a.ProTeamID > b.ProTeamID ? 1 : -1;
                    });

                    setItems(result);
                    setPeople(result);

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
                            (!freeAgents || item.TeamName !== null) ?
                                <tr key={"row" + item.PlayerID}>
                                    <td key={"name" + item.PlayerID} className="border px-4 py-2 border-stone-600 font-normal"><Link to={"/player/" + item.PlayerID}>{item.PlayerName}</Link></td>
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
                            {/*
                                <SearchBox />
                                */}
                        </div>
                    </div>
                    {content}
                </ContentPanel>
            </div>
        </PageWrapper>
    );

}

export default PlayersPage;
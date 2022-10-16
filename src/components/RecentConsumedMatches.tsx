import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import Chip from "./Chip";

function RecentConsumedMatches(props: any) {
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [matchCount, setMatchCount]: any = useState(null);
    const [matches, setMatches]: any = useState([]);
    const [rows, setRows]: any = useState(null);
    const [error, setError]: any = useState(null);

    useEffect(() => {
        //console.log("called");
        fetch("https://sea.ddns.net/api/consumedrows?date=" + props.date)
            .then(res => res.json())
            .then(
                (result) => {

                    if (result.length > 0) {
                        setMatchCount(result[0].Matches);
                        setRows(result[0].Rows);

                        var matchList = [];
                        for (var i = 0;i < result.length;i++)
                        {
                            matchList.push(result[i].MatchID);
                        }
                        setMatches(matchList);

                    }
                    setIsLoaded(true);

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                }
            )
    }, [props.date]);

    if (error) {
        return <div>Unable to load match rows: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="">
            <Disclosure>
            <Disclosure.Button className="p-2 text-left">
              <Chip>{(matchCount)? matchCount : 0} matches included - {(rows)? rows : 0} player result rows</Chip>
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 font-normal text-base">
                <div className="grid grid-cols-4 auto-rows-max">
              {matches.map((item: any) => (
                <div>
                <a className="underline" href={"https://www.opendota.com/matches/" + item}>{item}</a>
                </div>
              ))}
              </div>
            </Disclosure.Panel>
          </Disclosure>
          </div>
        );
    }

}

export default RecentConsumedMatches;
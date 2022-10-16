import { useEffect, useState } from "react";
import ContentPanel from "./ContentPanel";

function WaiverPriority() {
    const [isLoaded, setIsLoaded]: any = useState(false);
    const [prioList, setPrioList]: any = useState([]);
    const [error, setError]: any = useState(null);

    useEffect(() => {
        //console.log("called");
        fetch("https://sea.ddns.net/api/waiverpriority")
            .then(res => res.json())
            .then(
                (result) => {

                    if (result.length > 0) {
                        setPrioList(result);
                    }
                    setIsLoaded(true);

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error.message);
                }
            )
    }, []);

    if (error) {
        return <ContentPanel><div>Error: {error.message}</div></ContentPanel>;
    } else if (!isLoaded) {
        return <ContentPanel><div>Loading...</div></ContentPanel>;
    } else {
        return (
            <ContentPanel>
                <div>Current Waiver Priority:</div>
                {
                    prioList.map((item: any, index: any) => (
                        <div className="px-4 font-normal">{index + 1}: {item}</div>
                ))}
            </ContentPanel>
        );
    }
}

export default WaiverPriority;
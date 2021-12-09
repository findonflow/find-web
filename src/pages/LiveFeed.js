import { useEffect, useRef, useState } from "react";
import GraffleSDK from "../functions/graffle";
import { get } from "lodash"
import { Container } from "react-bootstrap";

export default function LiveFeed() {
    const [latestMessage, setLatestMessage] = useState("")
    // useEffect(() => {

    //     return () => {
    //         <div>{latestMessage}</div>
    //     }
    // }, [latestMessage])

    const streamSDK = new GraffleSDK();
    const feed = async (message) => {
        if (get(message, "flowEventId") === "A.37a05b1ecacc80f7.FIND.Name") {
            console.log("Name event detected, event ignored")
            return;
        }
        setLatestMessage(message);
        console.log(message)
    };
    let conn = useRef();
    useEffect(async () => {
        console.log("Creating the stream")
        conn.current = await streamSDK.stream(feed);
    }, []);
    useEffect(() => () => {
        console.log("Stopping the connection")
        conn.current.stop()
    }, []);
    return (
        <Container className="mt-5">
            <div>Latest message: {latestMessage}</div><br />
            <div>Graffle URL: {process.env.REACT_APP_GRAFFLE_API_URL}
                <div>Graffle Company ID: {process.env.REACT_APP_GRAFFLE_PROJECT_ID}</div></div>

        </Container>
    )

}
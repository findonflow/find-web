import { useEffect, useRef, useState } from "react";
import GraffleSDK from "../functions/graffle";
import { get } from "lodash"
import { Container, Table } from "react-bootstrap";
import { FriendlyEventNames } from '../functions/friendlyEventNames'
import '../components/livefeed/livefeed.css'
import { Link } from "react-scroll";

export default function LiveFeed() {
    const [latestMessage, setLatestMessage] = useState("")
    //const [paintEvent, setPaintEvent] = useState([])
    useEffect(() => {
        if (latestMessage !== "") {
            let newEvent = {}
            let eventData = latestMessage.blockEventData
            let eventDate = latestMessage.eventDate
            let eventType = latestMessage.flowEventId.split(/\.(?=[^\.]+$)/);
            //manage auction and offer events
            if (eventType[1] === "AuctionCanceled" ||
                eventType[1] === "AuctionCanceledReservePrice" ||
                eventType[1] === "AuctionStarted" ||
                eventType[1] === "AuctionBid" ||
                eventType[1] === "DirectOffer" ||
                eventType[1] === "DirectOfferCanceled") {
                newEvent.name = eventData.name
                newEvent.price = eventData.amount
                //set the correct from and to
                if (eventType[1] === "AuctionCanceled" ||
                    eventType[1] === "AuctionCanceledReservePrice") {
                    newEvent.from = eventData.owner
                    newEvent.to = "-"
                } else {
                    newEvent.from = eventData.bidder
                    newEvent.to = eventData.owner
                }
                newEvent.date = eventDate
                newEvent.type = FriendlyEventNames[eventType[1]]
            } else if (eventType[1] === "Register") {
                newEvent.type = FriendlyEventNames[eventType[1]]
                newEvent.name = eventData.name
                let nameLength = eventData.name.length
                if (nameLength === 3)
                    newEvent.price = FriendlyEventNames["price3"]
                else if (nameLength === 4)
                    newEvent.price = FriendlyEventNames["price4"]
                else if (nameLength >= 5)
                    newEvent.price = FriendlyEventNames["price5"]
                newEvent.from = ".find"
                newEvent.to = eventData.owner
                newEvent.date = eventDate
            } else if (eventType[1] === "Moved" || eventType[1] === "Sold" || eventType[1] === "SoldAuction") {
                newEvent.type = FriendlyEventNames[eventType[1]]
                newEvent.name = eventData.name
                newEvent.price = eventData.amount?eventData.amount:"-"
                newEvent.from = eventData.previousOwner
                newEvent.to = eventData.newOwner
                newEvent.date = eventDate
            } else if (eventType[1] === "ForSale") {
                if(eventData.active)
                newEvent.type = FriendlyEventNames[eventType[1]]
                else
                newEvent.type = FriendlyEventNames["WithdrawnSale"]

                newEvent.name = eventData.name
                newEvent.price = eventData.directSellPrice
                newEvent.from = eventData.owner
                newEvent.to = "-"
                newEvent.date = eventDate
            } else if (eventType[1] === "ForAuction") {
                if(eventData.active)
                newEvent.type = FriendlyEventNames[eventType[1]]
                else
                newEvent.type = FriendlyEventNames["WithdrawnAuction"]

                newEvent.name = eventData.name
                newEvent.price = eventData.auctionStartPrice
                newEvent.from = eventData.owner
                newEvent.to = "-"
                newEvent.date = eventDate
            } else if (eventType[1] === "DirectOfferRejected") {
                newEvent.type = FriendlyEventNames[eventType[1]]
                newEvent.name = eventData.name
                newEvent.price = eventData.amount
                newEvent.from = eventData.owner
                newEvent.to = eventData.bidder
                newEvent.date = eventDate
            }
            //setPaintEvent((paintEvent) => [...paintEvent, newEvent])
            let tableRef = document.getElementById("eventBody");

            // Insert a row at the end of the table
            let newRow = tableRef.insertRow(0);
            // Insert a cell in the row at index 0
            let newCell = newRow.insertCell(0);
            let newText = document.createTextNode(newEvent.type);
            newCell.appendChild(newText);
            newCell = newRow.insertCell(1);
            newText = document.createElement('div')
            newText.innerHTML = "<a href='/" + newEvent.name + "' target='_blank'>" + newEvent.name + "</a>"
            newCell.appendChild(newText);
            newCell = newRow.insertCell(2);
            newText = document.createTextNode(newEvent.price ? newEvent.price : "-");
            newCell.appendChild(newText);
            newCell = newRow.insertCell(3);
            newText = document.createTextNode(newEvent.from);
            newCell.appendChild(newText);
            newCell = newRow.insertCell(4);
            newText = document.createTextNode(newEvent.to);
            newCell.appendChild(newText);
            newCell = newRow.insertCell(5);
            newText = document.createTextNode(new Date(newEvent.date).toLocaleDateString() + " " + new Date(newEvent.date).toLocaleTimeString());
            newCell.appendChild(newText);

        }
    }, [latestMessage])

    const streamSDK = new GraffleSDK();
    const feed = async (message) => {
        if (get(message, "flowEventId") === "A.a16ab1d0abde3625.FIND.Name") {
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
            <h1 align="center" className="py-3">The .find live feed 🚀</h1>
            <p align="center" className="pb-5">All of the latest data, all in one place just for you</p>
            <div className="frontTray shadow p-4" style={{ borderRadius: "16px" }}>

                {/* {JSON.stringify(latestMessage, null, 2)} */}
                <div className="tableHeight">
                    <Table hover id="eventTable">
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody id="eventBody">
                            {!latestMessage &&
                            <tr>
                                <td colSpan={6} align="center">Waiting for feed data</td>
                            </tr>
                            }
                        </tbody>



                    </Table>
                </div>
            </div>
            {/* <div>Latest message: {JSON.stringify(latestMessage.blockEventData, null, 2)}</div><br />
            <div>Graffle URL: {process.env.REACT_APP_GRAFFLE_API_URL}
            <div>Graffle Company ID: {process.env.REACT_APP_GRAFFLE_PROJECT_ID}</div></div> */}

        </Container>
    )

}
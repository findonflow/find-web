import { useEffect, useRef, useState } from "react";
import GraffleSDK from "../functions/graffle";
import { get } from "lodash"
import { Container, Image, Table } from "react-bootstrap";
import { FriendlyEventNames } from '../functions/friendlyEventNames'
import '../components/livefeed/livefeed.css'
import { Faq } from "../components/home/Faq";
import ReactGA from 'react-ga'
import axios from "axios";
import { ReverseLookup } from "../functions/ReverseLookup";

export default function LiveFeed() {
    document.title = ".find - live feed"
    ReactGA.pageview(window.location.pathname);
    const [latestMessage, setLatestMessage] = useState("")
    const [eventsData, setEventsData] = useState("")
    let limitedEventData
    //const [paintEvent, setPaintEvent] = useState([])

    useEffect(() => {
        const getEvents = async () => {
            // console.log("getSales fired")
            let data
            let res = await axios
                .get("https://prod-main-net-dashboard-api.azurewebsites.net/api/company/04bd44ea-0ff1-44be-a5a0-e502802c56d8/search?eventType=A.097bafa4e0b48eef.FIND.Sold,A.097bafa4e0b48eef.FIND.ForSale,A.097bafa4e0b48eef.FIND.AuctionCanceled,A.097bafa4e0b48eef.FIND.AuctionCanceledReservePrice,,A.097bafa4e0b48eef.FIND.AuctionStarted,A.097bafa4e0b48eef.FIND.AuctionBid,A.097bafa4e0b48eef.FIND.DirectOffer,A.097bafa4e0b48eef.FIND.DirectOfferCanceled,A.097bafa4e0b48eef.FIND.Register,A.097bafa4e0b48eef.FIND.Moved,A.097bafa4e0b48eef.FIND.SoldAuction,A.097bafa4e0b48eef.FIND.WithdrawnSale,A.097bafa4e0b48eef.FIND.ForAuction,A.097bafa4e0b48eef.FIND.DirectOfferRejected&pageSize=50")
            data = res.data
            setEventsData(data)

        }
        getEvents()
    }, [])

    useEffect(()  => {
            async function getEventsData() {
            // eslint-disable-next-line
            limitedEventData = eventsData.slice(0, 50)
            limitedEventData.forEach(async events => {
            let newEvent = {}
            let eventData = events.blockEventData
            let eventDate = events.eventDate
            //eslint-disable-next-line
            let eventType = events.flowEventId.split(/\.(?=[^\.]+$)/);
            if(eventType[1] === "Register"){
                if (limitedEventData.filter(checkEvent => checkEvent.eventDate === eventDate && checkEvent.flowEventId !== events.flowEventId).length > 0) {
                    return
                }
            }
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
                newEvent.price = eventData.amount ? eventData.amount : "-"
                newEvent.from = eventData.previousOwner
                newEvent.to = eventData.newOwner
                newEvent.date = eventDate
            } else if (eventType[1] === "ForSale") {
                if (eventData.active)
                    newEvent.type = FriendlyEventNames[eventType[1]]
                else
                    newEvent.type = FriendlyEventNames["WithdrawnSale"]

                newEvent.name = eventData.name
                newEvent.price = eventData.directSellPrice
                newEvent.from = eventData.owner
                newEvent.to = "-"
                newEvent.date = eventDate
            } else if (eventType[1] === "ForAuction") {
                if (eventData.active)
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
            } else {
                return
            }
            let tableRef = document.getElementById("eventBody");

            // Insert a row at the beginning of the table
            let newRow = tableRef.insertRow(-1);
            let newCell = newRow.insertCell(0);
            let newText = document.createTextNode(newEvent.type);
            let fromName = newEvent.from.length === 18 && await ReverseLookup(newEvent.from)
            let toName = newEvent.to.length === 18 && await ReverseLookup(newEvent.to)
            newCell.appendChild(newText);
            newCell = newRow.insertCell(1);
            newText = document.createElement('div')
            newText.innerHTML = "<a href='/" + newEvent.name + "' target='_blank'>" + newEvent.name + "</a>"
            newCell.appendChild(newText);
            newCell = newRow.insertCell(2);
            newText = document.createTextNode(newEvent.price !== "-" ? newEvent.price+" FUSD" : "-");
            newCell.appendChild(newText);
            newCell = newRow.insertCell(3);
            newText = document.createTextNode(!fromName ? newEvent.from : fromName);
            newCell.appendChild(newText);
            newCell = newRow.insertCell(4);
            newText = document.createTextNode(!toName ? newEvent.to : toName);
            newCell.appendChild(newText);
            newCell = newRow.insertCell(5);
            newText = document.createTextNode(new Date(newEvent.date).toLocaleDateString() + " " + new Date(newEvent.date).toLocaleTimeString());
            newCell.appendChild(newText);
        })
    }
    if (eventsData !== "") {
    getEventsData()
        }
    }, [eventsData])


    useEffect(() => {
            async function getLatestMessage() {
            let newEvent = {}
            let eventData = latestMessage.blockEventData
            let eventDate = latestMessage.eventDate
            //eslint-disable-next-line
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
                newEvent.price = eventData.amount ? eventData.amount : "-"
                newEvent.from = eventData.previousOwner
                newEvent.to = eventData.newOwner
                newEvent.date = eventDate
            } else if (eventType[1] === "ForSale") {
                if (eventData.active)
                    newEvent.type = FriendlyEventNames[eventType[1]]
                else
                    newEvent.type = FriendlyEventNames["WithdrawnSale"]

                newEvent.name = eventData.name
                newEvent.price = eventData.directSellPrice
                newEvent.from = eventData.owner
                newEvent.to = "-"
                newEvent.date = eventDate
            } else if (eventType[1] === "ForAuction") {
                if (eventData.active)
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
            } else {
                return
            }
            let tableRef = document.getElementById("eventBody");
            let fromName = newEvent.from.length === 18 && await ReverseLookup(newEvent.from)
            let toName = newEvent.to.length === 18 && await ReverseLookup(newEvent.to)
            // Insert a row at the beginning of the table
            let newRow = tableRef.insertRow(0);
            let newCell = newRow.insertCell(0);
            let newText = document.createTextNode(newEvent.type);
            newCell.appendChild(newText);
            newCell = newRow.insertCell(1);
            newText = document.createElement('div')
            newText.innerHTML = "<a href='/" + newEvent.name + "' target='_blank'>" + newEvent.name + "</a>"
            newCell.appendChild(newText);
            newCell = newRow.insertCell(2);
            newText = document.createTextNode(newEvent.price ? newEvent.price+" FUSD" : "-");
            newCell.appendChild(newText);
            newCell = newRow.insertCell(3);
            newText = document.createTextNode(!fromName ? newEvent.from : fromName);
            newCell.appendChild(newText);
            newCell = newRow.insertCell(4);
            newText = document.createTextNode(!toName ? newEvent.to : toName);
            newCell.appendChild(newText);
            newCell = newRow.insertCell(5);
            newText = document.createTextNode(new Date(newEvent.date).toLocaleDateString() + " " + new Date(newEvent.date).toLocaleTimeString());
            newCell.appendChild(newText);

        }
    
        if (latestMessage !== "") {
            getLatestMessage()
        }
    }, [latestMessage])

    
    let conn = useRef();
    useEffect(() => {
        const streamSDK = new GraffleSDK();
    const feed = async (message) => {
        if (get(message, "flowEventId") === "A.a16ab1d0abde3625.FIND.Name") {
            return;
        }
        if (get(message, "flowEventId") === "A.097bafa4e0b48eef.FIND.Name") {
            return;
        }
        setLatestMessage(message);
        //console.log(message)
    };
        async function startConn() {
        //console.log("Creating the stream")
        conn.current = await streamSDK.stream(feed);
        }
        startConn()
    }, []);
    useEffect(() => () => {
        //console.log("Stopping the connection")
        conn.current.stop()
    }, []);
    return (
        <Container className="mt-5 p-3 p-lg-0">
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
                            {!latestMessage && !eventsData &&
                                <tr>
                                    <td colSpan={6} align="center">Waiting for feed data</td>
                                </tr>
                            }
                        </tbody>



                    </Table>
                </div>
                <div align="right" className="pe-2"><a href="https://graffle.io" target="_blank" rel="noreferrer"><Image src="/assets/img/livefeed/powered-by-graffle.webp" style={{maxHeight: "44px"}} fluid></Image></a></div>
            </div>
            <div className="my-5 mx-auto"></div>
            {JSON.stringify(limitedEventData)}
            <Faq />
        </Container>
    )

}
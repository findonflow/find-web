import { useEffect, useState } from "react";
import { Row, Col, Container, Table, Image, Button, Form } from "react-bootstrap";
import '../components/livefeed/livefeed.css'
import axios from "axios";
import { useImmer } from "use-immer";
import { Link } from "react-router-dom";
import { handleBid } from "../functions/txfunctions";
import { useFormStatus } from "../functions/DisabledState";
import { epochToJsDate, epochToJsTime } from "../functions/epochtodate";
import ReactGA from 'react-ga'

export default function MarketplaceAuctions() {
    document.title = ".find - name auction spot"
    ReactGA.pageview(window.location.pathname);
    const [salesData, setSalesData] = useState()
    const [filteredSold, setFilteredSold] = useState()
    const [filteredForSale, setFilteredForSale] = useState()
    const [filteredForAuction, setFilteredForAuction] = useState()
    const [filterInput, setFilterInput] = useState("")
    const [filterAuctionInput, setFilterAuctionInput] = useState("")
    const [activeSales, setActiveSales] = useImmer([])
    const [activeAuctions, setActiveAuctions] = useImmer([])
    const [sortType, setSortType] = useState({ type: "string", container: "string" });

    useEffect(() => {
        const getSales = async () => {
            // console.log("getSales fired")
            let data
            let res = await axios
                .get("https://prod-main-net-dashboard-api.azurewebsites.net/api/company/04bd44ea-0ff1-44be-a5a0-e502802c56d8/search?eventType=A.097bafa4e0b48eef.FIND.AuctionStarted,A.097bafa4e0b48eef.FIND.AuctionBid,A.097bafa4e0b48eef.FIND.AuctionCanceled,A.097bafa4e0b48eef.FIND.AuctionCanceledReservePrice,A.097bafa4e0b48eef.FIND.SoldAuction,A.097bafa4e0b48eef.FIND.ForAuction")
            data = res.data
            setSalesData(data)

        }
        getSales()
    }, [])
    useEffect(() => {
        if (salesData) {
            setFilteredSold(
                salesData.filter(
                    Event => {
                        return (
                            Event.flowEventId.includes('A.097bafa4e0b48eef.FIND.SoldAuction') ||
                            Event.flowEventId.includes('A.097bafa4e0b48eef.FIND.AuctionCanceled') ||
                            Event.flowEventId.includes('A.097bafa4e0b48eef.FIND.AuctionCanceledReservePrice') ||
                            Event.flowEventId.includes('A.097bafa4e0b48eef.FIND.AuctionStarted')
                        )
                    }
                )
            )
            setFilteredForSale(salesData.filter(Event => Event.flowEventId.includes('A.097bafa4e0b48eef.FIND.AuctionStarted')))
            setFilteredForAuction(salesData.filter(Event => Event.flowEventId.includes('A.097bafa4e0b48eef.FIND.ForAuction')))
        }
    }, [salesData])

    useEffect(() => {
        if (filteredSold && filteredForSale) {
            filteredForSale.forEach(nameForSale => {
                let isForSale = true
                let soldNames = filteredSold.filter(Event => Event.blockEventData.name === nameForSale.blockEventData.name)

                //check to see if the item was sold after this listing
                soldNames.forEach(soldNames => {
                    if (soldNames.eventDate > nameForSale.eventDate) {
                        isForSale = false
                    }
                })
                //check to see if this is the most recent listing


                //if either of the above events are true then do not add it.
                if (isForSale) {
                    setActiveSales((formVals) => {
                        formVals.push({
                            name: nameForSale.blockEventData.name,
                            amount: nameForSale.blockEventData.amount,
                            owner: nameForSale.blockEventData.owner,
                            validUntil: nameForSale.blockEventData.auctionEndAt
                        })
                    })
                }

            })
            filteredForAuction.forEach(nameForAuction => {
                let isForAuction = true
                let soldNames = filteredSold.filter(Event => Event.blockEventData.name === nameForAuction.blockEventData.name)
                if (!nameForAuction.blockEventData.active) {
                    isForAuction = false
                }
                //check to see if the item was sold after this listing
                soldNames.forEach(soldNames => {
                    if (soldNames.eventDate > nameForAuction.eventDate) {
                        isForAuction = false
                    }
                })
                //if either of the above events are true then do not add it.
                if (isForAuction) {
                    setActiveAuctions((formVals) => {
                        formVals.push({
                            name: nameForAuction.blockEventData.name,
                            amount: nameForAuction.blockEventData.auctionStartPrice,
                            owner: nameForAuction.blockEventData.owner,
                            validUntil: nameForAuction.eventDate
                        })
                    })
                }

            })
        }
        //eslint-disable-next-line 
    }, [filteredForSale, filteredForAuction])

    const handleSubmit = (name, amount) => {
        const formValues = [{
            id: "bidAmt",
            value: amount
        },
        {
            id: "name",
            value: name
        }]
        //setValidated(true)
        console.log(amount)
        handleBid(formValues)
    }
    useEffect(() => {
        const sortArray = type => {
            const types = {
                name: 'name',
                amount: 'amount',
                owner: 'owner',
                validUntil: 'validUntil',
            };
            const sortProperty = types[type];
            const sorted = [...activeSales]
                //eslint-disable-next-line
                .sort((a, b) => {
                    if (b[sortProperty] > a[sortProperty]) return -1
                })
            setActiveSales(sorted);
        };
        const sortAuction = type => {
            const types = {
                name: 'name',
                amount: 'amount',
                owner: 'owner',
                validUntil: 'validUntil',
            };
            const sortProperty = types[type];
            const sorted = [...activeAuctions]
                //eslint-disable-next-line
                .sort((a, b) => {
                    if (b[sortProperty] > a[sortProperty]) return -1
                })
            setActiveAuctions(sorted);
        };
        if (sortType.container === "canbestarted") {
            sortArray(sortType);
        }
       
        if (sortType.container === "canbestarted") {
            sortAuction(sortType.type);
        }

        //eslint-disable-next-line
    }, [sortType]);

    function handleSetSort(sortedBy) {
        setSortType(sortedBy)
    }

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <div className="frontTray shadow p-4" style={{ borderRadius: "16px" }}>

                        {/* {JSON.stringify(activeSales, null, 2)} */}
                        <Row>
                            <Col xs="12" className="my-auto" lg="auto">
                                <h4>Live Auctions 🔥</h4>
                            </Col>
                            <Col>
                                <div className="formInputs"><Form.Control type="input" placeholder="Type to filter" onChange={(e) => setFilterInput(e.target.value)} /></div>
                            </Col>
                        </Row>



                        <div className="tableHeight mt-3">

                            {/* <div>{JSON.stringify(activeSales, null, 2)}</div> */}
                            <fieldset id="a" disabled={useFormStatus()}>
                                <Table hover id="eventTable">
                                    <thead>
                                        <tr>
                                            <th><button style={{ cursor: "pointer", border: "none", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => handleSetSort({ type: "name", container: "activeauction" })}>Name</button></th>
                                            <th><button style={{ cursor: "pointer", border: "none", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => handleSetSort({ type: "amount", container: "activeauction" })}>Current Bid</button></th>
                                            <th className="d-none d-md-table-cell"><button style={{ cursor: "pointer", border: "none", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => handleSetSort({ type: "owner", container: "activeauction" })}>Owner</button></th>
                                            <th className="d-none d-md-table-cell"><button style={{ cursor: "pointer", border: "none", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => handleSetSort({ type: "validUntil", container: "activeauction" })}>Auction Ends</button></th>
                                            <th>Bid</th>
                                        </tr>
                                    </thead>

                                    <tbody id="eventBody">

                                        {activeSales.filter(filter => filter.name.includes(filterInput.toLocaleLowerCase())).map((salesMap, i) =>
                                            <tr key={i}>
                                                <td><Link to={"/" + salesMap.name}>{salesMap.name}</Link></td>
                                                <td>{salesMap.amount} FUSD</td>
                                                <td className="d-none d-md-table-cell">{salesMap.owner}</td>
                                                <td className="d-none d-md-table-cell">{epochToJsDate(salesMap.validUntil) + " @ " + epochToJsTime(salesMap.validUntil)}</td>
                                                <td><Button size="sm" className="btn-dark-buy" variant="dark" onClick={() => handleSubmit(salesMap.name, Number(salesMap.amount + 1))}>Bid {Number(salesMap.amount + 1)}</Button></td>
                                            </tr>

                                        )}

                                    </tbody>



                                </Table></fieldset>
                        </div>
                        {/* {JSON.stringify(filteredSold, null, 2)} */}
                        <Row>
                            <Col className="mt-4">Currently in auction: {activeSales.length}</Col>
                            <Col align="right" className="mt-2"><a href="https://graffle.io" target="_blank" rel="noreferrer"><Image src="/assets/img/livefeed/powered-by-graffle.webp" style={{ maxHeight: "44px" }} fluid></Image></a></Col>
                        </Row>

                    </div>
                </Col>
                <Col>
                    <div className="frontTray shadow p-4" style={{ borderRadius: "16px" }}>

                        {/* {JSON.stringify(activeSales, null, 2)} */}
                        <Row>
                            <Col xs="12" className="my-auto" lg="auto">
                                <h4>Can be started 🔥</h4>
                            </Col>
                            <Col>
                                <div className="formInputs"><Form.Control type="input" placeholder="Type to filter" onChange={(e) => setFilterAuctionInput(e.target.value)} /></div>
                            </Col>
                        </Row>



                        <div className="tableHeight mt-3">

                            {/* <div>{JSON.stringify(activeAuctions, null, 2)}</div> */}
                            <fieldset id="a" disabled={useFormStatus()}>
                                <Table hover id="eventTable">
                                    <thead>
                                        <tr>
                                            <th><button style={{ cursor: "pointer", border: "none", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => handleSetSort({ type: "name", container: "canbestarted" })}>Name</button></th>
                                            <th><button style={{ cursor: "pointer", border: "none", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => handleSetSort({ type: "amount", container: "canbestarted" })}>Starting Bid</button></th>
                                            <th className="d-none d-md-table-cell"><button style={{ cursor: "pointer", border: "none", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => handleSetSort({ type: "owner", container: "canbestarted" })}>Owner</button></th>
                                            <th className="d-none d-md-table-cell"><button style={{ cursor: "pointer", border: "none", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => handleSetSort({ type: "validUntil", container: "canbestarted" })}>Auction Added</button></th>
                                            <th>Bid</th>
                                        </tr>
                                    </thead>

                                    <tbody id="eventBody">

                                        {activeAuctions.filter(filter => filter.name.includes(filterAuctionInput.toLocaleLowerCase())).map((salesMap, i) =>
                                            <tr key={i}>
                                                <td><Link to={"/" + salesMap.name}>{salesMap.name}</Link></td>
                                                <td>{salesMap.amount} FUSD</td>
                                                <td className="d-none d-md-table-cell">{salesMap.owner}</td>
                                                <td className="d-none d-md-table-cell">{new Date(salesMap.validUntil).toLocaleDateString()}</td>
                                                <td><Button size="sm" className="btn-dark-buy" variant="dark" onClick={() => handleSubmit(salesMap.name, salesMap.amount)}>Bid {salesMap.amount}</Button></td>
                                            </tr>

                                        )}

                                    </tbody>



                                </Table></fieldset>
                        </div>
                        {/* {JSON.stringify(salesData, null, 2)} */}
                        <Row>
                            <Col className="mt-4">Can be auctioned: {activeAuctions.length}</Col>
                            <Col align="right" className="mt-2"><a href="https://graffle.io" target="_blank" rel="noreferrer"><Image src="/assets/img/livefeed/powered-by-graffle.webp" style={{ maxHeight: "44px" }} fluid></Image></a></Col>
                        </Row>

                    </div>
                </Col>
            </Row>
        </Container>
    )

}
import { useEffect, useState } from "react";
import { Row, Col, Container, Table, Image, Button } from "react-bootstrap";
import '../components/livefeed/livefeed.css'
import axios from "axios";
import { useImmer } from "use-immer";
import { Link } from "react-router-dom";
import { handleBuy } from "../functions/txfunctions";
import { useFormStatus } from "../functions/DisabledState";
import { epochToJsDate } from "../functions/epochtodate";
import ReactGA from 'react-ga'

export default function SalesAuction() {
    document.title = ".find - name resale spot"
    ReactGA.pageview(window.location.pathname);
    const [salesData, setSalesData] = useState()
    const [filteredSold, setFilteredSold] = useState()
    const [filteredForSale, setFilteredForSale] = useState()
    const [activeSales, setActiveSales] = useImmer([])
    const [sortType, setSortType] = useState("");

    useEffect(() => {
        const getSales = async () => {
            // console.log("getSales fired")
            let data
            let res = await axios
                .get("https://prod-main-net-dashboard-api.azurewebsites.net/api/company/04bd44ea-0ff1-44be-a5a0-e502802c56d8/search?eventType=A.097bafa4e0b48eef.FIND.Sold,A.097bafa4e0b48eef.FIND.ForSale")
            data = res.data
            setSalesData(data)

        }
        getSales()
    }, [])
    useEffect(() => {
        if (salesData) {
            setFilteredSold(salesData.filter(Event => Event.flowEventId.includes('A.097bafa4e0b48eef.FIND.Sold')))
            setFilteredForSale(salesData.filter(Event => Event.flowEventId.includes('A.097bafa4e0b48eef.FIND.ForSale')))
        }
    }, [salesData])

    useEffect(() => {
        if (filteredSold && filteredForSale) {
            //eslint-disable-next-line
            filteredForSale.map((nameForSale) => {
                if (nameForSale.blockEventData.active) {
                    let isForSale = true
                    let soldNames = filteredSold.filter(Event => Event.blockEventData.name === nameForSale.blockEventData.name)
                    let forSaleNames = filteredForSale.filter(Event => Event.blockEventData.name === nameForSale.blockEventData.name)

                    //check to see if the item was withdrawn AFTER it was listed and remove any prior listings
                    //eslint-disable-next-line
                    forSaleNames.map((saleNames) => {
                        if (!saleNames.blockEventData.active && saleNames.eventDate > nameForSale.eventDate) {
                            isForSale = false
                        }
                        if (nameForSale.eventDate < saleNames.eventDate) {
                            isForSale = false
                        }
                    })
                    //check to see if the item was sold after this listing
                    //eslint-disable-next-line
                    soldNames.map((soldNames) => {
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
                                amount: nameForSale.blockEventData.directSellPrice,
                                owner: nameForSale.blockEventData.owner,
                                validUntil: nameForSale.blockEventData.validUntil
                            })
                        })
                    }
                }
            })
        }
       //eslint-disable-next-line 
    }, [filteredForSale])

    const handleSubmit = (name, amount) => {
        const formValues = [{
            id: "salePrice",
            value: amount
        },
        {
            id: "name",
            value: name
        }]
        //setValidated(true)
        handleBuy(formValues)
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

        sortArray(sortType);
        //eslint-disable-next-line
    }, [sortType]);

    function handleSetSort(sortedBy) {
        setSortType(sortedBy)
    }

    return (
        <Container className="my-5">
            <h1 align="center" className="py-3">What’s for sale? 💰</h1>
            <p align="center" className="pb-5">Check out the latest names for sale below</p>
            <Row>
                <Col>
                    <div className="frontTray shadow p-4" style={{ borderRadius: "16px" }}>

                        {/* {JSON.stringify(activeSales, null, 2)} */}
                        <h4>For sale right now 🔥</h4>
                        <div className="tableHeight">

                            {/* <div>{JSON.stringify(activeSales, null, 2)}</div> */}
                            <fieldset id="a" disabled={useFormStatus()}>
                                <Table hover id="eventTable">
                                    <thead>
                                        <tr>
                                            <th><button style={{ cursor: "pointer", border: "none", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => handleSetSort('name')}>Name</button></th>
                                            <th><button style={{ cursor: "pointer", border: "none", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => handleSetSort('amount')}>Price</button></th>
                                            <th className="d-none d-md-table-cell"><button style={{ cursor: "pointer", border: "none", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => handleSetSort('owner')}>Owner</button></th>
                                            <th className="d-none d-md-table-cell"><button style={{ cursor: "pointer", border: "none", backgroundColor: "transparent", fontWeight: "bold" }} onClick={() => handleSetSort('validUntil')}>Valid Until</button></th>
                                            <th>Buy</th>
                                        </tr>
                                    </thead>

                                    <tbody id="eventBody">

                                        {activeSales.map((salesMap, i) =>
                                            <tr key={i}>
                                                <td><Link to={"/" + salesMap.name}>{salesMap.name}</Link></td>
                                                <td>{salesMap.amount} FUSD</td>
                                                <td className="d-none d-md-table-cell">{salesMap.owner}</td>
                                                <td className="d-none d-md-table-cell">{epochToJsDate(salesMap.validUntil)}</td>
                                                <td><Button size="sm" className="btn-dark-buy" variant="dark" onClick={() => handleSubmit(salesMap.name, salesMap.amount)}>Buy</Button></td>
                                            </tr>
                                        )}

                                    </tbody>



                                </Table></fieldset>
                        </div>
                        {/* {sortedNames} */}
                        <Row>
                            <Col className="mt-4">Names for sale: {activeSales.length}</Col>
                            <Col align="right" className="mt-2"><a href="https://graffle.io" target="_blank" rel="noreferrer"><Image src="/assets/img/livefeed/powered-by-graffle.webp" style={{ maxHeight: "44px" }} fluid></Image></a></Col>
                        </Row>

                    </div>
                </Col>
                {/* <Col>
                    <div className="frontTray shadow p-4" style={{ borderRadius: "16px" }}>
                        <h4>On auction right now ⏳</h4>
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
                                            <td colSpan={6} align="center">Coming soon...</td>
                                        </tr>
                                    }
                                </tbody>



                            </Table>
                        </div>
                        <div align="right" className="pt-3 pe-2"><a href="https://graffle.io" target="_blank" rel="noreferrer"><Image src="/assets/img/livefeed/powered-by-graffle.webp" style={{ maxHeight: "44px" }} fluid></Image></a></div>

                    </div>
                </Col> */}
            </Row>            
        </Container>
    )

}
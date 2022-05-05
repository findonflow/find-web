import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Col, Row, Image, Button, Container, Form, Table } from "react-bootstrap"
import Countdown from "react-countdown";
import { useImmer } from "use-immer";
import { useFormStatus, useStateChanged } from "../../functions/DisabledState";
import { CreateCharityCollection, handleBid, SendFLOWCharity, SendFUSDCharity } from "../../functions/txfunctions";
import './charity-tree.css';
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { scripts } from 'find-flow-contracts'
import { get } from "lodash";
import GraffleSDK from "../../functions/graffle";
import ReactGA from 'react-ga'
import { ReverseLookup } from "../../functions/ReverseLookup";
import { Link } from "react-router-dom";

export function May4thCharityAuction() {
    document.title = ".find - Flovatar x Flow May 4th Charity"
    ReactGA.pageview(window.location.pathname);
    const [auctionLocked, setAuctionLocked] = useState(true)
    const [auctionEndDate, setAuctionEndDate] = useState(new Date(1651791600 * 1000).toUTCString())
    const [validated, setValidated] = useState(false)
    const [nameStatus, setNameStatus] = useState("")
    const [donations, setDonations] = useState()
    const [newBid, setNewBid] = useState()
    const [bidderName, setBidderName] = useState([])
    const cutOffDate = 1640736000

    useEffect(() => {
        async function SearchName(searchName) {
            const response = await fcl.send([
                fcl.script(scripts.name_status),
                fcl.args([fcl.arg(searchName, t.String)]),
            ]);
            const nameStatus = await fcl.decode(response);
            setNameStatus(nameStatus)
            if (nameStatus.lease.auctionEnds) {
                setAuctionEndDate(new Date(nameStatus.lease.auctionEnds*1000).toUTCString())
            }
            if (nameStatus.lease.latestBidBy) {
                setBidderName(await ReverseLookup(nameStatus.lease.latestBidBy))
            }
        
            // setEnteredName(searchName)
        }
        SearchName("flovatarmay4")
        
    }
        // eslint-disable-next-line
        , [useStateChanged(), newBid])

    function StartAuction() {
        setAuctionLocked(false);
    }

    const [formValues, setFormValues] = useImmer([
        {
            id: "amount",
            value: 1
        },
        {
            id: "name",
            value: "flowcharitydonos"
        },
        {
            id: "message",
            value: " With thanks"
        },
        {
            id: "tag",
            value: "may4thcharity"
        }
    ])

    const handleSubmitBid = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        console.log(form.bidAmt.value)
        if (form.bidAmt.value < 1) {
            form.bidAmt.classList.add("is-invalid")
            form.bidAmt.classList.remove("is-valid")
            return
        } else {
            form.bidAmt.classList.add("is-valid")
            form.bidAmt.classList.remove("is-invalid")
        }

        const bidSubmitted = [
            {
                id: "name",
                value: "flovatarmay4"
            },
            {
                id: "bidAmt",
                value: form.bidAmt.value
            }
        ]
        handleBid(bidSubmitted)
    }

    function updateField(e) {
        if (e.target.name === "bidAmt") {
            if (e.target.value < 1) {
                e.target.classList.add("is-invalid")
                e.target.classList.remove("is-valid")
                return
            } else {
                e.target.classList.add("is-valid")
                e.target.classList.remove("is-invalid")
                return
            }
        }
        setFormValues((draft) => {
            const varVal = draft.find((varVal) => varVal.id === e.target.name);
            varVal.value = e.target.value;
            //now validate
            if (e.target.name === "bidAmt") {
                if (e.target.value < 1) {
                    e.target.classList.add("is-invalid")
                    e.target.classList.remove("is-valid")
                } else {
                    e.target.classList.add("is-valid")
                    e.target.classList.remove("is-invalid")
                }
            }
            if (e.target.name === "message") {
                const msgLength = varVal.value.length
                console.log(msgLength)
                if (msgLength > 255) {
                    e.target.classList.add("is-invalid")
                    e.target.classList.remove("is-valid")
                    setValidated(false)
                } else {
                    e.target.classList.add("is-valid")
                    e.target.classList.remove("is-invalid")
                    setValidated(true)
                }
            }
            if (e.target.name === "amount") {
                if (varVal.value < 0.1) {
                    e.target.classList.add("is-invalid")
                    e.target.classList.remove("is-valid")
                    setValidated(false)
                }
                else {
                    e.target.classList.add("is-valid")
                    e.target.classList.remove("is-invalid")
                    setValidated(true)
                }
            }
        })
    }

    const countdownTimer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            StartAuction()
            return null
        } else {
            // Render a countdown
            return <Row className="auction-digits justify-content-center justify-content-md-start">
                <Col xs="auto" className="p-2">{days}<div className="auction-dayshoursmins p-0">days</div></Col>
                <Col xs="auto" className="p-2">:</Col>
                <Col xs="auto" className="p-2">{hours} <div className="auction-dayshoursmins">hours</div></Col>
                <Col xs="auto" className="p-2">:</Col>
                <Col xs="auto" className="p-2">{minutes} <div className="auction-dayshoursmins">mins</div></Col>
                <Col xs="auto" className="p-2">:</Col>
                <Col xs="auto" className="p-2">{seconds} <div className="auction-dayshoursmins">secs</div></Col>
            </Row>;
        }
    };

    useEffect(() => {
        const getDonations = async () => {
            // console.log("getSales fired")
            let data
            let res = await axios
                .get("https://prod-main-net-dashboard-api.azurewebsites.net/api/company/04bd44ea-0ff1-44be-a5a0-e502802c56d8/search?eventType=A.097bafa4e0b48eef.FIND.FungibleTokenSent&tag=may4thcharity")
            data = res.data
            setDonations(data)

        }
        getDonations()
    }, [])

    function addDonation(from, details, amount,  date) {

        let tableRef = document.getElementById("eventBody");

        // Insert a row at the beginning of the table
        let newRow = tableRef.insertRow(0);
        let newCell = newRow.insertCell(0);
        let newText = document.createTextNode(from);
        newCell.appendChild(newText);
        newCell = newRow.insertCell(1);
        newText = document.createTextNode(details);
        newCell.appendChild(newText);
        newCell = newRow.insertCell(2);
        newText = document.createTextNode(amount);
        newCell.appendChild(newText)
        newCell = newRow.insertCell(3);
        newText = document.createTextNode(new Date(date).toLocaleString());
        newCell.appendChild(newText);

    }

    
    let conn = useRef();
    useEffect(() => {
        const streamSDK = new GraffleSDK();
    const feed = async (message) => {
        if (get(message, "flowEventId") === "A.097bafa4e0b48eef.FIND.FungibleTokenSent" && get(message, "blockEventData.tag") === "may4thcharity") {
            addDonation(message.blockEventData.fromName ? message.blockEventData.fromName : message.blockEventData.from, message.blockEventData.message, message.blockEventData.type === "A.3c5959b568896393.FUSD.Vault" ? parseFloat(message.blockEventData.amount).toFixed(2) + " FUSD" : parseFloat(message.blockEventData.amount).toFixed(2) + " FLOW", message.eventDate)
        }
        if (get(message, "flowEventId") === "A.097bafa4e0b48eef.FIND.AuctionBid") {
            setNewBid(message)

        }

        //setLatestMessage(message);
        console.log(message)
    };
        //console.log("Creating the stream")
        async function startConn() {
        conn.current = await streamSDK.stream(feed);
        }
        startConn()
    }, []);
    useEffect(() => () => {
        //console.log("Stopping the connection")
        conn.current.stop()
    }, []);

    return (
        <Container style={{ backgroundColor: "white" }} fluid>
            <fieldset id="a" disabled={useFormStatus()}>
                <Container className="px-5 pb-4">
                    {auctionLocked ?
                        <div className="text-center">
                            <h1>The countdown has begun!</h1>
                            <p>The auction will begin soon, but you can donate immediately</p>
                        </div>
                        :
                        <h1 align="center">The charity auction is now live!</h1>
                    }
                    {/* This is the row for the Col containing NFTT image, Timer and the Col containing Description, auction buttons and gift options */}
                    <Row className="pt-lg-5 pt-3 justify-content-center">
                        <Col className="p-0 m-2" xs="12" md="auto">
                            <Row className="justify-content-center">
                                {/* NFT IMAGE */}
                                <Image className=" p-0 shadow" src="https://flovatar.com/api/image/5286" style={{minWidth: "300px"}} fluid rounded></Image>
                            </Row>
                        </Col>
                        <Col className="" xs="12" lg={{ span: 5, offset: 1 }} xl={{ span: 6, offset: 1 }}>
                            <Row>
                                {
                                    auctionLocked ?
                                        <Col><Countdown date={new Date(165169800 * 1000).toUTCString()} renderer={countdownTimer} /></Col>
                                        :
                                        <Col><Countdown date={new Date(auctionEndDate)} renderer={countdownTimer} key={'2'} /></Col>
                                }
                            </Row>
                            <Row>
                            </Row>


                            <Row >
                                <div className=" pt-4 pb-3"><h4>Flovatar x Flow Community Mental Health Awareness Month Charity Auction</h4></div>
                            </Row>
                            <Row className="">
                                <div className="auction-description">We’re teaming up with Flovatar and Flow to auction off this evil Robotic Sith Lord for #MayTheFlowBeWithYou. All Proceeds will go to the National Alliance on Mental Illness to support Mental Health Awareness Month. The charity organization is matching all donations through the month of May, so you’ll be doubling down anything put toward this cause!</div>
                                <div className="mt-3"><a href="https://www.nami.org/home" target="_blank" rel="noreferrer">You can learn more about NAMI here</a></div>
                            </Row>

                            <Row className="mt-3">
                                <div className="fw-bold my-3">Current bid: <span className="current-bid-flow" > {nameStatus && 
                                                                                                                    nameStatus.lease?.latestBid * 1 + " FUSD - By "}
                                                                                                                    {bidderName ? <Link className="current-bid-flow" to={"/"+bidderName}>{bidderName+".find"}</Link> : nameStatus.lease?.latestBidBy}</span></div>
                            </Row>
                            <Form onSubmit={handleSubmitBid} className="formInputs">
                                <Row>
                                    <Col sm="12" lg="7">
                                        <Form.Label>How much would you like to bid?</Form.Label>
                                        <Form.Control type="number" onChange={(e) => updateField(e)} name="bidAmt" placeholder={"min. " + Number(nameStatus.lease?.latestBid * 1 + 10) + " FUSD"} required />
                                    </Col>
                                    <Col sm="12" lg="5" className="mt-lg-auto mt-3">
                                        <Button type="submit" className="w-100" disabled={auctionLocked} variant="dark">Bid</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    <h4 className="mt-5" align="center">Want to give something to NAMI and be on our Wall of Fame?</h4>
                    <Row className="auction-box charity-gift-widget shadow my-5 p-3">
                        <Col xs="12" md="4" className="p-3" align="center">
                            <Image src="/assets/img/may4th/nami.png" className="mb-2" fluid/>
                           
                                    {nameStatus.profile?.wallets?.map((wallet, i) =>
                                        <div key={i} className="current-donations">{parseFloat(wallet.balance*1).toFixed(2)} {wallet.name} donated so far</div>
                                    )}
                        </Col>
                        <Col>
                            <Form noValidate className="formInputs">
                                <Row>
                                    <Col xs="12" lg="6">
                                        <Form.Label>Enter an amount you would like to gift to Nami</Form.Label>
                                        <Form.Control type="number" name="amount" onChange={(e) => updateField(e)} required />
                                    </Col>
                                    <Col className="mt-lg-auto mt-3">
                                        <Row>
                                            <Col sm="12" md="6" className="">
                                                <Button onClick={() => validated && SendFUSDCharity(formValues)} className="me-3 mt-lg-3 mt-xl-0 w-100" variant="dark">FUSD</Button>
                                            </Col>
                                            <Col sm="12" md="6" className="mt-3 mt-md-0">
                                                <Button onClick={() => validated && SendFLOWCharity(formValues)} className="w-100 mt-lg-3 mt-xl-0" variant="dark">FLOW</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Form.Label>Enter an optional message</Form.Label>
                                        <Form.Control as="textarea" rows={3} name="message" onChange={(e) => updateField(e)} style={{ borderRadius: "16px" }} />
                                    </Col>
                                </Row>
                            </Form>
                        </Col>

                    </Row>
                    <p>If you donate above you will appear on the wall of fame below. There is no limit to the number of times you can donate and your name will appear on the wall as many times as you donate.</p>
                </Container>
                <Container className="pb-5" style={{ backgroundColor: "#F6F6F6" }} fluid>
                    <Container>
                        <Row className="px-5 pt-5">
                            <div className="w-100 charity-tree-headers"><h1>The Wall of Fame</h1></div>
                            <p>Your name will appear here whenever you donate</p>
                        </Row>
                        <Row className="px-5">
                            <div className="frontTray shadow p-4" style={{ borderRadius: "16px" }}>
                                {/* {JSON.stringify(donations, null, 2)} */}
                                <div className="tableHeight">
                                    <Table hover id="eventTable">
                                        <thead>
                                            <tr>
                                                <th className="d-none d-md-table-cell">From</th>
                                                <th>Message</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody id="eventBody">
                                            {donations &&
                                                donations.map((donation, i) =>
                                                new Date(donation.eventDate).valueOf() > cutOffDate*1000 &&
                                                    <tr key={i}>
                                                        <td className="d-none d-md-table-cell">{donation.blockEventData.fromName ? donation.blockEventData.fromName : donation.blockEventData.from}</td>
                                                        <td>{donation.blockEventData.message}</td>
                                                        <td>{ donation.blockEventData.type === "A.3c5959b568896393.FUSD.Vault" ? parseFloat(donation.blockEventData.amount).toFixed(2) + " FUSD" : parseFloat(donation.blockEventData.amount).toFixed(2) + " FLOW"}</td>
                                                        <td>{new Date(donation.eventDate).toLocaleString()}</td>
                                                    </tr>)
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                                <div align="right" className="pe-2"><a href="https://graffle.io" target="_blank" rel="noreferrer"><Image src="/assets/img/livefeed/powered-by-graffle.webp" style={{maxHeight: "44px"}} fluid></Image></a></div>
                            </div>
                        </Row>
                        {/* <Row className="pt-5 px-5">
                            <Col>
                            <div>If you sent in a donation before x on the x you will need to enable the charity collection using the button below. This allows us to airdrop an NFT to you.</div>
                            <Button variant="dark" className="mt-3" onClick={() => CreateCharityCollection()}>Enable Charity Collection</Button>
                            </Col>
                        </Row> */}

                        
                    </Container>
                    
                </Container>
            </fieldset >
        </Container >
    )
}
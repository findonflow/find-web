import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row, Image, Button, Container, Table } from "react-bootstrap"
// import { useImmer } from "use-immer";
import { useFormStatus } from "../../functions/DisabledState";
import { CreateCharityCollection } from "../../functions/txfunctions";
import './charity-tree.css';
// import * as fcl from "@onflow/fcl";
// import * as t from "@onflow/types";
// import { scripts } from 'find-flow-contracts'
// import { get } from "lodash";
// import GraffleSDK from "../../functions/graffle";
import ReactGA from 'react-ga'
//import { ReverseLookup } from "../../functions/ReverseLookup";
import { Link } from "react-router-dom";

export function CharityTreeAuction() {
    document.title = ".find - Neo x Flowverse Charity Christmas Auction"
    ReactGA.pageview(window.location.pathname);
    // const [auctionLocked, setAuctionLocked] = useState(true)
    // const [auctionEndDate, setAuctionEndDate] = useState(new Date(1641142800 * 1000).toUTCString())
    //const [validated, setValidated] = useState(false)
    // const [nameStatus, setNameStatus] = useState("")
     const [donations, setDonations] = useState()
    // const [newBid, setNewBid] = useState()
    // const [bidderName, setBidderName] = useState([])
     const cutOffDate = 1640736000

    // useEffect(() => {
    //     async function SearchName(searchName) {
    //         const response = await fcl.send([
    //             fcl.script(scripts.name_status),
    //             fcl.args([fcl.arg(searchName, t.String)]),
    //         ]);
    //         const nameStatus = await fcl.decode(response);
    //         setNameStatus(nameStatus)
    //         if (nameStatus.lease.auctionEnds) {
    //             setAuctionEndDate(new Date(nameStatus.lease.auctionEnds*1000).toUTCString())
    //         }
    //         if (nameStatus.lease.latestBidBy) {
    //             setBidderName(await ReverseLookup(nameStatus.lease.latestBidBy))
    //         }
        
    //         // setEnteredName(searchName)
    //     }
    //     SearchName("charity2021")
        
    // }
    //     // eslint-disable-next-line
    //     , [useStateChanged(), newBid])

    // function StartAuction() {
    //     setAuctionLocked(false);
    // }

    // const [formValues, setFormValues] = useImmer([
    //     {
    //         id: "amount",
    //         value: 1
    //     },
    //     {
    //         id: "name",
    //         value: "charity2021"
    //     },
    //     {
    //         id: "message",
    //         value: " With thanks"
    //     }
    // ])

    // const handleSubmitBid = (event) => {
    //     const form = event.currentTarget;
    //     event.preventDefault();
    //     console.log(form.bidAmt.value)
    //     if (form.bidAmt.value < 1) {
    //         form.bidAmt.classList.add("is-invalid")
    //         form.bidAmt.classList.remove("is-valid")
    //         return
    //     } else {
    //         form.bidAmt.classList.add("is-valid")
    //         form.bidAmt.classList.remove("is-invalid")
    //     }

    //     const bidSubmitted = [
    //         {
    //             id: "name",
    //             value: "charity2021"
    //         },
    //         {
    //             id: "bidAmt",
    //             value: form.bidAmt.value
    //         }
    //     ]
    //     handleBid(bidSubmitted)
    // }

    // function updateField(e) {
    //     if (e.target.name === "bidAmt") {
    //         if (e.target.value < 1) {
    //             e.target.classList.add("is-invalid")
    //             e.target.classList.remove("is-valid")
    //             return
    //         } else {
    //             e.target.classList.add("is-valid")
    //             e.target.classList.remove("is-invalid")
    //             return
    //         }
    //     }

    //     setFormValues((draft) => {
    //         const varVal = draft.find((varVal) => varVal.id === e.target.name);
    //         varVal.value = e.target.value;
    //         //now validate
    //         if (e.target.name === "bidAmt") {
    //             if (e.target.value < 1) {
    //                 e.target.classList.add("is-invalid")
    //                 e.target.classList.remove("is-valid")
    //             } else {
    //                 e.target.classList.add("is-valid")
    //                 e.target.classList.remove("is-invalid")
    //             }
    //         }
    //         if (e.target.name === "message") {
    //             const msgLength = varVal.value.length
    //             console.log(msgLength)
    //             if (msgLength > 255) {
    //                 e.target.classList.add("is-invalid")
    //                 e.target.classList.remove("is-valid")
    //                 setValidated(false)
    //             } else {
    //                 e.target.classList.add("is-valid")
    //                 e.target.classList.remove("is-invalid")
    //                 setValidated(true)
    //             }
    //         }
    //         if (e.target.name === "amount") {
    //             if (varVal.value < 0.1) {
    //                 e.target.classList.add("is-invalid")
    //                 e.target.classList.remove("is-valid")
    //                 setValidated(false)
    //             }
    //             else {
    //                 e.target.classList.add("is-valid")
    //                 e.target.classList.remove("is-invalid")
    //                 setValidated(true)
    //             }
    //         }
    //     })
    // }

    // const countdownTimer = ({ days, hours, minutes, seconds, completed }) => {
    //     if (completed) {
    //         // Render a completed state
    //         StartAuction()
    //         return null
    //     } else {
    //         // Render a countdown
    //         return <Row className="auction-digits justify-content-center justify-content-md-start">
    //             <Col xs="auto" className="p-2">{days}<div className="auction-dayshoursmins p-0">days</div></Col>
    //             <Col xs="auto" className="p-2">:</Col>
    //             <Col xs="auto" className="p-2">{hours} <div className="auction-dayshoursmins">hours</div></Col>
    //             <Col xs="auto" className="p-2">:</Col>
    //             <Col xs="auto" className="p-2">{minutes} <div className="auction-dayshoursmins">mins</div></Col>
    //             <Col xs="auto" className="p-2">:</Col>
    //             <Col xs="auto" className="p-2">{seconds} <div className="auction-dayshoursmins">secs</div></Col>
    //         </Row>;
    //     }
    // };

    useEffect(() => {
        const getDonations = async () => {
            // console.log("getSales fired")
            let data
            let res = await axios
                .get("https://prod-main-net-dashboard-api.azurewebsites.net/api/company/04bd44ea-0ff1-44be-a5a0-e502802c56d8/search?eventType=A.097bafa4e0b48eef.Profile.Verification")
            data = res.data
            setDonations(data)

        }
        getDonations()
    }, [])

    // function addDonation(from, details, date) {

    //     let tableRef = document.getElementById("eventBody");

    //     // Insert a row at the beginning of the table
    //     let newRow = tableRef.insertRow(0);
    //     let newCell = newRow.insertCell(0);
    //     let newText = document.createTextNode(from);
    //     newCell.appendChild(newText);
    //     newCell = newRow.insertCell(1);
    //     newText = document.createTextNode(details);
    //     newCell.appendChild(newText);
    //     newCell = newRow.insertCell(2);
    //     newText = document.createTextNode(new Date(date).toLocaleString());
    //     newCell.appendChild(newText);

    // }

    
    // let conn = useRef();
    // useEffect(() => {
    //     const streamSDK = new GraffleSDK();
    // const feed = async (message) => {
    //     if (get(message, "flowEventId") === "A.097bafa4e0b48eef.Profile.Verification") {
    //         addDonation(message.blockEventData.account, message.blockEventData.message, message.eventDate)
    //     }
    //     if (get(message, "flowEventId") === "A.097bafa4e0b48eef.FIND.AuctionBid") {
    //         setNewBid(message)

    //     }

    //     //setLatestMessage(message);
    //     //console.log(message)
    // };
    //     //console.log("Creating the stream")
    //     async function startConn() {
    //     conn.current = await streamSDK.stream(feed);
    //     }
    //     startConn()
    // }, []);
    // useEffect(() => () => {
    //     //console.log("Stopping the connection")
    //     conn.current.stop()
    // }, []);

    return (
        <Container style={{ backgroundColor: "white" }} fluid>
            <fieldset id="a" disabled={useFormStatus()}>
                <Container className="px-5 pb-4">
                    {/* {auctionLocked ?
                        <div className="text-center">
                            <h1>The countdown has begun!</h1>
                            <p>The auction will begin soon, but you can donate immediately</p>
                        </div>
                        :
                        <h1 align="center">The charity auction is now live!</h1>
                    } */}
                    <div className="text-center"><h1>The charity auction has now ended!</h1></div>
                    
                    {/* This is the row for the Col containing NFTT image, Timer and the Col containing Description, auction buttons and gift options */}
                    <Row className="pt-lg-5 pt-3 justify-content-center">
                        <Col className="p-0 m-2" xs="12" md="auto">
                            <Row className="justify-content-center">
                                {/* NFT IMAGE */}
                                <Image className=" p-0 shadow" src="/assets/img/charitytree/Community_Tree.webp" style={{ maxWidth: "420px", height: "100%" }} rounded></Image>
                            </Row>
                        </Col>
                        <Col className="" xs="12" lg={{ span: 5, offset: 1 }} xl={{ span: 6, offset: 1 }}>
                            {/* <Row>
                                {
                                    auctionLocked ?
                                        <Col><Countdown date={new Date(1640797200 * 1000).toUTCString()} renderer={countdownTimer} /></Col>
                                        :
                                        <Col><Countdown date={new Date(auctionEndDate)} renderer={countdownTimer} key={'2'} /></Col>
                                }
                            </Row> */}
                            <Row>
                            </Row>


                            <Row >
                                <div className=" pt-4 pb-3"><h4>Neo x Flowverse Community Charity Christmas Tree </h4></div>
                            </Row>
                            <Row className="">
                                <div className="auction-description">This NFT contains all the PFPs of the Neo Advent Calendar Competition Winners and images of the FLOW projects that donated prizes. It is being auctioned off as a 1/1 NFT to raise money for the Women for Afghan Women Charity</div>
                                <div className="mt-3"><a href="https://medium.com/@NeoCollectibles/what-is-the-neo-x-flowverse-community-christmas-tree-4fc5a30da24f" target="_blank" rel="noreferrer">More info can be found on our medium</a></div>
                            </Row>

                            <Row className="mt-3">
                                <div className="fw-bold my-3">Winning bid: <span className="current-bid-flow" >450 FUSD - By <Link className="current-bid-flow" to="/dumbo">dumbo.find</Link></span></div>
                            </Row>
                            <Row>
                                <Col className="mt-3">
                                <div className="d-flex justify-content-center"><div className="profilePic image"><img src="/assets/img/avatars/ElDumbo1000.webp" height="150" width="150" alt="El Dumbo's profile avatar" /></div></div>
                                <div align="center"><h1>WINNER!</h1></div>
                                </Col>
                            </Row>
                            {/* <Form onSubmit={handleSubmitBid} className="formInputs">
                                <Row>
                                    <Col sm="12" lg="7">
                                        <Form.Label>How much would you like to bid?</Form.Label>
                                        <Form.Control type="number" onChange={(e) => updateField(e)} name="bidAmt" placeholder={"min. " + Number(nameStatus.lease?.latestBid * 1 + 10) + " FUSD"} required />
                                    </Col>
                                    <Col sm="12" lg="5" className="mt-lg-auto mt-3">
                                        <Button type="submit" className="w-100" disabled={auctionLocked} variant="dark">Bid</Button>
                                    </Col>
                                </Row>
                            </Form> */}
                        </Col>
                    </Row>
                    {/* <h4 className="mt-5" align="center">Want to give something to WAW and be on our Wall of Fame as well as receive an airdrop in the New Year?</h4> */}
                    <Row className="auction-box charity-gift-widget shadow my-5 p-3">
                        <Col xs="12" className="p-3" align="center">
                            <a href="https://womenforafghanwomen.org/" target="_blank" rel="noreferrer"><Image src="/assets/img/charitytree/waw.webp" className="mb-2" /></a>
                           
                                    
                                        <div className="current-donations">1390.29 FUSD donated</div>
                                        <div className="current-donations">56.121 FLOW donated</div>
               
                        </Col>
                        {/* <Col>
                            <Form noValidate className="formInputs">
                                <Row>
                                    <Col xs="12" lg="6">
                                        <Form.Label>Enter an amount you would like to gift to WAW</Form.Label>
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
                        </Col> */}

                    </Row>
                    {/* <p>If you donate above you will appear on the wall of fame below. There is no limit to the number of times you can donate and your name will appear on the wall as many times as you donate. Every person who donates will receive an airdrop in the new year in the form of an NFT.</p> */}
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
                                                <th>Details</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody id="eventBody">
                                            {donations &&
                                                donations.map((donation, i) =>
                                                new Date(donation.eventDate).valueOf() > cutOffDate*1000 &&
                                                    <tr key={i}>
                                                        <td className="d-none d-md-table-cell">{donation.blockEventData.account}</td>
                                                        <td>{donation.blockEventData.message}</td>
                                                        <td>{new Date(donation.eventDate).toLocaleString()}</td>
                                                    </tr>)
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                                <div align="right" className="pe-2"><a href="https://graffle.io" target="_blank" rel="noreferrer"><Image src="/assets/img/livefeed/powered-by-graffle.webp" style={{maxHeight: "44px"}} fluid></Image></a></div>
                            </div>
                        </Row>
                        <Row className="pt-5 px-5">
                            <Col>
                            <div>If you sent in a donation before {new Date('2021/12/29 16:30:00').toLocaleString()} you will need to enable the charity collection using the button below. This allows us to airdrop an NFT to you. If you did not donate and still click the below button, a collection will be created but no airdrop will take place.</div>
                            <Button variant="dark" className="mt-3" onClick={() => CreateCharityCollection()}>Enable Charity Collection</Button>
                            </Col>
                        </Row>

                        
                    </Container>
                    
                </Container>
            </fieldset >
        </Container >
    )
}

import { Button, Form, Col, Row } from "react-bootstrap";
import { epochToJsDate, epochToJsTime } from "../../functions/epochtodate";
import { handleBid, handleBuy, handleCancelBid, handleFullfillAuction, handleOffer } from "../../functions/txfunctions";
import { useImmer } from "use-immer";
import * as fcl from "@onflow/fcl";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Form to bid on an active auction
export function BuyerBid({ lease }) {

    const [user, setUser] = useState({ loggedIn: null })
    useEffect(() => fcl.currentUser().subscribe(setUser), [])
    const [formValues, setFormValues] = useImmer([
        {
            id: "bidAmt",
            value: lease.latestBid * 1 + 1
        },
        {
            id: "name",
            value: lease.name
        }
    ])

    function updateField(e) {
        setFormValues((draft) => {
            const varVal = draft.find((varVal) => varVal.id === e.target.name);
            varVal.value = e.target.value;
        })
    }

    return (
        <div>
            {user.addr !== lease.latestBidBy ?
                <div className="p-3">
                    <h3>This name is currently up for auction.</h3>
                    <p>Latest Bid: {lease.latestBid * 1} FUSD</p>
                    <p>by: {lease.latestBidBy}</p>
                    <p>Auction ends: {epochToJsDate(lease.auctionEnds) + " at " + epochToJsTime(lease.auctionEnds)}</p>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>{<div>You must bid at least {lease.latestBid * 1 + 1} FUSD</div>}</Form.Label>
                                    <Form.Control type="number" defaultValue={lease.latestBid * 1 + 1} onChange={updateField} name="bidAmt" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button onClick={() => handleBid(formValues)} variant="outline-dark" className="mt-3">Place Bid</Button>
                            </Col>
                        </Row>
                    </Form>
                    <Row>
                        <Col className="mt-3 p-0" xs="12"><p className="formSubLabel">Bids that take place within 5 minutes of the end time will trigger an automatic 5 minute extension on the auction time. This is to allow all bidders enough time to get their bids in.</p></Col>
                    </Row>
                    {/* {JSON.stringify(lease, null, 2)} */}
                </div>
                :
                <div className="p-3">
                    <h3>Congrats you are the highest bidder!.</h3>
                    <p>Auction ends: {epochToJsDate(lease.auctionEnds) + " at " + epochToJsTime(lease.auctionEnds)}</p>
                    {/* ---REMOVED PENDING DECISION---
        <Form>
            <Form.Group>
                <Form.Label>{<div>You can increase your bid anytime (min. {lease.latestBid*1+1} FUSD)</div>}</Form.Label>
                <Form.Control type="number" defaultValue={lease.latestBid*1+1} onChange={updateField} name="bidAmt" />
            </Form.Group>
            <Button onClick={() => handleIncreaseBid(formValues)} variant="outline-dark" className="mt-3">Place Bid</Button>
        </Form> */}
                </div>}
        </div>
    )
}
//Form to show bids on the profile page (not a form currently)
export function PrivateBid({ bid }) {
    var bidDate = epochToJsDate(bid.timestamp) + " at " + epochToJsTime(bid.timestamp)
    return (
        <div>
            <p>You have a {bid.type} bid in for <b>{bid.amount * 1} FUSD</b> made on {bidDate}</p>
            <p><Link to={"/" + bid.name}>Click Here</Link> to go to this name</p>
        </div>
    )
}
//Form to make an initial offer on a name (blind bid)
export function BuyerOffer({ lease }) {
    const [formValues, setFormValues] = useImmer([
        {
            id: "bidAmt",
            value: "0"
        },
        {
            id: "name",
            value: lease.name
        }
    ])

    function updateField(e) {
        setFormValues((draft) => {
            const varVal = draft.find((varVal) => varVal.id === e.target.name);
            varVal.value = e.target.value;
        })
    }
    return (
        <Form className="formInputs">
            <Form.Group>
                <Row>
                    <Col xs="12" md="auto" className="my-3">
                        <Form.Label>{<div className="idd">You can make an offer for this name even though it isn't for sale.</div>}</Form.Label>
                        <Form.Control type="number" placeholder="Enter an amount in FUSD" onChange={updateField} name="bidAmt" />
                    </Col>
                    <Col className="my-3 mt-auto" align="right">
                        <Button onClick={() => handleOffer(formValues)} variant="outline-dark">Make offer</Button>
                    </Col>
                </Row>
                <Row>
                    <span className="idd1 my-3">The owner of the name will be notified and can choose to either accept the offer directly, reject it, or start an auction with you as the top bidder.</span>
                </Row>
            </Form.Group>
        </Form>
    )
}
//Form to directly purchase a name that has been placed up for sale
export function BuyerPurchase({ lease }) {
    const formValues = [{
        id: "salePrice",
        value: lease.salePrice
    },
    {
        id: "name",
        value: lease.name
    }]

    return (
        <Form>
            <Row>
                <Col className="d-flex align-items-center" xs="12" md="auto">
                    <Form.Group className="p-3">
                        <Form.Label><div>{lease.name} is for sale You can buy it for: <b>{parseFloat(lease.salePrice)} FUSD</b></div></Form.Label>
                    </Form.Group>
                </Col>
                <Col align="right">
                    <Form.Group className="p-3">
                        <Button onClick={() => handleBuy(formValues)} variant="outline-dark">Purchase this name</Button>
                    </Form.Group>
                </Col>
            </Row>

        </Form>
    )
}
//Form to start an auction that is active but not yet started (first bid)
export function BuyerFirstBid({ lease }) {

    const [formValues, setFormValues] = useImmer([
        {
            id: "bidAmt",
            value: lease.auctionStartPrice * 1
        },
        {
            id: "name",
            value: lease.name
        }
    ])

    function updateField(e) {
        setFormValues((draft) => {
            const varVal = draft.find((varVal) => varVal.id === e.target.name);
            varVal.value = e.target.value;
        })
    }

    return (
        <div className="p-3">
            <Form className="formInputs">
                <Row>
                    <Col>
                        <h3>You can start an auction on {lease.name}.</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>{<div>Minimum bid {lease.auctionStartPrice * 1} FUSD</div>}</Form.Label>
                            <Form.Control type="number" defaultValue={lease.auctionStartPrice * 1} onChange={updateField} name="bidAmt" />
                            <Form.Control type="hidden" value={lease.name} onLoad={updateField} name="name" />
                        </Form.Group>
                    </Col>
                    <Col className="mt-auto" align="right">
                        <Button onClick={() => handleBid(formValues)} variant="outline-dark" className="mt-3">Place Bid</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="mt-3 p-0" xs="12"><p className="formSubLabel">Bids that take place within 5 minutes of the end time will trigger an automatic 5 minute extension on the auction time. This is to allow all bidders enough time to get their bids in.</p></Col>
                </Row>
            </Form>





        </div>
    )
}
//Form to show you are the highest bidder and allow increase of bid amount
export function HighestBidder({ lease }) {

    const [formValues, setFormValues] = useImmer([
        {
            id: "bidAmt",
            value: lease.latestBid * 1 + 1
        },
        {
            id: "name",
            value: lease.name
        }
    ])

    function updateField(e) {
        setFormValues((draft) => {
            const varVal = draft.find((varVal) => varVal.id === e.target.name);
            varVal.value = e.target.value;
        })
    }

    return (
        <Form className="formInputs">
            <Form.Group>
                <Row>
                    <Col xs="12" md="auto" className="my-3">
                        <p>{lease.name} has an active auction.</p>
                        <p>You are currently the highest bidder with <b>{lease.latestBid * 1} FUSD</b></p>
                        <p>The reserve price is set at {lease.auctionReservePrice * 1} FUSD</p>
                        <p>This auction ends: {epochToJsDate(lease.auctionEnds) + " at " + epochToJsTime(lease.auctionEnds)}</p>
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Col xs="12" md="auto" className="mb-3 mb-md-0">
                            <Form.Group>
                                <Form.Label>{<div>You must bid at least {lease.latestBid * 1 + 1} FUSD to increase your current bid</div>}</Form.Label>
                                <Form.Control type="number" Value={lease.latestBid * 1 + 1} onChange={updateField} name="bidAmt" />
                            </Form.Group>
                        </Col>
                        <Col className="mt-auto" align="right">
                            <Button style={{ width: "200px" }} onClick={() => handleBid(formValues)} variant="outline-dark">Increase</Button>
                        </Col>
                    </Row>
                </Form>
                <Row>
                    <Col className="mt-3" xs="12"><p className="formSubLabel">Bids that take place within 5 minutes of the end time will trigger an automatic 5 minute extension on the auction time. This is to allow all bidders enough time to get their bids in.</p></Col>
                </Row>

            </Form.Group>
        </Form>
    )
}
//Form to fulfill an ended auction
export function HighestBidderEnded({ lease }) {
    const formValues = [{
        id: "address",
        value: lease.address
    },
    {
        id: "name",
        value: lease.name
    }]
    let latestBid = lease.latestBid
    let reservePrice = lease.auctionReservePrice
    console.log(latestBid + " " + reservePrice)
    if (latestBid - reservePrice >= 0) {
        return (
            <Form className="formInputs">
                <Form.Group>
                    <Row>
                        <Col xs="12" md="auto" className="my-3">
                            <p>You have won {lease.name}!! Congratulations</p>
                            <p>The final amount was: {lease.latestBid * 1} FUSD</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="auto" className="my-3">
                            <p>You can confirm by clicking the fulfill button</p>
                        </Col>
                        <Col className="my-3 mt-auto" align="right">
                            <Button style={{ width: "200px" }} onClick={() => handleFullfillAuction(formValues)} variant="outline-dark">Fulfill</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        )
    }
    else
        return (
            <Form className="formInputs">
                <Form.Group>
                    <Row>
                        <Col xs="12" md="auto" className="my-3">
                            <p>The auction failed to meet its reserve</p>
                            <p>The final amount was: {lease.latestBid * 1} FUSD</p>
                            <p>The reserve set was: {lease.auctionReservePrice * 1} FUSD</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="auto" className="my-3">
                            <p>To cancel this bid and return your FUSD</p>
                        </Col>
                        <Col className="my-3 mt-auto" align="right">
                            <Button style={{ width: "200px" }} onClick={() => handleFullfillAuction(formValues)} variant="outline-dark">Cancel</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        )
}
//Holding form to show to people in the interim period of auction ended and fulfillment
export function AuctionEndedNoWinner({ lease }) {

    return (
        <Row className="my-3">
            <Col>
                <p>This name has been auctioned but the buyer and seller have not yet completed. You will be able to make an offer on this name as soon as completion has taken place.</p>
            </Col>
        </Row>
    )
}
//Form to show that you have made an offer on a name.
export function OfferMade({ lease }) {
    return (
    <div>
        <Row className="my-3">
            <Col className="m-auto">
                <p>You have made an offer on {lease.name} of <b>{lease.latestBid * 1} FUSD</b></p>
            </Col>
            <Col className="my-3" align="right">
                <Button style={{ width: "200px" }} onClick={() => handleCancelBid(lease.name)} variant="outline-dark">Cancel</Button>
            </Col>
        </Row>
        <Row>
            <Col>
                <p className="formSubLabel">The owner of the name has been notified and can choose to either accept the offer directly, reject it, or start an auction with you as the top bidder.</p>
            </Col>
        </Row>
    </div>
    )
}
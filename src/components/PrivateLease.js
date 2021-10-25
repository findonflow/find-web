import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Tx } from "../functions/transaction";
import { transactions } from 'find-flow-contracts'
import { useEffect, useState } from 'react';
import { useFormStatus } from '../functions/DisabledState';
import { DurationLegend } from './lease/SharedComponents';
import { DelistName } from './lease/SellerForms';
import { epochToJsDate, epochToJsTime } from '../functions/epochtodate';

export function PrivateLease({ lease }) {

  const [user, setUser] = useState({ loggedIn: null })
  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  const [bidPrice, setBidPrice] = useState(null)
  const handleSell = async (e) => {
    try {
      await Tx(
        [
          fcl.transaction(transactions.listForSale),
          fcl.args([
            fcl.arg(lease.name, t.String),
            fcl.arg(parseFloat(bidPrice).toFixed(2), t.UFix64)
          ]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            console.log("start")
          },
          onSubmission() {
            console.log("submitted")
          },
          async onSuccess(status) {
            console.log("success")
            const event = document.createEvent("Event");
            event.initEvent("bid", true, true);
            document.dispatchEvent(event);
          },
          async onError(error) {
            if (error) {
              const { message } = error;
              console.log(message)
            }
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  const handleFullfillSale = async (e) => {
    e.preventDefault();
    try {
      await Tx(
        [
          fcl.transaction(transactions.fullfill),
          fcl.args([
            fcl.arg(lease.name, t.String)
          ]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            console.log("start")
          },
          onSubmission() {
            console.log("submitted")
          },
          async onSuccess(status) {
            console.log("success")
            const event = document.createEvent("Event");
            event.initEvent("bid", true, true);
            document.dispatchEvent(event);
          },
          async onError(error) {
            if (error) {
              const { message } = error;
              console.log(message)
            }
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  const [startPrice, setPrice] = useState(null)
  const [reservePrice, setReserve] = useState(null)
  const [duration, setDuration] = useState(null)
  async function handleStartAuction(e) {
    e.preventDefault();
    try {
      await Tx(
        [
          fcl.transaction(transactions.listForAuction),
          fcl.args([
            fcl.arg(lease.name, t.String),
            fcl.arg(parseFloat(startPrice).toFixed(2), t.UFix64),
            fcl.arg(parseFloat(reservePrice).toFixed(2), t.UFix64),
            fcl.arg(parseFloat(duration).toFixed(2), t.UFix64),
            fcl.arg("300.0", t.UFix64),
          ]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            console.log("start");
          },
          onSubmission() {
            console.log("submitted");
          },
          async onSuccess(status) {
            console.log("success");
            const event = document.createEvent("Event");
            event.initEvent("bid", true, true);
            document.dispatchEvent(event);
          },
          async onError(error) {
            if (error) {
              const { message } = error;
              console.log(message);
            }
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      await Tx(
        [
          fcl.transaction(transactions.cancelAuction),
          fcl.args([
            fcl.arg(lease.name, t.String)
          ]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            console.log("start")
          },
          onSubmission() {
            console.log("submitted")
          },
          async onSuccess(status) {
            console.log("success")
            const event = document.createEvent("Event");
            event.initEvent("bid", true, true);
            document.dispatchEvent(event);
          },
          async onError(error) {
            if (error) {
              const { message } = error;
              console.log(message)
            }
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  const handleFullfillAuction = async (e) => {
    e.preventDefault();
    try {
      await Tx(
        [
          fcl.transaction(transactions.fullfill_auction),
          fcl.args([
            fcl.arg(user.addr, t.Address),
            fcl.arg(lease.name, t.String)
          ]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            console.log("start")
          },
          onSubmission() {
            console.log("submitted")
          },
          async onSuccess(status) {
            console.log("success")
            const event = document.createEvent("Event");
            event.initEvent("bid", true, true);
            document.dispatchEvent(event);
          },
          async onError(error) {
            if (error) {
              const { message } = error;
              console.log(message)
            }
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }
  //---THIS SECTION NEEDS TO BE OVERHAULED AND MIGRATED TO SELLER FORMS---
  //---HANDLE CURRENT BIDS IF IN AUCTION---
  let bids = null
  if (lease.auctionStartPrice != null) {
    let button = null
    if (lease.auctionEnds <= lease.currentTime) {
      if (lease.latestBid - lease.auctionReservePrice > 0)
        bids = <Row>
          <Col className='d-flex align-items-center my-2' xs="12" md="12">
            This auction ended {epochToJsDate(lease.auctionEnds) + " at " + epochToJsTime(lease.auctionEnds)}
          </Col>
          <Col className='d-flex align-items-center my-2' xs="12" md="auto">
            <p>Final bid <b>{lease.latestBid * 1} FUSD</b> by {lease.latestBidBy}</p>
          </Col>
          <Col align="right">
            <Button text="fullfill" style={{ width: "200px" }} onClick={handleFullfillAuction} variant="outline-dark">Fulfill</Button>
          </Col>
        </Row>
      else {
        bids = <Row>
          <Col className='d-flex align-items-center my-2' xs="12" md="12">
            This auction ended {epochToJsDate(lease.auctionEnds) + " at " + epochToJsTime(lease.auctionEnds)}
          </Col>
          <Col className='d-flex align-items-center my-2' xs="12" md="12">
            <p>Final bid <b>{lease.latestBid * 1} FUSD</b> failed to meet the reserve price of <b>{lease.auctionReservePrice * 1} FUSD</b></p>
          </Col>
          <Col className='d-flex align-items-center my-2' xs="12" md="auto">
            <p>To finish this auction and relist click fulfill. you can cancel the auction at any time.</p>
          </Col>
          <Col align="right">
            <Button text="fullfill" onClick={handleFullfillAuction} variant="outline-dark" size='sm'>Fulfill</Button>
          </Col>
        </Row>
      }
    }
    else {
      bids = <Row>
        <Col className='d-flex align-items-center my-2' xs="12" md="12">
          <p>Ongoing auction until {epochToJsDate(lease.auctionEnds) + " at " + epochToJsTime(lease.auctionEnds)}</p>
        </Col>
        <Col className='d-flex align-items-center my-2' xs="12" md="auto">
          <p>latest bid <b>{lease.latestBid * 1} FUSD</b> by {lease.latestBidBy}</p>
        </Col>
        <Col align="right">
          <Button text="cancel" style={{ width: "200px" }} onClick={handleCancel} variant="outline-dark">Cancel</Button>
        </Col>
      </Row>
    }
    if (lease.auctionStartPrice !== null && lease.auctionEnds === null) {
      button = <Button text="cancel" style={{ width: "200px" }} onClick={handleCancel} variant="outline-dark">Cancel</Button>
      bids = <Row>
        <Col className='d-flex align-items-center my-2' xs="12" md="12">
          <p>{lease.name} is listed for sale by auction. The auction timer will start when the first bid is made</p>
        </Col>
        <Col className='d-flex align-items-center my-2' xs="12" md="12">
          <p>Listing price:&nbsp;<b>{lease.auctionStartPrice * 1} FUSD</b></p>
        </Col>
        <Col className='d-flex align-items-center my-2' xs="12" md="12">
          <p>Reserve Price:&nbsp;<b>{lease.auctionReservePrice * 1} FUSD</b></p>
        </Col>
        <Col className='d-flex align-items-center' xs="12" md="auto">
          Cancel this auction
        </Col>
        <Col align="right">
          {button}
        </Col>
      </Row>
    }
  }
  if (lease.latestBid !== null && lease.auctionEnds === null) {
    bids = <Row className="mb-3 py-2" style={{ backgroundColor: "#E4F5E1", borderRadius: "10px" }}>
      <Col className='d-flex align-items-center my-2' xs="12" md="12">
        <p><b>{lease.latestBidBy}</b>&nbsp; has sent an offer of &nbsp;<b>{lease.latestBid * 1} FUSD</b>&nbsp; for {lease.name}</p>
      </Col>
      <Col className='my-2' xs="12" md="12" align="right">
        <Button text="sell" onClick={handleFullfillSale} style={{ width: "200px" }} variant="outline-dark">Accept</Button>
      </Col>
      <Col className='my-2' xs="12" md="12" align="right">
        <Button text="reject" onClick={handleCancel} style={{ width: "200px" }} variant="outline-dark">Reject</Button>
      </Col>
      {/* ---FURTHER DISCUSSION NEEDD HERE. IS THE OFFER CANCELLED, CAN THEY SET A RESERVE AND DURATION ETC?---
      
      <Col className='my-2' xs="12" md="12" align="right">
        <Button text="reject" onClick={handleCancel} style={{ width: "200px" }} variant="outline-dark">Auction</Button>
      </Col> */}
    </Row>
  }
  //---HANDLE DIRECT SALE LISTINGS OR LIST AS AN AUCTION---
  let saleList = null
  let saleAuction = null
  let listFor = ""
  let auctionFor = ""
  if (lease.salePrice !== null) {
    listFor = <DelistName lease={lease} />
  }
  if (lease.salePrice === null && lease.auctionStartPrice === null) {
    listFor = <Form onSubmit={handleSell} className="formInputs">
    <Row>
      <Col>
      <p style={{ marginBottom: "10px", color: "#5C5C5C", fontWeight: "500" }}>List for a fixed price</p>
      </Col>
    </Row>
    <Row>
      <Col xs="12" md="6">
        <Form.Label className='formSubLabel'>Sale Price</Form.Label>
        <Form.Control placeholder="Enter an amount in FUSD" onChange={(e) => setBidPrice(e.target.value)}></Form.Control>
      </Col>
      <Col className='mt-md-auto' align="right" xs="12" md="6">
        <Button className='mt-3' text="auction" onClick={handleSell} variant="outline-dark" style={{ width: "200px" }}>Sell</Button>
      </Col>
    </Row>
    </Form>
  }
  if (lease.auctionStartPrice === null && lease.salePrice === null) {
    auctionFor =
      <div id="listAuction">
        <p style={{ marginBottom: "10px", color: "#5C5C5C", fontWeight: "500" }}>List as an auction</p>
        <Form onSubmit={handleStartAuction}>
          <Row>
            <Col xs="12" md="6">
              <Form.Label className='formSubLabel'>Start Price</Form.Label>
              <Form.Control placeholder="Enter an amount in FUSD" onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Col>
            <Col xs="12" md="6">
              <Form.Label className='formSubLabel'>Reserve Price</Form.Label>
              <Form.Control placeholder="Enter an amount in FUSD" onChange={(e) => setReserve(e.target.value)}></Form.Control>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="6">
              <Form.Label className='formSubLabel'>Duration</Form.Label>
              <Form.Select aria-label="Duration Select" onChange={(e) => setDuration(e.target.value)}>
                <option>Select duration</option>
                <option value="60">1 min</option>
                <option value="180">3 mins</option>
                <option value="300">5 mins</option>
                <option value="86400">1 Day</option>
                <option value="259200">3 Days</option>
                <option value="604800">7 Days</option>
              </Form.Select>
            </Col>
            <Col className='mt-md-auto' align="right" xs="12" md="6">
              <Button className='mt-3' text="auction" onClick={handleStartAuction} variant="outline-dark" style={{ width: "200px" }}>List</Button>
            </Col>
            <Row>
              <Col className="mt-3 p-0"><p className="formSubLabel">When you list an auction, the countdown timer will not start until somebody makes their first bid for the start price or higher.</p></Col>
            </Row>
          </Row>
        </Form>
      </div>
  }
  saleList = listFor
  saleAuction = auctionFor
  //} 	

  return (
    <Row xs='1'>
      <Col className='my-2'>

        <fieldset disabled={useFormStatus()}>
          <DurationLegend lease={lease} />
        </fieldset>

        {/* <Button onClick={handleProfile}>Add fusd to profile</Button><br />
          <Button onClick={handleMintFUSD}>Add FUSD Funds</Button> */}
      </Col>
      <Col className='my-2'>

        <fieldset disabled={useFormStatus()}>
          {bids}
          {saleList}
        </fieldset>
      </Col>
      <Col className='my-2'>
        <fieldset disabled={useFormStatus()}>
          {saleAuction}
        </fieldset>
      </Col>
      {/* {JSON.stringify(lease,null,2)} */}
    </Row>

  )
}

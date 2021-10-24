import React, { useRef } from "react";
import TimeAgo from 'react-timeago'
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { Tx } from "../functions/transaction";
import { transactions } from 'find-flow-contracts'
import { Card, Form, Button } from 'react-bootstrap';
import { epochToJsDate } from "../functions/epochtodate";
import { useFormStatus } from "../functions/DisabledState";
// import EasyEdit from 'react-easy-edit'

export function PublicLease({ lease }) {
  const bidForm = useRef(null);
  const handleBid = async (e) => {
    e.preventDefault();
    const { bidAmt } = bidForm.current;
    if (!bidAmt.value) {
			console.log("specify a name")
			return
    }
    console.log("This is the value submitted: "+bidAmt.value)
		//format value properly
		try {
      await Tx(
        [
          fcl.transaction(transactions.bid),
          fcl.args([
            fcl.arg(lease.name, t.String),
						fcl.arg(bidAmt.value, t.UFix64)
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

	 
	let durationLegend= <div>Valid for {<TimeAgo date={new Date(lease.expireTime * 1000)} />}</div> 
  let legendColor = "green"
	if(lease.status.rawValue.value === 2) {
		durationLegend= <div>Locked until {<TimeAgo date={new Date(lease.expireTime * 1000)} />}</div>
    legendColor = "red"
	}

	let bidLegend="Blind Bid"
	if(lease.auctionEnds !== null && lease.latestBid !== null) {
		bidLegend="Add auction bid"
	} else if( lease.salePrice !== null) {
		bidLegend="Bid"
	} 
	return <div>
    <Card>
      <Card.Body style={{backgroundColor: legendColor, color: "white"}}>
        <b>{durationLegend}</b>
      </Card.Body>
    </Card>
		{/* name: { lease.name} {durationLegend}  <br />  */}
    <Card>
    <fieldset id="a" disabled={useFormStatus()}>
      {bidLegend==="Bid" &&
      <Form onSubmit={handleBid} ref={bidForm}>
        <Form.Group className="p-3">
        <Form.Label>{bidLegend==="Bid"?<div>This is for sale</div>:<div>Enter a bid</div>}</Form.Label>
        <Form.Control type="number" defaultValue={lease.salePrice} name="bidAmt" />
        </Form.Group>
        <Form.Group className="p-3">
          <Button onClick={handleBid} variant="success">Purchase this name</Button>
        </Form.Group>
      </Form>}
      {bidLegend==="Add auction bid" &&
      <div>
        <h3>This name is currently up for auction.</h3>
        <div>Latest Bid: {lease.latestBid*1} FUSD</div>
        <div>by: {lease.latestBidBy}</div>
        <div>Auction ends: {epochToJsDate(lease.auctionEnds).toString()}</div>
      <Form onSubmit={handleBid} ref={bidForm}>
        <Form.Group className="p-3">
          <Form.Label>{<div>You must bid at least {lease.latestBid*1+1} FUSD</div>}</Form.Label>
          <Form.Control type="number" defaultValue={lease.latestBid*1+1} name="bidAmt" />
        </Form.Group>
        <Form.Group className="p-3">
          <Button onClick={handleBid} variant="success">Place Bid</Button>
        </Form.Group>
      </Form>
      </div>}
      {bidLegend==="Blind Bid" &&
      <Form onSubmit={handleBid} ref={bidForm}>
        <Form.Group className="p-3">
          <Form.Label>{<div>If you want this name you can make a bid for it.</div>}</Form.Label>
          <Form.Control type="number" defaultValue={lease.salePrice || 5.0} name="bidAmt" />
        </Form.Group>
        <Form.Group className="p-3">
          <Button onClick={handleBid} variant="success">Place Bid</Button>
        </Form.Group>
      </Form>}
      </fieldset>
    </Card>
    {/* <div>{JSON.stringify(lease, null, 2)}</div> */}
		{/* <div> {bidLegend}: <EasyEdit value={lease.latestBid || 5.0} type="number" placeholder="Blind Bid!" instructions="Put in a blind bid for this name" onSave={handleBid} saveButtonLabel="Bid" /> </div> */}
    </div>
}

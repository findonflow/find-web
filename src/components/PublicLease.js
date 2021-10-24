import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useFormStatus } from "../functions/DisabledState";
import { BuyerBid, BuyerFirstBid, BuyerOffer, BuyerPurchase, HighestBidder, HighestBidderEnded, AuctionEndedNoWinner } from "./lease/BuyerForms";
import { DurationLegend } from "./lease/SharedComponents";
import * as fcl from "@onflow/fcl";

export function PublicLease({ lease }) {

  const [user, setUser] = useState({ loggedIn: null })
  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  let bidLegend = "Blind Bid"
  if (lease.auctionEnds !== null && lease.latestBid !== null) {
    if(lease.auctionEnds > lease.currentTime){
      bidLegend = "Add auction bid"
    }else {
      bidLegend = "AuctionEndedNoWinner"
    }
  }
  if (lease.auctionStartPrice !== null && lease.latestBid === null) {
    bidLegend = "FirstBid"
  }
  if (lease.salePrice !== null) {
    bidLegend = "Bid"
  }
  if (lease.latestBidBy === user.addr) {
    if (lease.auctionEnds > lease.currentTime) {
      bidLegend = "HighestBidder"
    }
    else {
      bidLegend = "HighestBidderEnded"
    }
  }
  return (
    <div>
      {<DurationLegend lease={lease} />}
      <fieldset id="a" disabled={useFormStatus()}>
        {bidLegend === "Bid" &&
          <BuyerPurchase lease={lease} />
        }
        {bidLegend === "Add auction bid" &&
          <BuyerBid lease={lease} />
        }
        {bidLegend === "FirstBid" &&
          <BuyerFirstBid lease={lease} />
        }
        {bidLegend === "Blind Bid" &&
          <BuyerOffer lease={lease} />
        }
        {bidLegend === "HighestBidder" &&
          <HighestBidder lease={lease} />
        }
        {bidLegend === "HighestBidderEnded" &&
          <HighestBidderEnded lease={lease} />
        }
        {bidLegend === "AuctionEndedNoWinner" &&
          <AuctionEndedNoWinner lease={lease} />
        }
      </fieldset>
      {/* <div>{JSON.stringify(lease, null, 2)}</div> */}
    </div>
  )
}

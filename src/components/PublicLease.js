import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useFormStatus } from "../functions/DisabledState";
import { BuyerBid, BuyerFirstBid, BuyerOffer, BuyerPurchase, HighestBidder, HighestBidderEnded, AuctionEndedNoWinner, OfferMade, BuyerForSaleOffer } from "./lease/BuyerForms";
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
  if (lease.latestBid !== null && lease.latestBidBy === user.addr && lease.auctionEnds !== null) {
    if (lease.auctionEnds > lease.currentTime) {
      bidLegend = "HighestBidder"
    }
    else {
      bidLegend = "HighestBidderEnded"
    }
  }
  if(lease.auctionStartPrice === null && lease.latestBid !== null && user.addr === lease.latestBidBy) {
    bidLegend = "OfferMade"
  }

  return (
    <div>
      {<DurationLegend lease={lease} />}
      <fieldset id="a" disabled={useFormStatus()}>
        {bidLegend === "Bid" &&
        <div>
          <BuyerPurchase lease={lease} />
          <BuyerForSaleOffer lease={lease} /></div>
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
        {bidLegend === "OfferMade" &&
          <OfferMade lease={lease} />
        }

      </fieldset>
      {/* <div>{JSON.stringify(lease, null, 2)} <br /><br />{user.addr}</div> */}
    </div>
  )
}

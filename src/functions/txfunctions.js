import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { transactions } from 'find-flow-contracts'
import { Tx } from "../functions/transaction";

//Eventually all tx will happen here, this could be improved programatically.

export const handleProfile = async (value) => {
  try {
    await Tx(
      [
        fcl.transaction(transactions.createProfile),
        fcl.args([
          fcl.arg(value, t.String),
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

export const handleBid = async (e) => {

  var d = {}
  for (var i in e) {
    var datum = e[i];
    d[datum.id] = datum.value
  }
  try {
    await Tx(
      [
        fcl.transaction(transactions.bid),
        fcl.args([
          fcl.arg(d.name, t.String),
          fcl.arg(parseFloat(d.bidAmt).toFixed(2), t.UFix64)
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

export const handleIncreaseBid = async (e) => {

  var d = {}
  for (var i in e) {
    var datum = e[i];
    d[datum.id] = datum.value
  }
  try {
    await Tx(
      [
        fcl.transaction(transactions.increaseBid),
        fcl.args([
          fcl.arg(d.name, t.String),
          fcl.arg(parseFloat(d.bidAmt).toFixed(2), t.UFix64)
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

export const handleCancelBid = async (e) => {
  try {
    await Tx(
      [
        fcl.transaction(transactions.cancelBid),
        fcl.args([
          fcl.arg(e, t.String)
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

export const handleOffer = async (e) => {
  var d = {}
  for (var i in e) {
    var datum = e[i];
    d[datum.id] = datum.value
  }
  //format value properly
  try {
    await Tx(
      [
        fcl.transaction(transactions.bidProfile),
        fcl.args([
          fcl.arg(d.name, t.String),
          fcl.arg(parseFloat(d.bidAmt).toFixed(2), t.UFix64)
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

export const handleBuy = async (e) => {
  var d = {}
  for (var i in e) {
    var datum = e[i];
    d[datum.id] = datum.value
    console.log(d.salePrice)
  }

  try {
    await Tx(
      [
        fcl.transaction(transactions.bidProfile),
        fcl.args([
          fcl.arg(d.name, t.String),
          fcl.arg(parseFloat(d.salePrice).toFixed(2), t.UFix64)
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

export const handleExtend = async (e) => {
  var d = {}
  for (var i in e) {
    var datum = e[i];
    d[datum.id] = datum.value
  }

  try {
    await Tx(
      [
        fcl.transaction(transactions.renew),
        fcl.args([
          fcl.arg(d.name, t.String),
          fcl.arg(d.cost, t.UFix64)
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

export const handleActivate = async (e) => {
  var d = {}
  for (var i in e) {
    var datum = e[i];
    d[datum.id] = datum.value
  }

  try {
    await Tx(
      [
        fcl.transaction(transactions.renew),
        fcl.args([
          fcl.arg(d.name, t.String),
          fcl.arg(d.cost, t.UFix64)
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

export const handleWithdrawSale = async (e) => {

  try {
    await Tx(
      [
        fcl.transaction(transactions.delistSale),
        fcl.args([
          fcl.arg(e, t.String)
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
//buyer fullfill
export const handleFullfillAuction = async (e) => {
  var d = {}
  for (var i in e) {
    var datum = e[i];
    d[datum.id] = datum.value
  }

  try {
    await Tx(
      [
        fcl.transaction(transactions.fulfillAuctionBidder),
        fcl.args([
          fcl.arg(d.address, t.Address),
          fcl.arg(d.name, t.String)
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
//SELLER TX's
export const handleRejectBlindBid = async (e) => {
  try {
    await Tx(
      [
        fcl.transaction(transactions.rejectDirectOffer),
        fcl.args([
          fcl.arg(e, t.String)
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

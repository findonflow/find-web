import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { transactions } from 'find-flow-contracts'
import { Tx } from "../functions/transaction";
import ReactGA from 'react-ga'

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
          ReactGA.event({
            category: 'User',
            action: 'Created Profile',
            label: 'Profile'
          })
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
          ReactGA.event({
            category: 'Commerce',
            action: 'Made a bid',
            label: 'Auction'
          })
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
          ReactGA.event({
            category: 'Commerce',
            action: 'Increased a bid',
            label: 'Auction'
          })
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
          ReactGA.event({
            category: 'Commerce',
            action: 'Cancelled a bid',
            label: 'Auction'
          })
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
          ReactGA.event({
            category: 'Commerce',
            action: 'Made an offer',
            label: 'Direct Sale'
          })
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
          ReactGA.event({
            category: 'Commerce',
            action: 'Purchased a name',
            label: 'Direct Sale'
          })
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
          ReactGA.event({
            category: 'Commerce',
            action: 'Extended a lease',
            label: 'Name'
          })
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
          ReactGA.event({
            category: 'Commerce',
            action: 'Renewed after expiry',
            label: 'Name'
          })
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
          ReactGA.event({
            category: 'Commerce',
            action: 'Withdrawn from sale',
            label: 'Direct Sale'
          })
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
          ReactGA.event({
            category: 'Commerce',
            action: 'Auction Fulfilled',
            label: 'Auction'
          })
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
          ReactGA.event({
            category: 'Commerce',
            action: 'Offer rejected',
            label: 'Direct Sale'
          })
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

export const handleSendFungible = async (e, name, amount, type) => {
  try {
    await Tx(
      [
        //name: String, amount: UFix64, type: String
        fcl.transaction(transactions.sendFT),
        fcl.args([
          fcl.arg(name, t.String),
          fcl.arg(amount, t.UFix64),
          fcl.arg(type, t.String)
        ]),
        fcl.proposer(fcl.currentUser().authorization),
        fcl.payer(fcl.currentUser().authorization),
        fcl.authorizations([fcl.currentUser().authorization]),
        fcl.limit(9999),
      ],
      {
        onStart() {
          console.log("start");
          console.log(e);
        },
        onSubmission() {
          console.log("submitted")
        },
        async onSuccess(status) {
          console.log("success")
          ReactGA.event({
            category: 'Gift',
            action: 'Sent FT',
            label: 'FUSD/FLOW'
          })
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

export const handleSetPfp = async (e) => {
  try {
    await Tx(
      [
        fcl.transaction(transactions.setProfile),
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
          ReactGA.event({
            category: 'User',
            action: 'Set Profile Picture',
            label: 'Profile'
          })
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

export const handleSendNameToAddress = async (e, name, recipient) => {
  try {
    await Tx(
      [
        //name: String, amount: UFix64, type: String
        fcl.transaction(transactions.moveNameToAddress),
        fcl.args([
          fcl.arg(name, t.String),
          fcl.arg(recipient, t.Address)
        ]),
        fcl.proposer(fcl.currentUser().authorization),
        fcl.payer(fcl.currentUser().authorization),
        fcl.authorizations([fcl.currentUser().authorization]),
        fcl.limit(9999),
      ],
      {
        onStart() {
          console.log("start");
          console.log(e);
        },
        onSubmission() {
          console.log("submitted")
        },
        async onSuccess(status) {
          console.log("success")
          ReactGA.event({
            category: 'Gift',
            action: 'Sent Name to an Address',
            label: 'Name'
          })
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

export const handleSendNameToName = async (e, name, recipient) => {
  try {
    await Tx(
      [
        //name: String, amount: UFix64, type: String
        fcl.transaction(transactions.moveNameToName),
        fcl.args([
          fcl.arg(name, t.String),
          fcl.arg(recipient, t.String)
        ]),
        fcl.proposer(fcl.currentUser().authorization),
        fcl.payer(fcl.currentUser().authorization),
        fcl.authorizations([fcl.currentUser().authorization]),
        fcl.limit(9999),
      ],
      {
        onStart() {
          console.log("start");
          console.log(e);
        },
        onSubmission() {
          console.log("submitted")
        },
        async onSuccess(status) {
          console.log("success")
          ReactGA.event({
            category: 'Gift',
            action: 'Sent Name to another Name',
            label: 'Name'
          })
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
export const SetMainName = async (name) => {
  try {
    await Tx(
      [
        //name: String, amount: UFix64, type: String
        fcl.transaction(transactions.setMainName),
        fcl.args([
          fcl.arg(name, t.String)
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
          console.log("submitted")
        },
        async onSuccess(status) {
          console.log("success")
          ReactGA.event({
            category: 'User',
            action: 'Set their default name',
            label: 'Profile'
          })
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
export const SendFUSDCharity = async (e) => {
  var d = {}
  for (var i in e) {
    var datum = e[i];
    d[datum.id] = datum.value
  }
  try {
    await Tx(
      [
        //name: String, amount: UFix64, type: String
        fcl.transaction(transactions.sendFusdWithMessage),
        fcl.args([
          fcl.arg(d.name, t.String),
          fcl.arg(parseFloat(d.amount).toFixed(2), t.UFix64),
          fcl.arg(d.message, t.String)
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
          console.log("submitted")
        },
        async onSuccess(status) {
          console.log("success")
          ReactGA.event({
            category: 'Charity',
            action: 'User donated (2021)',
            label: 'FUSD'
          })
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

export const SendFLOWCharity = async (e) => {
  var d = {}
  for (var i in e) {
    var datum = e[i];
    d[datum.id] = datum.value
  }
  try {
    await Tx(
      [
        //name: String, amount: UFix64, type: String
        fcl.transaction(transactions.sendFlowWithMessage),
        fcl.args([
          fcl.arg(d.name, t.String),
          fcl.arg(parseFloat(d.amount).toFixed(2), t.UFix64),
          fcl.arg(d.message, t.String)
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
          console.log("submitted")
        },
        async onSuccess(status) {
          console.log("success")
          ReactGA.event({
            category: 'Charity',
            action: 'User donated (2021)',
            label: 'FLOW'
          })
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
export const CreateCharityCollection = async (e) => {
  try {
    await Tx(
      [
        //name: String, amount: UFix64, type: String
        fcl.transaction(transactions.createCharity),
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
          console.log("submitted")
        },
        async onSuccess(status) {
          console.log("success")
          ReactGA.event({
            category: 'Charity Collection',
            action: 'Collection Created',
            label: 'Collection Created'
          })
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

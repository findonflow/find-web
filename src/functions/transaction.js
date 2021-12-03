import * as fcl from "@onflow/fcl";
import toast from "react-hot-toast";
import { changeState, disableForm, enableForm } from "./DisabledState";

//This is the FCL transaction handler.

const noop = async () => { };

export const Tx = async (mods = [], opts = {}) => {
  const onStart = opts.onStart || noop;
  const onSubmission = opts.onSubmission || noop;
  const onUpdate = opts.onUpdate || noop;
  const onSuccess = opts.onSuccess || noop;
  const onError = opts.onError || noop;
  const onComplete = opts.onComplete || noop;
  const toastId = toast.loading('Preparing transaction')
  let hasSubmitted = 0


  try {
    onStart();
    var txId = await fcl.send(mods).then(fcl.decode).then(toast.loading('Transaction Started', { id: toastId, })).then(disableForm());
    console.info(
      `%cTX[${txId}]: ${fvsTx(await fcl.config().get("env"), txId)}`,
      "color:purple;font-weight:bold;font-family:monospace;"
    );
    onSubmission(txId);
    var unsub = await fcl.tx(txId).subscribe(onUpdate);
    var txStatus = await fcl.tx(txId).onceSealed().then(toast.loading(<span className="text-center">Transaction Submitted<br />click <a href={fvsTx(await fcl.config().get("env"), txId)} target="_blank" rel="noreferrer">HERE</a> to view this on flowscan.</span>, { id: toastId, })).then(hasSubmitted = 1);
    unsub();
    console.info(
      `%cTX[${txId}]: ${fvsTx(await fcl.config().get("env"), txId)}`,
      "color:green;font-weight:bold;font-family:monospace;"
    );
    await onSuccess(txStatus).then(toast.success(<span className="text-center">Transaction successful<br />click <a href={fvsTx(await fcl.config().get("env"), txId)} target="_blank" rel="noreferrer">HERE</a> to view this on flowscan.</span>, { id: toastId, })).then(enableForm()).then(changeState());
    return txStatus
  } catch (error) {
    console.error(
      `TX[${txId}]: ${fvsTx(await fcl.config().get("env"), txId)}`,
      error
    );
    onError(error);
    const { message } = error
    if (hasSubmitted === 0 && message) {
      if (message.includes("Declined: User rejected signature")) {
        toast('Transaction cancelled by user', { id: toastId, duration: "100" })
        enableForm()
      }
      else if (message.includes("Cannot read properties of undefined")) {
        toast('Login cancelled by user', { id: toastId, duration: "100", })
        enableForm()
      }
      else {
        toast.error('Transaction ' + error, { id: toastId, })
        enableForm()
      }
    }
    if (hasSubmitted === 1) {
      if (error.includes("Amount withdrawn must be less than or equal than the balance of the Vault")) {
        toast('You do not have enough FUSD in your wallet for this transaction', { id: toastId, duration: "500", })
        enableForm()
      } else {
        toast.error(<span className="text-center text-break">Transaction failed<br />click <a href={fvsTx(await fcl.config().get("env"), txId)} target="_blank" rel="noreferrer">HERE</a> to view this on flowscan.</span>, { id: toastId, })
        enableForm()
      }
    }
  } finally {
    await onComplete(txStatus);
  }
};

const fvsTx = (env, txId) => `https://flow-view-source.com/${env}/tx/${txId}`;

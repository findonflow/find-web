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
    var txStatus = await fcl.tx(txId).onceSealed().then(toast.loading(<span className="text-center">Transaction Submitted<br />click <a href={fvsTx(await fcl.config().get("env"), txId)} target="_blank" rel="noreferrer">HERE</a> to view this on flowscan.</span>, { id: toastId, }));
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
    const { txerror } = error
    if (hasSubmitted === 0) {
      if(txerror.includes("Declined: User rejected signature")){
      toast('Transaction cancelled by user', { id: toastId, duration: "100"})
      enableForm()}
      else if(txerror.includes("Cannot read properties of undefined")){
        toast('Login cancelled by user', { id: toastId, duration: "100", })
        enableForm()}
      else{
      toast.error('Transaction ' + error, { id: toastId, })
      enableForm()}
    }
    if (hasSubmitted === 1) {
      toast.error(<span className="text-center">Transaction failed<br />click <a href={fvsTx(await fcl.config().get("env"), txId)} target="_blank" rel="noreferrer">HERE</a> to view this on flowscan.</span>, { id: toastId, })
      enableForm()
    }
  } finally {
    await onComplete(txStatus);
  }
};

const fvsTx = (env, txId) => `https://flow-view-source.com/${env}/tx/${txId}`;

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { scripts } from 'find-flow-contracts'

//unfinished

export async function ReverseLookup(address) {
    
          const response = await fcl.send([
            fcl.script(scripts.name),
            fcl.args([fcl.arg(address, t.Address)]),
          ]);
          const nameStatus = await fcl.decode(response);
          // setEnteredName(searchName)
          // console.log(nameStatus)
    return (nameStatus)
}
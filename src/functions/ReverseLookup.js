import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

//unfinished

export async function ReverseLookup(address) {

        async function SearchName(searchName) {
          const response = await fcl.send([
            fcl.script(scripts.name),
            fcl.args([fcl.arg(address, t.Address)]),
          ]);
          const nameStatus = await fcl.decode(response);
           setNameStatus(nameStatus)
          // setEnteredName(searchName)
        }
        SearchName(searchName)
      }
      // eslint-disable-next-line
        , [searchName, useStateChanged()])
    return (null)
}
import { useEffect, useState } from "react"
import { Row, Col, Card, Image } from "react-bootstrap"
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { scripts, } from 'find-flow-contracts'
import { useStateChanged } from "../../functions/DisabledState";

export function ProfileCollection({ profileData }) {

  const [user, setUser] = useState({ loggedIn: null })
  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  const [findList, setFindList] = useState("first_init");
  useEffect(() => {
    async function getFindUser(addr) {
      const response = await fcl.send([
        fcl.script(scripts["find-list"]),
        fcl.args([fcl.arg(addr, t.Address)]),
      ]);

      const findList = await fcl.decode(response)
      setFindList(findList)
    }
    try {
      getFindUser(profileData.profile.address)
    }
    catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line
  }, [user, useStateChanged()]);

  return (
    <div>
      {/* {JSON.stringify(findList,null,2)} */}
      <Row className=" my-3 d-flex align-items-start" xs={1} lg={3} md={2} id="Collection">
        {findList !== "first_init" &&
          // console.log(Object.keys(findList["A.0e7e00f7a09b36fb.Artifact.Collection"].items).length),
          findList["A.0e7e00f7a09b36fb.Artifact.Collection"]?.items.map((nftData, i) =>
            <Col key={i} className="mb-5">
              <Card className="cardprofile-collection">
                <Image src={nftData.url} className="cardprofile-collection-img" />
              </Card>
            </Col>
          )}

      </Row>
    </div>
  )
}
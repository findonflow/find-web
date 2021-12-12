import { useEffect, useState } from "react"
import { Row, Col, Card, Image } from "react-bootstrap"
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { scripts, } from 'find-flow-contracts'
import { useStateChanged } from "../../functions/DisabledState";
import { includes } from 'lodash'

export function ProfileCollection({ profileData }) {

  const [user, setUser] = useState({ loggedIn: null })
  useEffect(() => fcl.currentUser().subscribe(setUser), [])
  const [findList, setFindList] = useState("first_init");

  useEffect(() => {
    async function getFindUser(addr) {
      const response = await fcl.send([
        fcl.script(scripts["collections"]),
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
        {
          findList && findList !== "first_init" && findList !== "" &&
          Object.keys(findList).map((collection) =>
            findList[collection]?.items.map((nftData, i) => {
              let imgUrl
              if(nftData.image.includes("ipfs://")){
                console.log("It does include!")
                imgUrl = nftData.image.replace("ipfs://", "https://ipfs.io/ipfs/")
              }else{
                imgUrl = nftData.image
              }
              return (
                <Col key={i} className="mb-5">
                  <a href={nftData.url} target="_blank">
                  <Card className="shadow" style={{ maxWidth: "400px" }}>
                    <Image src={imgUrl} className="collection-img p-3" alt={"Picture of " + nftData.name} rounded fluid />
                    <Card.Text className="p-3 fw-bold">{nftData.name}</Card.Text>
                  </Card></a>
                </Col>)
            }))
        }
      </Row>
      {!findList &&
        <Row>
          {profileData.profile.address === user.addr ?
            <Col sm="12" align="center">
              <div className="titletxt fw-bold pb-3">Uh oh, either your collection is empty or we do not yet support your NFT's</div>
              <p>No worries, supported NFT's will appear here soon!</p>
            </Col>
            :
            <Col sm="12" align="center">
              <div className="titletxt fw-bold pb-3">Uh oh, seems this collection is empty or we do not yet support the NFT's</div>
              <p>No worries, supported NFT's will appear here soon!</p>
            </Col>}
        </Row>
      }
    </div>
  )
}
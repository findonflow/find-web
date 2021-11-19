import copy from "copy-to-clipboard"
import { useEffect, useRef, useState } from "react"
import { Row, Col, ListGroup, Card, Image } from "react-bootstrap"
import toast from "react-hot-toast"
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
      try{
      getFindUser(profileData.profile.address)}
      catch (error) {
        console.log(error)
      }
    // eslint-disable-next-line
  }, [user, useStateChanged()]);

    function runCopy(copyData) {
        copy(copyData)
        toast(<span>{copyData} copied to clipoard</span>, { duration: 2000, style: {} })
        console.log(copyData)
      }
  
    return(
        <div>
        {/* <Row>
                <Col xs="12" md="4">
                  <Row className="mt-3 mb-3" id="profileName">
                    <Col className="mb-3">
                      <Card className="p-4 cardprofile">
                        <div className="d-flex justify-content-center"><div className="profilePic image"><img src={avatarURL} height="100" width="100" alt={profileData.profile.name + "'s profile avatar"} /></div></div>
                        <span className="name mt-3 text-center">{profileData.profile.name}</span>
                        <span className="idd text-center">@{profileData.profile.name}</span>
                        <div className="text-center text mt-3"> <span>{profileData.profile.description}</span></div>
                        <div className="seperator m-auto mt-5 mb-4"></div>
                        {profileData.profile.links &&
                          <ListGroup variant="flush" className="text">
                            {profileData.profile.links.map((e, index) =>
                              e.type === "globe" ?
                                <ListGroup.Item key={index}><span><a href={e.url} target="_blank" rel="noreferrer"><i className={"me-2 fa-solid fa-globe"}></i> Website</a></span></ListGroup.Item>
                                :
                                <ListGroup.Item key={index}><span><a href={e.url} target="_blank" rel="noreferrer"><i className={"me-2 fa-brands fa-" + e.type}></i> {e.type}</a></span></ListGroup.Item>
                            )}
                          </ListGroup>
                        }
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row className="mb-3 mt-3" id="profileWallet">
                    <Col>
                      <Card className="p-4 cardprofileother">
                        <ListGroup variant="flush" className="text">
                          <ListGroup.Item>
                            <Row>
                              <Col xs="12" lg="3"><span><b>Wallet Address:</b></span> </Col>
                              <Col><span>{profileData.profile.address} </span><span><i className="copyicon fa fa-copy" onClick={() => runCopy(profileData.profile.address)}> </i></span></Col>
                            </Row>
                          </ListGroup.Item>
                          {profileData.profile.wallets.map((filteredName, i) =>
                            <ListGroup.Item key={i}>
                              <Row>
                                <Col xs="12" lg="3"><span><b>{filteredName.name}: </b></span> </Col>
                                <Col><span>{filteredName.balance * 1}</span></Col>
                              </Row>
                            </ListGroup.Item>)}
                          <ListGroup.Item>
                            <Row>
                              <Col xs="12" lg="3"><span><b>Followers: </b></span> </Col>
                              <Col><span>{followers}</span></Col>
                            </Row>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <Row>
                              <Col xs="12" lg="3"><span><b>Tags: </b></span> </Col>
                              <Col><span>{profileData.profile.tags}</span></Col>
                            </Row>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                </Row> */}
               {/* {JSON.stringify(findList,null,2)} */}
            <Row className=" my-3 d-flex align-items-start" xs={1} lg={3} md={2} id="Collection">
              {findList !== "first_init" &&
              findList["A.0e7e00f7a09b36fb.Artifact.Collection"]?.items.map((nftData) => 
              <Col className="mb-5">
                <Card className="cardprofile-collection">
                <Image src={nftData.url} className="cardprofile-collection-img" />
                </Card>
              </Col>
              )}
              
            </Row>
            </div>
    )
}
import { Card, Col, Row, Container, Accordion, ListGroup, Tabs, Tab, Image } from "react-bootstrap";
import copy from "copy-to-clipboard";
import { PrivateLease } from "../PrivateLease";
import { useEffect, useRef, useState } from "react";
import * as fcl from "@onflow/fcl";
import { PublicLease } from "../PublicLease";
import toast from "react-hot-toast";
import EditProfile from "./EditProfile";
import LoadingBC from "../infoboxes/LoadingBC";
import { PrivateBid } from "../lease/BuyerForms";

export function ProfileCard({ profileData }) {


  const [editHasClicked, setEditHasClicked] = useState(false)
  const [editText, setEditText] = useState("Edit Profile")

  const [user, setUser] = useState({ loggedIn: null })
  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  function runCopy(copyData) {
    copy(copyData)
    toast(<span>{copyData} copied to clipoard</span>, { duration: 2000, style: {} })
    console.log(copyData)
  }
  
  function handleTabScroll(key) {
    if(key === "collection") {
      key.current.scrollIntoView()
    }
  }

  function editClicked() {
    if (!editHasClicked) {
      setEditHasClicked(true)
      setEditText("Close Edit")
    }
    if (editHasClicked) {
      setEditHasClicked(false)
      setEditText("Edit Profile")
    }

  }

  let avatarURL = "/noavatar.png"
  let followers = 0
  if (profileData) {
    if (profileData.profile) {
      if (profileData.profile.avatar !== "") {
        avatarURL = profileData.profile.avatar
      }
      if (profileData.profile.followers.length !== 0) {
        followers = profileData.profile.followers
      }
    }
  }
  return (
    <div>
      {profileData ?

        <Container id="profileCard" fluid="true" className="frontCards p-4 mt-5">
          <Tabs defaultActiveKey='profile' id='profile-collection-tabs' onSelect={handleTabScroll()}>
            <Tab eventKey='profile' title='Profile'>
              <Row className="d-flex justify-content-center">
                <Col xs="12" md="4">
                  <Row className="mt-3 mb-3" id="profileName">
                    <Col>
                      <Card className="p-4 cardprofile">
                        <div className="d-flex justify-content-center"><div className="profilePic image"><img src={avatarURL} height="100" width="100" alt={profileData.profile.name + "'s profile avatar"} /></div></div>
                        <span className="name mt-3 text-center">{profileData.profile.name}</span>
                        <span className="idd text-center">@{profileData.profile.name}</span>
                        <div className="text-center text mt-3"> <span>{profileData.profile.description}</span></div>
                        {user.addr === profileData.profile.address &&
                          <div className=" d-flex mt-4 justify-content-center"> <button className="btn-dark" onClick={editClicked}>{editText}</button> </div>
                        }
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
                  {!editHasClicked ?
                    <div>
                      <Row className="mt-3 mb-3" id="profileWallet">
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
                      <Row className="mb-3 d-flex justify-content-center" id="profileBidNameRow">
                        {profileData.leases && profileData.bids &&
                          <Col xs="12" className="mb-3 mt-2" id="profileNames">
                            <Card className="cardprofileother p-4">
                              {profileData.leases &&
                                <div className="accordionNamesOwned">
                                  <span className="text text-center mb-3 name">Names you own</span>
                                  {profileData.leases.length !== 0 ?
                                    <Accordion defaultActiveKey="0" flush className="my-3">
                                      {profileData.leases.filter(profile => profile.status !== "FREE" && !profile.name.includes("/")).map((lease, i) => (
                                        <Accordion.Item eventKey={i.toString()} key={i} className="my-3">
                                          <Accordion.Header>
                                            {lease.name}
                                          </Accordion.Header>
                                          <Accordion.Body>
                                            <PrivateLease lease={lease} />
                                          </Accordion.Body>
                                        </Accordion.Item>))}
                                    </Accordion>
                                    :
                                    <div className="text-center nobidsnonames m-3">You do not own any names yet.</div>
                                  }
                                </div>
                              }
                              <div className="seperator100 m-auto my-3"></div>
                              {profileData.bids &&
                                <div className="accordionBids">
                                  <span className="text text-center mb-3 name">Names you are bidding on</span>
                                  {profileData.bids.length !== 0 ?
                                    <Accordion defaultActiveKey="0" className="mt-3">
                                      {profileData.bids.map((bid, i) =>
                                        <Accordion.Item eventKey={i.toString()} key={i} className="my-3">
                                          <Accordion.Header>{bid.name}</Accordion.Header>
                                          <Accordion.Body>
                                            <PrivateBid bid={bid} />
                                          </Accordion.Body>
                                        </Accordion.Item>)}
                                    </Accordion>
                                    :
                                    <div className="text-center nobidsnonames m-3">You are not currently bidding on anything</div>
                                  }
                                </div>
                              }
                            </Card>
                          </Col>}
                        {!profileData.bids &&
                          !profileData.leases &&
                          <Col className="mt-2">
                            <Card className="p-4 cardprofileother">
                              {profileData.profile.address === user.addr ?
                                <div>
                                  <span className="name">You own this name</span>
                                  <PrivateLease lease={profileData.lease} />
                                </div>
                                :
                                <PublicLease lease={profileData.lease} />
                              }
                            </Card>
                          </Col>}
                      </Row>
                    </div> :
                    <Row>
                      <Col><EditProfile profile={profileData} /></Col>
                    </Row>}
                </Col>
              </Row>
            </Tab>
            <Tab eventKey='collection' title='Collection'>
              <Row>
                <Col xs="12" md="4">
                  <Row className="mt-3 mb-3" id="profileName">
                    <Col className="mb-3">
                      <Card className="p-4 cardprofile">
                        <div className="d-flex justify-content-center"><div className="profilePic image"><img src={avatarURL} height="100" width="100" alt={profileData.profile.name + "'s profile avatar"} /></div></div>
                        <span className="name mt-3 text-center">{profileData.profile.name}</span>
                        <span className="idd text-center">@{profileData.profile.name}</span>
                        <div className="text-center text mt-3"> <span>{profileData.profile.description}</span></div>
                        {user.addr === profileData.profile.address &&
                          <div className=" d-flex mt-4 justify-content-center"> <button className="btn-dark" onClick={editClicked}>{editText}</button> </div>
                        }
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
                </Row>
            <Row className=" my-3 d-flex align-items-start" xs={1} lg={3} md={2} id="Collection">
              <Col className="mb-5">
                <Card className="cardprofile-collection">
                <Image src="/assets/img/car.png" className="cardprofile-collection-img" />
                </Card>
              </Col>
              <Col className="mb-5">
                <Card className="cardprofile-collection"></Card>
              </Col>
              <Col className="mb-5">
                <Card className="cardprofile-collection"></Card>
              </Col>
              <Col className="mb-5">
                <Card className="cardprofile-collection"></Card>
              </Col>
              <Col className="mb-5">
                <Card className="cardprofile-collection"></Card>
              </Col>
            </Row>
          </Tab>
        </Tabs>
        </Container>

        :
  <LoadingBC />
}</div >
  )
}

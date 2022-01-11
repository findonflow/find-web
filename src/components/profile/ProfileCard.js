import { Card, Col, Row, Container, Accordion, ListGroup, Tabs, Tab, Button } from "react-bootstrap";
import copy from "copy-to-clipboard";
import { PrivateLease } from "../PrivateLease";
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import { PublicLease } from "../PublicLease";
import toast from "react-hot-toast";
import EditProfile from "./EditProfile";
import LoadingBC from "../infoboxes/LoadingBC";
import { PrivateBid } from "../lease/BuyerForms";
import { ProfileCollection } from "./ProfileCollection";
import './profile.css'
// import { ProfileForge } from "./ProfileForge";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { ProfileSendFT } from "./ProfileSendFT";
import { ProfileGifting } from "./ProfileGifting";
import { SetMainName } from "../../functions/txfunctions";

export function ProfileCard({ profileData }) {

  const [editHasClicked, setEditHasClicked] = useState(false)
  const [editText, setEditText] = useState("Edit Profile")
  const [key, setKey] = useState("profile")
  const location = useLocation()

  let navigate = useNavigate();
  let params = useParams();

  let currentPage = location.pathname.split(/^.*\//)
  useEffect(() => {
    if (currentPage[1] === "collection") {
      setKey("collection")
    }
    else {
      setKey("profile")
    }
    if (params.col) {
      setKey("collection")
    }
    else if (currentPage[1] === "gift") {
      setKey("gift")
    }
    
    //eslint-disable-next-line
  }, [params])
  function handleTabs(k) {
    setKey(k)
    if (params.id) {
      if (k === "profile") {
        navigate("/" + params.id)
      } else {
        navigate("/" + params.id + "/" + k)
      }
    }
    if (!params.id) {
      if (k === "profile") {
        navigate("/me")
      }
      if (k === "collection") {
        navigate("/me/collection")
      }
      if (k === "gift") {
        navigate("/me/gift")
      }
    }
  }

  const [user, setUser] = useState({ loggedIn: null })
  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  if (user.addr === profileData.profile.address) {
    document.title = ".find - your dashboard"
  } else {
    if (currentPage[1] === "collection") {
      document.title = ".find - " + profileData.profile.name + "'s collection"
    }
    else if (currentPage[1] === "gift") {
      document.title = ".gift - " + profileData.profile.name
    }
    else {
      document.title = ".find - " + profileData.profile.name + "'s profile"
    }
  }

  function runCopy(copyData) {
    copy(copyData)
    toast(<span>{copyData} copied to clipoard</span>, { duration: 2000, style: {} })
    //console.log(copyData)
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

  function handleSetName(name, e) {
    e.stopPropagation();
    SetMainName(name)
  }

  return (
    <Container fluid className="g-0 m-0 pt-lg-3" style={{ backgroundColor: "#F6F6F6" }}>
      <Container className="p-0">
        {profileData ?

          <Container id="profileCard" fluid className="frontCards p-4" style={{ minHeight: "90vh" }}>
            <Tabs defaultActiveKey='profile' activeKey={key} id='profile-collection-tabs' onSelect={(k) => handleTabs(k)}>
              <Tab eventKey='profile' title='Profile'>
                <Row className="d-flex justify-content-center">
                  <Col xs="12" md="4">
                    <Row className="mt-3 mb-3" id="profileName">
                      <Col>
                        <Card className="p-4 cardprofile">
                          <div className="d-flex justify-content-center"><div className="profilePic image"><img src={avatarURL} height="100" width="100" alt={profileData.profile.name + "'s profile avatar"} /></div></div>
                          <span className="name mt-3 text-center">{profileData.profile.name}</span>
                          <span className="idd text-center">@{profileData.profile.name}</span>
                          <div className="text-center text mt-3"> <span style={{ whiteSpace: "pre-wrap" }}>{profileData.profile.description}</span></div>
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
                          {profileData.profile.address !== user.addr &&
                            <Col>
                              <div className="w-100 m-3 d-md-none"></div>
                              <Card className="p-4">
                                <ProfileSendFT profileData={profileData} />
                              </Card>

                            </Col>
                          }
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
                                              {profileData.profile.findName !== lease.name ?
                                              <div align="right" className="w-100 pe-3">
                                                <Button variant="light" style={{ align: "right", zIndex: "1000000" }} size="sm" onClick={(e) => handleSetName(lease.name, e)}>Set as default</Button>
                                              </div>
                                              :
                                              <div align="right" className="w-100 pe-3">
                                                <Button variant="light" style={{ align: "right", zIndex: "1000000" }} size="sm" disabled>Default</Button>
                                              </div>
                                              }

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
                          <Col className="mt-2">
                            <Card className="p-4 cardprofileother">
                              {profileData.profile.address === user.addr ?
                                profileData.lease &&
                                <div>
                                  <span className="name">You own this name</span>
                                  <PrivateLease lease={profileData.lease} />
                                </div>
                                :
                                <div>
                                  {profileData.lease &&
                                    <PublicLease lease={profileData.lease} />
                                  }
                                  {profileData.leases.length > 1 &&
                                    <div>
                                      <div className="my-3"><span className="idd">Other names owned by this user:</span></div>
                                      {profileData.leases.map((lease, i) =>
                                        <div key={i}><Link to={"/" + lease.name}>{lease.name}</Link></div>
                                      )}
                                    </div>
                                  }
                                </div>
                              }
                            </Card>
                          </Col>
                        </Row>
                      </div> :
                      <Row>
                        <Col><EditProfile profile={profileData} /></Col>
                      </Row>}
                  </Col>
                </Row>
              </Tab>

              <Tab eventKey='collection' title='Collection'>
                <Card className="shadow p-3 p-lg-5 mt-3" border="light">
                  <ProfileCollection profileData={profileData} />
                </Card>
              </Tab>
              {user.addr === profileData.profile.address &&
                <Tab eventKey='gift' title='Gifting'>
                  <Row>
                    <Col xs="12" md="4">
                      <Row className="mt-3 mb-3" id="profileName">
                        <Col>
                          <Card className="p-4 cardprofile">
                            <div className="d-flex justify-content-center"><div className="profilePic image"><img src={avatarURL} height="100" width="100" alt={profileData.profile.name + "'s profile avatar"} /></div></div>
                            <span className="name mt-3 text-center">{profileData.profile.name}</span>
                            <span className="idd text-center">@{profileData.profile.name}</span>
                            <div className="text-center text mt-3"> <span style={{ whiteSpace: "pre-wrap" }}>{profileData.profile.description}</span></div>

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
                      <Card className="shadow p-3 p-lg-5 mt-3 h-auto" border="light">
                        <ProfileGifting profileData={profileData} />
                      </Card>
                      <Card className="shadow p-3 p-lg-5 mt-3 h-auto" border="light">
                        <ProfileSendFT />
                      </Card>
                    </Col>

                    <Col sm="12"></Col>
                  </Row>

                </Tab>
              }
              {/* {user.addr === profileData.profile.address &&
                <Tab eventKey='forge' title='The Forge'>
                  <ProfileForge profileData={profileData} />
                </Tab>
              } */}
            </Tabs>
          </Container>
          :
          <LoadingBC />
        }</Container >
      {/* {JSON.stringify(profileData, null, 2)} */}
    </Container>
  )
}

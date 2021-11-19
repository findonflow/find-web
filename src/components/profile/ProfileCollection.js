import copy from "copy-to-clipboard"
import { useEffect, useRef } from "react"
import { Row, Col, ListGroup, Card, Image } from "react-bootstrap"
import toast from "react-hot-toast"

export function ProfileCollection({profileData}) {

    function runCopy(copyData) {
        copy(copyData)
        toast(<span>{copyData} copied to clipoard</span>, { duration: 2000, style: {} })
        console.log(copyData)
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
  
    return(
        <div>
        <Row>
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
                </Row>
               {JSON.stringify(profileData,null,2)}
            <Row className=" my-3 d-flex align-items-start" xs={1} lg={3} md={2} id="Collection">
              <Col className="mb-5">
                <Card className="cardprofile-collection">
                <Image src="/assets/img/car.png" className="cardprofile-collection-img" />
                </Card>
              </Col>
            </Row>
            </div>
    )
}
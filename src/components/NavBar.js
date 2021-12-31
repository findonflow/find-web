import React, { useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import { scripts } from "find-flow-contracts"
import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"
import { Link } from 'react-router-dom'
import { Link as scrollLink } from 'react-scroll'
import './navbar.css'
import { AuthCluster } from "../auth-cluster"
import toast from "react-hot-toast";
import {
  Container,
  DropdownButton,
  Dropdown,
  OverlayTrigger,
  Tooltip,
  Navbar,
  Nav,
  Image,
  Row,
  Col,
  NavDropdown,
  Form,
  Button
} from "react-bootstrap";
import { useFormStatus, useStateChanged } from "../functions/DisabledState";
import { handleProfile } from "../functions/txfunctions";
import { useImmer } from "use-immer";

function NavHead() {
  const [profile, setProfile] = useState("")
  const [user, setUser] = useState({ loggedIn: null })
  const [expanded, setExpanded] = useState(false);
  const formStatus = useState(useFormStatus())


  useEffect(() => fcl.currentUser().subscribe(setUser), [])
  
  useEffect(() => {
    if (user.loggedIn) {  
      async function getProfile(addr) {
        const response = await fcl.send([
          fcl.script(scripts.profile),
          fcl.args([fcl.arg(addr, t.Address)]),
        ]);
        
        const profile = await fcl.decode(response)
        setProfile(profile)
      }
      try{
      getProfile(user.addr)}
      catch (error) {
        console.log(error)
      }
    }
    // eslint-disable-next-line
  }, [user, useStateChanged()])
  const [formValues, setFormValues] = useImmer("")

  function updateField(e) {
      setFormValues(e.target.value)
  }


  function runCopy(copyData) {
    copy(copyData)
    toast(<span align="center">{copyData} copied to clipboard</span>, { duration: 2000, style: {} })
    //console.log(copyData)
  }
  return (
    <Container id="navbar" fluid>
      <Navbar collapseOnSelect={true} expanded={expanded} expand="md" style={{background: "rgba(255, 255, 255)"}} className="p-3 navbar-custom">        <Container>
        <Link onClick={() => setExpanded(false)} to="/"><img src="/find-alt.png" alt="Find Logo" style={{maxHeight: "34px"}} /></Link>
        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="me-auto pt-3 pt-lg-0" id="mainLinks">
          {/* <Nav.Link as={scrollLink} to="cadenceHint" spy={true} smooth={true} offset={120} duration={400} style={{cursor: 'pointer'}} className="ms-lg-5">Integrate</Nav.Link> */}
          
          <Nav.Link onClick={() => setExpanded(false)} as={scrollLink} to="faq" spy={true} smooth={true} offset={50} duration={400} style={{cursor: 'pointer'}} className="ms-lg-3">FAQ's</Nav.Link>
          <Nav.Link onClick={() => setExpanded(false)} as={Link} to={"/lf"} className="ms-lg-3">Live Feed</Nav.Link>
          <Nav.Link onClick={() => setExpanded(false)} as={Link} to={"/mp"} className="ms-lg-3">Marketplace</Nav.Link>
          <Nav.Link onClick={() => setExpanded(false)} as={Link} to={"/neo-x-flowverse-community-charity-tree"} className="ms-lg-3">Charity Tree</Nav.Link>
        </Nav>
        <Nav>
        <div id="lgmenu" className="p-3 p-lg-0 mx-auto d-none d-md-block">
             {user.loggedIn ?
                profile ?
              <DropdownButton align="end" title={<Image src={profile.avatar} />} id="dropdown-menu-align-end" className="profileMenuPic" data-toggle="dropdown">
                <div className="p-2 fw-bold" style={{ fontSize: "20px" }}>{profile.name ? profile.name : user.addr}'s Wallet</div>
                <OverlayTrigger key="wallet" placement="top" overlay={<Tooltip id={`tooltip-wallet`}>Copy</Tooltip>}>
                  <div className="p-2" style={{ fontSize: "16px", cursor: "pointer" }} onClick={() => runCopy(user.addr)}>{user.addr} <i className="copyicon fa fa-copy"></i></div>
                </OverlayTrigger>
                {profile.wallets &&
                  profile.wallets.map((wallet, i) => (
                    <Row key={i}>
                      <Col className="mx-2" style={{textTransform: "uppercase"}}>{wallet.name}:</Col>
                      <Col><b>{parseFloat(wallet.balance).toFixed(4)}</b></Col>
                    </Row>
                  ))
                }
                 <div></div>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to={"/"} className="p-5">Home</Dropdown.Item>
                <Dropdown.Item as={Link} to={"/me"}>Dashboard</Dropdown.Item>
                <Dropdown.Divider />
                <div align="center" className="mx-4"><AuthCluster user={user} /></div>
              </DropdownButton>
              :
              <DropdownButton title={user.addr} variant="dark" data-toggle="dropdown" >
              <Container>
            <Row className="p-2">
                <Col className="d-flex justify-content-center text-center titletxt fw-bold">You've connected your wallet but don't have a profile yet.</Col>
            </Row>
            <Row className="m-1 p-2 mb-3">
                <Col className="d-flex justify-content-center text-center">No problem, just click below to create your profile. it's FREE</Col>
            </Row>
                    <Row>
                        <fieldset id="a" disabled={formStatus}>
                            <Col xs="12" md="12" className="mb-3 px-3 mb-md-0 formInputs mx-auto">
                                <Form.Group align="center">
                                    <Form.Label>Enter a name</Form.Label>
                                    <Form.Control required placeholder="your name here" onChange={updateField} />
                                </Form.Group>
                            </Col>
                            <Col xs="12" className="mx-auto mt-3" align="center">
                                <Button onClick={() => formValues && handleProfile(formValues)} variant="outline-dark">Create</Button>
                            </Col>
                        </fieldset>
                    </Row>
        </Container>
              </DropdownButton>
              :
              
              <AuthCluster user={user} />}
          </div>
          <div className="d-md-none">
             {user.loggedIn ? 
              profile ?
             <div>
             
              <NavDropdown title={profile.name ? profile.name : user.addr}  >
                <div className="p-2 fw-bold" style={{ fontSize: "20px" }}>{profile.name ? profile.name : user.addr}'s Wallet</div>
             <OverlayTrigger key="wallet" placement="top" overlay={<Tooltip id={`tooltip-wallet`}>Copy</Tooltip>}>
               <div className="p-2" style={{ fontSize: "16px", cursor: "pointer" }} onClick={() => runCopy(user.addr)}>{user.addr} <i className="copyicon fa fa-copy"></i></div>
             </OverlayTrigger>
             {profile.wallets &&
               profile.wallets.map((wallet, i) => (
                 <Row key={i}>
                   <Col className="mx-2">{wallet.name}:</Col>
                   <Col><b>{wallet.balance*1}</b></Col>
                 </Row>
               ))
             }
                
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => setExpanded(false)} as={Link} to={"/"}>Home</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setExpanded(false)} as={Link} to={"/me"}>Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <div align="center" className="mx-4"><AuthCluster user={user} /></div>
              </NavDropdown> </div>
              :
              <Container>
            <Row className="p-2">
                <Col className="d-flex justify-content-center text-center titletxt fw-bold">You've connected your wallet but don't have a profile yet.</Col>
            </Row>
            <Row className="m-1 p-2 mb-3">
                <Col className="d-flex justify-content-center text-center">No problem, just click below to create your profile. it's FREE</Col>
            </Row>
                    <Row>
                        <fieldset id="a" disabled={formStatus}>
                            <Col xs="12" md="12" className="mb-3 px-3 mb-md-0 formInputs mx-auto">
                                <Form.Group align="center">
                                    <Form.Label>Enter a name</Form.Label>
                                    <Form.Control required placeholder="your name here" onChange={updateField} />
                                </Form.Group>
                            </Col>
                            <Col xs="12" className="mx-auto mt-3" align="center">
                                <Button onClick={() => formValues && handleProfile(formValues)} variant="outline-dark">Create</Button>
                            </Col>
                        </fieldset>
                    </Row>
        </Container>
              :
              <AuthCluster user={user} />}
          </div>
            </Nav>
        </Navbar.Collapse>
        
        </Container>
      </Navbar>
      {/* {JSON.stringify(profile, null,2)} */}<div className="site-header"></div>
    </Container>
    // <Container id="navBar">
    //   <Navbar collapseOnSelect={true} expand="md">
    //     <Container>
    //       <Link to="/"><img src="/find.png" alt="Find Logo" className=" logo img-fluid" /></Link>
    //       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //       <Navbar.Collapse id="responsive-navbar-nav">
    //         <Nav>
    //           <div className="d-sm-block d-md-none">
    //             {user.loggedIn ?
    //               <div>
    //                 <div className="p-2 fw-bold" style={{ fontSize: "16px" }}>Wallet Address</div>
    //                 <OverlayTrigger key="wallet" placement="top" overlay={<Tooltip id={`tooltip-wallet`}>Copy</Tooltip>}>
    //                   <div className="px-3" style={{ fontSize: "12px", cursor: "copy" }} onClick={() => runCopy(user.addr)}>{user.addr} <i className="copyicon fa fa-copy"></i></div>
    //                 </OverlayTrigger>
    //                 <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
    //                 <Nav.Link as={Link} to={"/me"}>Dashboard</Nav.Link>
    //                 <div align="center" className="m-1"><AuthCluster user={user} /></div>
    //               </div>
    //               :
    //               <div align="center"><AuthCluster user={user} /></div>
    //             }
    //           </div>
    //         </Nav>
    //       </Navbar.Collapse>
    //       <div className="d-none d-md-block">
    //         {user.loggedIn ?
    //           <DropdownButton align="end" title={user.addr} id="dropdown-menu-align-end" variant="dark" data-toggle="dropdown">
    //             <div className="p-2 fw-bold" style={{ fontSize: "20px" }}>Wallet Address</div>
    //             <OverlayTrigger key="wallet" placement="top" overlay={<Tooltip id={`tooltip-wallet`}>Copy</Tooltip>}>
    //               <div className="p-2" style={{ fontSize: "16px", cursor: "copy" }} onClick={() => runCopy(user.addr)}>{user.addr} <i className="copyicon fa fa-copy"></i></div>
    //             </OverlayTrigger>
    //             <Dropdown.Divider />
    //             <Dropdown.Item as={Link} to={"/"} className="p-5">Home</Dropdown.Item>
    //             <Dropdown.Item as={Link} to={"/me"}>Dashboard</Dropdown.Item>
    //             <Dropdown.Divider />
    //             <div align="center" className="mx-4"><AuthCluster user={user} /></div>
    //           </DropdownButton>
    //           :
    //           <AuthCluster user={user} />}
    //       </div>
    //     </Container>
    //   </Navbar>
    // </Container>
  )
}
export default NavHead;

import React, { useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import * as fcl from "@onflow/fcl"
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
  Nav
} from "react-bootstrap";

function NavHead() {
  const [user, setUser] = useState({ loggedIn: null })
  useEffect(() => fcl.currentUser().subscribe(setUser), [])
  
  function runCopy(copyData) {
    copy(copyData)
    toast(<span align="center">{copyData} copied to clipboard</span>, { duration: 2000, style: {} })
    //console.log(copyData)
  }
  return (
    <Container id="navbar" fluid="true">
      <Navbar collapseOnSelect={true} expand="md" style={{background: "rgba(255, 255, 255, 0.6)"}} className="p-3">
        <Container>
        <Link to="/"><img src="/find-alt.png" alt="Find Logo" fluid style={{maxHeight: "34px"}} /></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="me-auto">
          {/* <Nav.Link as={scrollLink} to="cadenceHint" spy={true} smooth={true} offset={120} duration={400} style={{cursor: 'pointer'}} className="ms-lg-5">Integrate</Nav.Link> */}
          
          <Nav.Link as={scrollLink} to="faq" spy={true} smooth={true} offset={50} duration={400} style={{cursor: 'pointer'}} className="ms-lg-3">FAQ's</Nav.Link>
          <Nav.Link as={Link} to={"/lf"} className="ms-lg-3">Live Feed</Nav.Link>
          <Nav.Link as={Link} to={"/mp"} className="ms-lg-3">Marketplace</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
        <div className="p-3 p-lg-0 mx-auto">
             {user.loggedIn ?
              <DropdownButton align="end" title={user.addr} id="dropdown-menu-align-end" variant="dark" data-toggle="dropdown">
                <div className="p-2 fw-bold" style={{ fontSize: "20px" }}>Wallet Address</div>
                <OverlayTrigger key="wallet" placement="top" overlay={<Tooltip id={`tooltip-wallet`}>Copy</Tooltip>}>
                  <div className="p-2" style={{ fontSize: "16px", cursor: "pointer" }} onClick={() => runCopy(user.addr)}>{user.addr} <i className="copyicon fa fa-copy"></i></div>
                </OverlayTrigger>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to={"/"} className="p-5">Home</Dropdown.Item>
                <Dropdown.Item as={Link} to={"/me"}>Dashboard</Dropdown.Item>
                <Dropdown.Divider />
                <div align="center" className="mx-4"><AuthCluster user={user} /></div>
              </DropdownButton>
              :
              <AuthCluster user={user} />}
          </div>
            </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
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

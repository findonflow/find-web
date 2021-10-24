import React, { useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import * as fcl from "@onflow/fcl"
import { Link } from 'react-router-dom'
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
    console.log(copyData)
  }
  return (
    <Container id="navBar">
      <Navbar collapseOnSelect expand="md">
        <Container>
          <Link to="/"><img src="./find.png" alt="Find Logo" className=" logo img-fluid" /></Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <div className="d-sm-block d-md-none">
                {user.loggedIn ?
                  <div>
                    <div className="p-2 fw-bold" style={{ fontSize: "16px" }}>Wallet Address</div>
                    <OverlayTrigger key="wallet" placement="top" overlay={<Tooltip id={`tooltip-wallet`}>Copy</Tooltip>}>
                      <div className="px-3" style={{ fontSize: "12px", cursor: "copy" }} onClick={() => runCopy(user.addr)}>{user.addr} <i className="copyicon fa fa-copy"></i></div>
                    </OverlayTrigger>
                    <Nav.Link><Link key="1" className="nav-link p-2" to="/">Home</Link></Nav.Link>
                    <Nav.Link><Link key="2" className="nav-link p-2" to="/me">Profile</Link></Nav.Link>
                    <div align="center" className="m-1"><AuthCluster user={user} /></div>
                  </div>
                  :
                  <div align="center"><AuthCluster user={user} /></div>
                }
              </div>
            </Nav>
          </Navbar.Collapse>
          <div className="d-none d-md-block">
            {user.loggedIn ?
              <DropdownButton align="end" title={user.addr} id="dropdown-menu-align-end" variant="dark" data-toggle="dropdown">
                <div className="p-2 fw-bold" style={{ fontSize: "20px" }}>Wallet Address</div>
                <OverlayTrigger key="wallet" placement="top" overlay={<Tooltip id={`tooltip-wallet`}>Copy</Tooltip>}>
                  <div className="p-2" style={{ fontSize: "16px", cursor: "copy" }} onClick={() => runCopy(user.addr)}>{user.addr} <i className="copyicon fa fa-copy"></i></div>
                </OverlayTrigger>
                <Dropdown.Divider />
                <Dropdown.Item><Link key="1" className="dropdown-item" to="/">Home</Link></Dropdown.Item>
                <Dropdown.Item><Link key="2" className="dropdown-item" to="/me">Profile</Link></Dropdown.Item>
                <Dropdown.Divider />
                <div align="center" className="mx-4"><AuthCluster user={user} /></div>
              </DropdownButton>
              :
              <AuthCluster user={user} />}
          </div>
        </Container>
      </Navbar>
    </Container>
  )
}
export default NavHead;

// File: ./src/auth-cluster.js

import * as fcl from "@onflow/fcl"
import { Button } from "react-bootstrap";

export function AuthCluster({ user }) {

  if (user.loggedIn) {

    return (
      <div>
        <Button style={{width: "200px"}} variant="outline-dark" onClick={fcl.unauthenticate}>Log Out</Button>
      </div>
    )
  } else {
    return (
      <div>
        <Button style={{width: "200px"}} variant="dark" onClick={fcl.logIn}>Connect Wallet</Button>
      </div>
    )
  }
}
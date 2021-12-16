import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { scripts, } from 'find-flow-contracts'
import { ProfileCard } from "../components/profile/ProfileCard";
import { ProblemMessage } from "../components/infoboxes/ProblemMessage";
import LoadingBC from "../components/infoboxes/LoadingBC";
import { NoProfile } from "../components/infoboxes/NoProfile";
import { useStateChanged } from "../functions/DisabledState";

export function Profile({ user }) {
  const [findUser, setFindUser] = useState("first_init");
  useEffect(() => {
    if (user.loggedIn) {
      
      async function getFindUser(addr) {
        const response = await fcl.send([
          fcl.script(scripts.address_status),
          fcl.args([fcl.arg(addr, t.Address)]),
        ]);
        
        const findUser = await fcl.decode(response)
        setFindUser(findUser)
      }
      try{
      getFindUser(user.addr)}
      catch (error) {
        console.log(error)
      }
    }
    // eslint-disable-next-line
  }, [user, useStateChanged()]);
  //profile found, render profile screen
  if (findUser.profile && user.loggedIn) {
    return <ProfileCard profileData={findUser} />
  }
  if (!user.loggedIn) {
    return <ProblemMessage problemVar="loggedout" />
  }
  if (findUser === "first_init") {
    //loading screen
    return <div><LoadingBC /></div>
  }
  if (!findUser) {
    //no profile found
    document.title = ".find - profile not found"
    return <NoProfile />
  }
  if (findUser) {
    //something there but not a profile (catchall)
    if (findUser.profile === null) {
      return <div><NoProfile /></div>
    }
  }
}


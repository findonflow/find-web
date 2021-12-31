import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { scripts } from 'find-flow-contracts'
import { Register } from "../pages/Register";
import { ProfileCard } from "../components/profile/ProfileCard";
import { SearchBar } from "../components/SearchBar";
import LoadingBC from "../components/infoboxes/LoadingBC";
import { Container } from "react-bootstrap";
import { useStateChanged } from "../functions/DisabledState";
import ReactGA from 'react-ga'

function NameSearch() {
  ReactGA.pageview(window.location.pathname);

  let navigate = useNavigate();
  let { id } = useParams();

  let searchName = id.toLowerCase()
  searchName = searchName.replace(/[^a-z0-9-]/g, '')
  if (!searchName) {
    navigate("/")
  }
  if (searchName.length < 3 || searchName.length > 16) {
    console.log("not long enough or too long")
    navigate("/")
  }

   const [nameStatus, setNameStatus] = useState(null);
  // const [enteredName, setEnteredName] = useState(null);
  useEffect(() => {
    async function SearchName(searchName) {
      const response = await fcl.send([
        fcl.script(scripts.name_status),
        fcl.args([fcl.arg(searchName, t.String)]),
      ]);
      const nameStatus = await fcl.decode(response);
       setNameStatus(nameStatus)
      // setEnteredName(searchName)
    }
    SearchName(searchName)
  }
  // eslint-disable-next-line
    , [searchName, useStateChanged()])
  
  if (nameStatus === null) {
    // --- INITIAL SCREEN ---
    return (
      <Container id="searchLoading">
        <LoadingBC />
      </Container>
    );
  } else {
    // --- REGISTER SCREEN ---
    if (nameStatus.status === "free" || nameStatus.status === "FREE") {
      return (
        <Container id="registerForm" className="px-3 px-lg-0">
          <SearchBar />
          <Register enteredName={nameStatus} />
        </Container>
      )
    }
    // --- SEARCH RESULT SCREEN ---
    return (
      <Container id="nameFoundProfile" className="g-0 m-0 p-0" fluid>
        <ProfileCard profileData={nameStatus} />
      </Container>

    )
  }

}
export default NameSearch

import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Faq } from "../components/home/Faq";
import { InfoCards } from "../components/home/InfoCards";
import { JoinDiscord } from "../components/home/JoinDiscord";
import { WhoUses } from "../components/home/whoUses";
import { SearchBar } from "../components/SearchBar";
import '../components/home/home.css'
import { BuiltOnFlow } from "../components/home/BuiltOnflow";
import { PlaceToShowCollections } from "../components/home/PlaceToShowCollections";
import { MakeWalletFindable } from "../components/home/MakeWalletFindable";
import { GiftNamesSendFlow } from "../components/home/GiftNamesSendFlow";
import ReactGA from 'react-ga'

function Home() {
  document.title = ".find - a name for your profile"
  ReactGA.pageview(window.location.pathname);
  return (
    <Container className="p-0 g-0" fluid>
      <Container id="homeBody" className="px-3 px-lg-0" fluid>
        <SearchBar />
        <Container id="homeInfo" className="frontCards p-4">
          <InfoCards />
          <GiftNamesSendFlow />
          <PlaceToShowCollections />
          <MakeWalletFindable />
          {/* <CadenceInfo /> */}
          <WhoUses />
          <Faq />
        </Container>
        <JoinDiscord />
        <BuiltOnFlow />
      </Container></Container>
  )
}
export default Home

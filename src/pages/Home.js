import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { CadenceInfo } from "../components/home/CadenceInfo";
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

function Home() {
document.title = ".find - a name for your profile"
  return (
    <Container className="p-0 g-0" fluid><Row className="p-3 p-lg-0 justify-content-center d-flex" style={{minHeight: "62px", backgroundColor: "white"}}><Col xs="auto"><Image className="d-none d-lg-block" src="/assets/img/home/presents.webp" height="62" /></Col><Col xs="auto" className="my-auto text-center"> 🎄 <span className="fw-bold">Merry Christmas! Gifting a name and sending Flow or FUSD is now available in your dashboard!</span> 🎁</Col></Row>
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

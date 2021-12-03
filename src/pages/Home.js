import React from "react";
import { Container } from "react-bootstrap";
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

function Home() {

  return (
    <Container id="homeBody" className="px-3 px-lg-0" fluid>
      <SearchBar />
      <Container id="homeInfo" className="frontCards p-4">
        <InfoCards />
        <PlaceToShowCollections />
        <MakeWalletFindable />
        <CadenceInfo />
        <WhoUses />
        <Faq />
      </Container>
      <JoinDiscord />
      <BuiltOnFlow />
    </Container>
  )
}
export default Home

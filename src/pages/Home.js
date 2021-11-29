import React from "react";
import { Container } from "react-bootstrap";
import { CadenceInfo } from "../components/home/CadenceInfo";
import { Faq } from "../components/home/Faq";
import { InfoCards } from "../components/home/InfoCards";
import { SearchBar } from "../components/SearchBar";

function Home() {

  return (
    <Container id="homeBody" className="px-3 px-lg-0">
      <SearchBar />
      <Container id="homeInfo" className="frontCards p-4">
        <InfoCards />
        <CadenceInfo />
        <Faq />
      </Container>
    </Container>
  )
}
export default Home

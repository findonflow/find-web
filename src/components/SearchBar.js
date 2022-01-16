import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import React, { useRef } from "react";
import { ReverseLookup } from "../functions/ReverseLookup";

export function SearchBar() {
  let navigate = useNavigate();
  const form = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = form.current;
    let searchName = name.value.toLowerCase()
    searchName = searchName.replace(/[^a-z0-9-]/g, '')
    if (!searchName) {
      return
    }
    if (searchName.length < 3 || searchName.length > 16) {
      if (searchName.length === 18 && searchName.includes("0x")){
      searchName = await ReverseLookup(searchName)
      if(!searchName){
        document.getElementById("feedback").classList.add("d-block")
        console.log("no search name")
        return
      }
      }
      else
      return
    }
    navigate("/" + searchName)
  }
  return (
    <Container id="searchSection">
      <Row className="m-3 mt-4 mt-md-5 pt-3">
        <Col align="center">
          <h1>Claim your .find identity</h1>
          <p className="mt-3 mt-md-5 m-auto fw-bold" style={{ color: '#5C5C5C' }}>Find a name today that will connect to your wallet address<br />and bring an identity to your crypto life</p>
        </Col>
      </Row>
      <Row className="mb-md-5 mt-md-5 mb-3 mt-4 justify-content-center">
        <Col className="mb-2" align="center" xs="12" md="5">
          <Form ref={form} onSubmit={handleSubmit} className="w-full relative">
            <Form.Control type="string" placeholder="Search for a name or 0xAddress" name="name" className="txtinput" />
            <div id="feedback" className="invalid-feedback">
            That address does not have a .find name
          </div>
          </Form>
        </Col>
        <Col xs="auto" className="mt-3 mt-md-0">
          <Button text="Confirm" onClick={handleSubmit} variant="dark">Search</Button>
        </Col>
      </Row>
    </Container>
  )
}
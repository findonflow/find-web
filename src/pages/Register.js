import React from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { Tx } from "../functions/transaction";
import { transactions } from 'find-flow-contracts'
import { Col, Container, Row, Button, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useFormStatus } from "../functions/DisabledState";

export function Register({ enteredName }) {

  let { id } = useParams();
  
  let navigate = useNavigate();
  let searchName = id.toLowerCase()
  searchName = searchName.replace(/[^a-z0-9-]/g, '')
  if (!searchName) {
    navigate("/")
  }
  if (searchName.length < 3 || searchName.length > 16) {
    navigate("/")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Tx(
        [
          fcl.transaction(transactions.register),
          fcl.args([
            fcl.arg(searchName, t.String),
            fcl.arg(enteredName.cost, t.UFix64)
          ]),
          fcl.proposer(fcl.currentUser().authorization),
          fcl.payer(fcl.currentUser().authorization),
          fcl.authorizations([fcl.currentUser().authorization]),
          fcl.limit(9999),
        ],
        {
          onStart() {
            //form.current.reset();
            console.log("start")
          },
          onSubmission() {
            console.log("submitted")
          },
          async onSuccess(status) {
            console.log("success")
            const event = document.createEvent("Event");
            event.initEvent("bid", true, true);
            document.dispatchEvent(event);
            navigate("/"+searchName)
          },
          async onError(error) {
            if (error) {
              const { message } = error;
              console.log(message)
            }
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container id="registerAvailable" className="frontTray p-4">
      <Row className="m-5">
        <Col align="center"><Image src="/assets/img/Tick_circle.png" alt="Green circle with a tick" /></Col>
      </Row>
      <Row>
        <Col align="center">
          <h1 className="display-6 fw-bold">Woohoo! {searchName} is <span style={{ color: "green" }}>available</span></h1>
          <div className="m-3 text">You are in luck, as the username you want is available.<br /> Claim this name now to ensure it doesn't get snatched up!</div>
          <div className="mt-5 align-middle">
            <fieldset id="a" disabled={useFormStatus()}>
              <div><span className="fw-bold m-3 me-4 align-middle" style={{ fontSize: "26px" }}>{enteredName.cost * 1} FUSD</span><Button text="Confirm" onClick={handleSubmit} disabled variant="dark">Register</Button></div>
            </fieldset>
            <div className="m-5 seperator"></div>
            <div className="disclaimer">The use of this service and the names available are subject to our terms of service. Any unauthorised use of names is not the responsibility of find.xyz we want everybody to play nicely!</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
import * as fcl from "@onflow/fcl";
import { Tx } from "../functions/transaction";
import { transactions } from 'find-flow-contracts'
import { Col, Container, Row, Button } from "react-bootstrap";
import { useFormStatus } from "../functions/DisabledState";

function RemoveProfile() {

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Tx(
        [
          fcl.transaction(transactions.removeProfile),
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
            //navigate("/me")
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
    <Container>
      {/* <Row className="mt-5 p-2">
                <Col className="d-flex justify-content-center text-center titletxt fw-bold">Uh oh, it seems you are not logged in.</Col>
            </Row> */}
      <Row className="m-1 p-2">
        <Col className="d-flex justify-content-center text-center">Click below to remove your existing profile.</Col>
      </Row>
      <Row>
        <Col className="m-5 d-flex justify-content-center">
          <fieldset id="a" disabled={useFormStatus()}>
            <div>
              <Button text="Confirm" onClick={handleSubmit} variant="dark">Remove Profile</Button>
            </div>
          </fieldset>
        </Col>
      </Row>
    </Container>
  )
}
export default RemoveProfile

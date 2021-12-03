import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useImmer } from "use-immer";
import { useFormStatus } from "../../functions/DisabledState";
import { handleProfile } from "../../functions/txfunctions";

export function NoProfile() {
    const [formValues, setFormValues] = useImmer("")

    function updateField(e) {
        setFormValues(e.target.value)
    }

    return (
        <Container className="frontTray p-4 mt-5">
            <Row className="mt-5 p-2">
                <Col className="d-flex justify-content-center text-center titletxt fw-bold">You've connected your wallet but don't have a profile yet.</Col>
            </Row>
            <Row className="m-1 p-2">
                <Col className="d-flex justify-content-center text-center">No problem, just click below to create your profile.</Col>
            </Row>
            <Row>
                <Col className="m-5 d-flex justify-content-center">

                    <Row>
                        <fieldset id="a" disabled={useFormStatus()}>
                            <Col xs="12" md="auto" className="mb-3 mb-md-0 formInputs">
                                <Form.Group>
                                    <Form.Label>Enter a name</Form.Label>
                                    <Form.Control placeholder="your name here" onChange={updateField} />
                                </Form.Group>
                            </Col>
                            <Col className="mt-auto" align="right">
                                <Button style={{ width: "200px" }} onClick={() => handleProfile(formValues)} variant="outline-dark">Create</Button>
                            </Col>
                        </fieldset>
                    </Row>

                </Col>
            </Row>
        </Container>
    )
}
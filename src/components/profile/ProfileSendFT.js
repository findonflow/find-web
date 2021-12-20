import { Button, Form, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { handleSendFungible } from "../../functions/txfunctions";
export function ProfileSendFT({ profileData }) {

    const [sendFT, setSendFT] = useState("flow")

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        event.preventDefault();
        
        const amount = parseFloat(form.sendAmt.value).toFixed(2);
        const name = profileData.lease.name

        handleSendFungible(event,name, amount, sendFT)
    }

    const handleChange = (event) => {
        setSendFT(event.target.value)
    }

    return(
        <div>
            <Form onSubmit={handleSubmit} className="formInputs">
                <Row>
                    <Form.Group as={Col} controlId="validationCustom02">
                        <Form.Label><div>Please choose the amount of <span> <Form.Label>
                            <Form.Select onChange={handleChange}>
                                <option value="flow">FLOW</option> 
                                <option value="fusd">FUSD</option>
                            </Form.Select>
                        </Form.Label></span>you'd like to send</div></Form.Label>
                        <Form.Control type="number" name="sendAmt" />
                    </Form.Group>
                    <Col className="align-self-end">
                        <Button variant="outline-dark" className="mt-auto" type="submit">Send</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
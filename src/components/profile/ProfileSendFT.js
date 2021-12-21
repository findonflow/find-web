import { Button, Form, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { handleSendFungible } from "../../functions/txfunctions";
import { useFormStatus } from "../../functions/DisabledState";

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
            
            <Form noValidate onSubmit={handleSubmit} className="formInputs">
                <fieldset id="a" disabled={useFormStatus()}>
                <Row className="mx-auto">
                <span className="name">.fund {profileData.profile.name}</span>
                    <Form.Group className=" mt-1 mx-auto" as={Row} controlId="validationCustom02" >
                        <Row className="m-0 mt-1 p-0">
                            <Col className="p-0 my-auto m-0">
                            <Form.Label className="idd1 text-left">Please choose the amount of {sendFT} you'd like to send</Form.Label>
                            </Col>
                            <Col className="p-0 m-0">
                            <Form.Select className="text-center m-0" onChange={handleChange}>
                                    <option value="flow">FLOW</option> 
                                    <option value="fusd">FUSD</option>
                                </Form.Select>  
                            </Col> 
                        </Row>
                        <Form.Control className="mb-3 mt-3"type="number" name="sendAmt" />
                    </Form.Group>
                    <Row className="mx-auto">
                        <Button variant="outline-dark" type="submit">Send</Button>
                    </Row>
                </Row>
                </fieldset>
            </Form>
        </div>
    )
}
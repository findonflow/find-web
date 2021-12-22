import { Button, Form, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { handleSendFungible } from "../../functions/txfunctions";
import { useFormStatus } from "../../functions/DisabledState";
import { useImmer } from "use-immer";

export function ProfileSendFT({ profileData }) {

    const [sendFT, setSendFT] = useState("flow")
    const [error, setError] = useState("")
    const [formValues, setFormValues] = useImmer([
        {
            id: "sendAmt",
            value: 0
        }
    ])

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        
        event.preventDefault();
        if(validateInput(form.sendAmt.value))
        {
            console.log(form.sendAmt.value)
            const amount = parseFloat(form.sendAmt.value).toFixed(2);

            const name = profileData.lease.name
            
            
            handleSendFungible(event,name, amount, sendFT)
        }

    }

    function validateInputFormatting(e) {
        setFormValues((draft) => {
            const varVal = draft.find((varVal) => varVal.id === e.target.name);
            varVal.value = e.target.value;
            //now validate
            if (varVal.value <= 0) {
                e.target.classList.add("is-invalid")
                e.target.classList.remove("is-valid")
            }
            else {
                e.target.classList.add("is-valid")
                e.target.classList.remove("is-invalid")
            }
        })
    }

    const validateInput = (amount) => {

        if (amount <= 0) {
            setError("Value must be greater than 0");
            return false
        }
        else {
            setError("")
            return true
        }

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
                        <Form.Control required className="mt-3" type="number" name="sendAmt" onChange={validateInputFormatting} />
                        <Row>
                        {/* {error.length > 0 &&
                        <div className="errorText">{error}</div>
                        } */}
                    </Row>
                    </Form.Group>
                    
                    <Row className="mx-auto mt-3">
                        <Button variant="outline-dark" type="submit">Send</Button>
                    </Row>
                    
                </Row>
                </fieldset>
            </Form>
        </div>
    )
}
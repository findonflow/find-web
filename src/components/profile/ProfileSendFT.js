import { Button, Form, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { handleSendFungible } from "../../functions/txfunctions";
import { useFormStatus } from "../../functions/DisabledState";
import { useImmer } from "use-immer";
import { ValidateNameAddress } from "../../functions/ValidateNameAddress";

export function ProfileSendFT({ profileData }) {

    const [sendFT, setSendFT] = useState("flow")
    const [nameAdr, setNameAdr] = useState("")
    const [error, setError] = useState("")
    const [formValues, setFormValues] = useImmer([
        {
            id: "sendAmt",
            value: 0
        }
    ])

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (profileData) {
            if (validateInput(form.sendAmt.value)) {

                console.log(form.sendAmt.value)
                const amount = parseFloat(form.sendAmt.value).toFixed(2);
                const name = profileData.lease.name

                try{
                    await(handleSendFungible(event,name, amount, sendFT))
                    }
                    finally{
                    form.sendAmt.value = ""
                    form.sendAmt.classList.remove("is-valid")
                    }
            } else {
                form.sendAmt.classList.add("is-invalid")
                form.sendAmt.classList.remove("is-valid")
            }
        }
        if (!profileData) {
        if (validateInput(form.sendAmt.value) && ValidateNameAddress(form.sendNameAdr.value).type === "name") {
            console.log(form.sendAmt.value)
            const amount = parseFloat(form.sendAmt.value).toFixed(2);
            const name = ValidateNameAddress(form.sendNameAdr.value).value

            try{
                await(handleSendFungible(event,name, amount, sendFT))
                }
                finally{
                form.sendAmt.value = ""
                form.sendAmt.classList.remove("is-valid")
                form.sendNameAdr.value = ""
                form.sendNameAdr.classList.remove("is-valid")
                }
        } else {
            if (!validateInput(form.sendAmt.value)) {
                form.sendAmt.classList.add("is-invalid")
                form.sendAmt.classList.remove("is-valid")
            }
            if (!ValidateNameAddress(form.sendNameAdr.value).type === "name") {
                form.sendNameAdr.classList.add("is-invalid")
                form.sendNameAdr.classList.remove("is-valid")
            }
        }
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

    function validateNameAdrFormatting(e) {
        console.log(ValidateNameAddress(e.target.value))
        if (ValidateNameAddress(e.target.value).type === "name") {
            setNameAdr(ValidateNameAddress(e.target.value).value)
            e.target.classList.add("is-valid")
            e.target.classList.remove("is-invalid")
        } else {
            e.target.classList.add("is-invalid")
            e.target.classList.remove("is-valid")
        }
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

    return (
        <div>
            <fieldset id="a" disabled={useFormStatus()}>
                {profileData &&
                    <Form id="FundAccount" noValidate onSubmit={handleSubmit} className="formInputs">
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
                    </Form>}
                {!profileData &&
                    <Form id="FundAccount" noValidate onSubmit={handleSubmit} className="formInputs">
                        <Row className="mx-auto">

                            <Form.Group className=" mt-1 m-0" as={Row} controlId="validationCustom02" >
                                <span className="name">.fund {nameAdr} some flow or fusd</span>
                                <Row className="m-0 mt-2 p-0">
                                    <Col className="my-auto mx-auto m-0" lg="7" xs="12">
                                        <Form.Label className="idd2 p-0 m-0">Fund someones wallet with Flow or FUSD by entering their name and the amount you want to send</Form.Label>
                                    </Col>
                                    <Col className="p-0 m-0 mt-2 mt-lg-0" lg="5" xs="12">
                                        <Form.Control required placeholder="Enter a .find name" type="text" name="sendNameAdr" onChange={validateNameAdrFormatting} />

                                    </Col>
                                </Row>
                            </Form.Group>

                            <Row className="m-0 mt-1">
                                <span className="idd mt-4">How much would you like to send?</span>
                                <Col className="ps-lg-0 pe-lg-2 p-0 mt-2" lg="5" xs="12">
                                    <Form.Control required className="" type="number" name="sendAmt" onChange={validateInputFormatting} />
                                </Col>
                                <Col lg="4" xs="12" className="mt-2 p-0 px-lg-2">
                                    <Form.Select className="text-center m-0" onChange={handleChange}>
                                        <option value="flow">FLOW</option>
                                        <option value="fusd">FUSD</option>
                                    </Form.Select>
                                </Col>
                                <Col className="pe-lg-0 ps-lg-2 mt-2 p-0" lg="3" xs="12">
                                    <Button className="pl-2 w-100" variant="outline-dark" type="submit">Send</Button>
                                </Col>
                            </Row>
                        </Row>
                    </Form>
                }
            </fieldset>
        </div>
    )
}
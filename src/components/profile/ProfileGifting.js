import { Button, Form, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { handleSendNameToAddress,  handleSendNameToName} from "../../functions/txfunctions";
import { useFormStatus } from "../../functions/DisabledState";
import { useImmer } from "use-immer";
export function ProfileGifting({ profileData }) {

    const [recipient, setRecipient] = useState("")
    const [name, setName] = useState("--please select a name--")
    const [error, setError] = useState("")
    const [formValues, setFormValues] = useImmer([
        {
            id: "recipientName",
            value: ""
        },
        {
            id: "sendingName",
            value: ""
        }
    ])

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        

        event.preventDefault();

        if(addressValidation(recipient) == "address"){
            form.recipientName.classList.add("is-valid")
                form.recipientName.classList.remove("is-invalid")

            if(nameValidation(name))
            {
                setError("")
                
                form.sendingName.classList.add("is-valid")
                form.sendingName.classList.remove("is-invalid")

                handleSendNameToAddress(event, name, recipient)
                return
            }
            else
            {
                form.sendingName.classList.remove("is-valid")
                form.sendingName.classList.add("is-invalid")
            }
        }
        else if (addressValidation(recipient) == "name")
        {
            form.recipientName.classList.add("is-valid")
            form.recipientName.classList.remove("is-invalid")
            if(nameValidation(name))
            {
                setError("")
                
                form.sendingName.classList.add("is-valid")
                form.sendingName.classList.remove("is-invalid")

                handleSendNameToName(event, name, recipient)
                return
            }
            else
            {
                form.sendingName.classList.remove("is-valid")
                form.sendingName.classList.add("is-invalid")
                return
            }
        }

        else if (addressValidation(recipient) == "invalid")
        {
            form.recipientName.classList.add("is-invalid")
                form.recipientName.classList.remove("is-valid")

            if(nameValidation(name))
            {
                setError("")
                
                form.sendingName.classList.add("is-valid")
                form.sendingName.classList.remove("is-invalid")

                return
            }
            else
            {
                form.sendingName.classList.remove("is-valid")
                form.sendingName.classList.add("is-invalid")
                return
            }
        }

    }

    const nameValidation = (name) => {
        if(profileData.leases.some(item => name === item.name))
        {
            console.log("valid name")
            return true;
            
        }
        else
        {
            setError("Name selected is not valid")
            return false;
        }
    }

    function nameValidationFormatting(e) {
        setFormValues((draft) => {
            const varVal = draft.find((varVal) => varVal.id === e.target.name);
            varVal.value = e.target.value;

            //now validate
            if (nameValidation(varVal.value)) {

                e.target.classList.add("is-valid")
                e.target.classList.remove("is-invalid")
                
            }
            else {
                e.target.classList.add("is-invalid")
                e.target.classList.remove("is-valid")
            }

            setName(varVal.value)
        })

        
    }

    function addressValidationFormatting(e) {
        setFormValues((draft) => {
            const varVal = draft.find((varVal) => varVal.id === e.target.name);
            varVal.value = e.target.value;
            if(varVal.value.includes(".find"))
            {
                varVal.value = varVal.value.split(".find")[0]
            }
            //now validate
            if (addressValidation(varVal.value) === "invalid") {
                e.target.classList.add("is-invalid")
                e.target.classList.remove("is-valid")
            }
            else {
                e.target.classList.add("is-valid")
                e.target.classList.remove("is-invalid")
            }

            setRecipient(varVal.value)
        })

        
    }


    const addressValidation = (address) => {
        if(address.length >= 3)
        {
            if (address.match(/[^a-z0-9-]/g) !== null)
            {
                console.log(address)
                setError("No special characters allowed")
                return "invalid"
            }
            if(address.includes("0x")  && address.length === 18)
            {
                return "address"
            }
            else if (address.length >= 3 && address.length <= 16)
            {
                return "name"
            }
            else
            {
                console.log(address)
                setError("Name / Address provided is invalid. Please try again.")
                return "invalid"
            }
        }

        else
            {
                console.log(address)
                setRecipient("")
                setError("Name / Address provided is invalid. Please try again.")
                return "invalid"
            }
            
        }

        

    return(
        <div>
            <Form noValidate onSubmit={handleSubmit} className="formInputs">
                <fieldset id="a" disabled={useFormStatus()}>
                <Row className="mx-auto">
                
                    <Form.Group className=" mt-1 m-0" as={Row} controlId="validationCustom02" >
                    <span className="name">.gift someone a .find name</span>
                        <Row className="m-0 mt-2 p-0">
                            <Col className="my-auto mx-auto m-0" md="7" xs="12">
                            <Form.Label className="idd2 p-0 m-0">Choose the name you would like to gift to someone else and send it either by their .find name or blocto wallet address.</Form.Label>
                            </Col>
                            <Col className="p-0 m-0" md="5" xs="12">
                            <Form.Select required className="text-center mt-2 w-100" name="sendingName" onChange={nameValidationFormatting}>
                            <option key="NoName" value="no name selected">--please select a name--</option>
                            {profileData.leases.map(item => {
                            return (<option key={item.name} value={item.name}>{item.name}</option>);
                            })}
                                </Form.Select>  
                            </Col> 
                        </Row>
                    </Form.Group>
                    
                    <Row className="m-0 mt-1">
                    <span className="idd mt-4">Who would you like to gift to?</span>
                        <Col md="8" xs="12">
                        <Form.Control className="mt-2 w-100" required type="text" placeholder="Enter a .find name or 0xAddress" name="recipientName" onChange={addressValidationFormatting}/>
                        </Col>
                        <Col md="4" xs="12">
                        <Button className="mt-2 w-100 mb-2" variant="outline-dark" type="submit">Gift</Button>
                        </Col>  
                        <Row xs="12" md="8">
                        {/* {error.length > 0 &&
                        <div className="errorText">{error}</div>} */}
                        </Row>
                    </Row>
                </Row>
                </fieldset>
            </Form>
        </div>
    )
}
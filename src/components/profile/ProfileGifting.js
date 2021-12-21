import { Button, Form, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { handleSendNameToAddress,  handleSendNameToName} from "../../functions/txfunctions";
import { useFormStatus } from "../../functions/DisabledState";

export function ProfileGifting({ profileData }) {

    const [recipient, setRecipient] = useState("")
    const [name, setName] = useState("--please select a name--")
    const [error, setError] = useState("")


    const handleSubmit = (event) => {
        const form = event.currentTarget;

        event.preventDefault();

        if(addressValidation(recipient) == "address"){
            if(nameValidation(name))
            {
                setError("")
                handleSendNameToAddress(event, name, recipient)
            }
        }
        else if (addressValidation(recipient) == "name")
        {
            if(nameValidation(name))
            {
                setError("")
            handleSendNameToName(event, name, recipient)
            }
        }

    }

    const handleRecipientChange = (event) => {
        let r = event.target.value.toLowerCase()

        if(r.includes(".find"))
        {
            setRecipient(r.split(".find")[0])
        }
        else{
            setRecipient(r)
        }
    }

    const handleDropDownChange = (event) => {
        if(nameValidation(event.target.value))
        {
            setError("")
            setName(event.target.value)
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
                            <Form.Select required className="text-center mt-2 w-100" onChange={handleDropDownChange}>
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
                        <Form.Control className="mt-2 w-100" required type="text" placeholder="Enter a .find name or 0xAddress" name="recipientName" onChange={handleRecipientChange}/>
                        </Col>
                        <Col md="4" xs="12">
                        <Button className="mt-2 w-100 mb-2" variant="outline-dark" type="submit">Gift</Button>
                        </Col>  
                        <Row xs="12" md="8">
                        {error.length > 0 &&
                        <div className="errorText">{error}</div>}
                        </Row>
                    </Row>
                </Row>
                </fieldset>
            </Form>
        </div>
    )
}
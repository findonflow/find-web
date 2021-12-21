import { Button, Form, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { handleSendNameToAddress,  handleSendNameToName} from "../../functions/txfunctions";
import { useFormStatus } from "../../functions/DisabledState";

export function ProfileGifting({ profileData }) {

    const [recipient, setRecipient] = useState("")
    const [name, setName] = useState("")


    const handleSubmit = (event) => {
        const form = event.currentTarget;

        event.preventDefault();

        if(addressConfirmation(recipient)){
            handleSendNameToAddress(event, name, recipient)
        }
        else{
            if(name.length <= 16)
            {
                handleSendNameToName(event, name, recipient)
            }
            else {
                console.log("not a valid name or address")
            }
        }

    }

    const handleRecipientChange = (event) => {
        let r = event.target.value.toLowerCase()
        r = r.replace(/[^a-z0-9-]/g, '')
        setRecipient(r)
    }

    const handleDropDownChange = (event) => {
        setName(event.target.value)
    }

    const addressConfirmation = (address) => {

        if(address.includes("0x")  && address.length === 18)
        {
            return true
        }
        else
        {
            return false
        }
    }

    return(
        <div>
            <Form noValidate onSubmit={handleSubmit} className="formInputs">
                <fieldset id="a" disabled={useFormStatus()}>
                <Row className="mx-auto">
                <span className="name">.gift someone a .find name</span>
                    <Form.Group className=" mt-1" as={Row} controlId="validationCustom02" >
                        <Row className="m-0 mt-1 p-0 pl-0 ml-0">
                            <Col className="my-auto m-0" md="7" xs="12">
                            <Form.Label className="idd2 p-0 m-0">Choose the name you would like to gift to someone else and send it either by their .find name or blocto wallet address.</Form.Label>
                            </Col>
                            <Col className="p-0 m-0" md="5" xs="12">
                            <Form.Select className="text-center m-0" onChange={handleDropDownChange}>
                            <option key="NoName" value="no name selected">--please select a name--</option>
                            {profileData.leases.map(item => {
                            return (<option key={item.name} value={item.name}>{item.name}</option>);
                            })}
                                </Form.Select>  
                            </Col> 
                        </Row>
                    </Form.Group>
                    <span className="idd mt-4">Who would you like to gift to?</span>
                    <Row className=" mt-3">
                    
                        <Col md="8" xs="12">
                        <Form.Control className="mb-3"type="text" placeholder="Enter a .find name or 0xAddress" name="recipientName" onChange={handleRecipientChange}/>
                        </Col>
                        <Col md="4" xs="12">
                        <Button className="w-100" variant="outline-dark" type="submit">Gift</Button>
                        </Col>
                       
                        
                    </Row>
                </Row>
                </fieldset>
            </Form>
        </div>
    )
}
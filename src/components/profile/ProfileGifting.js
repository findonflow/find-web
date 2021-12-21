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
            handleSendNameToName(event, name, recipient)
        }

    }

    const handleRecipientChange = (event) => {
        setRecipient(event.target.value)
    }

    const handleDropDownChange = (event) => {
        setName(event.target.value)
    }

    const addressConfirmation = (address) => {
        if(address.includes("0x")  && address.length >= 16)
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
                            <Col className="my-auto m-0 col-8">
                            <Form.Label className="idd2 p-0 m-0">Choose the name you would like to gift to someone else and send it either by their .find name or blocto wallet address.</Form.Label>
                            <Form.Label>Sending name: {name} to {recipient}</Form.Label>
                            </Col>
                            <Col className="p-0 m-0">
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
                    
                        <Col className="col-9">
                        <Form.Control className="mb-3"type="text" placeholder="Enter a .find name or 0xAddress" name="recipientName" onChange={handleRecipientChange}/>
                        </Col>
                        <Col className="col-3">
                        <Button className="w-100" variant="outline-dark" type="submit">Gift</Button>
                        </Col>
                       
                        
                    </Row>
                </Row>
                </fieldset>
            </Form>
        </div>
    )
}
import { Col, Row, Image, Form, Container, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import { AuctionBox } from "./AuctionBox";
import './charity-tree.css';

export function WFAWGifting() {

    const handleSubmit = (event) => {
        // const form = event.currentTarget;

        

        // event.preventDefault();

        // if(addressValidation(recipient) == "address"){
        //     form.recipientName.classList.add("is-valid")
        //         form.recipientName.classList.remove("is-invalid")

        //     if(nameValidation(name))
        //     {
        //         setError("")
                
        //         form.sendingName.classList.add("is-valid")
        //         form.sendingName.classList.remove("is-invalid")

        //         handleSendNameToAddress(event, name, recipient)
        //         return
        //     }
        //     else
        //     {
        //         form.sendingName.classList.remove("is-valid")
        //         form.sendingName.classList.add("is-invalid")
        //     }
        // }
        // else if (addressValidation(recipient) == "name")
        // {
        //     form.recipientName.classList.add("is-valid")
        //     form.recipientName.classList.remove("is-invalid")
        //     if(nameValidation(name))
        //     {
        //         setError("")
                
        //         form.sendingName.classList.add("is-valid")
        //         form.sendingName.classList.remove("is-invalid")

        //         handleSendNameToName(event, name, recipient)
        //         return
        //     }
        //     else
        //     {
        //         form.sendingName.classList.remove("is-valid")
        //         form.sendingName.classList.add("is-invalid")
        //         return
        //     }
        // }

        // else if (addressValidation(recipient) == "invalid")
        // {
        //     form.recipientName.classList.add("is-invalid")
        //         form.recipientName.classList.remove("is-valid")

        //     if(nameValidation(name))
        //     {
        //         setError("")
                
        //         form.sendingName.classList.add("is-valid")
        //         form.sendingName.classList.remove("is-invalid")

        //         return
        //     }
        //     else
        //     {
        //         form.sendingName.classList.remove("is-valid")
        //         form.sendingName.classList.add("is-invalid")
        //         return
        //     }
        // }

    }

    return (
        <Container >
            <Row className="gifting-box p-4">
                {/* women for afghan women image */}
                <Col md="1">
                </Col>
                <Col className="" md="4">
                <Image src="/assets/img/charitytree/WFAW.webp"></Image>
                </Col>

                {/* gifting input and button */}
                <Col>
                    <Row>

                    <Form id="FundAccount" noValidate onSubmit={handleSubmit} className="formInputs">
                        <Row className="mx-auto">

                            <Form.Group className=" mt-1 m-0" as={Row} controlId="validationCustom02" >
                                <Row className="m-0 mt-2 p-0">
                            <Form.Label>Want to gift to the Women for Afghan Women?</Form.Label>
                                    <Col className="p-0 m-0 mt-2 mt-lg-0" md="9" xs="12">
                                        
                                        <Form.Control required placeholder="Enter amount in flow" type="text" name="sendNameAdr" />
                                    </Col>
                                    <Col className="pe-lg-0 ps-lg-2p-0" lg="3" xs="12">
                                    <Button className="pl-2 w-100" variant="outline-dark" type="submit">Gift</Button>
                                </Col>
                                </Row>
                            </Form.Group>
                        </Row>
                    </Form>
                    </Row>
                </Col>

                <Col md="1">
                </Col>
            </Row>
        </Container>
    )
}
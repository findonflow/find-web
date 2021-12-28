import { Col, Row, Image, Button, Container, Form } from "react-bootstrap"
import { Link } from "react-router-dom";
import { AuctionBox } from "./AuctionBox";
import './charity-tree.css';
import { TimerComponent } from "./TimerComponent";
import { WFAWGifting } from "./WFAWGifting";
export function CharityTreeAuction() {

    let currentBid = 300

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
        <Container>
            
            {/* This is the row for the Col containing NFTT image, Timer and the Col containing Description, auction buttons and gift options */}
            <Row className="p-5 " fluid>
                <Col className="mh-50" xs="12" md="6">
                        {/* NFT IMAGE */}
                        <Image className="" src="/assets/img/charitytree/Community Tree.webp" fluid></Image>
                </Col>

                <Col className="h-100">

                <Row>
                        {/* AUCTION TIMER */}
                        <TimerComponent/>
                    </Row>

                    <Row >
                <div className=" pt-2 pb-3"><h3>Neo x Flowverse Charity Christmas Tree </h3></div>
            </Row>
                    <Row className="">
                        {/* DESCRIPTION */}
                       
                        <div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec lacus at dui auctor bibendum. Donec eget urna mi. Ut vel sagittis dolor. Phasellus nec neque porttitor, tincidunt tortor vel, venenatis est. Aenean maximus, tortor pulvinar iaculis tempus, velit arcu malesuada lectus, ac ullamcorper odio lacus nec arcu. Nam ac posuere arcu, sit amet feugiat quam. Duis congue eleifend nisl, a bibendum dui ullamcorper ut. Aenean quam quam, porttitor at tristique vel, tristique vitae ex. Duis pretium mattis felis, a cursus nisi venenatis id. Duis nec vehicula lectus. Maecenas et nisl in ex tristique mollis.</p>
                            <p><span><a target="_blank" href="https://medium.com/@NeoCollectibles/what-is-the-neo-x-flowverse-community-christmas-tree-4fc5a30da24f"><u>Read the Medium Article</u></a></span> for more information</p>
                        </div>
                    </Row>

                    <Row className="pt-3">
                        <div><p className="current-bid-text">Current bid: <span className="current-bid-text-green">{currentBid} FLOW</span></p></div>
                    </Row>
                    <Row className="">
                        <div><p className="" style={{fontWeight:"500"}}>How much would you like to bid?</p></div>
                    </Row>
                    
                    <Form id="FundAccount" noValidate onSubmit={handleSubmit} className="formInputs">
                        <Row className="">

                            <Form.Group className="m-0" as={Row} controlId="validationCustom02" >
                                <Row className="m-0 mt-2 p-0">
                                    <Col className="p-0 m-0 mt-2 mt-lg-0" md="9" xs="12">
                                        
                                        <Form.Control required placeholder="Enter amount in flow" type="text" name="sendNameAdr" />
                                    </Col>
                                    <Col className="pe-lg-0 ps-lg-2p-0" lg="3" xs="12">
                                    <Button className="pl-2 w-100" variant="outline-dark" type="submit">Bid</Button>
                                </Col>
                                </Row>
                            </Form.Group>
                        </Row>
                    </Form>

                </Col>
            </Row>

            <Row className="p-5" >
                <WFAWGifting/>
            </Row>

            <Row className="p-5">
                <div className="w-100 charity-tree-headers"><h1>The wall of fame</h1></div>
                <p>Check out the wall of fame</p>
            </Row>

            


           
        </Container>
    )
}
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
        <Container style={{ backgroundColor: "white" }} fluid>
            <Container className="px-5">

                {/* This is the row for the Col containing NFTT image, Timer and the Col containing Description, auction buttons and gift options */}
                <Row className="pt-5 ">
                    <Col className="p-0 m-2" xs="12" md="auto">
                        <Row className="justify-content-center">
                            {/* NFT IMAGE */}
                            <Image className=" p-0 shadow" src="/assets/img/charitytree/Community Tree.webp" style={{ maxWidth: "420px" }} rounded></Image>
                        </Row>
                    </Col>

                    <Col className="" xs="12" md={{span: 6, offset: 1}}>

                            {/* AUCTION TIMER */}
                            {/* <div className="w-100 charity-tree-timer">00:00:00</div> */}
                            <Row className="auction-digits justify-content-center justify-content-md-start">
                                <Col xs="auto" className="p-2">2 <div className="auction-dayshoursmins p-0">days</div></Col>
                                <Col xs="auto" className="p-2">:</Col>
                                <Col xs="auto" className="p-2">10 <div className="auction-dayshoursmins">hours</div></Col>
                                <Col xs="auto" className="p-2">:</Col>
                                <Col xs="auto" className="p-2">40 <div className="auction-dayshoursmins">mins</div></Col>
                                <Col xs="auto" className="p-2">:</Col>
                                <Col xs="auto" className="p-2">12 <div className="auction-dayshoursmins">secs</div></Col>
                            </Row>

                        <Row >
                            <div className=" pt-4 pb-3"><h4>Neo x Flowverse Community Charity Christmas Tree </h4></div>
                        </Row>
                        <Row className="">
                            {/* DESCRIPTION */}

                            <div className="auction-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec lacus at dui auctor bibendum. Donec eget urna mi. Ut vel sagittis dolor. Phasellus nec neque porttitor, tincidunt tortor vel, venenatis est. Aenean maximus, tortor pulvinar iaculis tempus, velit arcu malesuada lectus, ac ullamcorper odio lacus nec arcu. Nam ac posuere arcu, sit amet feugiat quam. Duis congue eleifend nisl, a bibendum dui ullamcorper ut. Aenean quam quam, porttitor at tristique vel, tristique vitae ex. Duis pretium mattis felis, a cursus nisi venenatis id. Duis nec vehicula lectus. Maecenas et nisl in ex tristique mollis.</div>
                        </Row>

                        <Row className="mt-3">
                            {/* AUCTION buttons */}
                            <div className="fw-bold my-3">Current bid: <span className="current-bid-flow" > 300 FLOW</span></div>
                            {/* <div className="fw-bold mt-3">How much would you like to bid?</div> */}
                        </Row>
                        <Form className="formInputs">
                            <Row>
                                <Col sm="12" lg="7">
                                    <Form.Label>How much would you like to bid?</Form.Label>
                                    <Form.Control type="number" required />
                                </Col>
                                <Col sm="12" lg="5" className="mt-auto">
                                    <Button type="submit" className="w-100" variant="dark">Bid</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row className="auction-box shadow my-5">
                            <div className="w-100 charity-tree-headers">Gift something</div>
                            {/* Gift Options */}
                            <Col className="p-3">
                                <Button className="w-100" variant="dark">10 FUSD</Button>
                            </Col>
                            <Col className="p-3">
                                <Button className="w-100" variant="dark">50 FUSD</Button>
                            </Col>
                            <Col className="p-3">
                                <Button className="w-100" variant="dark">100 FUSD</Button>
                            </Col>
                        </Row>
                
            </Container>
            <Container style={{backgroundColor: "#F6F6F6"}} fluid>
                <Container>
                    <Row className="p-5">
                    <div className="w-100 charity-tree-headers"><h1>The wall of fame</h1></div>
                    <p>Check out the wall of fame</p>
                </Row>
                </Container>
            </Container>
            
        </Container>
    )
}
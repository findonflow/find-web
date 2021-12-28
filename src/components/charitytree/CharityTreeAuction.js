import { useState } from "react";
import { Col, Row, Image, Button, Container, Form } from "react-bootstrap"
import Countdown from "react-countdown";
import { AuctionBox } from "./AuctionBox";
import './charity-tree.css';
export function CharityTreeAuction() {

    const Completionist = () => <span>The auction... has begun!</span>;
    const [auctionLocked, setAuctionLocked] = useState(true)

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            setAuctionLocked(false)
            return <Completionist />;
        } else {
            // Render a countdown
            return <Row className="auction-digits justify-content-center justify-content-md-start">
                <Col xs="auto" className="p-2">{days}<div className="auction-dayshoursmins p-0">days</div></Col>
                <Col xs="auto" className="p-2">:</Col>
                <Col xs="auto" className="p-2">{hours} <div className="auction-dayshoursmins">hours</div></Col>
                <Col xs="auto" className="p-2">:</Col>
                <Col xs="auto" className="p-2">{minutes} <div className="auction-dayshoursmins">mins</div></Col>
                <Col xs="auto" className="p-2">:</Col>
                <Col xs="auto" className="p-2">{seconds} <div className="auction-dayshoursmins">secs</div></Col>
            </Row>;
        }
    };

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

                    <Col className="" xs="12" md={{ span: 6, offset: 1 }}>

                        {/* AUCTION TIMER */}
                        {/* <div className="w-100 charity-tree-timer">00:00:00</div> */}
                        <Row>
                            <Col><Countdown date={Date.now() + 10000} renderer={renderer} /></Col>
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
                                    <Button type="submit" className="w-100" variant="dark" disabled={auctionLocked}>Bid</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row className="auction-box charity-gift-widget shadow my-5 p-3">
                    <Col className="p-3">
                        <Image src="/assets/img/charitytree/waw.webp" />
                    </Col>
                    <Col className="p-3">
                        <Button className="w-100" variant="dark">50 FUSD</Button>
                    </Col>
                    <Col className="p-3">
                        <Button className="w-100" variant="dark">100 FUSD</Button>
                    </Col>
                </Row>




            </Container>
            <Container style={{ backgroundColor: "#F6F6F6" }} fluid>
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
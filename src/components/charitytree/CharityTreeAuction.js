import { Col, Row, Image, Button } from "react-bootstrap"
import { AuctionBox } from "./AuctionBox";
import './charity-tree.css';
export function CharityTreeAuction() {

    return (
        <div>
            <Row >
                <div className=" pt-5 pb-3 w-100 text-center"><h1>Neo x Flowverse Community Charity Christmas Tree </h1></div>
            </Row>
            {/* This is the row for the Col containing NFTT image, Timer and the Col containing Description, auction buttons and gift options */}
            <Row className="p-5">
                <Col className="p-3 m-2 auction-box-background h-100" xs="12" md="6">
                    <Row>
                        {/* NFT IMAGE */}
                        <Image className="p-3" src="/assets/img/charitytree/Community Tree.webp"></Image>
                    </Row>
                    <Row>
                        {/* AUCTION TIMER */}
                        <div className="w-100 text-center charity-tree-timer">00:00:00</div>
                    </Row>
                </Col>

                <Col className="auction-box-background m-2 h-100">
                    <Row className="m-3 auction-box">
                        {/* DESCRIPTION */}
                        <div className="w-100 charity-tree-headers">What is the Neo x Flowverse Community Charity Christmas Tree?</div>
                        <div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec lacus at dui auctor bibendum. Donec eget urna mi. Ut vel sagittis dolor. Phasellus nec neque porttitor, tincidunt tortor vel, venenatis est. Aenean maximus, tortor pulvinar iaculis tempus, velit arcu malesuada lectus, ac ullamcorper odio lacus nec arcu. Nam ac posuere arcu, sit amet feugiat quam. Duis congue eleifend nisl, a bibendum dui ullamcorper ut. Aenean quam quam, porttitor at tristique vel, tristique vitae ex. Duis pretium mattis felis, a cursus nisi venenatis id. Duis nec vehicula lectus. Maecenas et nisl in ex tristique mollis.</p></div>
                    </Row>
    
                    <Row className="m-3 auction-box">
                        {/* AUCTION buttons */}
                        <div className="w-100 charity-tree-headers">Auction</div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec lacus at dui auctor bibendum. Donec eget urna mi. Ut vel sagittis dolor. Phasellus nec neque porttitor, tincidunt tortor vel, venenatis est. Aenean maximus, tortor pulvinar iaculis tempus, velit arcu malesuada lectus, ac ullamcorper odio lacus nec arcu. Nam ac posuere arcu, sit amet feugiat quam. Duis congue eleifend nisl, a bibendum dui ullamcorper ut. Aenean quam quam, porttitor at tristique vel, tristique vitae ex. Duis pretium mattis felis, a cursus nisi venenatis id. Duis nec vehicula lectus. Maecenas et nisl in ex tristique mollis.</p>
                    </Row>
    
                    <Row className="m-3 auction-box">
                    <div className="w-100 charity-tree-headers">Gift something</div>
                        {/* Gift Options */}
                        <Col className="p-3">
                        <Button className="gift-option-button w-100">10 FUSD</Button>
                        </Col>
                        <Col className="p-3">
                        <Button className="gift-option-button w-100">50 FUSD</Button>
                        </Col>
                        <Col className="p-3">
                        <Button className="gift-option-button w-100">100 FUSD</Button>
                        </Col>
                    </Row>

                    <Row className="m-3 auction-box">
                    <div className="w-100 charity-tree-headers">The wall of fame</div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec lacus at dui auctor bibendum. Donec eget urna mi. Ut vel sagittis dolor. Phasellus nec neque porttitor, tincidunt tortor vel, venenatis est. Aenean maximus, tortor pulvinar iaculis tempus, velit arcu malesuada lectus, ac ullamcorper odio lacus nec arcu. Nam ac posuere arcu, sit amet feugiat quam. Duis congue eleifend nisl, a bibendum dui ullamcorper ut. Aenean quam quam, porttitor at tristique vel, tristique vitae ex. Duis pretium mattis felis, a cursus nisi venenatis id. Duis nec vehicula lectus. Maecenas et nisl in ex tristique mollis.</p>
                    </Row>
                </Col>
            </Row>


           
        </div>
    )
}
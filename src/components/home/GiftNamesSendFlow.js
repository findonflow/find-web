import { Container, Row, Col, Image } from "react-bootstrap";

export function GiftNamesSendFlow() {
    return (
        <Container id="GiftNamesSendFlow">
            <Row>

                <Col className="my-auto px-5">
                    <div className="my-3"><h2>Gift names and send Flow or FUSD to others</h2></div>
                    <p>Show off all your flow NFT’s in one place, so your friends get envious. .Find allows you to display all of your NFT’s in your profile, so you have your collection connected to your .Find profile </p>
                </Col>
                <Col sm="12" lg="6" align="center">
                    <Image src="/assets/img/home/collections-example.webp" alt="Blockchain collection example" fluid />
                </Col>
            </Row>
        </Container>
    )
}
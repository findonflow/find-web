import { Container, Row, Col, Image } from "react-bootstrap";

export function GiftNamesSendFlow() {
    return (
        <Container id="GiftNamesSendFlow">
            <Row>

                <Col className="my-auto px-5">
                    <Image src="/assets/img/home/new_feature.png" />
                    <div className="my-3"><h2>Gift names and send Flow or FUSD to others</h2></div>
                    <p>You can now gift other profiles either a name you own, or FLOW and FUSD all within .find. Simply go to the gifting tab on your profile or gifting wdiget on someone elses. How about that for a christmas gift!</p>
                </Col>
                <Col sm="12" lg="6" xs={{ order: 'first' }} md={{ order: 'last'}} align="center">
                    <Image src="/assets/img/home/gifting-sending.webp" alt="FUSD FLOW Sending and Name Gifting" fluid />
                </Col>
            </Row>
        </Container>
    )
}
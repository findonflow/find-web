import { Container, Row, Col, Image } from "react-bootstrap";

export function PlaceToShowCollections() {
    return(
    <Container id="PlaceToShowCollections">
        <Row>
            <Col sm="12" lg="6">
            <Image src="/assets/img/home/collections-example.webp" fluid/>
            </Col>
            <Col className="my-auto px-5">
            <div className="titletxt fw-bold my-3">A Place to show off your collection</div>
            <p>Show off all your flow NFT’s in one place, so your friends get envious. .Find allows you to display all of your NFT’s in your profile, so you have your collection connected to your .Find profile </p>
            </Col>
        </Row>
    </Container>
    )
}
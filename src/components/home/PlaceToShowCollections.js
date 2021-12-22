import { Container, Row, Col, Image } from "react-bootstrap";

export function PlaceToShowCollections() {
    return(
    <Container id="PlaceToShowCollections">
        <Row>
            <Col sm="12" lg="6" align="center">
            <Image src="/assets/img/home/collections-example.webp" alt="Blockchain collection example" fluid/>
            </Col>
            <Col className="my-auto px-3 px-lg-5">
            <div className="my-3"><h2>A Place to show off your collection</h2></div>
            <p>Show off all your flow NFT’s in one place, so your friends get envious. .Find allows you to display all of your NFT’s in your profile, so you have your collection connected to your .Find profile </p>
            </Col>
        </Row>
    </Container>
    )
}
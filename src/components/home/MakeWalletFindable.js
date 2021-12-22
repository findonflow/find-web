import { Container, Row, Col, Image } from "react-bootstrap";

export function MakeWalletFindable() {
    return (
        <Container id="MakeWalletFindable">
            <Row>
                <Col className="my-auto px-3 px-lg-5">
                    <div className="my-3"><h2>Make your wallet findable for everyone</h2></div>
                    <p>Remembering an 18 digit hex code is hard, even Einstein would struggle. With .Find you can lease any name you want and attach it to your wallet, meaning its easier for you and friends to find across the flow blockchain </p>
                </Col>
                <Col sm="12" lg="6" xs={{ order: 'first' }} md={{ order: 'last'}} align="center">
                    <Image src="/assets/img/home/wallet-example.webp" alt="example of a real life wallet" fluid />
                </Col>
            </Row>
        </Container>
    )
}
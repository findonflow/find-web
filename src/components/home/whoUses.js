import { Col, Container, Image, Row } from "react-bootstrap";

export function WhoUses() {
    return(
        <Container className="my-lg-5 my-3 py-lg-5 ">
            <Row>
                <Col align="center">
                <h3 className="my-3">Who Uses .find?</h3>
                <Row className="d-flex justify-content-center my-4">
                    <Col xs='auto'><Image src="/assets/img/home/versus.webp" width="90px"/><div>Versus</div></Col>
                    <Col xs='auto'><Image src="/assets/img/home/flowscan.webp" width="90px" /><div>FlowScan</div></Col>
                    <Col xs='auto'><Image src="/assets/img/home/neo.png" width="88px" /><div>Neo</div></Col>
                </Row>
                </Col>
            </Row>
        </Container>
    )
}
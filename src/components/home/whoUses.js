import { Col, Container, Image, Row } from "react-bootstrap";

export function WhoUses() {
    return(
        <Container className="my-lg-5 my-3 py-lg-5 ">
            <Row>
                <Col align="center">
                <h3 className="my-3">Who Uses .find?</h3>
                <Row className="d-flex justify-content-center my-5">
                    <Col xs='auto' className="px-5"><Image src="/assets/img/home/versus.webp" alt="Versus flow auction site logo" width="64px"/><div className="pt-2">Versus</div></Col>
                    <Col xs='auto' className="px-4"><Image src="/assets/img/home/flovatar.webp" alt="Flovatars logo" width="64px" /><div className="pt-2">Flovatars</div></Col>
                    <Col xs='auto' className="px-5"><Image src="/assets/img/home/neo.webp" alt="Neo Collectibles logo" width="64px" /><div className="pt-2">Neo</div></Col>
                </Row>
                </Col>
            </Row>
        </Container>
    )
}
import { Col, Container, Image, Row } from "react-bootstrap";

export function BuiltOnFlow() {
    return(
        <Container>
            <Row>
                <Col xs="12" md="6" className="mt-3 mx-0 px-0 my-md-auto justify-content-center justify-content-md-end d-flex"><span><h3>Proudly built on</h3></span></Col> 
                <Col className="my-md-auto mx-0 px-0 justify-content-center justify-content-md-start d-flex"><Image src="/assets/img/home/onflow.webp" style={{maxHeight: "156px"}}/></Col>
            </Row>
        </Container>
    )
}
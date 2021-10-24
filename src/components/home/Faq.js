import { Container, Row, Col, Accordion } from "react-bootstrap";

export function Faq() {
    return (
        <Container id="faq">
            <Row>
                <Col>
                    <div className="my-5 seperator mx-auto"></div>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-5">
                <Col className="p-md-5" xs="12" md="5">
                    <h2>Frequently Asked Questions</h2>
                </Col>
                <Col>
                    <Row>
                        <Col xs="12" md="6">
                            <Accordion className="my-3">
                                <Accordion.Item eventKey="0" className="faqaccordion m-md-3 mb-3 p-3">
                                    <Accordion.Header><span className="titletxt fw-bold">What is find?</span></Accordion.Header>
                                    <Accordion.Body><p>In order to use FIND in your cadence code you have to use the following snippet of code</p></Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col xs="12" md="6">
                            <Accordion className="my-3">
                                <Accordion.Item eventKey="0" className="faqaccordion m-md-3 mb-3 p-3">
                                    <Accordion.Header><span className="titletxt fw-bold">Why do i need find?</span></Accordion.Header>
                                    <Accordion.Body><p>In order to use FIND in your cadence code you have to use the following snippet of code</p></Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
    )
}
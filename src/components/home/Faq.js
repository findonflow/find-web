import { Container, Row, Col, Accordion } from "react-bootstrap";

export function Faq() {
    return (
        <Container id="faq">
            <Row className="d-flex justify-content-center mb-5">
                <Col className="p-md-5" xs="12" md="5">
                    <h2>Frequently Asked Questions</h2>
                </Col>
                <Col>
                    <Row>
                        <Col xs="12" md="6">
                            <Accordion className="my-3">
                                <Accordion.Item eventKey="0" className="faqaccordion m-md-3 mb-3 p-3">
                                    <Accordion.Header><span className="titletxt fw-bold">What happens when I register a lease</span></Accordion.Header>
                                    <Accordion.Body><p>FIND isn't just a name, it's your profile on the blockchain. If you do not have a profile already it will create a new one for you that uses the name you just registered. This can be edited any time in the profile section.</p></Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col xs="12" md="6">
                            <Accordion className="my-3">
                                <Accordion.Item eventKey="0" className="faqaccordion m-md-3 mb-3 p-3">
                                    <Accordion.Header><span className="titletxt fw-bold">Sites that integrate with find</span></Accordion.Header>
                                    <Accordion.Body><p>Find will be integrated into the following sites at launch</p><ul><li>versus.auction</li><li>flovatars</li></ul><p>If you want to be on this list let me know</p></Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col xs="12" md="6">
                            <Accordion className="my-3">
                                <Accordion.Item eventKey="0" className="faqaccordion m-md-3 mb-3 p-3">
                                    <Accordion.Header><span className="titletxt fw-bold">What characters can be in a name</span></Accordion.Header>
                                    <Accordion.Body><p>A valid find name is 0-9 a-z -, minimum 3 characters. Also it cannot be a Flow address, so no 0xAddresses</p><p>This is to ensure that it can be used in urls and to keep things simple.</p></Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                        <Col xs="12" md="6">
                            <Accordion className="my-3">
                                <Accordion.Item eventKey="0" className="faqaccordion m-md-3 mb-3 p-3">
                                    <Accordion.Header><span className="titletxt fw-bold">How much does it cost</span></Accordion.Header>
                                    <Accordion.Body><p>Find is charged in the FUSD stable coin for a 365 day lease. This is done to keep prices stable and avoid a high increase if the flow token increases.</p>
                                        <p>Currently the price structure is as follows:</p>
                                        <ul>
                                            <li>5+ characters: 5 FUSD</li>
                                            <li>4 characters: 100 FUSD</li>
                                            <li>3 characters: 500 FUSD</li>
                                        </ul>

                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
    )
}

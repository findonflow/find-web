import { Container, Row, Col, Accordion } from "react-bootstrap";


export function CadenceInfo() {
  return (
    <Container id="cadenceHint" className="cadencehint">
      <Row className="d-flex justify-content-center mt-md-5 mt-3">
        <Col className="p-md-5" xs="12" md="5">
          <h2>Want to have .find on your site?</h2>
          <p className="mt-4 fw-bold" style={{ color: '#5C5C5C' }}>.Find can be integrated into any site with some very easy code, making it easy for anyone to look up a name.</p>
        </Col>
        <Col>
          <Accordion className="my-3 implementaccordion">
            <Accordion.Item eventKey="0" className="implementaccordion m-md-3 mb-3 p-3">
              <Accordion.Header><span className="titletxt">Add Find to your cadence code</span></Accordion.Header>
              <Accordion.Body><p>In order to use FIND in your cadence code you have to use the following snippet of code</p></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="implementaccordion m-md-3 mb-3 p-3">
              <Accordion.Header><span className="titletxt">Add Find to your cadence code</span></Accordion.Header>
              <Accordion.Body><p>In order to use FIND in your cadence code you have to use the following snippet of code</p></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="implementaccordion m-md-3 mb-3 p-3">
              <Accordion.Header><span className="titletxt">Add Find to your cadence code</span></Accordion.Header>
              <Accordion.Body><p>In order to use FIND in your cadence code you have to use the following snippet of code</p></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}
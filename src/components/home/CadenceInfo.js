import { Container, Row, Col, Accordion, Button } from "react-bootstrap";
import { animateScroll as scroll } from "react-scroll"


export function CadenceInfo() {
  return (
    <Container id="cadenceHint" className="cadencehint pt-lg-3">
      <Row className="mb-lg-5  py-3 my-3">
        <Col align="center"><Button onClick={() => scroll.scrollTo("searchSection")} variant="dark">Find a name</Button></Col>
      </Row>
      <div className="mb-lg-5 mb-4 seperator50 mx-auto"></div>
      <Row className="my-3">
        <Col align="center"><h3>Want to implement .find into your project?</h3></Col>
      </Row>
      <Row>
        <Col align="center"><p>You can implement .find into your project. <br />Resolve names into addresses and integrate a pre built profile</p> </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-md-5 mt-3">
        <Col className="p-md-5" xs="12" md="5">
          <h2>Want to have .find on your site?</h2>
          <p className="mt-4 fw-bold" style={{ color: '#5C5C5C' }}>.Find can be integrated into any site with some very easy code, making it easy for anyone to look up a name.</p>
        </Col>
        <Col>
          <Accordion className="my-3 implementaccordion">
            <Accordion.Item eventKey="0" className="implementaccordion m-md-3 mb-3 p-3">
              <Accordion.Header><span className="titletxt">Use .find in your cadence code</span></Accordion.Header>
              <Accordion.Body>
                <p>In order to use FIND in your cadence code you have to use the following snippet of code</p>
                <p>//testnet</p>
                <p>import FIND from 0x37a05b1ecacc80f7</p>
                <p>//mainnet</p>
                <p>//import FIND from 0x097bafa4e0b48eef</p>
                <p>pub fun main(name: String) :  Address? &#123;</p>
                <p>return FIND.lookupAddress(name) &#125;</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="implementaccordion m-md-3 mb-3 p-3">
              <Accordion.Header><span className="titletxt">Directly get a user's profile</span></Accordion.Header>
              <Accordion.Body><p>//testnet</p>
                <p>import FIND, Profile from 0x37a05b1ecacc80f7</p>
                <p>//mainnet</p>
                <p>//import FIND, Profile from 0x097bafa4e0b48eef</p>
                <p>[pub](pub) fun main(name: String) :  Profile.UserProfile? &#123;</p>
                <p>   return FIND.lookup(name)?.asProfile()&#125;</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2" className="implementaccordion m-md-3 mb-3 p-3">
              <Accordion.Header><span className="titletxt">Contract addresses for .find</span></Accordion.Header>
              <Accordion.Body>
                <p>Testnet: 0x37a05b1ecacc80f7</p>
                <p>Mainnet: 0x097bafa4e0b48eef</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      <div className="my-lg-5 my-4 seperator50 mx-auto"></div>
    </Container >
  )
}
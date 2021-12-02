import { Row, Col, Card } from "react-bootstrap";


export function InfoCards() {
  return (
    <Row className="d-flex justify-content-center">
      <Col className="mt-4" xs="12" md="4">
        <Card>
          <Row>
            <Col align="center">
              <i className="fa-solid fa-wallet p-3 pt-5 display-2"></i>
            </Col>
          </Row>
          <Row>
            <Col align="center">
              <div className="p-4 px-5 titletxt fw-bold mx-3">A name for your blocto wallet</div>
            </Col>
          </Row>
          <Row>
            <Col align="center">
              <p className="p-3 px-5">Find allows you to lease a name on the blockchain which you can give to your friends instead of a hard to remember 18 digit hex string</p>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col className="mt-4" xs="12" md="4">
        <Card>
          <Row>
            <Col align="center">
              <i className="fa-solid fa-user-ninja p-3 pt-5 display-2"></i>
            </Col>
          </Row>
          <Row>
            <Col align="center">
              <div className="p-4 px-5 titletxt fw-bold mx-3">A profile that can be used anywhere</div>
            </Col>
          </Row>
          <Row>
            <Col align="center">
              <p className="p-3 px-5">Find uses a unique profile to show information about you as a user. You can add an avatar, a nick and a description as well as social links</p>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col className="mt-4" xs="12" md="4">
        <Card>
          <Row>
            <Col align="center">
              <i className="fa-solid fa-sitemap p-3 pt-5 display-2"></i>
            </Col>
          </Row>
          <Row>
            <Col align="center">
              <div className="p-4 px-5 titletxt fw-bold mx-3">A place to show your collections</div>
            </Col>
          </Row>
          <Row>
            <Col align="center">
              <p className="p-3 px-5">Bring all your collections into your profile and show them off to everyone with a single link!</p>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
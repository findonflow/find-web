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
              <div className="p-4 px-5 titletxt fw-bold mx-3">A name for your wallet</div>
            </Col>
          </Row>
          <Row>
            <Col align="center">
              <p className="p-3 px-5">Slate helps you see how many more days you need to work to reach your financial goal or the month and year.</p>
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
              <p className="p-3 px-5">Slate helps you see how many more days you need to work to reach your financial goal or the month and year.</p>
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
              <p className="p-3 px-5">Slate helps you see how many more days you need to work to reach your financial goal or the month and year.</p>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}
import { Container, Row, Col, Spinner } from "react-bootstrap";

function LoadingBC() {
  return (
    <Container id="loadingBlockchain" className="loadingblockchain">
      <Row className="mt-5 p-2">
        <Col className="d-flex justify-content-center text-center" xs="12">
          <h1>Loading data from the blockchain...</h1>
        </Col>
        <Col className="mt-3 d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    </Container>
  )
}
export default LoadingBC
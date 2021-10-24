import { Col, Row, Button } from "react-bootstrap";
import { handleWithdrawSale } from "../../functions/txfunctions";

export function DelistName({ lease }) {
    return (
        <Row>
            <Col className="d-flex align-items-center" xs="12" md="auto"><p style={{ marginBottom: "10px", color: "rgb(92, 92, 92)", fontWeight: "500" }}>Listed for: {parseFloat(lease.salePrice)} FUSD</p></Col>
            <Col align="right"><Button onClick={() => handleWithdrawSale(lease.name)} style={{ width: "200px" }} variant="outline-dark">Delist</Button></Col>
        </Row>
    )
}
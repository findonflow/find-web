import { Row, Col, Card, Button } from "react-bootstrap";

export function ProfileForge() {
    return (
        <Row>
            <Col>
                <Card className="cardprofileother my-3 mx-lg-5 p-lg-5">
                    <div align="center" className="mt-5"><span className="fw-bold m-3 me-4 align-middle" style={{ fontSize: "26px" }}>50 FUSD</span><Button variant="dark">Build The Forge</Button></div>
                    <div className='p-3 p-lg-5 m-3 mx-lg-5 text-center titletxt fw-bold'>The forge is your gateway to minting. With it you can mint into your own collection and sell your own NFT's using the Find marketplace or any other supported marketplace</div>
                </Card>
            </Col>
        </Row>
    )
}
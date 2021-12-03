import { Col, Container, Image, Row } from "react-bootstrap";

function Footer() {
    return (
        <Container id="footer" className="footer">
            <Container fluid={false}>
            <Row className="p-3">
                <Col xs="12" sm="auto">
                    <Image src="/find-alt.png" className="" style={{maxHeight: "36px"}}/>
                </Col>
                <Col xs="auto" className="my-auto footersocials">
                    <a href="https://twitter.com/findonflow" target="_blank" style={{color: "#3C3D41"}}><i className="fab fa-twitter m-1"></i></a>
                    <a href=""><i className="fab fa-instagram m-1" style={{color: "#3C3D41"}}></i></a>
                    <a href="https://discord.gg/tCSFSpFcRv" target="_blank" style={{color: "#3C3D41"}}><i className="fab fa-discord m-1"></i></a>
                    <a href=""><i className="fab fa-youtube m-1" style={{color: "#3C3D41"}}></i></a>
                </Col>
                <Col className="m-auto text-md-end copyright">
                    @copyright find.xyz 2021
                </Col>
            </Row>
            </Container>
        </Container>
    )
}
export default Footer;
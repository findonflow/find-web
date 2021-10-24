import { Col, Container, Image, Row } from "react-bootstrap";

function Footer() {
    return (
        <Container id="footer" className="footer">
            <Row>
                <Col xs="12" sm="auto">
                    <Image src="/find.png" className="footerlogo" />
                </Col>
                <Col xs="auto" className="my-auto footersocials">
                    <i className="fab fa-twitter m-1"></i>
                    <i className="fab fa-instagram m-1"></i>
                    <i className="fab fa-discord m-1"></i>
                    <i className="fab fa-youtube m-1"></i>
                </Col>
                <Col className="m-auto text-md-end copyright">
                    @copyright find.xyz 2021
                </Col>
            </Row>
        </Container>
    )
}
export default Footer;
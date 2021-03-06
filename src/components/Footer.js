import { Col, Container, Image, Row } from "react-bootstrap";

function Footer() {
    return (
        <Container id="footer" className="footer">
            <Container>
            <Row className="p-3">
                <Col xs="12" sm="auto" className="p-3 p-lg-0">
                    <Image src="/find-alt.png"  style={{maxHeight: "30px"}}/>
                </Col>
                <Col xs="auto" className="my-auto footersocials">
                    <a href="https://twitter.com/findonflow" target="_blank" style={{color: "#3C3D41"}} rel="noreferrer" alt="Twitter"><i className="fab fa-twitter m-1"></i></a>
                    <a href="http://instagram.com"><i className="fab fa-instagram m-1" style={{color: "#3C3D41"}} rel="noreferrer" alt="Instagram"></i></a>
                    <a href="https://discord.gg/tCSFSpFcRv" target="_blank" style={{color: "#3C3D41"}} rel="noreferrer" alt="Discord"><i className="fab fa-discord m-1"></i></a>
                    <a href="http://youtube.com"><i className="fab fa-youtube m-1" style={{color: "#3C3D41"}} rel="noreferrer" alt="YouTube"></i></a>
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
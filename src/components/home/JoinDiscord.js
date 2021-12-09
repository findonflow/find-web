import { Button, Col, Container, Row } from "react-bootstrap";

export function JoinDiscord() {
    return (
        <Container fluid="true" className="g-0 discordBG">
            <Container>
                <Row style={{height: "200px"}}>
                    <Col className="my-auto px-5">
                    <div className="discordTitle" >Join the Discord</div>
                    </Col>
                    <Col className="my-auto px-5" align="right"><a href="https://discord.gg/tCSFSpFcRv" target="_blank" rel="noreferrer"><Button variant="dark">Join the community</Button></a></Col>
                </Row>
                
            </Container>
        </Container>
    )
}
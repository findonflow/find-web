import { Container, Row, Col } from "react-bootstrap";
import { handleProfile } from "../../functions/txfunctions";
import EasyEdit from 'react-easy-edit';

export function NoProfile() {
    return (
        <Container className="frontCards p-4 mt-5">
            <Row className="mt-5 p-2">
                <Col className="d-flex justify-content-center text-center titletxt fw-bold">You've connected your wallet but don't have a profile yet.</Col>
            </Row>
            <Row className="m-1 p-2">
                <Col className="d-flex justify-content-center text-center">No problem, just click below to create your profile.</Col>
            </Row>
            <Row>
                <Col className="m-5 d-flex justify-content-center"><EasyEdit type="text" placeholder="Enter your name" instructions="Enter your name and click create profile" onSave={handleProfile} saveButtonLabel="Create Profile" /></Col>
            </Row>
        </Container>
    )
}
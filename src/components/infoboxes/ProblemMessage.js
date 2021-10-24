import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AuthCluster } from "../../auth-cluster";
import * as fcl from "@onflow/fcl";

export function ProblemMessage({ problemVar }) {
    const [user, setUser] = useState({ loggedIn: null })
    useEffect(() => fcl.currentUser().subscribe(setUser), [])

    let errorLoggedOut =
        <div>
            <Row className="mt-5 p-2">
                <Col className="d-flex justify-content-center text-center titletxt fw-bold">Uh oh, it seems you are not logged in.</Col>
            </Row>
            <Row className="m-1 p-2">
                <Col className="d-flex justify-content-center text-center">No problem, just click below to connect your wallet.</Col>
            </Row>
            <Row>
                <Col className="m-5 d-flex justify-content-center"><AuthCluster user={user} /></Col>
            </Row>
        </div>

    const project = () => {
        switch (problemVar) {

            case "loggedout": return errorLoggedOut;
            case "two": return "hello";
            case "three": return "hello";
            case "four": return "hello";

            default: return <h1 align="center">There has been an unspecified error. Sorry for any inconvenience.</h1>
        }
    }

    return (
        <Container id="problemMessage" className="frontCards p-4 mt-5">
            {project()}
        </Container>
    )
}

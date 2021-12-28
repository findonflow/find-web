import { Col, Row} from "react-bootstrap"
export function TimerComponent() {

    return (
        <div>
            <Row>
                {/* days */}
                <Col xs="2" md="1">
                <p className="text-center timer-units m-0">
                    2
                </p>
                <p className="text-center timer-metrics">
                    days
                </p>
                </Col>

                <Col xs="1" md="1">
                <p className="text-center timer-units">
                    :
                </p>
                </Col>

                {/* hours */}
                <Col xs="2" md="1">

                <p className="text-center timer-units m-0">
                    10
                </p>
                <p className="text-center timer-metrics">
                hours
                </p>
                </Col>

                <Col xs="1" md="1">
                <p className="text-center timer-units">
                    :
                </p>
                </Col>

                {/* minutes */}
                <Col xs="2" md="1">
                <p className="text-center timer-units m-0">
                    40
                </p>
                <p className="text-center timer-metrics">
                minutes
                </p>
                </Col>

                <Col xs="1"md="1">
                <p className="text-center timer-units">
                    :
                </p>
                </Col>

                {/* seconds */}
                <Col xs="2" md="1">
                <p className="text-center timer-units m-0">
                    12
                </p>
                <p className="text-center timer-metrics">
                seconds
                </p>
                </Col>
            </Row>
        </div>
    )
}
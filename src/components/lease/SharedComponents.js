import { useEffect, useState } from 'react';
import { Image, Button, Row, Col } from 'react-bootstrap';
import { epochToJsDate, epochToJsTime } from "../../functions/epochtodate";
import * as fcl from "@onflow/fcl";
import { handleActivate, handleExtend } from '../../functions/txfunctions';

export function DurationLegend({ lease }) {
    const formValues = [{
        id: "cost",
        value: lease.cost
    },
    {
        id: "name",
        value: lease.name
    }]

    const [user, setUser] = useState({ loggedIn: null })
    useEffect(() => fcl.currentUser().subscribe(setUser), [])

    let durationLegend = ""

    if (user.addr !== lease.address) {
        durationLegend = <div className="nameAvailable p-3"><Image src="/assets/img/Tick_circle.png" height={"24px"} className="me-2" />{lease.name} is taken and valid until: <span style={{ color: "green" }}>{epochToJsDate(lease.validUntil) + " at " + epochToJsTime(lease.validUntil)}</span></div>
        if (lease.validUntil < Math.floor((new Date()).getTime() / 1000) && !lease.status === "") {
            durationLegend = <div className="nameLocked p-3"><Image src="/assets/img/Cross_circle.png" height={"24px"} className="me-2" />{lease.name} is taken and locked until: <span style={{ color: "red" }}>{epochToJsDate(lease.lockedUntil) + " at " + epochToJsTime(lease.lockedUntil)}</span></div>
        }
    }
    else{
        durationLegend = <Row>
            <Col xs="12" md="auto" className="d-flex align-items-center">
                <div style={{ marginBottom: "10px", color: "#5C5C5C", fontWeight: "500" }}>Valid until: <span style={{ color: "green" }}>{epochToJsDate(lease.validUntil) + " at " + epochToJsTime(lease.validUntil)}</span></div>
            </Col>
            <Col align="right">
                <Button text="extend" style={{ width: '200px' }} variant="outline-dark" onClick={() => handleExtend(formValues)}>Extend</Button>
            </Col>
        </Row>
        if (lease.validUntil < lease.currentTime && lease.lockedUntil > lease.currentTime) {
            durationLegend = <Row>
                <Col Col xs="12" md="auto" className="d-flex align-items-center">
                    <div style={{ marginBottom: "10px", color: "#5C5C5C", fontWeight: "500" }}>Locked until: <span style={{ color: "red" }}>{epochToJsDate(lease.lockedUntil) + " at " + epochToJsTime(lease.lockedUntil)}</span></div>
                </Col>
                <Col align="right">
                    <Button text="renew" style={{ width: '200px' }} variant="outline-dark" onClick={() => handleActivate(formValues)}>Activate</Button>
                </Col>
            </Row>

        }
    }
    return (
        <div>{durationLegend}
            {/* {JSON.stringify(lease, null, 2)} */}
        </div>
    )
}


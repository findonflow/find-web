import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Container, Tabs, Tab } from "react-bootstrap";
import '../components/livefeed/livefeed.css'
import ReactGA from 'react-ga'
import MarketplaceAuctions from "./MarketplaceAuctions";
import MarketplaceSales from "./MarketplaceSales";


export default function SalesAuction() {
    document.title = ".find - name resale spot"
    ReactGA.pageview(window.location.pathname);
    const [key, setKey] = useState("sales")
    const location = useLocation()

    let navigate = useNavigate();
    let params = useParams();
    let currentPage = location.pathname.split(/^.*\//)
    useEffect(() => {
        if (currentPage[1] === "sales") {
            setKey("sales")
        }
        if (currentPage[1] === "auctions") {
            setKey("auction")
        }

        //eslint-disable-next-line
    }, [params])

    function handleTabs(k) {
        setKey(k)
        if (k === "sales") {
            navigate("/mp/sales")
        }
        if (k === "auction") {
            navigate("/mp/auctions")
        }
    }


    return (
        <Container className="my-5">
            <h1 align="center" className="py-3">What’s for sale? 💰</h1>
            <p align="center" className="pb-3">Check out the latest names for sale below</p>
            <Container id="profileCard" fluid className="frontCards" style={{ minHeight: "90vh" }}>
                <Tabs defaultActiveKey='profile' activeKey={key} id='profile-collection-tabs' onSelect={(k) => handleTabs(k)}>
                    <Tab eventKey='sales' title='For Sale'>
                        <MarketplaceSales />
                    </Tab>
                    <Tab eventKey='auction' title='Auction'>
                        <MarketplaceAuctions />
                    </Tab>
                </Tabs></Container>
        </Container>
    )

}
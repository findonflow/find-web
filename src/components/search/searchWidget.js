import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import Hits from "react-instantsearch-dom/dist/cjs/widgets/Hits";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

export function SeatchWidget() {

    const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
        server: {
            apiKey: "hSg5hMJpDDEBvPsA4m219upMrbsOiMmG", // Be sure to use an API key that only allows search operations
            nodes: [
                {
                    host: "og5mqcjxi2e4w3ryp-1.a1.typesense.net",
                    port: "443",
                    protocol: "https",
                },
            ],
        },
        cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
        // The following parameters are directly passed to Typesense's search API endpoint.
        //  So you can pass any parameters supported by the search endpoint below.
        //  queryBy is required.
        additionalSearchParameters: {
            queryBy: "name,status",
        },
    });
    const searchClient = typesenseInstantsearchAdapter.searchClient;

    return (
        <Container>
            <Row className="mt-4">
                <Col>
                    <InstantSearch indexName="names" searchClient={searchClient}>
                        <SearchBox />
                        <Hits />
                    </InstantSearch>
                </Col>
            </Row>
        </Container>
    )
}
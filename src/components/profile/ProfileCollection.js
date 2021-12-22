import { useEffect, useState } from "react"
import { Row, Col, Card, Image, Button } from "react-bootstrap"
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { scripts } from 'find-flow-contracts'
import { useFormStatus, useStateChanged } from "../../functions/DisabledState";
import { handleSetPfp } from "../../functions/txfunctions";

export function ProfileCollection({ profileData }) {

	const [user, setUser] = useState({ loggedIn: null })
	useEffect(() => fcl.currentUser().subscribe(setUser), [])
	const [findList, setFindList] = useState("first_init");

	useEffect(() => {
		async function getFindUser(addr) {
			const response = await fcl.send([
				fcl.script(scripts.collections),
				fcl.args([fcl.arg(addr, t.Address)]),
			]);

			const findList = await fcl.decode(response)
			setFindList(findList)
		}
		try {
			getFindUser(profileData.profile.address)
		}
		catch (error) {
			console.log(error)
		}
		// eslint-disable-next-line
	}, [user, useStateChanged()]);

	const [filterList, setFilterList] = useState(["All"])
	const [filterRun, setFilterRun] = useState()

	useEffect(() => {
		if (findList && findList !== "first_init" && findList !== "" && !filterRun) {
			Object.keys(findList).map((collection) => {
				if (collection) {
					setFilterList(newcollection => [...newcollection, collection])
					console.log(collection)
				}
			}
			)
			setFilterRun("true")
		}
	}, [findList])

	const [filterValue, setFilterValue] = useState("All")

	function handleFilter(filters) {
		setFilterValue(filters)
	}

	return (
		<div>
			{/* {JSON.stringify(findList,null,2)} */}
			<Row className="justify-content-center d-flex">

				{filterList.length > 0 &&
					filterList.map((filters) =>
						<Col className="mb-3" xs="auto">
							<Button variant="dark" onClick={() => handleFilter(filters)}>{filters}</Button>
						</Col>
					)
				}

			</Row>
			<fieldset id="a" disabled={useFormStatus()}>
				<Row className=" my-3 d-flex align-items-start" xs={1} lg={3} md={2} id="Collection">
				{
						findList && findList !== "first_init" && findList !== "" && filterValue === "All" &&
						filterList.map((collection) =>
							findList[collection]?.items.map((nftData, i) => {
								let url
								let imgUrl
								if (nftData.image.includes("ipfs://")) {
									// console.log("It does include!")
									imgUrl = nftData.image.replace("ipfs://", "https://ipfs.io/ipfs/")
								} else {
									imgUrl = nftData.image
								}
								if (collection === "Gaia") {
									if (nftData.url.includes("/collection/")) {
										url = nftData.url.replace("/collection/", "/")
									}
								} else {
									url = nftData.url
								}
								return (
									<Col key={i} className="mb-5">

										{/* {JSON.stringify(collection, null, 2)} */}

										<Card className="shadow collectionCard" style={{ maxWidth: "400px" }}>

											{user.addr === profileData.profile.address &&

												<button className="setpfp shadow idd" onClick={() => handleSetPfp(imgUrl)}>Set as PFP</button>}
											<a href={url} target="_blank" rel="noreferrer">
												<Card.Img src={imgUrl} className="collection-img p-3" alt={"Picture of " + nftData.name} fluid />
												<Card.Body>
													<Card.Title className="fw-bold">{nftData.name}</Card.Title>
												</Card.Body>
											</a>
										</Card>
									</Col>)
							}))
					}
					{
						findList && findList !== "first_init" && findList !== "" && filterValue !== "All" &&
							findList[filterValue]?.items.map((nftData, i) => {
								let url
								let imgUrl
								if (nftData.image.includes("ipfs://")) {
									// console.log("It does include!")
									imgUrl = nftData.image.replace("ipfs://", "https://ipfs.io/ipfs/")
								} else {
									imgUrl = nftData.image
								}
								if (filterValue === "Gaia") {
									if (nftData.url.includes("/collection/")) {
										url = nftData.url.replace("/collection/", "/")
									}
								} else {
									url = nftData.url
								}
								return (
									<Col key={i} className="mb-5">

										{/* {JSON.stringify(collection, null, 2)} */}

										<Card className="shadow collectionCard" style={{ maxWidth: "400px" }}>

											{user.addr === profileData.profile.address &&

												<button className="setpfp shadow idd" onClick={() => handleSetPfp(imgUrl)}>Set as PFP</button>}
											<a href={url} target="_blank" rel="noreferrer">
												<Card.Img src={imgUrl} className="collection-img p-3" alt={"Picture of " + nftData.name} fluid />
												<Card.Body>
													<Card.Title className="fw-bold">{nftData.name}</Card.Title>
												</Card.Body>
											</a>
										</Card>
									</Col>)
							})
					}
				</Row></fieldset>
			{JSON.stringify(findList, null, 2)}
			{!findList &&
				<Row>
					{profileData.profile.address === user.addr ?
						<Col sm="12" align="center">
							<div className="titletxt fw-bold pb-3">Uh oh, either your collection is empty or we do not yet support your NFT's</div>
							<p>No worries, supported NFT's will appear here soon!</p>
						</Col>
						:
						<Col sm="12" align="center">
							<div className="titletxt fw-bold pb-3">Uh oh, seems this collection is empty or we do not yet support the NFT's</div>
							<p>No worries, supported NFT's will appear here soon!</p>
						</Col>}
				</Row>
			}
		</div>
	)
}
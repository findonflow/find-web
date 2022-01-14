import { useEffect, useState } from "react"
import { Row, Col, Card, Button, Modal, Container, Form, Image } from "react-bootstrap"
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { scripts } from 'find-flow-contracts'
import { useFormStatus, useStateChanged } from "../../functions/DisabledState";
import { CreateNewAlbum, handleSetPfp, RemoveAlbum } from "../../functions/txfunctions";
import { useNavigate, useParams } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";

export function ProfileCollection({ profileData }) {

	const [user, setUser] = useState({ loggedIn: null })
	useEffect(() => fcl.currentUser().subscribe(setUser), [])
	const [findList, setFindList] = useState("first_init");
	const [FILTER_NAMES, setFILTER_NAMES] = useState([])
	const [FILTER_NAMESCURATED, setFILTER_NAMESCURATED] = useState([])
	const [filterValue, setFilterValue] = useState("All")
	const [collectionType, setCollectionType] = useState("collections")
	const [collection, setCollection] = useState()
	const [filterCollection, setFilterCollection] = useState()
	const [arrayNextPosition, setArrayNextPosition] = useState(20)
	const [hasMore, setHasMore] = useState(true)
	const loadLength = 20

	function LoadMoreCollection() {
		//get the current position and add the load length to it.
		setArrayNextPosition(Number(arrayNextPosition) + Number(loadLength))
		if (Number(arrayNextPosition) + Number(loadLength) > Object.keys(findList.items).length) {
			setCollection(Object.keys(findList.items))
			setHasMore(false)
		} else {
			setCollection(Object.keys(findList.items).slice(0, Number(arrayNextPosition) + Number(loadLength)))
		}

	}
	function LoadMoreFilteredCollection() {
		//get the current position and add the load length to it.
		setArrayNextPosition(Number(arrayNextPosition) + Number(loadLength))
		if (Number(arrayNextPosition) + Number(loadLength) >= findList[collectionType][filterValue].length) {
			setFilterCollection(findList[collectionType][filterValue])
			setHasMore(false)
			console.log("End of array hit")
		} else {
			setFilterCollection(findList[collectionType][filterValue].slice(0, Number(arrayNextPosition) + Number(loadLength)))
			setHasMore(true)
		}

	}
	let navigate = useNavigate();
	let params = useParams();

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

	useEffect(() => {
		if (findList) {
			if (findList.collections) {
				if (Object.keys(findList.collections).length > 0) {
					setFILTER_NAMES(Object.keys(findList.collections))
				}
			}
			if (findList.curatedCollections) {
				if (Object.keys(findList.curatedCollections).length > 0) {
					setFILTER_NAMESCURATED(Object.keys(findList.curatedCollections))
				} else {
					setFILTER_NAMESCURATED(null)
				}
			} else {
				setFILTER_NAMESCURATED(null)
			}
			if (findList.items) {
				setCollection(Object.keys(findList.items).slice(0, loadLength))
				if (Object.keys(findList.items).length < loadLength) {
					setHasMore(false)
				}
			}
		}
	}, [findList])

	useEffect(() => {
		if (params.col) {
			if (FILTER_NAMES) {
				if (FILTER_NAMES.length > 0) {
					FILTER_NAMES.forEach(filter => {
						if (params.col.toLowerCase() === filter.toLowerCase()) {
							setCollectionType("collections")
							setFilterValue(filter)
							if (findList["collections"][filter].length <= loadLength) {
								setHasMore(false)
								setFilterCollection(findList["collections"][filter])
							}else{
							setFilterCollection(findList["collections"][filter].slice(0, loadLength))
							setArrayNextPosition(20)
							setHasMore(true)
							}


						} else if (params.col.toLocaleLowerCase() === "all") {
							setCollectionType("collections")
							setFilterValue("All")
							if (findList["collections"][filter].length <= loadLength) {
								setHasMore(false)
								setFilterCollection(findList["collections"][filter])
							}else{
							setFilterCollection(findList["collections"][filter].slice(0, loadLength))
							setArrayNextPosition(20)
							setHasMore(true)
							}
						}
					})
				}
			}
			if (FILTER_NAMESCURATED) {
				if (FILTER_NAMESCURATED.length > 0) {
					FILTER_NAMESCURATED.forEach(filter => {
						if (params.col.toLowerCase() === filter.toLowerCase()) {
							setCollectionType("curatedCollections")
							setFilterValue(filter)
							if (findList["curatedCollections"][filter].length <= loadLength) {
								setHasMore(false)
								setFilterCollection(findList["curatedCollections"][filter])
							}else{
							setFilterCollection(findList["curatedCollections"][filter].slice(0, loadLength))
							setArrayNextPosition(20)
							setHasMore(true)
							}

						}
					})
				}
			}
		}
		if (!params.col) {
			setFilterValue("All")
		}
	}, [FILTER_NAMES, FILTER_NAMESCURATED, params])

	function handleFilter(filters) {
		//setCollectionType("collections")
		if (params.id) {
			navigate("/" + params.id + "/collection/" + filters)
		} else {
			navigate("/me/collection/" + filters)
		}

	}
	function handleFilterCurated(filters) {
		//setCollectionType("curatedCollections")
		if (params.id) {
			navigate("/" + params.id + "/collection/" + filters)
		} else {
			navigate("/me/collection/" + filters)
		}
	}

	function CreateAlbum() {
		const [show, setShow] = useState(false);
		const [albumArray, setAlbumArray] = useState([])
		const [albumName, setAlbumName] = useState()
		const handleClose = () => {

			setAlbumArray([]);
			setAlbumName("")
			setShow(false);
		}
		const handleShow = () => {

			setAlbumArray([]);
			setAlbumName("")
			setShow(true);
		}


		function handleSelectNft(e) {

			let docid = document.getElementById("card" + e.target.id)
			if (e.target.checked) {
				docid.classList.add("create-album-card-selected")
				setAlbumArray(albumArray => [...albumArray, e.target.value])
			} else {
				docid.classList.remove("create-album-card-selected")
				const newAlbum = albumArray.filter((nft) => nft !== e.target.value)
				setAlbumArray(newAlbum)
			}

		}

		async function handleSubmitAlbum() {
			let collectionCheck = ""
			let albumCheck = ""
			if (FILTER_NAMES) {
				collectionCheck = FILTER_NAMES.filter(filter => filter.toLowerCase() === albumName.toLowerCase())
			}
			if (FILTER_NAMESCURATED) {
				albumCheck = FILTER_NAMESCURATED.filter(filter => filter.toLowerCase() === albumName.toLowerCase())
			}

			if (collectionCheck.length > 0 || albumCheck.length > 0) {
				document.getElementById("inputName").classList.add("is-invalid")
				document.getElementById("inputName").classList.remove("is-valid")
				return
			}
			if (albumName && albumArray.length > 0) {
				document.getElementById("inputName").classList.add("is-valid")
				document.getElementById("inputName").classList.remove("is-invalid")
				CreateNewAlbum(albumName, albumArray)
				//handleClose()
			}
		}
		//console.log(albumArray)


		return (
			<>
				<button className="btn-create-album" onClick={handleShow}>
					Create an album
				</button>

				<Modal show={show} onHide={handleClose} size="xl" scrollable>

					<Modal.Header closeButton>
						<div className="name" align="center">Create an album</div>
					</Modal.Header>
					<Modal.Body>
						<fieldset id="a" disabled={useFormStatus()}>
							<Container>
								<Form onSubmit={e => { e.preventDefault(); }}>
									<Row className="d-flex justify-content-center">
										<Col className="name mb-3" xs="12" align="center"></Col>
										<Col align="center"><p>You can choose any NFT's from your collection to create an album to display in your profile</p><p>Type a name and click each nft you want in the album, they will appear in the order you select them.</p></Col>
									</Row>
									<Row className="d-flex justify-content-center mt-3">
										<Col className="formInputs" xs="12" md="6">
											<Form.Control placeholder="Name of album" value={albumName} id="inputName" name="albumName" maxLength="32" onChange={(e) => {
												let enteredName = e.target.value.toLowerCase()
												enteredName = enteredName.replace(/[^a-z0-9-]/g, '')
												setAlbumName(enteredName)
												if (enteredName === "") {
													e.target.classList.add("is-invalid")
													e.target.classList.remove("is-valid")
												} else {
													e.target.classList.add("is-valid")
													e.target.classList.remove("is-invalid")
												}
											}} />
										</Col>
									</Row>
									<Row className="mt-5 d-flex justify-content-center justify-content-lg-start">

										{
											findList && findList !== "first_init" && findList !== "" &&
											Object.keys(findList.items).map((object, i) => {
												let nftData = findList.items[object]
												let imgUrl
												if (nftData.image.includes("ipfs://")) {
													// console.log("It does include!")
													imgUrl = nftData.image.replace("ipfs://", "https://find.mypinata.cloud/ipfs/")
												} else {
													imgUrl = nftData.image
												}
												return (<Col key={i} className="mb-3" xs="auto">
													<Form.Check type="checkbox" id={object}>
														<Form.Check.Label>
															<Card id={"card" + object} className="create-album-card p-3">
																{nftData.contentType === "video" ?
																	<video className="" alt={"Picture of " + nftData.name} loop="" playsInline="">
																		<source src={imgUrl + "#t=0.1"} type="video/mp4"></source>
																		Sorry this video is not supported by your browser
																	</video>
																	:
																	<Image src={imgUrl} alt={"Picture of " + nftData.name} />}
															</Card>
														</Form.Check.Label>
														<Form.Check.Input type="checkbox" hidden value={object} onClick={(e) => handleSelectNft(e)} />
													</Form.Check>
												</Col>
												)
											})
										}

									</Row>
								</Form>
							</Container>
						</fieldset>
					</Modal.Body>
					<Modal.Footer>
						<fieldset id="b" disabled={useFormStatus()}>
							<Button variant="dark" onClick={(e) => handleSubmitAlbum(e)}>
								Save Changes
							</Button>
						</fieldset>
					</Modal.Footer>
				</Modal>
			</>
		);

	}

	async function handleRemoveAlbum() {
		try {
			await (RemoveAlbum(filterValue))
		}
		finally {
			handleFilterCurated("All")
		}

	}
	return (
		<div>
			{profileData.profile.address === user.addr &&
				<div align="right"><CreateAlbum /></div>}
			{/* {JSON.stringify(findList,null,2)} */}


			{FILTER_NAMES &&
				<Row className="justify-content-center d-flex">
					<Col key="0" className="mb-3" xs="auto">
						<Button variant="light" size="sm" active={filterValue === "All" ? true : false} onClick={() => handleFilter("All")}>{"All NFTs"}</Button>
					</Col>
					{FILTER_NAMES.map((filters, i) =>
						<Col key={i + 1} className="mb-3" xs="auto">
							<Button variant="light" size="sm" active={filterValue === filters ? true : false} onClick={() => handleFilter(filters)}>{filters.replace(/[-_]/g," ")}</Button>
						</Col>
					)}
					{FILTER_NAMESCURATED &&
						<div>
							<div className="seperator50 m-auto"></div>
							<Row className="justify-content-center d-flex mt-3">

								{FILTER_NAMESCURATED.map((filters, i) =>
									<Col key={i + 1} className="mb-3" xs="auto">
										<Button variant="light" size="sm" active={filterValue === filters ? true : false} onClick={() => handleFilterCurated(filters)}>{filters.replace(/[-_]/g," ")}</Button>
									</Col>
								)}
							</Row></div>}
				</Row>
			}


			<fieldset id="a" disabled={useFormStatus()}>
				{
					findList && findList !== "first_init" && findList !== "" && filterValue === "All" && collection &&
					<InfiniteScroll
						dataLength={collection.length}
						next={LoadMoreCollection}
						hasMore={hasMore}
						loader={<h4>Loading...</h4>}
					>
						<Row className=" m-0 my-3 d-flex align-items-start" xs={1} lg={3} md={2} id="Collection">
							{collection.map((object, i) => {
								let nftData = findList.items[object]
								//console.log(nftData)
								let url
								let imgUrl
								if (nftData.image.includes("ipfs://")) {
									// console.log("It does include!")
									imgUrl = nftData.image.replace("ipfs://", "https://find.mypinata.cloud/ipfs/")
								} else {
									imgUrl = nftData.image
								}
								if (nftData.url.includes("ipfs://")) {
									// console.log("It does include!")
									url = nftData.url.replace("ipfs://", "https://find.mypinata.cloud/ipfs/")
								} else {
									url = nftData.url
								}
								url = url.replace("#", "-")
								url = url.replace(" ", "")
								if(url.includes("www.geniace.com")) {
									if (url.includes("-1")) {
										url = url.replace("-1", "")
									}
								}
								return (
									<Col key={i} className="mb-5">

										{/* {JSON.stringify(collection, null, 2)} */}

										<Card className="shadow collectionCard" style={{ maxWidth: "400px" }}>

											{user.addr === profileData.profile.address &&
												<button className="setpfp shadow idd" onClick={() => handleSetPfp(imgUrl)}>Set as PFP</button>
											}
											<a href={url} target="_blank" rel="noreferrer">
												{nftData.contentType === "video" ?
													<video className="collection-img p-3" alt={"Picture of " + nftData.name} loop="" playsInline="">
														<source src={imgUrl + "#t=0.1"} type="video/mp4"></source>
														Sorry this video is not supported by your browser
													</video>
													:
													<Card.Img src={imgUrl} className="collection-img p-3" alt={"Picture of " + nftData.name} />
												}
												<Card.Body>
													<Card.Text className="fw-bold">{nftData.name}</Card.Text>
													{nftData.listPrice &&
														<p>For sale: {nftData.listPrice * 1 + " " + nftData?.listToken} </p>}
												</Card.Body>
											</a>
										</Card>
									</Col>)

							})}</Row></InfiniteScroll>
				}
				{
					findList && findList !== "first_init" && findList !== "" && filterValue !== "All" && filterCollection &&
					<InfiniteScroll
						dataLength={filterCollection.length}
						next={LoadMoreFilteredCollection}
						hasMore={hasMore}
						loader={<h4>Loading...</h4>}
					>
						<Row className=" m-0 my-3 d-flex align-items-start" xs={1} lg={3} md={2} id="FilterCollection">
					{filterCollection.map((nftid, i) => {
						let nftData = findList.items[nftid]
						let url
						let imgUrl
						if (nftData && nftData !== "") {

							if (nftData.image.includes("ipfs://")) {
								// console.log("It does include!")
								imgUrl = nftData.image.replace("ipfs://", "https://find.mypinata.cloud/ipfs/")
							} else {
								imgUrl = nftData.image
							}
							if (nftData.url.includes("ipfs://")) {
								// console.log("It does include!")
								url = nftData.url.replace("ipfs://", "https://find.mypinata.cloud/ipfs/")
							} else {
								url = nftData.url
							}
							url = url.replace("#", "-")
							url = url.replace(" ", "")
						}
						return (
							nftData && nftData !== "" &&
							<Col key={i} className="mb-5">

								{/* {JSON.stringify(collection, null, 2)} */}

								<Card className="shadow collectionCard" style={{ maxWidth: "400px" }}>

									{user.addr === profileData.profile.address &&
										<button className="setpfp shadow idd" onClick={() => handleSetPfp(imgUrl)}>Set as PFP</button>
									}
									<a href={url} target="_blank" rel="noreferrer">
										{nftData.contentType === "video" ?
											<video className="collection-img p-3" alt={"Picture of " + nftData.name} loop="" playsInline="">
												<source src={imgUrl + "#t=0.1"} type="video/mp4"></source>
												Sorry this video is not supported by your browser
											</video>
											:
											<Card.Img src={imgUrl} className="collection-img p-3" alt={"Picture of " + nftData.name} />
										}
										<Card.Body>
											<Card.Text className="fw-bold">{nftData.name}</Card.Text>
											{nftData.listPrice &&
												<p>For sale: {nftData.listPrice * 1 + " " + nftData?.listToken} </p>}
										</Card.Body>
									</a>
								</Card>
							</Col>
						)
					})}</Row></InfiniteScroll>}

				{profileData.profile.address === user.addr && collectionType === "curatedCollections" &&
					<Row><Col align="center"><Button variant="dark" onClick={() => handleRemoveAlbum()}>Remove Album</Button></Col></Row>
				}
			</fieldset>
			{/* {JSON.stringify(collection, null, 2)} */}
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
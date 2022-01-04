import { Container } from 'react-bootstrap'
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { useState, useEffect } from 'react';
import { scripts } from 'find-flow-contracts'
import { useStateChanged } from './DisabledState';


export function ScriptChecker() {
    const [user, setUser] = useState({ loggedIn: null })
	useEffect(() => fcl.currentUser().subscribe(setUser), [])
	const [result, setResult] = useState("first_init");

	useEffect(() => {
		async function getScript(addr) {
			const response = await fcl.send([
				fcl.script(scripts.collections),
				fcl.args([fcl.arg(addr, t.Address)]),
			]);

			const checkResult = await fcl.decode(response)
			setResult(checkResult)
		}
		try {
			getScript(user.addr)
		}
		catch (error) {
			console.log(error)
		}
		// eslint-disable-next-line
	}, [user, useStateChanged()]);

    return(
        <Container>{JSON.stringify(result.collections.Flovatar)}</Container>
    )
}

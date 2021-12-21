import { startsWith } from "lodash"

export function ValidateNameAddress(props) {
    if (!props || props === ""){
        return false
    }
    //force lower case
    let searchName = props.toLowerCase()
    searchName = searchName.replace(/[^a-z0-9-]/g, '')
    //return if input is out of range
    if (!searchName || searchName.length > 18 || searchName.length < 3) {
        return false
    }
    //is it an address or a name?
    if (startsWith(searchName, "0x", 0) && searchName.length === 18) {
            return {
                type: "address",
                value: searchName
            }
    } else {
        if (searchName.length <= 16) {
            return {
                type: "name",
                value: searchName
            }
        } else {
            return false
        }
    }
}
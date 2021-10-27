import { Form, Button, Row, Col, Card } from "react-bootstrap"
import { useEffect } from "react";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import { Tx } from "../../functions/transaction";
import { transactions } from 'find-flow-contracts'
import { useFormStatus } from "../../functions/DisabledState";
import { useImmer } from "use-immer";

function EditProfile({ profile }) {

    const [formValues2, setFormValues2] = useImmer([])
    const [tagsArray, setTagsArray] = useImmer([])
    let tagArray = new Array()

    useEffect(() => {
        setFormValues2([])
        profile.profile.links.map((e) =>
            setFormValues2((formVals) => {
                formVals.push({
                    url: e.url,
                    title: e.title,
                    type: e.type,
                    remove: ""
                })
            })
        )
    }
        , [profile])

    let addFormFields2 = () => {
        setFormValues2((formVals) => {
            formVals.push({
                url: "",
                title: "",
                type: "",
                remove: ""
            })
        })
    }

    let removeFormFields2 = (i) => {
        if (formValues2[i].title && profile.profile.links[i]) {
            if (formValues2[i].title === profile.profile.links[i].title) {
                setFormValues2((formVals) => {
                    formVals[i].remove = "true"
                })
                document.getElementById("link" + i).disabled = true;
            }
        } else
            setFormValues2((formVals) => {
                formVals.splice(i, 1)
            })
    }
    
    let handleChangeTags = (e) => {
        let tags = e.target.value
        tags = tags.split(",")
        for (var i = 0; i < tags.length; i++) {
            tagArray.push(tags[i]);
        }
        setTagsArray(tagArray)
    }

    let handleChangeLinks2 = (i, e) => {
        if (e.target.name === "url") {
            setFormValues2((formVals) => {
                formVals[i].url = e.target.value
            })
        }
        if (e.target.name === "type") {
            setFormValues2((formVals) => {
                formVals[i].type = e.target.value
                formVals[i].title = e.target.value + i
            })
        }
    }

    let handleChangeForm = (v) => {
        profile.profile[v.target.name] = v.target.value
    }

    let handleSubmit = async (event) => {

        var toBoolean = function (value) {
            var strValue = String(value).toLowerCase();
            strValue = ((!isNaN(strValue) && strValue !== '0') &&
                strValue !== '' &&
                strValue !== 'null' &&
                strValue !== 'undefined') ? '1' : strValue;
            return strValue === 'true' || strValue === '1' ? true : false
        };

        event.preventDefault();


        const links = [];
        var links2 = [];
        formValues2.map((l) => {
            var dict = {};
            dict["key"] = "title"
            dict["value"] = l.title.toString()
            links2.push(dict)
            dict = {}
            dict["key"] = "type"
            dict["value"] = l.type.toString()
            links2.push(dict)
            dict = {}
            dict["key"] = "url"
            dict["value"] = l.url.toString()
            links2.push(dict)
            dict = {}
            if (l.remove === "true") {
                dict["key"] = "remove"
                dict["value"] = l.remove
                links2.push(dict)
                dict = {}
            }
            links.push(links2)
            links2 = []
        })

        try {
            await Tx(
                [
                    fcl.transaction(transactions.edit_profile),
                    fcl.args([
                        fcl.arg(profile.profile.name, t.String),
                        fcl.arg(profile.profile.description, t.String),
                        fcl.arg(profile.profile.avatar, t.String),
                        fcl.arg(tagsArray, t.Array(t.String)),
                        fcl.arg(toBoolean(profile.profile.allowStoringfollowers), t.Bool),
                        fcl.arg(links, t.Array(t.Dictionary({ key: t.String, value: t.String }))),

                    ]),
                    fcl.proposer(fcl.currentUser().authorization),
                    fcl.payer(fcl.currentUser().authorization),
                    fcl.authorizations([fcl.currentUser().authorization]),
                    fcl.limit(9999),
                ],
                {
                    onStart() {

                    },
                    onSubmission() {
                    },
                    async onSuccess(status) {
                    },
                    async onError(error) {
                        //SetState(false)
                        if (error) {
                            const { message } = error;
                            console.log(message)
                            // setButtonState(buttonState)
                        }
                    },
                }
            );
        } catch (event) {
            console.log(event);
        }
    }

    return (
        <Card id="editProfile" className="cardprofileother pe-3 ps-4 mt-3 py-4">
            <span className="text mb-4 name">Edit Profile</span>
            <Form onSubmit={handleSubmit}>
                <fieldset id="a" disabled={useFormStatus()}>
                    <Form.Label >Name</Form.Label>
                    <Form.Control className="mb-3" name="name" placeholder="Name" Value={profile.profile.name} onChange={e => handleChangeForm(e)} />
                    <Form.Label>Bio/Description</Form.Label>
                    <Form.Control className="mb-3 ms-0" name="description" as="textarea" rows={3} placeholder="description (max 255 characters)" defaultValue={profile.profile.description} onChange={e => handleChangeForm(e)} />
                    <Form.Label>Tags (Seperate with a comma)</Form.Label>
                    <Form.Control className="mb-3" name="tags" placeholder="Tags seperated by a comma" Value={profile.profile.tags} onChange={e => handleChangeTags(e)} />
                    <Form.Label>Avatar URL</Form.Label>
                    <Form.Control className="mb-3" name="avatar" placeholder="URL to your avatar" Value={profile.profile.avatar} onChange={e => handleChangeForm(e)} />
                    <Form.Label>Links</Form.Label>
                    {formValues2.map((element, index) => (
                        <fieldset key={index} id={"link" + index}>
                            <Row className="d-flex align-content-center mb-3 mt-3" key={index}>
                                <Col className="mt-3" xs="12" md="4">
                                    <Form.Label>Link</Form.Label>
                                    <Form.Control type="text" name="url" Value={element.url || ""} onChange={e => handleChangeLinks2(index, e)} />
                                </Col>
                                <Col className="mt-3" xs="12" md="4">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select className="ms-0" name="type" defaultValue={element.type} onChange={e => handleChangeLinks2(index, e)}>
                                        <option value="">Choose a type</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="twitter">Twitter</option>
                                        <option value="youtube">YouTube</option>
                                        <option value="discord">Discord</option>
                                        <option value="globe">Website</option>
                                        <option value="image">Image</option>
                                    </Form.Select>
                                </Col>
                                <Col className="mt-auto" xs="12" md="4">
                                    <Button type="button" variant="outline-danger" className="mt-3" size="sm" onClick={() => removeFormFields2(index)}>Remove</Button>
                                </Col>
                            </Row>
                        </fieldset>
                    ))}
                    <Row className="mt-5">
                        <Col>
                            <Button className="m-3" variant="outline-dark" type="button" onClick={() => addFormFields2()}>Add Link</Button>
                            <Button className="ms-3" variant="dark" type="submit">Save</Button>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>

                        </Col>
                    </Row>
                </fieldset>
            </Form>
            {/* {JSON.stringify(profile.profile, null, 2)} */}
        </Card>

    )
}
export default EditProfile
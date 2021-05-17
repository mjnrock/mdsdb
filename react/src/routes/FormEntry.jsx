/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Dimmer, Loader, Modal, Button, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import Form from "../components/form/viewer/Form";
import QRCode from "../components/QRCode";

import StateNode, { EnumMessageType } from "./../state/FormEntryState";

export default function FormEntry(props) {
    const { formId } = useParams();
    const [ node, setNode ] = useState();
    const [ data, setData ] = useState();
    const [ responses, setResponses ] = useState({});
    const [ open, setOpen ] = React.useState(false);

    useEffect(() => {
        setNode(StateNode);

        fetch(`http://localhost:3001/form/${ formId }`)
            .then(res => res.json())
            .then(d => {
                setData(d);
            })
            .catch(console.log)
    }, []);

    useEffect(() => {
        if(node) {
            node.next(EnumMessageType.FORM_DATA, data);
        }
    }, [ data ]);
    useEffect(() => {
        if(node) {
            node.next(EnumMessageType.RESPOND, responses);
        }
    }, [ responses ]);

    function respond(eid, value) {
        setResponses({
            ...responses,
            [ eid ]: value,
        });
    }

    function save() {
        if(node) {
            node.next(EnumMessageType.SAVE_FORM, responses);
        }
    }

    if(!data) {
        return (
            <Dimmer active inverted style={{ minHeight: 400 }}>
                <Loader>Loading</Loader>
            </Dimmer>
        );
    }

    return (
        <Segment>
            <Modal
                closeIcon
                onClose={ () => setOpen(false) }
                onOpen={ () => setOpen(true) }
                open={ open }
                trigger={(
                    <Button labelPosition="left" style={{ marginBottom: 12 }}>
                        <Icon name="qrcode" />
                        View QR Code
                    </Button>
                )}
            >
                <Segment basic>
                    <QRCode />
                </Segment>
            </Modal>

            <Button onClick={ save }>Save</Button>

            <Form
                node={ node }
                data={ data }
                onResponse={ respond }
            />
        </Segment>
    )
}
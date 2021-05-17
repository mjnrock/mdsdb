import React, { useState, useEffect } from "react";
import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";
import { Segment, Dimmer, Loader, Modal, Button, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import Form from "./viewer/Form";
import QRCode from "./../QRCode";

import { Context } from "./../../routes/FormEntry";
import FormEntryNetwork, { EnumMessageType } from "./../../state/FormEntryNetwork";

export default function FormEntry(props) {
    const { formId } = useParams();
	const { state, dispatch } = useContextNetwork(Context, "network");
    const [ data, setData ] = useState();
    const [ responses, setResponses ] = useState({});
    const [ open, setOpen ] = React.useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/form/${ formId }`)
            .then(res => res.json())
            .then(d => {
                setData(d);
            })
            .catch(console.log)
    }, [ formId ]);

    useEffect(() => {
        dispatch(EnumMessageType.FORM_DATA, data);
    }, [ data, dispatch ]);
    useEffect(() => {
        dispatch(EnumMessageType.RESPOND, responses);
    }, [ responses, dispatch ]);

    function respond(eid, value) {
        setResponses({
            ...responses,
            [ eid ]: value,
        });
    }

    function save() {
		dispatch(EnumMessageType.SAVE_FORM, {
			id: state.id,
			fid: formId,
			entries: responses,
		});
    }

    if(!data) {
        return (
            <Dimmer active inverted style={{ minHeight: 400 }}>
                <Loader>Loading</Loader>
            </Dimmer>
        );
    }

    return (
        <Context.Provider value={{ network: FormEntryNetwork }}>
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
					dispatch={ dispatch }
					data={ data }
					onResponse={ respond }
				/>

				<pre>
					{
						JSON.stringify(responses, null, 2)
					}
				</pre>
			</Segment>
		</Context.Provider>
    )
}
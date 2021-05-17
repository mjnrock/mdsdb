/* eslint-disable */
import React from "react";
import { Segment } from "semantic-ui-react";

import { useNodeContext } from "./../../lib/ReactContext";
import { EnumMessageType } from "./../../state/FormEntryState";
import { Context } from "./../../routes/FormEntry";

import Form from "./viewer/Form";

export default function FormEntry(props) {
    const { node, state } = useNodeContext(Context);
    const [ responses, setResponses ] = useState({});

    useEffect(() => {
        node.next(EnumMessageType.RESPOND, responses);
    }, [ responses ]);

    function respond(eid, value) {
        setResponses({
            ...responses,
            [ eid ]: value,
        });
    }

    return (
        <Segment>
            <Form
                node={ node }
                data={ state }
                onResponse={ respond }
            />
        </Segment>
    );
}
import React, { useState } from "react";
import { Segment, Input, TextArea } from "semantic-ui-react";

import Section from "./Section";

export default function Survey(props = {}) {
    const [ title, setTitle ] = useState("");
    const [ instructions, setInstructions ] = useState("");

    return (
        <Segment>
            <Input
                fluid
                placeholder="Survey Title"
                value={ title }
                onChange={ e => setTitle(e.target.value) }
            />

            <TextArea
                value={ instructions }
                onChange={ e => setInstructions(e.target.value) }
            />

            <Section />
        </Segment>
    );
}
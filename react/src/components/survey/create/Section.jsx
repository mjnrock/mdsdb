import React, { useState } from "react";
import { Segment, TextArea } from "semantic-ui-react";

import Prompt from "./Prompt";

export default function Section(props = {}) {
    const [ text, setText ] = useState("");
    const [ prompts, setPrompts ] = useState([
        {
            text: "Test copy",
            inputs: [
                {
                    type: 1,
                    value: null,
                    validator: () => true,
                }
            ],
        }
    ]);

    return (
        <Segment>
            <TextArea
                value={ text }
                onChange={ e => setText(e.target.value) }
            />
            
            {
                prompts.map(prompt => (
                    <Prompt key={ Math.random() }/>
                ))
            }
        </Segment>
    );
}
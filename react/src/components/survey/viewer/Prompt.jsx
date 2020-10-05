/* eslint-disable */
import React from "react";
import { Segment, Button, TextArea} from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

export default function Section(props = {}) {
    const prompt = props.prompt;

    function onResponse(prompt, value) {
        if(typeof props.onResponse === "function") {
            props.onResponse(prompt, value);
        }
    }

    let inputs = null;
    if(prompt.type === 1) {
        inputs = <TextArea />
    } else if(prompt.type === 2) {
        inputs = (
            <div style={{ display: "flex" }}>
                {                    
                    prompt.inputs.map(input => (
                        <Button key={ input.id } style={{ flexGrow: 1 }} onClick={ e => onResponse(prompt, input.value) }>{ input.label || input.value }</Button>
                    ))
                }
            </div>
        );
    }

    return (
        <Segment basic style={{ marginTop: "2em" }}>
            <MarkdownViewer source={ prompt.text } />
            { inputs }
        </Segment>
    );
}
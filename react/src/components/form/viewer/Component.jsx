/* eslint-disable */
import React from "react";
import { Segment, Input } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

export default function Component(props = {}) {
    const entry = props.entry;

    function onResponse(entry, value) {
        if(typeof props.onResponse === "function") {
            props.onResponse(entry, value);
        }
    }

    let input = null;
    if(entry.type === "text") {
        input = <Input type="text" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type === "number") {
        input = <Input type="number" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    }

    return (
        <Segment basic style={{ marginTop: "2em" }}>
            <MarkdownViewer source={ entry.text } />

            <div style={{ display: "flex "}}>                
                <label style={{ fontWeight: "bold", margin: "auto", marginRight: 16 }}>{ entry.label }</label>
                { input }
            </div>
        </Segment>
    );
}
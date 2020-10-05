/* eslint-disable */
import React from "react";
import { Segment, Form } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import Component from "./Component";

export default function Section(props = {}) {
    const section = props.section;
    const entries = props.section.entries || [];

    function onResponse(prompt, value) {
        if(typeof props.onResponse === "function") {
            props.onResponse(prompt, value);
        }
    }

    return (
        <Segment style={{ marginTop: "2em" }}>
            <MarkdownViewer source={ section.text } />
            
            {
                entries.map((entry, i) => (
                    <Component key={ entry.id } entry={ entry } onResponse={ onResponse } />
                ))
            }
        </Segment>
    );
}
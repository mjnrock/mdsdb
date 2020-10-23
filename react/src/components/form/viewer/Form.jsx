/* eslint-disable */
import React from "react";
import { Segment, Header, Message } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import Section from "./Section";

export default function Form(props = {}) {
    const data = props.data;
    const sections = data.sections || [];

    function onResponse(entry, value) {
        if(typeof props.onResponse === "function") {
            props.onResponse(entry.id, value);
        }
    }

    return (
        <Segment>
            <Header as="h1" textAlign="center">{ data.title }</Header>

            {
                !!data.instructions ? (
                    <Message>
                        <MarkdownViewer source={ data.instructions } style={{ backgroundColor: "rgba(0,0,0,1)" }} />
                    </Message>
                ) : null
            }
            
            {
                sections.map(section => (
                    <Section
                        key={ section.id }
                        controller={ props.controller }
                        data={ data }
                        section={ section }
                        onResponse={ onResponse }
                    />
                ))
            }
        </Segment>
    );
}
/* eslint-disable */
import React from "react";
import { Segment, Header, Message} from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import Section from "./Section";

export default function Survey(props = {}) {
    const data = props.data;
    const sections = data.sections || [];

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
                    <Section key={ section.id } section={ section } />
                ))
            }
        </Segment>
    );
}
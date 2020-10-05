/* eslint-disable */
import React from "react";
import { Segment, Header, Message} from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import { useNodeContext } from "./../../../lib/ReactContext";
import { Context } from "./../../../App";

import Section from "./Section";

export default function Survey(props = {}) {
    const { state } = useNodeContext(Context);
    const sections = state.sections || [];

    return (
        <Segment>
            <Header as="h1" textAlign="center">{ state.title }</Header>
            {
                !!state.instructions ? (
                    <Message>
                        <MarkdownViewer source={ state.instructions } style={{ backgroundColor: "rgba(0,0,0,1)" }} />
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
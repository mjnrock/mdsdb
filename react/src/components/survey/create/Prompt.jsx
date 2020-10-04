/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Menu, Button, Icon } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";
import { useNodeContext } from "./../../../lib/ReactContext";
import { Context } from "./../../../App";
import { EnumMessageType } from "./../../../state/state";

import MarkdownEditor from "./MarkdownEditor";

export default function Prompt(props = {}) {
    const { node } = useNodeContext(Context);
    const [ text, setText ] = useState("");
    const [ isVisible, setIsVisible ] = useState(true);

    useEffect(() => {
        node.next(EnumMessageType.PROMPT_TEXT, {
            prompt: props.prompt,
            text,
        });
    }, [ text ]);

    function removePrompt() {
        node.next(EnumMessageType.PROMPT_REMOVE, {
            section: props.section,
            prompt: props.prompt,
        });
    }

    return (
        <Segment basic color="blue" style={{ paddingRight: 0, paddingBottom: 0 }}>
            <Menu size="mini" style={{ marginBottom: 10 }}>
                <Menu.Item header>Prompt</Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item onClick={ e => setIsVisible(!isVisible) }>
                        <Button basic labelPosition="left">
                            <Icon name={ isVisible ? "unhide" : "pencil" } />
                            { isVisible ? "Hide Editor" : "Show Editor" }
                        </Button>
                    </Menu.Item>

                    <Menu.Item onClick={ removePrompt }>
                        <Button basic labelPosition="left">
                            <Icon name="x" color="red" />
                            Remove Prompt
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            
            {
                isVisible ? (
                    <MarkdownEditor onUpdate={ setText } placeholder="Add Prompt Text..." value={ text } />
                ) : (
                    <MarkdownViewer source={ text } />
                )
            }
        </Segment>
    );
}
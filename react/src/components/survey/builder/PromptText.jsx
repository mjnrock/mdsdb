/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Menu, Button, Icon } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import { useNodeContext } from "../../../lib/ReactContext";
import { Context } from "../../../App";
import { EnumMessageType } from "../../../state/SurveyState";

import MarkdownEditor from "../../MarkdownEditor";

export default function PromptText(props = {}) {
    const { node } = useNodeContext(Context);
    const [ text, setText ] = useState(props.prompt.text);
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
        <Segment basic color="red" style={ { paddingRight: 0, paddingTop: 0, paddingBottom: 0 } }>
            <Menu size="mini" style={{ marginTop: 8, marginBottom: 8 }} >
                {/* <Menu.Item header style={ { color: "rgb(33, 133, 208)" } }>Prompt</Menu.Item> */}
                <Menu.Item header style={ { color: "rgb(219, 40, 40)" } }>Free Text</Menu.Item>
                <Menu.Item header style={ { fontFamily: "monospace", fontWeight: 100, color: "#bbb" } }>{ props.prompt.id }</Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item onClick={ e => setIsVisible(!isVisible) }>
                        <Button basic labelPosition="left">
                            <Icon name={ isVisible ? "caret down" : "caret up" } />
                            { isVisible ? "Collapse" : "Expand" }
                        </Button>
                    </Menu.Item>

                    <Menu.Item onClick={ removePrompt }>
                        <Button basic labelPosition="left">
                            <Icon name="trash alternate outline" color="red" />
                            Remove Prompt
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

            {
                isVisible ? (
                    <MarkdownEditor onUpdate={ setText } placeholder="[ Prompt Text ]" value={ text } />
                ) : (
                    <MarkdownViewer source={ text } />
                )
            }
        </Segment>
    );
}
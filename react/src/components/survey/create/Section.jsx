/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Icon, Menu, Button } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";
import { useNodeContext } from "./../../../lib/ReactContext";
import { Context } from "./../../../App";
import { EnumMessageType } from "./../../../state/state";

import MarkdownEditor from "./MarkdownEditor";
import Prompt from "./Prompt";

export default function Section(props = {}) {
    const { node } = useNodeContext(Context);
    const [ text, setText ] = useState();
    const [ isVisible, setIsVisible ] = useState(true);
    const prompts = props.section.prompts;

    useEffect(() => {
        if(props.section.text && props.section.text.length) {
            setText(props.section.text);
        }
    }, [ props ]);

    useEffect(() => {
        node.next(EnumMessageType.SECTION_TEXT, {
            section: props.section,
            text,
        });
    }, [ text ]);

    function addPrompt(type) {
        node.next(EnumMessageType.PROMPT_ADD, {
            type,
            section: props.section,
        });
    }
    function removeSection() {
        node.next(EnumMessageType.SECTION_REMOVE, {
            section: props.section,
        });
    }

    return (
        <Segment basic color="teal" style={{ paddingRight: 0 }}>
            <Menu size="mini" style={{ marginBottom: 10 }}>
                <Menu.Item header>Section</Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item onClick={ e => setIsVisible(!isVisible) }>
                        <Button basic labelPosition="left">
                            <Icon name={ isVisible ? "unhide" : "pencil" } />
                            { isVisible ? "Hide Editor" : "Show Editor" }
                        </Button>
                    </Menu.Item>
                    
                    <Menu.Item onClick={ removeSection }>
                        <Button basic labelPosition="left">
                            <Icon name="x" color="red" />
                            Remove Section
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            
            {
                isVisible ? (
                    <MarkdownEditor onUpdate={ setText } placeholder="Add Section Text..." value={ text }/>
                ) : (
                    <MarkdownViewer source={ text } />
                )
            }
            
            {
                prompts.map(prompt => (
                    <Prompt key={ prompt.id } prompt={ prompt } section={ props.section } />
                ))
            }
            <Menu attached="bottom" secondary>
                <Menu.Item header>Prompt</Menu.Item>

                <Menu.Item name="text" onClick={ e => addPrompt(1) }>
                    <Icon.Group size="large">
                        <Icon name="font" />
                        <Icon corner="bottom right" name="add" color="blue" />
                    </Icon.Group>
                </Menu.Item>
                <Menu.Item name="text">
                    <Icon.Group size="large">
                        <Icon name="hashtag" />
                        <Icon corner="bottom right" name="add" color="blue" />
                    </Icon.Group>
                </Menu.Item>
                <Menu.Item name="selection">
                    <Icon.Group size="large">
                        <Icon name="list ol" />
                        <Icon corner="bottom right" name="add" color="blue" />
                    </Icon.Group>
                </Menu.Item>
                <Menu.Item name="selection">
                    <Icon.Group size="large">
                        <Icon name="hourglass half" />
                        <Icon corner="bottom right" name="add" color="blue" />
                    </Icon.Group>
                </Menu.Item>
                <Menu.Item name="selection">
                    <Icon.Group size="large">
                        <Icon name="calendar alternate outline" />
                        <Icon corner="bottom right" name="add" color="blue" />
                    </Icon.Group>
                </Menu.Item>
                <Menu.Item name="selection">
                    <Icon.Group size="large">
                        <Icon name="clock outline" />
                        <Icon corner="bottom right" name="add" color="blue" />
                    </Icon.Group>
                </Menu.Item>
            </Menu>
        </Segment>
    );
}
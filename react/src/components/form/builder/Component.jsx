/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Icon, Menu, Button } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import { useNodeContext } from "../../../lib/ReactContext";
import { Context } from "../../../App";
import { EnumMessageType } from "../../../state/SurveyState";

import MarkdownEditor from "./MarkdownEditor";
import PromptText from "./PromptText";
import PromptSelection from "./PromptSelection";

export default function Component(props = {}) {
    const { node } = useNodeContext(Context);
    const [ text, setText ] = useState(props.section.text);
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
        <Segment basic color="grey" style={{ paddingRight: 0, paddingTop: 0 }}>
            <Menu size="small" style={{ marginTop: 8, marginBottom: 16 }} >
                <Menu.Item header style={{ color: "rgb(118, 118, 118)" }}>Section</Menu.Item>
                <Menu.Item header style={{ fontFamily: "monospace", fontWeight: 100, color: "#bbb" }}>{ props.section.id }</Menu.Item>

                <Menu.Item name="text" onClick={ e => addPrompt(1) }>
                    <Icon.Group size="large">
                        <Icon name="font" color="red" />
                        <Icon corner="bottom right" name="add" color="red" />
                    </Icon.Group>
                </Menu.Item>
                {/* <Menu.Item name="number">
                    <Icon.Group size="large">
                        <Icon name="hashtag" />
                        <Icon corner="bottom right" name="add" color="blue" />
                    </Icon.Group>
                </Menu.Item> */}
                <Menu.Item name="selection" onClick={ e => addPrompt(2) }>
                    <Icon.Group size="large">
                        <Icon name="list ol" color="purple" />
                        <Icon corner="bottom right" name="add" color="purple" />
                    </Icon.Group>
                </Menu.Item>
                {/* <Menu.Item name="datetime">
                    <Icon.Group size="large">
                        <Icon name="hourglass half" />
                        <Icon corner="bottom right" name="add" color="blue" />
                    </Icon.Group>
                </Menu.Item>
                <Menu.Item name="date">
                    <Icon.Group size="large">
                        <Icon name="calendar alternate outline" />
                        <Icon corner="bottom right" name="add" color="blue" />
                    </Icon.Group>
                </Menu.Item>
                <Menu.Item name="time">
                    <Icon.Group size="large">
                        <Icon name="clock outline" />
                        <Icon corner="bottom right" name="add" color="blue" />
                    </Icon.Group>
                </Menu.Item> */}

                <Menu.Menu position="right">
                    <Menu.Item onClick={ e => setIsVisible(!isVisible) }>
                        <Button basic labelPosition="left">
                            <Icon name={ isVisible ? "caret down" : "caret up" } />
                            { isVisible ? "Collapse" : "Expand" }
                        </Button>
                    </Menu.Item>
                    
                    <Menu.Item onClick={ removeSection }>
                        <Button basic labelPosition="left">
                            <Icon name="trash alternate outline" color="red" />
                            Remove Section
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            
            {
                isVisible ? (
                    <MarkdownEditor onUpdate={ setText } placeholder="[ Section Text ]" value={ text }/>
                ) : (
                    <MarkdownViewer source={ text } />
                )
            }
            
            {
                prompts.map(prompt => {
                    if(prompt.type === 1) {
                        return (
                            <PromptText key={ prompt.id } prompt={ prompt } section={ props.section } />
                        );
                    } else if(prompt.type === 2) {
                        return (
                            <PromptSelection key={ prompt.id } prompt={ prompt } section={ props.section } />
                        );
                    }

                    return null;
                })
            }
        </Segment>
    );
}
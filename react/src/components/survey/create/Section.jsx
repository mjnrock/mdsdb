/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Icon, Menu } from "semantic-ui-react";

import MarkdownEditor from "./MarkdownEditor";
import Prompt from "./Prompt";

export default function Section(props = {}) {
    const [ text, setText ] = useState();
    const [ prompts, setPrompts ] = useState([]);

    useEffect(() => {
        if(props.section.text && props.section.text.length) {
            setText(props.section.text);
        }
    }, [ props ]);

    function addPrompt(type) {
        setPrompts([
            ...prompts,
            {
                text: "Lorem ipsum...",
                inputs: [
                    {
                        type: type,
                        value: null,
                        validator: () => true,
                    }
                ],
            }
        ])
    }

    return (
        <Segment color="teal">
            <MarkdownEditor onUpdate={ setText } placeholder="Add Section Text..." value={ text }/>
            
            {
                prompts.map((prompt, i) => (
                    <Prompt key={ i } prompt={ prompt } />
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
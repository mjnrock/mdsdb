/* eslint-disable */
import React, { useState, useEffect} from "react";
import { Segment, Input, Menu, Icon } from "semantic-ui-react";
import { useNodeContext } from "./../../../lib/ReactContext";
import { Context } from "./../../../App";
import { EnumMessageType } from "./../../../state/state";

import MarkdownEditor from "./MarkdownEditor";
import Section from "./Section";

export default function Survey(props = {}) {
    const { node, state } = useNodeContext(Context);
    const [ title, setTitle ] = useState("");
    const [ instructions, setInstructions ] = useState("");
    const sections = state.sections || [];

    useEffect(() => {
        node.next(EnumMessageType.SURVEY_TITLE, {
            title,
        });
    }, [ title ]);

    useEffect(() => {
        node.next(EnumMessageType.SURVEY_INSTRUCTIONS, {
            instructions,
        });
    }, [ instructions ]);

    function addSection() {
        node.next(EnumMessageType.SECTION_ADD, {
            text: "",
            prompts: [],
        });
    }

    return (
        <>
            <Segment color="red" secondary>
                <pre>
                    {
                        JSON.stringify(state, null, 2)
                    }
                </pre>
            </Segment>

            <Segment color="green">
                <Input
                    fluid
                    placeholder="Survey Title"
                    value={ title }
                    onChange={ e => setTitle(e.target.value) }
                />
                
                <MarkdownEditor onUpdate={ setInstructions } placeholder="Add Survey Instructions..." value={ instructions } style={{ marginTop: 8 }} />

                {
                    sections.map(section => (
                        <Section key={ section.id } section={ section } />
                    ))
                }
                <Menu attached="bottom" secondary>
                    <Menu.Item header>Section</Menu.Item>

                    <Menu.Item name="text" onClick={ e => addSection() }>
                        <Icon.Group size="large">
                            <Icon name="list alternate outline" />
                            <Icon corner="bottom right" name="add" color="teal" />
                        </Icon.Group>
                    </Menu.Item>
                </Menu>
            </Segment>
        </>
    );
}
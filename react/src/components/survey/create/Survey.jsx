/* eslint-disable */
import React, { useState, useEffect} from "react";
import { Segment, Input, Menu, Icon } from "semantic-ui-react";
import { useNodeContext } from "./../../../lib/ReactContext";
import { Context, EnumMessageType } from "./../../../App";

import MarkdownEditor from "./MarkdownEditor";
import Section from "./Section";

export default function Survey(props = {}) {
    const { node, state } = useNodeContext(Context);
    const [ title, setTitle ] = useState("");
    const [ instructions, setInstructions ] = useState("");
    const [ sections, setSections ] = useState([]);

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

    function addSection(type) {
        setSections([
            ...sections,            
            {
                text: "",
                prompts: [],
            }
        ]);
    }

    return (
        <Segment color="blue">
            <Segment color="red" secondary>
                <pre>
                    {
                        JSON.stringify(state, null, 2)
                    }
                </pre>
            </Segment>

            <Input
                fluid
                placeholder="Survey Title"
                value={ title }
                onChange={ e => setTitle(e.target.value) }
            />
            
            <MarkdownEditor onUpdate={ setInstructions } placeholder="Add Survey Instructions..." value={ instructions } style={{ marginTop: 8 }} />

            {
                sections.map((section, i) => (
                    <Section key={ i } section={ section } />
                ))
            }
            <Menu attached="bottom" secondary>
                <Menu.Item header>Section</Menu.Item>

                <Menu.Item name="text" onClick={ e => addSection() }>
                    <Icon.Group size="large">
                        <Icon name="list alternate outline" />
                        <Icon corner="bottom right" name="add" color="blue" />
                    </Icon.Group>
                </Menu.Item>
            </Menu>
        </Segment>
    );
}
/* eslint-disable */
import React, { useState } from "react";
import { Segment, Input, Menu, Icon } from "semantic-ui-react";

import MarkdownEditor from "./MarkdownEditor";
import Section from "./Section";

//! TODO State must either be parent-child binding, or via dispatched message
//! Add @swarm message system

export default function Survey(props = {}) {
    const [ title, setTitle ] = useState("");
    const [ instructions, setInstructions ] = useState("");
    const [ sections, setSections ] = useState([]);

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
                        JSON.stringify({
                            title,
                            instructions,
                            sections,
                        }, null, 2)
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
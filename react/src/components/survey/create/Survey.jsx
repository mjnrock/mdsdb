import React, { useState } from "react";
import { Segment, Input, TextArea, Menu, Icon } from "semantic-ui-react";

import Section from "./Section";

export default function Survey(props = {}) {
    const [ title, setTitle ] = useState("");
    const [ instructions, setInstructions ] = useState("");

    return (
        <Segment color="blue">
            <Input
                fluid
                placeholder="Survey Title"
                value={ title }
                onChange={ e => setTitle(e.target.value) }
            />

            <TextArea
                placeholder="Add Instructions..."
                value={ instructions }
                onChange={ e => setInstructions(e.target.value) }
            />

            <Section />
            <Menu attached="bottom" secondary>
                <Menu.Item header>Section</Menu.Item>

                <Menu.Item name="text">
                    <Icon.Group size="large">
                        <Icon name="sitemap" />
                        <Icon corner="bottom right" name="add" color="blue" />
                    </Icon.Group>
                </Menu.Item>
            </Menu>
        </Segment>
    );
}
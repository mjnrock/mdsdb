import React, { useState } from "react";
import { Segment, TextArea, Button, Icon, Container, Grid, Menu } from "semantic-ui-react";

import Prompt from "./Prompt";

export default function Section(props = {}) {
    const [ text, setText ] = useState("");
    const [ prompts, setPrompts ] = useState([
        {
            text: "Test copy",
            inputs: [
                {
                    type: 1,
                    value: null,
                    validator: () => true,
                }
            ],
        }
    ]);

    return (
        <Segment color="blue">            
            <Grid>
                <Grid.Column width={ 15 }>
                    <TextArea
                        placeholder="Add Section Details..."
                        value={ text }
                        onChange={ e => setText(e.target.value) }
                    />
                </Grid.Column>
                <Grid.Column width={ 1 }>
                    <Button icon floated="right" basic>
                        <Icon name="bars" />
                    </Button>
                </Grid.Column>
            </Grid>
            
            {
                prompts.map(prompt => (
                    <Prompt key={ Math.random() }/>
                ))
            }
            <Menu attached="bottom" secondary>
                <Menu.Item header>Prompt</Menu.Item>

                <Menu.Item name="text">
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
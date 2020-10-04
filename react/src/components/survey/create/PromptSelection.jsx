/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Menu, Button, Icon, Label, Tab, Table, Input } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";
import { useNodeContext } from "../../../lib/ReactContext";
import { Context } from "../../../App";
import { EnumMessageType } from "../../../state/state";

import MarkdownEditor from "./MarkdownEditor";

export default function PromptSelection(props = {}) {
    const { node } = useNodeContext(Context);
    const [ text, setText ] = useState("");
    const [ isVisible, setIsVisible ] = useState(true);

    // const panes = [
    //     {
    //         menuItem: { key: "text", icon: "font" },
    //         render: () => <Tab.Pane>
    //             <Table basic="very" color="black" textAlign="center" verticalAlign="middle">
    //                 <Table.Header>
    //                     <Table.Row>
    //                         <Table.HeaderCell>ID</Table.HeaderCell>
    //                         <Table.HeaderCell>Value</Table.HeaderCell>
    //                         <Table.HeaderCell>Label</Table.HeaderCell>
    //                         <Table.HeaderCell>                                
    //                             <Icon name="cogs" />
    //                         </Table.HeaderCell>
    //                     </Table.Row>
    //                 </Table.Header>

    //                 <Table.Body>
    //                     <Table.Row>
    //                         <Table.Cell>
    //                             <Input type="text" fluid value={ 1 } />
    //                         </Table.Cell>
    //                         <Table.Cell>
    //                             <Input type="text" fluid value={ true } />
    //                         </Table.Cell>
    //                         <Table.Cell>
    //                             <Input type="text" fluid value={ "Yes" } />
    //                         </Table.Cell>
    //                         <Table.Cell>
    //                             <Icon name="trash alternate outline" color="red" />
    //                         </Table.Cell>
    //                     </Table.Row>
                        
    //                     <Table.Row>
    //                         <Table.Cell>
    //                             <Input type="text" fluid value={ 2 } />
    //                         </Table.Cell>
    //                         <Table.Cell>
    //                             <Input type="text" fluid value={ false } />
    //                         </Table.Cell>
    //                         <Table.Cell>
    //                             <Input type="text" fluid value={ "No" } />
    //                         </Table.Cell>
    //                         <Table.Cell>
    //                             <Icon name="trash alternate outline" color="red" />
    //                         </Table.Cell>
    //                     </Table.Row>
    //                 </Table.Body>

    //                 <Table.Footer fullWidth>
    //                     <Table.Row textAlign="left">
    //                         <Table.HeaderCell colSpan="4">
    //                             <Button basic labelPosition="left">
    //                                 <Icon name="plus" color="blue" />
    //                                 Add Row
    //                             </Button>
    //                         </Table.HeaderCell>
    //                     </Table.Row>
    //                 </Table.Footer>
    //             </Table>
    //         </Tab.Pane>,
    //     },
    //     {
    //         menuItem: { key: "database", icon: "database" },
    //         render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    //     },
    //     {
    //         menuItem: { key: "api", icon: "world" },
    //         render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    //     },
    //     {
    //         menuItem: { key: "dictionary", icon: "book" },
    //         render: () => <Tab.Pane>Tab 2 Content</Tab.Pane>,
    //     },
    // ];

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
        <Segment basic color="purple" style={ { paddingRight: 0, paddingTop: 0, paddingBottom: 0 } }>
            <Menu size="mini" style={{ marginTop: 8, marginBottom: 8 }} >
                {/* <Menu.Item header style={ { color: "rgb(33, 133, 208)" } }>Prompt</Menu.Item> */}
                <Menu.Item header style={ { color: "rgb(163, 51, 200)" } }>Selection</Menu.Item>
                <Menu.Item header style={ { fontFamily: "monospace", fontWeight: 100, color: "#bbb" } }>{ props.prompt.id }</Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item onClick={ e => setIsVisible(!isVisible) }>
                        <Button basic labelPosition="left">
                            <Icon name={ isVisible ? "unhide" : "pencil" } />
                            { isVisible ? "Hide Editor" : "Show Editor" }
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

            {/* <Tab panes={ panes } style={{ marginTop: 10 }} /> */}
            <Table basic="very" color="black" textAlign="center" verticalAlign="middle">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Value</Table.HeaderCell>
                        <Table.HeaderCell>Label</Table.HeaderCell>
                        <Table.HeaderCell>                                
                            <Icon name="cogs" />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Input type="text" fluid value={ 1 } />
                        </Table.Cell>
                        <Table.Cell>
                            <Input type="text" fluid value={ true } />
                        </Table.Cell>
                        <Table.Cell>
                            <Input type="text" fluid value={ "Yes" } />
                        </Table.Cell>
                        <Table.Cell>
                            <Icon name="bars" />
                            <Icon name="trash alternate outline" color="red" />
                        </Table.Cell>
                    </Table.Row>
                    
                    <Table.Row>
                        <Table.Cell>
                            <Input type="text" fluid value={ 2 } />
                        </Table.Cell>
                        <Table.Cell>
                            <Input type="text" fluid value={ false } />
                        </Table.Cell>
                        <Table.Cell>
                            <Input type="text" fluid value={ "No" } />
                        </Table.Cell>
                        <Table.Cell>
                            <Icon name="bars" />
                            <Icon name="trash alternate outline" color="red" />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row textAlign="left">
                        <Table.HeaderCell colSpan="4">
                            <Button basic labelPosition="left">
                                <Icon name="plus" color="purple" />
                                Add Row
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Segment>
    );
}
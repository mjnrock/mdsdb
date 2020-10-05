/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Menu, Button, Icon, Table, Input } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import { useNodeContext } from "../../../lib/ReactContext";
import { Context } from "../../../App";
import { EnumMessageType } from "../../../state/SurveyState";

import MarkdownEditor from "../../MarkdownEditor";

export default function PromptSelection(props = {}) {
    const { node } = useNodeContext(Context);
    const [ text, setText ] = useState(props.prompt.text);
    const [ isVisible, setIsVisible ] = useState(true);
    const inputs = props.prompt.inputs;

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
    function removeInput(input) {
        node.next(EnumMessageType.INPUT_REMOVE, {
            prompt: props.prompt,
            input,
        });
    }
    function addInput() {
        node.next(EnumMessageType.INPUT_ADD, {
            prompt: props.prompt,
        });
    }
    function modifyInput(input, field, value) {
        node.next(EnumMessageType.INPUT_MODIFY, {
            input,
            field,
            value,
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

            <Table textAlign="center" verticalAlign="middle">
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
                    {
                        inputs.map(input => {
                            return (
                                <Table.Row key={ input.id }>
                                    <Table.Cell width={ 2 }>
                                        <Input type="text" fluid value={ input.id } />
                                    </Table.Cell>
                                    <Table.Cell width={ 6 }>
                                        <Input type="text" fluid onChange={ e => modifyInput(input, "value", e.target.value) } value={ input.value !== void 0 && input.value !== null ? input.value : "" } />
                                    </Table.Cell>
                                    <Table.Cell width={ 6 }>
                                        <Input type="text" fluid onChange={ e => modifyInput(input, "label", e.target.value) } value={ input.label !== void 0 && input.label !== null ? input.label : "" } />
                                    </Table.Cell>
                                    <Table.Cell width={ 2 }>
                                        <Icon name="trash alternate outline" color="red" onClick={ e => removeInput(input) } style={{ cursor: "pointer" }} />
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row textAlign="left">
                        <Table.HeaderCell colSpan="4">
                            <Button basic labelPosition="left" onClick={ addInput } style={{ marginLeft: 20, marginTop: 4 }}>
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
/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Icon, Menu, Button, Dropdown, Table, Input } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import { useNodeContext } from "./../../../lib/ReactContext";
import { Context } from "./../../../routes/FormBuilder";
import { EnumMessageType } from "./../../../state/FormState";

import MarkdownEditor from "./../../MarkdownEditor";

export const EnumValidator = {
    BUTTON: input => true,

    TEXT: input => true,
    TEXT_PHONE: input => input.length === 10,
    TEXT_EMAIL: input => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input),
    TEXT_MULTI: input => true,
    TEXT_MARKDOWN: input => true,

    NUMBER: input => true,
    NUMBER_INTEGER: input => true,
    NUMBER_DECIMAL: input => true,
    NUMBER_PERCENT: input => true,
    NUMBER_CURRENCY: input => true,
    
    DATE: input => true,
    TIME: input => true,
    DATETIME: input => true,

    LABEL: input => true,
    COLOR: input => true,
    FILE: input => true,
};

export default function Section(props = {}) {
    const { node } = useNodeContext(Context);
    const [ text, setText ] = useState(props.section.text);
    const [ isVisible, setIsVisible ] = useState(true);
    const entries = props.section.entries || [];

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

    function addEntry(label, type, validator, order) {
        node.next(EnumMessageType.ENTRY_ADD, {
            section: props.section,
            label,
            type,
            validator,
            order: Math.max(props.section.entries.length, props.section.entries.reduce((a, entry) => Math.max(a, (entry.order || 0)), 0)),
        });
    }
    function removeSection() {
        node.next(EnumMessageType.SECTION_REMOVE, {
            section: props.section,
        });
    }
    function removeEntry(entry) {
        node.next(EnumMessageType.ENTRY_REMOVE, {
            section: props.section,
            entry,
        });
    }
    function modifyEntry(entry, key, value) {
        node.next(EnumMessageType.ENTRY_MODIFY, {
            section: props.section,
            entry,
            newEntry: {
                ...entry,
                [ key ]: value,
            }
        });
    }

    return (
        <Segment basic color="grey" style={{ paddingRight: 0, paddingTop: 0 }}>
            <Menu size="small" style={{ marginTop: 8, marginBottom: 16 }} >
                <Menu.Item header style={{ color: "rgb(118, 118, 118)" }}>Section</Menu.Item>
                <Menu.Item header style={{ fontFamily: "monospace", fontWeight: 100, color: "#bbb" }}>{ props.section.id }</Menu.Item>
                
                <Menu.Item onClick={ e => setIsVisible(!isVisible) }>
                    <Button basic labelPosition="left">
                        <Icon name={ isVisible ? "angle down" : "angle up" } />
                        <span>{ isVisible ? "Hide" : "Show" }<span style={{ fontWeight: "bold" }}>&nbsp;Editor</span></span>
                    </Button>
                </Menu.Item>

                <Menu.Menu position="right">                    
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
            
            <Menu size="small">
                <Menu.Item header style={ { color: "rgb(118, 118, 118)" } }>Components</Menu.Item>

                <Dropdown item text={( 
                    <div>
                        <Icon name="cogs" color="green" />
                        Control
                    </div>
                )}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={ e => addEntry(null, "button", EnumValidator.BUTTON) }>
                            <Icon name="hand point up outline" color="green" />
                            Button
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown item text={( 
                    <div>
                        <Icon name="font" color="red" />
                        Text
                    </div>
                )}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={ e => addEntry(null, "text", EnumValidator.TEXT) }>
                            <Icon name="font" color="red" />
                            Generic
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item onClick={ e => addEntry(null, "text:phone", EnumValidator.TEXT_PHONE) }>
                            <Icon name="call" color="red" />
                            Phone
                        </Dropdown.Item>
                        <Dropdown.Item onClick={ e => addEntry(null, "text:email", EnumValidator.TEXT_EMAIL) }>
                            <Icon name="mail outline" color="red" />
                            Email
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item onClick={ e => addEntry(null, "text:multi", EnumValidator.TEXT_MULTI) }>
                            <Icon name="text cursor" color="red" />
                            Textarea
                        </Dropdown.Item>
                        <Dropdown.Item onClick={ e => addEntry(null, "text:markdown", EnumValidator.TEXT_MARKDOWN) }>
                            <Icon name="heading" color="red" />
                            Markdown
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
                <Dropdown item text={( 
                    <div>
                        <Icon name="hashtag" color="blue" />
                        Number
                    </div>
                )}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={ e => addEntry(null, "number", EnumValidator.NUMBER) }>
                            <Icon name="hashtag" color="blue" />
                            Generic
                        </Dropdown.Item>

                        <Dropdown.Divider />
                        
                        <Dropdown.Item onClick={ e => addEntry(null, "number:integer", EnumValidator.NUMBER_INTEGER) }>
                            <Icon name="sort numeric down" color="blue"  />
                            Integer
                        </Dropdown.Item>
                        <Dropdown.Item onClick={ e => addEntry(null, "number:decimal", EnumValidator.NUMBER_DECIMAL) }>
                            <Icon name="calculator" color="blue"  />
                            Decimal
                        </Dropdown.Item>
                        <Dropdown.Item onClick={ e => addEntry(null, "number:percent", EnumValidator.NUMBER_PERCENT) }>
                            <Icon name="percent" color="blue"  />
                            Percent
                        </Dropdown.Item>
                        <Dropdown.Item onClick={ e => addEntry(null, "number:currency", EnumValidator.NUMBER_CURRENCY) }>
                            <Icon name="dollar" color="blue" />
                            Currency
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
                <Dropdown item text={( 
                    <div>
                        <Icon name="hourglass half" color="orange" />
                        Timestamp
                    </div>
                )}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={ e => addEntry(null, "date", EnumValidator.DATE) }>
                            <Icon name="calendar alternate outline" color="orange" />
                            Date
                        </Dropdown.Item>
                        <Dropdown.Item onClick={ e => addEntry(null, "time", EnumValidator.TIME) }>
                            <Icon name="clock outline" color="orange" />
                            Time
                        </Dropdown.Item>
                        <Dropdown.Item onClick={ e => addEntry(null, "datetime", EnumValidator.DATETIME) }>
                            <Icon name="hourglass outline" color="orange" />
                            DateTime
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
                <Dropdown item text={( 
                    <div>
                        <Icon name="ellipsis horizontal" color="purple" />
                        Miscellaneous
                    </div>
                )}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={ e => addEntry(null, "label", EnumValidator.LABEL) }>
                            <Icon name="bold" color="purple" />
                            Label
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={ e => addEntry(null, "color", EnumValidator.COLOR) }>
                            <Icon name="tint" color="purple" />
                            Color
                        </Dropdown.Item>
                        <Dropdown.Item onClick={ e => addEntry(null, "file", EnumValidator.FILE) }>
                            <Icon name="file alternate outline" color="purple" />
                            File
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>

            <Table textAlign="center" verticalAlign="middle">
                <Table.Header>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell>Label</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Validator</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        entries.map(entry => (
                            <Table.Row key={ entry.id }>
                                <Table.Cell width={ 8 }>
                                    <div style={{ display: "flex" }}>
                                        <Icon name="bars" color="grey" style={{ margin: "auto", marginRight: 8  }} />
                                        <Input type="text" style={{ flexGrow: 1 }} placeholder="[ Entry Label ]" value={ entry.label || "" } onChange={ e => modifyEntry(entry, "label", e.target.value) } />
                                    </div>
                                </Table.Cell>
                                <Table.Cell width={ 2 }>
                                    <Input type="text" fluid readOnly value={ entry.type || "" } />
                                </Table.Cell>
                                {/* {
                                    entry.type === "button" ? (
                                        <Table.Cell width={ 4 }>
                                            <Dropdown fluid>
                                                {
                                                    Object.entries(state.functions || {}).map(([ key, value ]) => (
                                                        <Dropdown.Item>{ key }</Dropdown.Item>
                                                    ))
                                                }
                                            </Dropdown>
                                        </Table.Cell>
                                    ) : (
                                        <Table.Cell width={ 4 }>
                                            <Input type="text" fluid readOnly placeholder="[ Validator ]" value={ JSON.stringify(entry.validator) } />
                                        </Table.Cell>
                                    )
                                } */}
                                <Table.Cell width={ 4 }>
                                    <Input type="text" fluid readOnly placeholder="[ Validator ]" value={ JSON.stringify(entry.validator) } />
                                </Table.Cell>
                                <Table.Cell width={ 2 }>
                                    <Icon name="trash alternate outline" color="red" onClick={ e => removeEntry(entry) } style={{ cursor: "pointer" }} />
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </Segment>
    );
}
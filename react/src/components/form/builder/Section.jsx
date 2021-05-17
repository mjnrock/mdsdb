import React, { useState, useEffect } from "react";
import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";
import { Segment, Icon, Menu, Button, Dropdown, Table } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { Context } from "./../../../routes/FormBuilder";
import { EnumMessageType, EnumComponent } from "./../../../state/FormBuilderState";

import MarkdownEditor from "./../../MarkdownEditor";
import Component from "./Component";

export default function Section({ section }) {
    const { state, dispatch } = useContextNetwork(Context, "network");
    const [ text, setText ] = useState(section.text);
    const [ isVisible, setIsVisible ] = useState(true);
    const entries = section.entries || [];

    useEffect(() => {
        if(section.text && section.text.length) {
            setText(section.text);
        }
    }, [ section ]);

    useEffect(() => {
        dispatch(EnumMessageType.SECTION_TEXT, {
            section: section,
            text,
        });
    }, [ text, section, dispatch ]);

    function addEntry(label, type, validator, order) {
        dispatch(EnumMessageType.ENTRY_ADD, {
            section: section,
            label,
            type,
            validator,
            order: Math.max(section.entries.length, section.entries.reduce((a, entry) => Math.max(a, (entry.order || 0)), 0)),
        });
    }
    function removeSection() {
        dispatch(EnumMessageType.SECTION_REMOVE, {
            section: section,
        });
    }
    function modifyEntry(entry, prop, value) {
        dispatch(EnumMessageType.ENTRY_MODIFY, {
            section: section,
            entry,
            newEntry: {
                ...entry,
                [ prop ]: value,
            }
        });
    }
    

    function onDragEnd(result) {
        const { source, destination } = result;

        if(!destination) {
            return;
        }

        if(source.droppableId === destination.droppableId) {
            if(source.droppableId === section.id) {
                dispatch(EnumMessageType.ENTRY_REORDER, {
                    section: section,
                    left: source.index,
                    right: destination.index,
                });
            }
        }
    }

    return (
        <Segment basic color="grey" style={{ paddingRight: 0, paddingTop: 0 }}>
            <Menu size="small" style={{ marginTop: 8, marginBottom: 16 }} >
                <Menu.Item header style={{ color: "rgb(118, 118, 118)" }}>Section</Menu.Item>
                <Menu.Item header style={{ fontFamily: "monospace", fontWeight: 100, color: "#bbb" }}>{ section.id }</Menu.Item>
                
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

                {
                    Object.entries(EnumComponent).map(([ key, obj ]) => {
                        const { icon, color, values } = obj;

                        const children = values.map((value, i) => {
                            if(value === true) {
                                return (
                                    <Dropdown.Divider key={ i } />
                                );
                            } else if(typeof value === "string" || value instanceof String) {
                                return (
                                    <Dropdown.Header key={ i } content={ value } />
                                );
                            }

                            return (
                                <Dropdown.Item key={ i } onClick={ e => addEntry(null, value.type, value.validator) }>
                                    <Icon name={ value.icon } color={ color } />
                                    { value.label }
                                </Dropdown.Item>
                            );
                        });

                        return (
                            <Dropdown item key={ key } text={( 
                                <div>
                                    <Icon name={ icon } color={ color } />
                                    { key }
                                </div>
                            )}>
                                <Dropdown.Menu>
                                    {
                                        children
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        )
                    })
                }
            </Menu>

            <Table textAlign="center" verticalAlign="middle">
                <Table.Header>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell>Data</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <DragDropContext onDragEnd={ onDragEnd }>
                    <Droppable droppableId={ section.id }>
                        { (provided, snapshot) => (
                            <tbody
                                ref={ provided.innerRef }
                                {...provided.droppableProps}
                            >                            
                                {
                                    entries.map(entry => (                                        
                                        <Draggable
                                            key={ entry.id }
                                            draggableId={ entry.id }
                                            index={ entry.order }>
                                            { (provided, snapshot) => (
                                                <tr
                                                    key={ entry.id }
                                                    className={ `middle aligned` }
                                                    ref={ provided.innerRef }
                                                    { ...provided.draggableProps }
                                                >
                                                    <Component key={ entry.id } section={ section } entry={ entry } data={ state } onModify={ modifyEntry } dragHandleProps={ provided.dragHandleProps } />
                                                </tr>
                                            ) }
                                        </Draggable>
                                    ))
                                }
                                { provided.placeholder }
                            </tbody>
                        ) }
                    </Droppable>
                </DragDropContext>
            </Table>
        </Segment>
    );
}
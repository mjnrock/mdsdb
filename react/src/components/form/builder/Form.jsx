/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Input, Menu, Icon, Button } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import { useNodeContext } from "../../../lib/ReactContext";
import { Context } from "./../../../routes/FormBuilder";
import { EnumMessageType } from "../../../state/FormState";

import MarkdownEditor from "./../../MarkdownEditor";
import Section from "./Section";

export default function Form(props = {}) {
    const { node, state } = useNodeContext(Context);
    const [ title, setTitle ] = useState(state.title);
    const [ instructions, setInstructions ] = useState(state.instructions);
    const [ isVisible, setIsVisible ] = useState(true);
    const sections = state.sections || [];

    useEffect(() => {
        node.next(EnumMessageType.FORM_TITLE, {
            title,
        });
    }, [ title ]);

    useEffect(() => {
        node.next(EnumMessageType.FORM_INSTRUCTIONS, {
            instructions,
        });
    }, [ instructions ]);

    function addSection() {
        node.next(EnumMessageType.SECTION_ADD, {
            text: "",
        });
    }

    return (
        <>
            <Segment color="black" style={ { paddingTop: 0 } }>
                <Menu style={ { marginTop: 8, marginBottom: 20 } } >
                    <Menu.Item header style={ { color: "rgb(118, 118, 118)" } }>Form</Menu.Item>
                    <Menu.Item header style={ { fontFamily: "monospace", fontWeight: 100, color: "#bbb" } }>{ state.id }</Menu.Item>

                    <Menu.Item name="text" onClick={ e => addSection() }>
                        <Icon.Group size="large">
                            <Icon name="list alternate outline" color="grey" />
                            <Icon corner="bottom right" name="add" color="grey" />
                        </Icon.Group>
                    </Menu.Item>

                    <Menu.Menu position="right">
                        {/* <Modal
                            onClose={ () => setOpen(false) }
                            onOpen={ () => setOpen(true) }
                            open={ open }
                            trigger={(
                                <Menu.Item onClick={ console.log }>
                                    <Button basic labelPosition="left">
                                        <Icon name="unhide" color="grey" />
                                        Preview
                                    </Button>
                                </Menu.Item>
                            )}
                        >
                            <SurveyViewer data={ state } />
                        </Modal> */}

                        <Menu.Item onClick={ e => setIsVisible(!isVisible) }>
                            <Button basic labelPosition="left">
                                <Icon name={ isVisible ? "caret down" : "caret up" } />
                                { isVisible ? "Collapse" : "Expand" }
                            </Button>
                        </Menu.Item>

                        <Menu.Item onClick={ console.log }>
                            <Button basic labelPosition="left">
                                <Icon name="save outline" color="grey" />
                                Save
                            </Button>
                        </Menu.Item>

                        <Menu.Item onClick={ console.log }>{/* TODO Add a confirmation box upon clicking this */ }
                            <Button basic labelPosition="left">
                                <Icon name="sign-out" color="grey" />
                                Exit Without Saving
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Input
                    fluid
                    placeholder="[ Form Title ]"
                    value={ title }
                    onChange={ e => setTitle(e.target.value) }
                    style={ {
                        fontSize: "20pt",
                    } }
                />


                {
                    isVisible ? (
                        <MarkdownEditor onUpdate={ setInstructions } placeholder="[ Form Instructions ]" value={ instructions } style={ { marginTop: 8 } } />
                    ) : (
                        <MarkdownViewer source={ instructions } />
                    )
                }

                {
                    sections.map(section => (
                        <Section key={ section.id } section={ section } />
                    ))
                }
            </Segment>
            
            <Segment color="red" secondary>
                <pre>
                    {
                        JSON.stringify(state, null, 2)
                    }
                </pre>
            </Segment>
        </>
    );
}
import React, { useState, useEffect } from "react";
import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";
import { Segment, Input, Menu, Icon, Button, Modal } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import { Context } from "./../../../App";
import { EnumMessageType } from "./../../../state/SurveyNetwork";

import MarkdownEditor from "./../../MarkdownEditor";
import Section from "./Section";
import SurveyViewer from "./../viewer/Survey";

export default function Survey(props = {}) {
    const { state, dispatch } = useContextNetwork(Context, "network");
    // const [ wasModified, setWasModified ] = useState(false);    //TODO Use this or similar to highligh the "Save" icon upon changes (maybe hash state for comparison?)
    const [ title, setTitle ] = useState(state.title);
    const [ instructions, setInstructions ] = useState(state.instructions);
    const [ isVisible, setIsVisible ] = useState(true);
    const [ open, setOpen ] = React.useState(false);
    const sections = state.sections || [];

    useEffect(() => {
        dispatch(EnumMessageType.SURVEY_TITLE, {
            title,
        });
    }, [ dispatch, title ]);

    useEffect(() => {
        dispatch(EnumMessageType.SURVEY_INSTRUCTIONS, {
            instructions,
        });
    }, [ dispatch, instructions ]);

    function addSection() {
        dispatch(EnumMessageType.SECTION_ADD, {
            text: "",
            prompts: [],
        });
    }

    function saveSurvey() {
        dispatch(EnumMessageType.SAVE_SURVEY);
    }

    return (
        <>
            <Segment color="black" style={ { paddingTop: 0 } }>
                <Menu style={ { marginTop: 8, marginBottom: 20 } } >
                    <Menu.Item header style={ { color: "rgb(118, 118, 118)" } }>Survey</Menu.Item>
                    <Menu.Item header style={ { fontFamily: "monospace", fontWeight: 100, color: "#bbb" } }>{ state.id }</Menu.Item>

                    <Menu.Item name="text" onClick={ e => addSection() }>
                        <Icon.Group size="large">
                            <Icon name="list alternate outline" color="grey" />
                            <Icon corner="bottom right" name="add" color="grey" />
                        </Icon.Group>
                    </Menu.Item>

                    <Menu.Item onClick={ e => setIsVisible(!isVisible) }>
                        <Button basic labelPosition="left">
                            <Icon name={ isVisible ? "caret down" : "caret up" } />
                            { isVisible ? "Collapse" : "Expand" }
                        </Button>
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Modal
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
                        </Modal>

                        <Menu.Item onClick={ saveSurvey }>
                            <Button basic labelPosition="left">
                                <Icon name="save outline" color="grey" />
                                Save
                            </Button>
                        </Menu.Item>

                        <Menu.Item onClick={ console.log }>
                            <Button basic labelPosition="left">
                                <Icon name="download" color="grey" />
                                Load
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
                    placeholder="[ Survey Title ]"
                    value={ title }
                    onChange={ e => setTitle(e.target.value) }
                    style={ {
                        fontSize: "20pt",
                    } }
                />


                {
                    isVisible ? (
                        <MarkdownEditor onUpdate={ setInstructions } placeholder="[ Survey Instructions ]" value={ instructions } style={ { marginTop: 8 } } />
                    ) : (
                        <Segment basic>
                            <MarkdownViewer source={ instructions } />
                        </Segment>
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
/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Input, Menu, Icon, Button, Modal } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import { useNodeContext } from "../../../lib/ReactContext";
import { Context } from "./../../../routes/FormBuilder";
import { EnumMessageType } from "../../../state/FormBuilderState";

import MarkdownEditor from "./../../MarkdownEditor";
import Section from "./Section";
import FormViewer from "./../viewer/Form";
import FunctionEditor from "./FunctionEditor";
import QueryEditor from "./QueryEditor";

export default function Form(props = {}) {
    const { node, state } = useNodeContext(Context);
    const [ title, setTitle ] = useState(state.title || "");
    const [ instructions, setInstructions ] = useState(state.instructions || "");
    const [ isVisible, setIsVisible ] = useState(true);
    const [ open, setOpen ] = React.useState({ main: false });
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
    function addQuery() {
        // node.next(EnumMessageType.QUERY_ADD, {
        //     text: "",
        // });
    }
    function modifyQuery(name, query) {
        node.next(EnumMessageType.QUERY_MODIFY, {
            name,
            query,
        });
    }
    function modifyFunction(name, code) {
        node.next(EnumMessageType.FUNCTION_MODIFY, {
            name,
            code,
        });
    }

    function saveForm() {
        node.next(EnumMessageType.SAVE_FORM);
    }

    return (
        <>
            <Segment color="black" style={ { paddingTop: 0 } }>
                <Menu style={ { marginTop: 8, marginBottom: 20 } } >
                    <Menu.Item header style={ { color: "rgb(118, 118, 118)" } }>Form</Menu.Item>
                    <Menu.Item header style={ { fontFamily: "monospace", fontWeight: 100, color: "#bbb" } }>{ state.id }</Menu.Item>

                    <Menu.Item onClick={ e => setIsVisible(!isVisible) }>
                        <Button basic labelPosition="left">
                            <Icon name={ isVisible ? "angle down" : "angle up" } />
                            <span>{ isVisible ? "Hide" : "Show" }<span style={ { fontWeight: "bold" } }>&nbsp;Editor</span></span>
                        </Button>
                    </Menu.Item>

                    <Modal
                        closeIcon
                        onClose={ () => setOpen({ ...open, fn: false }) }
                        onOpen={ () => setOpen({ ...open, fn: true }) }
                        open={ open.fn }
                        trigger={ (
                            <Menu.Item name="text" onClick={ e => { } }>
                                <Icon.Group size="large">
                                    <Icon name="code" color="grey" />
                                    <Icon corner="bottom right" name="add" color="grey" />
                                </Icon.Group>
                            </Menu.Item>
                        ) }
                    >
                        <FunctionEditor
                            functions={ state.functions }
                            onSubmit={ modifyFunction }
                            onCancel={ () => setOpen({ ...open, fn: false }) }
                            onSave={ () => setOpen({ ...open, fn: false }) }
                        />
                    </Modal>

                    <Modal
                        closeIcon
                        onClose={ () => setOpen({ ...open, query: false }) }
                        onOpen={ () => setOpen({ ...open, query: true }) }
                        open={ open.query }
                        trigger={ (
                            <Menu.Item name="text" onClick={ e => addQuery() }>
                                <Icon.Group size="large">
                                    <Icon name="table" color="grey" />
                                    <Icon corner="bottom right" name="add" color="grey" />
                                </Icon.Group>
                            </Menu.Item>
                        ) }
                    >
                        <QueryEditor
                            queries={ state.queries }
                            onSubmit={ modifyQuery }
                            onCancel={ () => setOpen({ ...open, query: false }) }
                            onSave={ () => setOpen({ ...open, query: false }) }
                        />
                    </Modal>

                    <Menu.Item name="text" onClick={ e => addSection() }>
                        <Icon.Group size="large">
                            <Icon name="list alternate outline" color="grey" />
                            <Icon corner="bottom right" name="add" color="grey" />
                        </Icon.Group>
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Modal
                            closeIcon
                            onClose={ () => setOpen({ ...open, preview: false }) }
                            onOpen={ () => setOpen({ ...open, preview: true }) }
                            open={ open.preview }
                            trigger={ (
                                <Menu.Item onClick={ () => { } }>
                                    <Button basic labelPosition="left">
                                        <Icon name="unhide" color="grey" />
                                        Preview
                                    </Button>
                                </Menu.Item>
                            ) }
                        >
                            <FormViewer
                                controller={{
                                    next: node.next,
                                    enum: EnumMessageType,
                                    //TODO Add meta form functions (e.g. prompt getter/setter)
                                }}
                                data={ state }
                            />
                        </Modal>

                        <Menu.Item onClick={ saveForm }>
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
                        JSON.stringify(state, function (k, v) {
                            if (typeof v === "function") {
                                return v + "";
                            }
                            return v;
                        }, 2)
                    }
                </pre>
            </Segment>
        </>
    );
}
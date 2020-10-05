/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Icon, Menu, Button, Dropdown } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import { useNodeContext } from "./../../../lib/ReactContext";
import { Context } from "./../../../App";
import { EnumMessageType } from "./../../../state/SurveyState";

import MarkdownEditor from "./../../MarkdownEditor";

export default function Section(props = {}) {
    const { node } = useNodeContext(Context);
    const [ text, setText ] = useState(props.section.text);
    const [ isVisible, setIsVisible ] = useState(true);

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

    function addPrompt(type) {
        node.next(EnumMessageType.PROMPT_ADD, {
            type,
            section: props.section,
        });
    }
    function removeSection() {
        node.next(EnumMessageType.SECTION_REMOVE, {
            section: props.section,
        });
    }

    return (
        <Segment basic color="grey" style={{ paddingRight: 0, paddingTop: 0 }}>
            <Menu size="small" style={{ marginTop: 8, marginBottom: 16 }} >
                <Menu.Item header style={{ color: "rgb(118, 118, 118)" }}>Section</Menu.Item>
                <Menu.Item header style={{ fontFamily: "monospace", fontWeight: 100, color: "#bbb" }}>{ props.section.id }</Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item onClick={ e => setIsVisible(!isVisible) }>
                        <Button basic labelPosition="left">
                            <Icon name={ isVisible ? "caret down" : "caret up" } />
                            { isVisible ? "Collapse" : "Expand" }
                        </Button>
                    </Menu.Item>
                    
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
                        <Icon name="font" color="red" />
                        Text
                    </div>
                )}>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Icon name="font"/>
                            Generic
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item>
                            <Icon name="call"/>
                            Phone
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Icon name="mail outline"/>
                            Email
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item>
                            <Icon name="text cursor"/>
                            Textarea
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Icon name="heading"/>
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
                        <Dropdown.Item>
                            <Icon name="hashtag"/>
                            Generic
                        </Dropdown.Item>

                        <Dropdown.Divider />
                        
                        <Dropdown.Item>Integer</Dropdown.Item>
                        <Dropdown.Item>Decimal</Dropdown.Item>
                        <Dropdown.Item>
                            <Icon name="dollar"/>
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
                        <Dropdown.Item>
                            <Icon name="calendar alternate outline"/>
                            Date
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Icon name="clock outline"/>
                            Time
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Icon name="hourglass outline"/>
                            DateTime
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        </Segment>
    );
}
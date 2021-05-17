import React, { useState, useEffect } from "react";
import { Segment, Grid, Input, Button, Dropdown, Icon, Menu, Message, Header } from "semantic-ui-react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";

export default function FunctionEditor({ functions = {}, onSubmit, onSave, onCancel }) {
    const [ current, setCurrent ] = useState("");
    const [ name, setName ] = useState("");
    const [ code, setCode ] = useState(
`// Example Code
function(data, dispatch) {
    // Invoke a dispatch(type, ...payload)
    console.log(dispatch);
    
    // Get the Form data
    console.log(data);

    return;
}`
    );

    function save() {
        if(typeof onSubmit === "function") {
            onSubmit(name, code || code.constructor.name);
        }
        if(typeof onSave === "function") {
            onSave();
        }
    }
    function cancel() {
        if(typeof onCancel === "function") {
            onCancel();
        }
    }

    useEffect(() => {
        if(current in functions) {
            setCode(functions[ current ].toString());
            setName(current);
        }
    }, [ current, functions ]);

    return (
        <Segment>
            <Menu size="small" style={{ marginBottom: 20 }}>
                <Dropdown fluid item text={( 
                    <div>
                        <Icon name="cogs" color="green" />
                        { (name in functions) ? name : "Select an Existing Function..." }
                    </div>
                )}>
                    <Dropdown.Menu>
                        {
                            Object.entries(functions || {}).map(([ key, value ]) => (
                                <Dropdown.Item key={ key } onClick={ e => setCurrent(key) }>{ key }</Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>

            {
                (name in functions) ? (
                    <Message icon>
                        <Icon name="code" color="orange" />
                        <Message.Content>
                            <Header as="h3">{ name }</Header>
                            You are currently modifying an existing function.<br /><br />
                            To overwrite, click <span style={{ fontWeight: "bold" }}>Save</span>; otherwise, change the <span style={{ fontWeight: "bold" }}>Name</span> field before saving.
                        </Message.Content>
                    </Message>
                ) : null
            }

            <Grid>
                <Grid.Row>
                    <Grid.Column width={ 2 } style={{ fontWeight: "bold", margin: "auto" }}>
                        Name
                    </Grid.Column>
                    <Grid.Column width={ 14 }>
                        <Input type="text" fluid onChange={ e => setName(e.target.value) } value={ name } />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{ marginBottom: 0, paddingBottom: 0 }}>
                    <Grid.Column width={ 2 } style={{ fontWeight: "bold", margin: "auto" }}>
                        Text
                    </Grid.Column>
                    <Grid.Column width={ 14 }>
                        <CodeMirror onBeforeChange={ (editor, data, value) => setCode(value) } value={ code } options={{
                            lineNumbers: true,
                            mode: "javascript",
                            code: code,
                        }} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row style={{ marginTop: 6, paddingTop: 0 }}>
                    <Grid.Column width={ 16 } style={{ fontSize: 12 }}>
                        <div>You must include the full function definition, including arguments, body, and any pertinent scope bindings.</div>
                        <div>All functions will receive <code>(controller, state, react)</code> as the argument(s).</div>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={ 16 }>
                        <Button.Group fluid>
                            <Button onClick={ e => save() } color="green">Save</Button>
                            <Button onClick={ e => cancel() }>Cancel</Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
}
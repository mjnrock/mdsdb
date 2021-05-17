import React, { useState, useEffect } from "react";
import { Segment, Grid, Input, Button, Dropdown, Icon, Menu, Message, Header } from "semantic-ui-react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";

export default function QueryEditor({ queries = {}, onSubmit, onSave, onCancel }) {
    const [ current, setCurrent ] = useState("");
    const [ name, setName ] = useState("");
    const [ query, setQuery ] = useState(
`// Example Query`
    );

    function save() {
        if(typeof onSubmit === "function") {
            onSubmit(name, query || query.constructor.name);
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
        if(current in queries) {
            setQuery(queries[ current ].toString());
            setName(current);
        }
    }, [ current, queries ]);

    return (
        <Segment>
            <Menu size="small" style={{ marginBottom: 20 }}>
                <Dropdown fluid item text={( 
                    <div>
                        <Icon name="cogs" color="blue" />
                        { (name in queries) ? name : "Select an Existing Query..." }
                    </div>
                )}>
                    <Dropdown.Menu>
                        {
                            Object.entries(queries || {}).map(([ key, value ]) => (
                                <Dropdown.Item key={ key } onClick={ e => setCurrent(key) }>{ key }</Dropdown.Item>
                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>

            {
                (name in queries) ? (
                    <Message icon>
                        <Icon name="code" color="orange" />
                        <Message.Content>
                            <Header as="h3">{ name }</Header>
                            You are currently modifying an existing query.<br /><br />
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
                        <CodeMirror onBeforeChange={ (editor, data, value) => setQuery(value) } value={ query } options={{
                            lineNumbers: true,
                            mode: "javascript",
                            code: query,
                        }} />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={ 16 }>
                        <Button.Group fluid>
                            <Button onClick={ e => save() } color="blue">Save</Button>
                            <Button onClick={ e => cancel() }>Cancel</Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
}
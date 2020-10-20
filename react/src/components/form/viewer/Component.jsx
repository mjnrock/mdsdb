/* eslint-disable */
import React from "react";
import { Container, Input, Grid, TextArea, Button } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";
import MarkdownEditor from "./../../MarkdownEditor";

export default function Component(props = {}) {
    const entry = props.entry;
    const data = props.data || {};

    function onResponse(entry, value) {
        if(typeof props.onResponse === "function") {
            props.onResponse(entry, value);
        }
    }

    let input = null;
    if(entry.type === "text:multi") {
        input = <TextArea fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type === "text:markdown") {
        input = <MarkdownEditor onUpdate={ text => onResponse(entry, text) } style={{ flexGrow: 1 }} />
    } else if(entry.type === "text:email") {
        input = <Input type="email" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type === "text:phone") {
        input = <Input type="tel" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type.match(/text.*/i)) {
        input = <Input type="text" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type.match(/number.*/i)) {
        input = <Input type="number" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type === "date") {
        input = <Input type="date" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type === "time") {
        input = <Input type="time" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type === "datetime") {
        input = <Input type="datetime-local" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type === "color") {
        input = <Input type="color" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type === "file") {
        input = <Input type="file" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type === "label") {
        input = <div style={{ flexGrow: 1 }}>{ entry.label }</div>
    } else if(entry.type === "button") {
        input = <Button fluid onClick={ e => {
            const fn = data.functions[ entry.value ];

            if(typeof fn === "function") {
                fn(e);
            }
        } } style={{ flexGrow: 1 }}>{ entry.label }</Button>
    }

    return (
        <Container style={{ marginBottom: "1em" }}>
            <MarkdownViewer source={ entry.text } />

            <Grid>
                <Grid.Row>
                    {
                        [ "label", "button" ].includes(entry.type) ? (
                            <>
                                <Grid.Column width={ 16 } style={{ fontWeight: "bold", margin: "auto" }}>
                                    { input }
                                </Grid.Column>
                            </>
                        ) : (
                            <>
                                <Grid.Column width={ 2 } style={{ fontWeight: "bold", margin: "auto" }}>
                                    { entry.label }
                                </Grid.Column>
                                <Grid.Column width={ 14 }>
                                    { input }
                                </Grid.Column>
                            </>
                        )
                    }
                </Grid.Row>
            </Grid>
        </Container>
    );
}
import React, { useState } from "react";
import { Container, TextArea } from "semantic-ui-react";

export default function Prompt(props = {}) {
    const [ text, setText ] = useState("");

    return (
        <Container fluid>
            <TextArea
                value={ text }
                onChange={ e => setText(e.target.value) }
            />
        </Container>
    );
}
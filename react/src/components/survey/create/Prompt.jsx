import React, { useState } from "react";
import { Container, TextArea, Grid, Button, Icon } from "semantic-ui-react";

export default function Prompt(props = {}) {
    const [ text, setText ] = useState("");

    return (
        <Container fluid>
            <Grid>
                <Grid.Column width={ 15 }>
                    <TextArea
                        placeholder="Add Prompt Text..."
                        value={ text }
                        onChange={ e => setText(e.target.value) }
                    />
                </Grid.Column>
                <Grid.Column width={ 1 }>
                    <Button icon floated="right" basic>
                        <Icon name="cog" />
                    </Button>
                </Grid.Column>
            </Grid>
        </Container>
    );
}
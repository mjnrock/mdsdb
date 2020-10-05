/* eslint-disable */
import React, { useState } from "react";
import { Segment, Header } from "semantic-ui-react";

export default function BarCode(props) {
    const [ data, setData ] = useState({});

    return (
        <Segment basic textAlign="center">
            <Header as="h3" style={{ fontStyle: "italic" }}>
                Scan with your camera app to use your phone as a controller.
            </Header>

            <pre>
                {
                    JSON.stringify(data, null, true)
                }
            </pre>
        </Segment>
    );
}
/* eslint-disable */
import React, { useState } from "react";
import { Segment } from "semantic-ui-react";

import Entry from "./Entry";

export default function Dictionary(props) {
    const [ data, setData ] = useState({});

    return (
        <Segment>
            <Entry />
        </Segment>
    );
}
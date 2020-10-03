/* eslint-disable */
import React, { useState } from "react";
import { Segment } from "semantic-ui-react";

import MarkdownEditor from "./MarkdownEditor";

export default function Prompt(props = {}) {
    const [ text, setText ] = useState("");

    return (
        <Segment basic>
            <MarkdownEditor onUpdate={ setText } placeholder="Add Prompt Text..." />
        </Segment>
    );
}
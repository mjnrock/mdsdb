import React, { useState, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";

export default function MarkdownEditor({ onUpdate, options = {}, placeholder, ...rest } = {}) {
    const [ text, setText ] = useState("");

    useEffect(() => {
        if(typeof onUpdate === "function" && !!text) {
            onUpdate(text);
        }
    }, [ text, onUpdate ]);

    return (
        <SimpleMDE
            value={ text }
            onChange={ setText }
            options={{
                showIcons: [ "code", "table", "strikethrough", "horizontal-rule" ],
                hideIcons: [ "fullscreen", "side-by-side" ],
                placeholder,
                status: false,
                ...options
            }}
            { ...rest }
        />
    );
}
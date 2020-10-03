import React, { useState, useEffect } from "react";
import LibInputText from "./../lib/prompt/InputText";
import { Input } from "semantic-ui-react";

export default function InputText(props = {}) {
    const [ input, setInput ] = useState(LibInputText.FromObject(props));

    useEffect(() => {
        if(props.value !== input.value) {
            input.value = props.value;

            setInput(new LibInputText(props));
        }
    }, [ input, props, setInput ]);

    const value = input.value;

    return (
        <Input
            type="text"
            style={{
                border: input.check() ? `2px solid #0f0` : `2px solid #f00`,
                borderRadius: 4,
            }}
            value={ value }
        />
    );
}
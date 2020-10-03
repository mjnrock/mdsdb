import React, { useState, useEffect } from "react";
import Lib_InputText from "../../lib/test/prompt/InputText";
import { Input } from "semantic-ui-react";

export default function InputText(props = {}) {
    const [ input, setInput ] = useState(Lib_InputText.FromObject(props));
    const [ hasBeenTouched, setHasBeenTouched ] = useState(false);

    useEffect(() => {
        if(props.value !== void 0 && props.value !== input.value) {
            input.value = props.value;

            setInput(new Lib_InputText(props));
        }
    }, [ input, props, setInput ]);

    const value = input.value || "";

    return (
        <Input
            type="text"
            style={
                hasBeenTouched ? {
                    border: input.check() ? `2px solid #0f0` : `2px solid #f00`,
                    borderRadius: 4,
                } : {}
            }
            value={ value }
            onChange={ e => {
                setHasBeenTouched(true);
                setInput(new Lib_InputText({
                    ...props,
                    value: e.target.value,
                }));
            }}
        />
    );
}
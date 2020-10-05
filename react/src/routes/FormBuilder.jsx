/* eslint-disable */
import React from "react";
import { Segment } from "semantic-ui-react";

import Form from "./../components/form/builder/Form";
import StateNode from "./../state/FormState";

export const Context = React.createContext(StateNode);

export default function FormBuilder(props) {
    return (
        <Context.Provider value={ { node: StateNode } }>
            <Segment>
                <Form />
            </Segment>
        </Context.Provider>
    );
}
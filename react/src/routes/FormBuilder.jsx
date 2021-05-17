/* eslint-disable */
import React from "react";
import { Segment } from "semantic-ui-react";

import Form from "./../components/form/builder/Form";
import FormBuilderState from "./../state/FormBuilderState";

export const Context = React.createContext(FormBuilderState);

export default function FormBuilder(props) {
    return (
        <Context.Provider value={{ network: FormBuilderState }}>
            <Segment>
                <Form />
            </Segment>
        </Context.Provider>
    );
}
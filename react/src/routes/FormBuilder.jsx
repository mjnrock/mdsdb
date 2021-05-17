/* eslint-disable */
import React from "react";
import { Segment } from "semantic-ui-react";

import Form from "./../components/form/builder/Form";
import FormBuilderNetwork from "./../state/FormBuilderNetwork";

export const State = FormBuilderNetwork();
export const Context = React.createContext(State);

export default function FormBuilder(props) {
    return (
        <Context.Provider value={{ network: State }}>
            <Segment>
                <Form />
            </Segment>
        </Context.Provider>
    );
}
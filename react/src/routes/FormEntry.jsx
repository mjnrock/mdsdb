import React from "react";
import { Segment } from "semantic-ui-react";

import FormEntryNetwork from "./../state/FormEntryNetwork";
import FormEntry from "../components/form/FormEntry";

export const State = FormEntryNetwork();
export const Context = React.createContext(State);

export default function FormBuilder(props) {
    return (
        <Context.Provider value={{ network: State }}>
            <Segment>
                <FormEntry />
            </Segment>
        </Context.Provider>
    );
}
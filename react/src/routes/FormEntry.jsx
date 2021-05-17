import React from "react";
import { Segment } from "semantic-ui-react";

import FormEntryState from "./../state/FormEntryState";
import FormEntry from "../components/form/FormEntry";

export const Context = React.createContext(FormEntryState);

export default function FormBuilder(props) {
    return (
        <Context.Provider value={{ network: FormEntryState }}>
            <Segment>
                <FormEntry />
            </Segment>
        </Context.Provider>
    );
}
/* eslint-disable */
import React from "react";
import { Segment } from "semantic-ui-react";

import StateNode from "../state/DictionaryState";

import DictionaryCore from "./../components/dictionary/DictionaryCore";

export const Context = React.createContext(StateNode);

export default function Dictionary(props) {
    return (
        <Context.Provider value={ { node: StateNode } }>
            <Segment>

                <DictionaryCore />
            </Segment>
        </Context.Provider>
    );
}
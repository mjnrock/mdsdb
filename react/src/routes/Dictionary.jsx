/* eslint-disable */
import React from "react";

import StateNode from "../state/DictionaryState";

import DictionaryCore from "./../components/dictionary/DictionaryCore";

export const Context = React.createContext(StateNode);

export default function Dictionary(props) {
    return (
        <Context.Provider value={ { node: StateNode } }>
            <DictionaryCore />
        </Context.Provider>
    );
}
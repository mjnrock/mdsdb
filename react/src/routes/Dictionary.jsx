/* eslint-disable */
import React from "react";

import DictionaryNetwork from "../state/DictionaryNetwork";

import DictionaryCore from "./../components/dictionary/DictionaryCore";

export const State = DictionaryNetwork();
export const Context = React.createContext(State);

export default function Dictionary(props) {
    return (
        <Context.Provider value={{ network: State }}>
            <DictionaryCore />
        </Context.Provider>
    );
}
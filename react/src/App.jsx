import React from "react";
import { Segment } from "semantic-ui-react";
import Survey from "./components/survey/create/Survey";

import Node from "./lib/Node";

const StateNode = new Node({
    state: {        
        title: "",
        instructions: "",
        sections: [],
    },
});

export const EnumMessageType = {
    SURVEY_TITLE: "SURVEY_TITLE",
    SURVEY_INSTRUCTIONS: "SURVEY_INSTRUCTIONS",
};

StateNode.addReducer(Node.TypedPayload(EnumMessageType.SURVEY_TITLE, (state, type, data) => {
    const { title } = data;

    return {
        ...state,
        title,
    };
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.SURVEY_INSTRUCTIONS, (state, type, data) => {
    const { instructions } = data;

    return {
        ...state,
        instructions,
    };
}));

export const Context = React.createContext(StateNode);

function App() {
    return (
        <Context.Provider value={{ node: StateNode }}>
            <Segment>
                <Survey />
            </Segment>
        </Context.Provider>
    );
}

export default App;
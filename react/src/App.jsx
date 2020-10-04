import React from "react";
import { Segment } from "semantic-ui-react";
import Survey from "./components/survey/create/Survey";
import StateNode from "./state/state";

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
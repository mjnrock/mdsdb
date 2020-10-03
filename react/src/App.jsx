import React from "react";
import { Segment } from "semantic-ui-react";

import InputText from "./components/InputText";

function App() {
    return (
        <Segment>
            <InputText validator={ value => /^\d+$/i.test(value) } />
        </Segment>
    );
}

export default App;
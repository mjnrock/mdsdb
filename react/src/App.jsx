import React from "react";
import { Segment } from "semantic-ui-react";

import Input from "./components/InputText";

function App() {
    return (
        <Segment>
            <Input validator={ value => /^\d+$/i.test(value) } />
        </Segment>
    );
}

export default App;
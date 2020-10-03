import React from "react";
import { Segment } from "semantic-ui-react";

import Input from "./components/Input";

function App() {
    return (
        <Segment>
            <Input value={ "13" } validator={ value => {
                console.log(value);

                return typeof value === "number";
            }} />
        </Segment>
    );
}

export default App;
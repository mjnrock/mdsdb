/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Dimmer, Loader, Header } from "semantic-ui-react";

// import StateNode from "./state/FormState";
// import Form from "./components/form/builder/Form";

import StateNode from "./state/SurveyState";
import Survey from "./components/survey/viewer/Survey";
// StateNode.state = JSON.parse(`{\r\n    \"id\": \"98a745fb-cbb6-4e2f-ba92-7589c9436ae7\",\r\n    \"title\": \"Demo Survey\",\r\n    \"instructions\": \"This is where the instructions for the survey can go.  In this survey, you will do the following:\\n* Read some text\\n* Answer some questions\\n* Save the results\\n\\nThis text can also be **emphasized** or *italicized*.\",\r\n    \"sections\": [\r\n      {\r\n        \"id\": \"87bfcf68-46bc-4d7a-aba5-ec70de29b3c9\",\r\n        \"text\": \"### Section 1: User Defined Content\\n\\nIn this section, there will be stuff.\",\r\n        \"prompts\": [\r\n          {\r\n            \"id\": \"62fd87cd-5664-4537-b78a-474bffc9c6c0\",\r\n            \"type\": 1,\r\n            \"text\": \"1) Respond as if this were a question.\"\r\n          },\r\n          {\r\n            \"id\": \"41e4fec2-ff34-4032-8604-d6de7ec0c7dd\",\r\n            \"type\": 2,\r\n            \"inputs\": [\r\n              {\r\n                \"id\": 1601906454891,\r\n                \"value\": \"1\",\r\n                \"label\": \"A\"\r\n              },\r\n              {\r\n                \"id\": 1601906458188,\r\n                \"value\": \"2\",\r\n                \"label\": \"B\"\r\n              },\r\n              {\r\n                \"id\": 1601906458767,\r\n                \"value\": \"3\",\r\n                \"label\": \"C\"\r\n              },\r\n              {\r\n                \"id\": 1601906464318,\r\n                \"value\": \"4\",\r\n                \"label\": \"D\"\r\n              },\r\n              {\r\n                \"id\": 1601906464878,\r\n                \"value\": \"5\",\r\n                \"label\": \"E\"\r\n              }\r\n            ],\r\n            \"text\": \"2) I am manually adding these numbers, and that is intentional.  There can be a system later, if desired, but for now, all control is with the user.  Please select from the following:\"\r\n          },\r\n          {\r\n            \"id\": \"444c0919-7ebe-45ba-8872-a8e70baa3a16\",\r\n            \"type\": 2,\r\n            \"inputs\": [\r\n              {\r\n                \"id\": 1601906470887,\r\n                \"value\": \"1\",\r\n                \"label\": null\r\n              },\r\n              {\r\n                \"id\": 1601906474133,\r\n                \"value\": \"2\",\r\n                \"label\": null\r\n              },\r\n              {\r\n                \"id\": 1601906474445,\r\n                \"value\": \"3\",\r\n                \"label\": null\r\n              },\r\n              {\r\n                \"id\": 1601906474915,\r\n                \"value\": \"4\",\r\n                \"label\": null\r\n              }\r\n            ],\r\n            \"text\": \"3) This example has no **label** text, and by default, the **value** is displayed, instead.\"\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        \"id\": \"d7141169-407f-4941-a84b-4ea279f0c780\",\r\n        \"text\": \"### Section 2: Other Stuff\\n\\nIn this section, there will be more stuff.\",\r\n        \"prompts\": [\r\n          {\r\n            \"id\": \"7d65be87-6584-42fa-bef2-1ff43b688a43\",\r\n            \"type\": 2,\r\n            \"inputs\": [\r\n              {\r\n                \"id\": 1601907758485,\r\n                \"value\": \"1\",\r\n                \"label\": \"True\"\r\n              },\r\n              {\r\n                \"id\": 1601907760481,\r\n                \"value\": \"0\",\r\n                \"label\": \"False\"\r\n              }\r\n            ],\r\n            \"text\": \"1) This is a *true* or *false* question.\"\r\n          },\r\n          {\r\n            \"id\": \"c341cdbe-30f7-442d-8fbe-9e2682f4bf64\",\r\n            \"type\": 2,\r\n            \"inputs\": [\r\n              {\r\n                \"id\": 1601907767570,\r\n                \"value\": \"1\",\r\n                \"label\": \"True\"\r\n              },\r\n              {\r\n                \"id\": 1601907783232,\r\n                \"value\": \"0\",\r\n                \"label\": \"False\"\r\n              }\r\n            ],\r\n            \"text\": \"2) This is another **true** or **false** question.\"\r\n          }\r\n        ]\r\n      }\r\n    ]\r\n  }`);

export const Context = React.createContext(StateNode);

function App() {
    const [ data, setData ] = useState();

    useEffect(() => {
        fetch("http://localhost:3001/survey/98a745fb-cbb6-4e2f-ba92-7589c9436ae7")
            .then(res => res.json())
            .then(d => {
                setData(d);
            })
            .catch(console.log)
    }, []);

    return (
        <Context.Provider value={ { node: StateNode } }>
            <Segment>
                {
                    !!data ? (
                        <Survey data={ data } onResponse={ console.log } />
                    ) : (
                        <Dimmer active inverted style={{ minHeight: 400 }}>
                            <Loader>Loading</Loader>
                        </Dimmer>
                    )
                }
                {/* <Form /> */}
            </Segment>
        </Context.Provider>
    );
}

export default App;
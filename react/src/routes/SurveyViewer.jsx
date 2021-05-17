import React, { useState, useEffect } from "react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import Survey from "../components/survey/viewer/Survey";

export default function SurveyViewer(props) {
    const { surveyId } = useParams();
    const [ data, setData ] = useState();
    const [ responses, setResponses ] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3001/survey/${ surveyId }`)
            .then(res => res.json())
            .then(d => {
                setData(d);
            })
            .catch(console.log)
    }, [ surveyId ]);

    function respond(eid, value) {
        setResponses({
            ...responses,
            [ eid ]: value,
        });
    }

    if(!data) {
        return (
            <Dimmer active inverted style={{ minHeight: 400 }}>
                <Loader>Loading</Loader>
            </Dimmer>
        );
    }

    return (
        <Segment>
            <Survey data={ data } onResponse={ respond } />
        </Segment>
    )
}
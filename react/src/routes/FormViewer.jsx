/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import Form from "./../components/form/viewer/Form";

export default function FormViewer(props) {
    const { formId } = useParams();

    const [ data, setData ] = useState();

    useEffect(() => {
        fetch(`http://localhost:3001/form/${ formId }`)
            .then(res => res.json())
            .then(d => {
                setData(d);
            })
            .catch(console.log)
    }, []);

    if(!data) {
        return (
            <Dimmer active inverted style={{ minHeight: 400 }}>
                <Loader>Loading</Loader>
            </Dimmer>
        );
    }

    return (
        <Segment>
            <Form data={ data } onResponse={ console.log } />
        </Segment>
    )
}
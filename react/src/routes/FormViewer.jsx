/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Segment, Dimmer, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import Form from "./../components/form/viewer/Form";
import QRCode from "../components/QRCode";

export default function FormViewer(props) {
    const { formId } = useParams();
    const [ data, setData ] = useState();
    const [ responses, setResponses ] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3001/form/${ formId }`)
            .then(res => res.json())
            .then(d => {
                setData(d);
            })
            .catch(console.log)
    }, []);

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
            <Form data={ data } onResponse={ respond } />

            <QRCode />
        </Segment>
    )
}
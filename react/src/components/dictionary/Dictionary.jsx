/* eslint-disable */
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { Segment, Table } from "semantic-ui-react";

import Entry from "./Entry";

export default function Dictionary(props) {
    const [ entries, setEntries ] = useState([
        {
            id: uuidv4(),
            code: uuidv4(),
            value: Math.random(),
        },
        {
            id: uuidv4(),
            code: uuidv4(),
            value: Math.random(),
        },
        {
            id: uuidv4(),
            code: uuidv4(),
            value: Math.random(),
        },
        {
            id: uuidv4(),
            code: uuidv4(),
            value: Math.random(),
        },
        {
            id: uuidv4(),
            code: uuidv4(),
            value: Math.random(),
        },
    ]);
    const dictionary = props.dictionary;

    return (
        <>
            <Table selectable inverted style={ { marginTop: 6 } }>
                <Table.Header>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell width={ 4 }><span style={{ color: "rgb(58, 192, 255)" }}>Code</span></Table.HeaderCell>
                        <Table.HeaderCell width={ 12 }>Value</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        entries.map(entry => (
                            <Table.Row key={ entry.id }>
                                <Entry entry={ entry } />
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </>
    );
}
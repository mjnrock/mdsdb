import React from "react";
import { Table } from "semantic-ui-react";

export default function Entry(props) {
    const entry = props.entry || {};

    return (
        <>
            <Table.Cell width={ 4 } style={{ color: "rgb(58, 192, 255)" }}>{ entry.code }</Table.Cell>
            <Table.Cell width={ 12 }>{ entry.value }</Table.Cell>
        </>
    );
}
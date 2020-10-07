/* eslint-disable */
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { Segment, Input, Table, Icon, Header, Message } from "semantic-ui-react";

export default function DictionaryCore(props) {
    const [ dictionaries, setDictionaries ] = useState([
        {
            id: uuidv4(),
            name: "The Name",
        }
    ]);

    return (
        <Segment>            
            <Message icon>
                <Icon name="book" color="blue" />
                <Message.Content>
                    <Header as="h2">Dictionaries</Header>
                </Message.Content>
            </Message>
            
            <Input
                fluid
                icon={{ name: "search", circular: true, link: true }}
                placeholder="Search"
            />

            <Table selectable color="blue">
                <Table.Header>
                    <Table.Row textAlign="center">
                        <Table.HeaderCell width={ 2 }>ID</Table.HeaderCell>
                        <Table.HeaderCell width={ 12 }>Name</Table.HeaderCell>
                        <Table.HeaderCell width={ 2 }>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        dictionaries.map(dictionary => (
                            <Table.Row key={ dictionary.id }>
                                <Table.Cell textAlign="center" style={{ fontFamily: "monospace", fontSize: "10pt" }}>{ dictionary.id }</Table.Cell>
                                <Table.Cell>
                                    <Header as="h4">{ dictionary.name }</Header>
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                    <Icon name="pencil alternate" color="grey" />
                                    <Icon name="trash alternate outline" color="red" />
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </Segment>
    );
}
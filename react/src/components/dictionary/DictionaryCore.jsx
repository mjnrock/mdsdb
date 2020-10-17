/* eslint-disable */
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { Segment, Input, Table, Icon, Header, Message, Button, Menu, Modal } from "semantic-ui-react";

import Dictionary from "./Dictionary";


export default function DictionaryCore(props) {
    const [ open, setOpen ] = React.useState({ main: false });
    const [ dictionaries, setDictionaries ] = useState([
        {
            id: uuidv4(),
            name: "The Name",
        },
        {
            id: uuidv4(),
            name: "The Other One",
        },
        {
            id: uuidv4(),
            name: "Yet Another",
        },
    ]);

    return (
        <Segment>
            <Message icon>
                <Icon name="book" color="blue" />
                <Message.Content>
                    <Header as="h2">The Archives</Header>
                </Message.Content>
            </Message>

            <Menu>
                <Modal
                    basic
                    onClose={ () => setOpen({ ...open, main: false }) }
                    onOpen={ () => setOpen({ ...open, main: true }) }
                    open={ !!open.main }
                    size="fullscreen"
                    trigger={(
                        <Menu.Item>
                            <Button labelPosition="left">
                                <Icon name="book" color="blue" />
                                New Dictionary
                            </Button>
                        </Menu.Item>
                    )}
                >
                    <Header as="h2">
                        <span style={{ color: "rgb(58, 192, 255)" }}>Create</span> Dictionary
                    </Header>

                    <Modal.Content>
                        <Input type="text" placeholder="Name" fluid size="large" icon="book blue" iconPosition="left" />
                    </Modal.Content>

                    <Modal.Actions>
                        <Button basic color="red" inverted onClick={ () => setOpen(false) }>
                            <Icon name="remove" /> Cancel
                        </Button>
                            <Button color="blue" inverted onClick={ () => setOpen(false) }>
                                <Icon name="checkmark" /> Save
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Menu.Menu position="right">
                    <Menu.Item>
                        <Input
                            fluid
                            icon={ { name: "search", circular: true, link: true } }
                            placeholder="Search"
                            style={ { minWidth: 350 } }
                        />
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

            <Segment>
                <Table selectable color="blue" style={ { marginTop: 6 } }>
                    <Table.Header>
                        <Table.Row textAlign="center">
                            <Table.HeaderCell width={ 2 }>ID</Table.HeaderCell>
                            <Table.HeaderCell width={ 12 }>Name</Table.HeaderCell>
                            <Table.HeaderCell width={ 2 }>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table>


                {
                    dictionaries.map(dictionary => (
                        <Menu key={ dictionary.id } position="right" style={ { display: "flex", width: "100%" } }>
                            {/* <Menu.Item
                                style={ { fontFamily: "monospace", fontSize: "0.75em" } }
                                onClick={ console.log }
                            >{ dictionary.id }</Menu.Item> */}
                            
                            <Modal
                                basic
                                onClose={ () => setOpen({ ...open, [ dictionary.id ]: false }) }
                                onOpen={ () => setOpen({ ...open, [ dictionary.id ]: true }) }
                                open={ !!open[ dictionary.id ] }
                                size="fullscreen"
                                trigger={(
                                    <Menu.Item
                                        style={ { flexGrow: 1 } }
                                        onClick={ e => {} }
                                    >{ dictionary.name }</Menu.Item>
                                )}
                            >
                                <Header as="h2">
                                    <span style={{ color: "rgb(58, 192, 255)" }}>Explore</span> { dictionary.name }
                                </Header>

                                <Modal.Content>
                                    <Dictionary dictionary={ dictionary } />
                                </Modal.Content>
                            </Modal>

                            <Menu.Item
                                style={ { flexGrow: 1 } }
                                onClick={ e => {} }
                            >{ dictionary.name }</Menu.Item>

                            <Menu.Item onClick={ console.log }>
                                <Icon name="trash alternate outline" color="red" />
                            </Menu.Item>
                        </Menu>
                    ))
                }
            </Segment>
        </Segment>
    );
}
/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Table, Icon, Input, Dropdown, Grid, TextArea } from "semantic-ui-react";

import { EnumComponentType } from "./../../../state/FormState";

export default function Component(props = {}) {
    const entry = props.entry;
    const data = props.data || {};

    function selectComponent() {
        const onModify = props.onModify || (() => true);

        switch(entry.type) {
            case EnumComponentType.BUTTON:
                return (
                    <Table.Cell width={ 8 }>
                        <Grid verticalAlign="middle">
                            <Grid.Row columns={ 2 }>
                                <Grid.Column>
                                    <div style={{ display: "flex" }}>
                                        <Icon name="bars" color="grey" style={{ margin: "auto", marginRight: 8  }} />
                                        <Input type="text" style={{ flexGrow: 1 }} placeholder="[ Entry Label ]" value={ entry.label || "" } onChange={ e => modifyEntry(entry, "label", e.target.value) } />
                                    </div>
                                </Grid.Column>

                                <Grid.Column>
                                    <Dropdown fluid selection text={( 
                                        <div>
                                            <Icon name="cogs" color="green" />
                                            { entry.value }
                                        </div>
                                    )}>
                                        <Dropdown.Menu>
                                            {
                                                Object.entries(data.functions || {}).map(([ key, value ]) => (
                                                    <Dropdown.Item key={ key } onClick={ e => onModify(entry, "value", key) }>{ key }</Dropdown.Item>
                                                ))
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Table.Cell>
                );
            case EnumComponentType.KATEX:
                return (
                    <Table.Cell width={ 8 }>
                        <Grid verticalAlign="middle">
                            <Grid.Row columns={ 2 }>
                                <Grid.Column>
                                    <div style={{ display: "flex" }}>
                                        <Icon name="bars" color="grey" style={{ margin: "auto", marginRight: 8  }} />
                                        <Input type="text" style={{ flexGrow: 1 }} placeholder="[ Entry Label ]" value={ entry.label || "" } onChange={ e => onModify(entry, "label", e.target.value) } />
                                    </div>
                                </Grid.Column>

                                <Grid.Column>
                                    <TextArea style={{ flexGrow: 1 }} placeholder={ `[ KaTeX Notation ]` } onChange={ e => onModify(entry, "data", e.target.value) } />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Table.Cell>
                );
            default:
                return (
                    <Table.Cell width={ 8 }>
                        <div style={{ display: "flex" }}>
                            <Icon name="bars" color="grey" style={{ margin: "auto", marginRight: 8  }} />
                            <Input type="text" style={{ flexGrow: 1 }} placeholder="[ Entry Label ]" value={ entry.label || "" } onChange={ e => onModify(entry, "label", e.target.value) } />
                        </div>
                    </Table.Cell>
                );
        }
    }

    return (        
        <Table.Row key={ entry.id } verticalAlign="middle">
            { selectComponent() }
            <Table.Cell width={ 2 }>
                <Input type="text" fluid readOnly value={ entry.type || "" } />
            </Table.Cell>
            <Table.Cell width={ 2 }>
                <Icon name="trash alternate outline" color="red" onClick={ e => removeEntry(entry) } style={{ cursor: "pointer" }} />
            </Table.Cell>
        </Table.Row>
    );
}
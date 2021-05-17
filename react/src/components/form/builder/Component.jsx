import React from "react";
import { useContextNetwork } from "@lespantsfancy/agency/lib/modules/react/useNetwork";
import { Table, Icon, Input, Dropdown, Grid, TextArea } from "semantic-ui-react";

import { Context } from "./../../../routes/FormBuilder";
import { EnumComponentType, EnumMessageType } from "./../../../state/FormBuilderNetwork";

export default function Component(props = {}) {
    const { dispatch } = useContextNetwork(Context, "network");
    const entry = props.entry;
    const data = props.data || {};

    function removeEntry(entry) {
        dispatch(EnumMessageType.ENTRY_REMOVE, {
            section: props.section,
            entry,
        });
    }

    function selectComponent() {
        const onModify = props.onModify || (() => true);

        switch(entry.type) {
            case EnumComponentType.CONTROL_BUTTON:
                return (
                    <Table.Cell width={ 8 }>
                        <Grid verticalAlign="middle">
                            <Grid.Row columns={ 2 }>
                                <Grid.Column>
                                    <div style={{ display: "flex" }}>
                                        <Icon name="bars" color="grey" style={{ margin: "auto", marginRight: 8  }} { ...props.dragHandleProps } />
                                        <Input type="text" style={{ flexGrow: 1 }} placeholder="[ Entry Label ]" value={ entry.label || "" } onChange={ e => onModify(entry, "label", e.target.value) } />
                                    </div>
                                </Grid.Column>

                                <Grid.Column>
                                    <Dropdown className="selection" fluid text={( 
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
            case EnumComponentType.TEXT_KATEX:
                return (
                    <Table.Cell width={ 8 }>
                        <Grid verticalAlign="middle">
                            <Grid.Row columns={ 2 }>
                                <Grid.Column>
                                    <div style={{ display: "flex" }}>
                                        <Icon name="bars" color="grey" style={{ margin: "auto", marginRight: 8  }} { ...props.dragHandleProps } />
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
                            <Icon name="bars" color="grey" style={{ margin: "auto", marginRight: 8  }} { ...props.dragHandleProps } />
                            <Input type="text" style={{ flexGrow: 1 }} placeholder="[ Entry Label ]" value={ entry.label || "" } onChange={ e => onModify(entry, "label", e.target.value) } />
                        </div>
                    </Table.Cell>
                );
        }
    }

    return (
        <>
            { selectComponent() }
            <Table.Cell width={ 2 }>
                <Input type="text" fluid readOnly value={ entry.type || "" } />
            </Table.Cell>
            <Table.Cell width={ 2 }>
                <Icon name="trash alternate outline" color="red" onClick={ e => removeEntry(entry) } style={{ cursor: "pointer" }} />
            </Table.Cell>
        </>
    );
}
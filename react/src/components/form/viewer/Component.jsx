import crypto from "crypto";
import React from "react";
import { isSameText } from "@lespantsfancy/agency/lib/util/helper";
import { Container, Input, Grid, TextArea, Button, Dropdown, Checkbox, Rating } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";
import MarkdownEditor from "./../../MarkdownEditor";
import { BlockMath } from "react-katex";

import { EnumComponentType } from "../../../state/FormBuilderNetwork";

export default function Component(props = {}) {
    const entry = props.entry;
    const data = props.data || {};

    //  STUB
    const testData = entry.data || [ { key: 1, text: "Cat", value: 1 }, { key: 2, text: "Dog", value: 2 } ];

    function onResponse(entry, prop) {
        if(typeof props.onResponse === "function") {
            props.onResponse(entry, prop);
        }
    }

    let input = null;

    if(isSameText(entry.type, EnumComponentType.TEXT_MULTI)) {
        input = <TextArea fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(isSameText(entry.type, EnumComponentType.TEXT_MARKDOWN) || isSameText(entry.type, EnumComponentType.RESPONSE_FREE_TEXT)) {
        input = <MarkdownEditor onUpdate={ text => onResponse(entry, text) } style={{ flexGrow: 1 }} />
    } else if(isSameText(entry.type, EnumComponentType.TEXT_KATEX)) {
        input = <BlockMath>{ entry.data }</BlockMath>;
    } else if(isSameText(entry.type, EnumComponentType.TEXT_EMAIL)) {
        input = <Input type="email" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(isSameText(entry.type, EnumComponentType.TEXT_PHONE)) {
        input = <Input type="tel" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(isSameText(entry.type, EnumComponentType.NUMBER_DECIMAL)) {
        input = <Input type="number" step={ 0.01 } fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(isSameText(entry.type, EnumComponentType.NUMBER_COMPUTATION)) {
        //TODO Add functionality for this
        input = <Input type="number" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type.match(/TEXT.*/i)) {
        input = <Input type="text" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(entry.type.match(/NUMBER.*/i)) {
        input = <Input type="number" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(isSameText(entry.type, EnumComponentType.DATE)) {
        input = <Input type="date" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(isSameText(entry.type, EnumComponentType.TIME)) {
        input = <Input type="time" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(isSameText(entry.type, EnumComponentType.DATETIME)) {
        input = <Input type="datetime-local" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(isSameText(entry.type, EnumComponentType.MISC_COLOR)) {
        input = <Input type="color" fluid onChange={ e => onResponse(entry, e.target.value) } style={{ flexGrow: 1 }} />
    } else if(isSameText(entry.type, EnumComponentType.MISC_FILE)) {
        input = <Input type="file" accept="image/*" multiple fluid onChange={ e => {
			const inputs = e.target.files;
			const files = [];

			console.log(inputs);
			
			for(let file of inputs) {	
				const reader = new FileReader();
				reader.onload = e => {
					const obj = {
						name: file.name,
						type: file.type,
						size: file.size,
						lastModified: file.lastModified,
						base64: e.target.result,
					};

					obj.sha256 =  crypto.createHash("sha256").update(obj.base64).digest("hex");

					files.push(obj);
	
					if(Object.keys(files).length === inputs.length) {
						onResponse(entry, files);
					}
				};

				reader.readAsDataURL(file);
			}
		}} style={{ flexGrow: 1 }} />
    } else if(isSameText(entry.type, EnumComponentType.MISC_LABEL)) {
        input = <div style={{ flexGrow: 1 }}>{ entry.label }</div>
    } else if(isSameText(entry.type, EnumComponentType.CONTROL_BUTTON)) {
        input = <Button fluid onClick={ e => {
            const fn = data.functions[ entry.value ];

            if(typeof fn === "function") {
                fn(data, props.dispatch);
            }
        } } style={{ flexGrow: 1 }}>{ entry.label }</Button>
    } else if(isSameText(entry.type, EnumComponentType.RESPONSE_RATING)) {
        input = <Rating icon="heart" defaultRating={ 3 } maxRating={ 5 } />;

    //  TODO These <Checkbox /> variants need to be built out in the Builder, currently a partial STUB
    } else if(isSameText(entry.type, EnumComponentType.RESPONSE_CHECKBOX)) {
        input = <Checkbox label={ entry.label } />;
    } else if(isSameText(entry.type, EnumComponentType.RESPONSE_RADIO)) {
        input = <Checkbox label={ entry.label } radio />;
    } else if(isSameText(entry.type, EnumComponentType.RESPONSE_RADIO_BUTTON)) {
        //TODO  This button group is a multiple entry field, as a visual alternate to a radio button, currently a partial STUB
        input = <Button fluid onClick={ e => {
            const fn = data.functions[ entry.value ];

            if(typeof fn === "function") {
                fn(data, props.dispatch);
            }
        } } style={{ flexGrow: 1 }}>{ entry.label }</Button>
    } else if(isSameText(entry.type, EnumComponentType.RESPONSE_SLIDER)) {
        input = <Checkbox label={ entry.label } slider />;
    } else if(isSameText(entry.type, EnumComponentType.RESPONSE_TOGGLE)) {
        input = <Checkbox label={ entry.label } toggle />;

    } else if(isSameText(entry.type, EnumComponentType.RESPONSE_DROPDOWN_SINGLE)) {
        input = <Dropdown fluid selection options={ testData } onChange={ (e, { options, value }) => console.log(value, options) } />;
    } else if(isSameText(entry.type, EnumComponentType.RESPONSE_DROPDOWN_MULTI)) {
        input = <Dropdown fluid multiple selection options={ testData } onChange={ (e, { options, value }) => console.log(value, options) } />;
    }

    return (
        <Container style={{ marginBottom: "1em" }}>
            <MarkdownViewer source={ entry.text } />

            <Grid>
                <Grid.Row>
                    {
                        [ EnumComponentType.MISC_LABEL, EnumComponentType.CONTROL_BUTTON ].includes(entry.type) ? (
                            <>
                                <Grid.Column width={ 16 } style={{ fontWeight: "bold", margin: "auto" }}>
                                    { input }
                                </Grid.Column>
                            </>
                        ) : (
                            <>
                                <Grid.Column width={ 2 } style={{ fontWeight: "bold", margin: "auto" }}>
                                    { entry.label }
                                </Grid.Column>
                                <Grid.Column width={ 14 }>
                                    { input }
                                </Grid.Column>
                            </>
                        )
                    }
                </Grid.Row>
            </Grid>
        </Container>
    );
}
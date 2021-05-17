/* eslint-disable */
import React from "react";
import { Segment } from "semantic-ui-react";
import MarkdownViewer from "react-markdown";

import Prompt from "./Prompt";

export default function Section(props = {}) {
	const section = props.section;
	const prompts = props.section.prompts || [];

	function onResponse(prompt, value) {
		if (typeof props.onResponse === "function") {
			props.onResponse(prompt, value);
		}
	}

	return (
		<Segment style={ { marginTop: "2em" } }>
			<MarkdownViewer source={ section.text } />
			{
				prompts.map((prompt, i) => (
					<Prompt key={ prompt.id } prompt={ prompt } onResponse={ onResponse } />
				))
			}
		</Segment>
	);
}
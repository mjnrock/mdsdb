import { v4 as uuidv4 } from "uuid";
import Agency from "@lespantsfancy/agency";

//! TODO Create "preset" options for PromptSelection (T/F, Y/N, Y/M/N, 1-5, 1-10, etc. -- Values only, Values/Labels, etc.)
//! TODO Create a Survey renderer that consumes a Survey state -- upon designing Survey, save to DB, expose URL that creates an instance of that Survey, saves responses to database

export const EnumMessageType = {
    SAVE_SURVEY: "SAVE_SURVEY",

    SURVEY_TITLE: "SURVEY_TITLE",
    SURVEY_INSTRUCTIONS: "SURVEY_INSTRUCTIONS",

    SECTION_ADD: "SECTION_ADD",
    SECTION_REMOVE: "SECTION_REMOVE",
    SECTION_TEXT: "SECTION_TEXT",

    PROMPT_ADD: "PROMPT_ADD",
    PROMPT_TEXT: "PROMPT_TEXT",
    PROMPT_REMOVE: "PROMPT_REMOVE",
    
    INPUT_ADD: "INPUT_ADD",
    INPUT_REMOVE: "INPUT_REMOVE",
    INPUT_MODIFY: "INPUT_MODIFY",
};

export const SurveyNetwork = new Agency.Event.Network({
	id: uuidv4(),
	title: "",
	instructions: "",
	sections: [],
}, {
	default: {
		[ EnumMessageType.SURVEY_TITLE ]: ({ data }, { mergeState }) => {
			const [{ title }] = data;
		
			mergeState({
				title,
			});
		},
		[ EnumMessageType.SURVEY_INSTRUCTIONS ]: ({ data }, { mergeState }) => {
			const [{ instructions }] = data;

			mergeState({
				instructions,
			});
		},
		[ EnumMessageType.SECTION_ADD ]: ({ data }, { getState, mergeState }) => {
			const [{ text, prompts }] = data;

			mergeState({
				sections: [
					...getState().sections,
					{
						id: uuidv4(),
						text,
						prompts,
					},
				],
			});
		},
		[ EnumMessageType.SECTION_REMOVE ]: ({ data }, { getState, mergeState }) => {
			const [{ section }] = data;
			const sections = getState().sections.filter(s => s.id !== section.id);

			mergeState({
				sections,
			});
		},
		[ EnumMessageType.SECTION_TEXT ]: ({ data }, { mergeState }) => {
			const [{ text, section }] = data;
			section.text = text;

			mergeState({});
		},

		[ EnumMessageType.PROMPT_ADD ]: ({ data }, { mergeState }) => {
			const [{ type, section }] = data;

			let prompt = {
				id: uuidv4(),
				type,
			};
		
			if(type === 2) {
				prompt.inputs = [
					{
						id: Date.now(),
						value: null,
						label: null,
					},
				]
			}
			
			section.prompts.push(prompt);
			
			mergeState({});
		},
		[ EnumMessageType.PROMPT_REMOVE ]: ({ data }, { mergeState }) => {
			const [{ prompt, section }] = data;
			section.prompts = section.prompts.filter(p => p.id !== prompt.id);
			
			mergeState({});
		},
		[ EnumMessageType.PROMPT_TEXT ]: ({ data }, { mergeState }) => {
			const [{ text, prompt }] = data;

			prompt.text = text;
			
			mergeState({});
		},
		[ EnumMessageType.INPUT_ADD ]: ({ data }, { mergeState }) => {
			const [{ prompt }] = data;

			prompt.inputs.push({
				id: Date.now(),
				value: null,
				label: null,
			});
			
			mergeState({});
		},
		[ EnumMessageType.INPUT_REMOVE ]: ({ data }, { mergeState }) => {
			const [{ prompt, input }] = data;

			prompt.inputs = prompt.inputs.filter(i => i.id !== input.id);
			
			mergeState({});
		},
		[ EnumMessageType.INPUT_MODIFY ]: ({ data }, { mergeState }) => {
			const [{ input, field, value }] = data;

			input[ field ] = value;
			
			mergeState({});
		},

		[ EnumMessageType.SAVE_SURVEY ]: (msg, { getState }) => {
			fetch("http://localhost:3001/survey/upsert", {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(getState()),
			});
		},
	},
});

export default SurveyNetwork;
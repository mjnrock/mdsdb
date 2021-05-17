import { v4 as uuidv4 } from "uuid";
import Agency from "@lespantsfancy/agency";

export const EnumValidator = {
	CONTROL_BUTTON: input => true,

	RESPONSE_FREE_TEXT: input => true,
	RESPONSE_RATING: input => true,
	RESPONSE_CHECKBOX: input => true,
	RESPONSE_RADIO: input => true,
	RESPONSE_RADIO_BUTTON: input => true,
	RESPONSE_SLIDER: input => true,
	RESPONSE_TOGGLE: input => true,
	RESPONSE_DROPDOWN_SINGLE: input => true,
	RESPONSE_DROPDOWN_MULTI: input => true,

	TEXT: input => true,
	TEXT_PHONE: input => input.length === 10,
	TEXT_EMAIL: input => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input),
	TEXT_MULTI: input => true,
	TEXT_MARKDOWN: input => true,
	TEXT_KATEX: input => true,

	NUMBER: input => true,
	NUMBER_INTEGER: input => true,
	NUMBER_DECIMAL: input => true,
	NUMBER_PERCENT: input => true,
	NUMBER_CURRENCY: input => true,
	NUMBER_COMPUTATION: input => true,

	DATE: input => true,
	TIME: input => true,
	DATETIME: input => true,

	MISC_LABEL: input => true,
	MISC_COLOR: input => true,
	MISC_FILE: input => true,
};

export const EnumComponentType = {
	CONTROL_BUTTON: "CONTROL_BUTTON",

	RESPONSE_FREE_TEXT: "RESPONSE_FREE_TEXT",
	RESPONSE_RATING: "RESPONSE_RATING",
	RESPONSE_CHECKBOX: "RESPONSE_CHECKBOX",
	RESPONSE_RADIO: "RESPONSE_RADIO",
	RESPONSE_RADIO_BUTTON: "RESPONSE_RADIO_BUTTON",
	RESPONSE_SLIDER: "RESPONSE_SLIDER",
	RESPONSE_TOGGLE: "RESPONSE_TOGGLE",
	RESPONSE_DROPDOWN_SINGLE: "RESPONSE_DROPDOWN_SINGLE",
	RESPONSE_DROPDOWN_MULTI: "RESPONSE_DROPDOWN_MULTI",

	TEXT: "TEXT",
	TEXT_PHONE: "TEXT_PHONE",
	TEXT_EMAIL: "TEXT_EMAIL",
	TEXT_MULTI: "TEXT_MULTI",
	TEXT_MARKDOWN: "TEXT_MARKDOWN",
	TEXT_KATEX: "TEXT_KATEX",

	NUMBER: "NUMBER",
	NUMBER_INTEGER: "NUMBER_INTEGER",
	NUMBER_DECIMAL: "NUMBER_DECIMAL",
	NUMBER_PERCENT: "NUMBER_PERCENT",
	NUMBER_CURRENCY: "NUMBER_CURRENCY",
	NUMBER_COMPUTATION: "NUMBER_COMPUTATION",

	DATE: "DATE",
	TIME: "TIME",
	DATETIME: "DATETIME",

	MISC_LABEL: "MISC_LABEL",
	MISC_COLOR: "MISC_COLOR",
	MISC_FILE: "MISC_FILE",
};

export const EnumComponent = {
	Response: {
		icon: "question circle outline",
		color: "grey",
		values: [
			"Singleton",
			true,
			{
				type: EnumComponentType.RESPONSE_FREE_TEXT,
				label: "Free Text",
				icon: "keyboard outline",
				validator: EnumValidator.RESPONSE_FREE_TEXT,
			},
			{
				type: EnumComponentType.RESPONSE_RATING,
				label: "Rating",
				icon: "star outline",
				validator: EnumValidator.RESPONSE_RATING,
			},
			{
				type: EnumComponentType.RESPONSE_SLIDER,
				label: "Slider",
				icon: "sliders",
				validator: EnumValidator.RESPONSE_SLIDER,
			},
			{
				type: EnumComponentType.RESPONSE_TOGGLE,
				label: "Toggle",
				icon: "toggle on",
				validator: EnumValidator.RESPONSE_TOGGLE,
			},
			"Multiple",
			true,
			{
				type: EnumComponentType.RESPONSE_CHECKBOX,
				label: "Checkbox",
				icon: "check square outline",
				validator: EnumValidator.RESPONSE_CHECKBOX,
			},
			{
				type: EnumComponentType.RESPONSE_RADIO,
				label: "Radio",
				icon: "dot circle outline",
				validator: EnumValidator.RESPONSE_RADIO,
			},
			{
				type: EnumComponentType.RESPONSE_DROPDOWN_SINGLE,
				label: "Dropdown (Single Select)",
				icon: "caret square down outline",
				validator: EnumValidator.RESPONSE_DROPDOWN_SINGLE,
			},
			{
				type: EnumComponentType.RESPONSE_DROPDOWN_MULTI,
				label: "Dropdown (Multiple Select)",
				icon: "plus square outline",
				validator: EnumValidator.RESPONSE_DROPDOWN_MULTI,
			},
			{
				type: EnumComponentType.RESPONSE_RADIO_BUTTON,
				label: "Button Group",
				icon: "hand point up outline",
				validator: EnumValidator.RESPONSE_RADIO_BUTTON,
			},
		]
	},
	Text: {
		icon: "font",
		color: "red",
		values: [
			{
				type: EnumComponentType.TEXT,
				label: "Generic",
				icon: "font",
				validator: EnumValidator.TEXT,
			},
			true,
			{
				type: EnumComponentType.TEXT_PHONE,
				label: "Phone",
				icon: "call",
				validator: EnumValidator.TEXT_PHONE,
			},
			{
				type: EnumComponentType.TEXT_EMAIL,
				label: "Email",
				icon: "mail outline",
				validator: EnumValidator.TEXT_EMAIL,
			},
			true,
			{
				type: EnumComponentType.TEXT_MULTI,
				label: "Textarea",
				icon: "text cursor",
				validator: EnumValidator.TEXT_MULTI,
			},
			{
				type: EnumComponentType.TEXT_MARKDOWN,
				label: "Markdown",
				icon: "heading",
				validator: EnumValidator.TEXT_MARKDOWN,
			},
			{
				type: EnumComponentType.TEXT_KATEX,
				label: "KaTeX",
				icon: "calculator",
				validator: EnumValidator.TEXT_KATEX,
			},
		]
	},
	Number: {
		icon: "hashtag",
		color: "blue",
		values: [
			{
				type: EnumComponentType.NUMBER,
				label: "Generic",
				icon: "hashtag",
				validator: EnumValidator.NUMBER,
			},
			true,
			{
				type: EnumComponentType.NUMBER_INTEGER,
				label: "Integer",
				icon: "sort numeric down",
				validator: EnumValidator.NUMBER_INTEGER,
			},
			{
				type: EnumComponentType.NUMBER_DECIMAL,
				label: "Decimal",
				icon: "calculator",
				validator: EnumValidator.NUMBER_DECIMAL,
			},
			{
				type: EnumComponentType.NUMBER_PERCENT,
				label: "Percent",
				icon: "percent",
				validator: EnumValidator.NUMBER_PERCENT,
			},
			{
				type: EnumComponentType.NUMBER_CURRENCY,
				label: "Currency",
				icon: "dollar",
				validator: EnumValidator.NUMBER_CURRENCY,
			},
		]
	},
	Timestamp: {
		icon: "hourglass half",
		color: "orange",
		values: [
			{
				type: EnumComponentType.DATE,
				label: "Date",
				icon: "calendar alternate outline",
				validator: EnumValidator.DATE,
			},
			{
				type: EnumComponentType.TIME,
				label: "Time",
				icon: "clock outline",
				validator: EnumValidator.TIME,
			},
			{
				type: EnumComponentType.DATETIME,
				label: "DateTime",
				icon: "hourglass outline",
				validator: EnumValidator.DATETIME,
			},
		]
	},
	Miscellaneous: {
		icon: "ellipsis horizontal",
		color: "purple",
		values: [
			{
				type: EnumComponentType.MISC_LABEL,
				label: "Label",
				icon: "bold",
				validator: EnumValidator.MISC_LABEL,
			},
			true,
			{
				type: EnumComponentType.MISC_COLOR,
				label: "Color",
				icon: "tint",
				validator: EnumValidator.MISC_COLOR,
			},
			{
				type: EnumComponentType.MISC_FILE,
				label: "File",
				icon: "file alternate outline",
				validator: EnumValidator.MISC_FILE,
			},
		]
	},
	Control: {
		icon: "cogs",
		color: "green",
		values: [
			{
				type: EnumComponentType.CONTROL_BUTTON,
				label: "Button",
				icon: "hand point up outline",
				validator: EnumValidator.CONTROL_BUTTON,
			},
		]
	},
};

export const EnumMessageType = {
	SAVE_FORM: "SAVE_FORM",

	FORM_TITLE: "FORM_TITLE",
	FORM_INSTRUCTIONS: "FORM_INSTRUCTIONS",

	SECTION_ADD: "SECTION_ADD",
	SECTION_REMOVE: "SECTION_REMOVE",
	SECTION_TEXT: "SECTION_TEXT",

	ENTRY_ADD: "ENTRY_ADD",
	ENTRY_REMOVE: "ENTRY_REMOVE",
	ENTRY_MODIFY: "ENTRY_MODIFY",
	ENTRY_REORDER: "ENTRY_REORDER",

	FUNCTION_ADD: "FUNCTION_ADD",
	FUNCTION_REMOVE: "FUNCTION_REMOVE",
	FUNCTION_MODIFY: "FUNCTION_MODIFY",

	QUERY_ADD: "QUERY_ADD",
	QUERY_REMOVE: "QUERY_REMOVE",
	QUERY_MODIFY: "QUERY_MODIFY",
};

export const FormBuilderNetwork = new Agency.Event.Network({
	id: uuidv4(),
	title: null,
	instructions: null,
	sections: [
		{
			id: uuidv4(),
			text: null,
			entries: [
				{
					"id": "b6ca652d-09be-4004-a942-d6419df2811a",
					"type": "CONTROL_BUTTON",
					"label": "Click",
					"validator": "input => true",
					"order": 0,
					"value": "test"
				}
			],
		}
	],
	functions: {
		test: (...args) => console.log(...args)
	},
	queries: {},
}, {
	default: {
		[ EnumMessageType.SAVE_FORM ]: (msg, { getState }) => {
			fetch("http://localhost:3001/form/upsert", {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(getState()),
			});
		},
		[ EnumMessageType.FORM_TITLE ]: ({ data }, { mergeState }) => {
			const [{ title }] = data;
		
			mergeState({
				title,
			});
		},
		[ EnumMessageType.FORM_INSTRUCTIONS ]: ({ data }, { mergeState }) => {
			const [{ instructions }] = data;
		
			mergeState({
				instructions,
			});
		},
		[ EnumMessageType.SECTION_ADD ]: ({ data }, { getState, mergeState }) => {
			const [{ text }] = data;
		
			mergeState({
				sections: [
					...getState().sections,
					{
						id: uuidv4(),
						text,
						entries: [],
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
		[ EnumMessageType.ENTRY_ADD ]: ({ data }, { mergeState }) => {
			const [{ section, type: entryType, label, validator, order }] = data;
		
			section.entries.push({
				id: uuidv4(),
				type: entryType,
				label: label,
				validator: validator,
				order: order,
			});	
	
			mergeState({});
		},
		[ EnumMessageType.ENTRY_REMOVE ]: ({ data }, { mergeState }) => {
			const [{ section, entry }] = data;
	
			section.entries = section.entries.filter(e => e.id !== entry.id);
	
			mergeState({});
		},
		[ EnumMessageType.ENTRY_MODIFY ]: ({ data }, { mergeState }) => {
			const [{ section, entry, newEntry }] = data;
		
			const index = section.entries.indexOf(entry);
			section.entries.splice(index, 1, newEntry);
	
			mergeState({});
		},
		[ EnumMessageType.ENTRY_REORDER ]: ({ data }, { mergeState }) => {
			const [{ section, left, right }] = data;
		
			const entry = section.entries[ left ];
			for (let i = right + 1; i < section.entries.length; i++) {
				section.entries[ i ].order += 1;
			}
			entry.order = right + 1;
			if (right > left) {
				//  Moved down the list
				for (let i = right + 1; i < section.entries.length; i++) {
					section.entries[ i ].order += 1;
				}
				entry.order = right + 1;
			} else if (left > right) {
				//  Moved up the list
				for (let i = right; i < section.entries.length; i++) {
					section.entries[ i ].order += 1;
				}
				entry.order = right;
			}
		
			section.entries.sort((a, b) => a.order - b.order);      // sort
			for (let i = 0; i < section.entries.length; i++) {       // normalize
				section.entries[ i ].order = i;
			}	
	
			mergeState({});
		},
		[ EnumMessageType.FUNCTION_ADD ]: ({ data }, { getState, mergeState }) => {
			const [{ name, code }] = data;
			// eslint-disable-next-line
			const fn = eval(`(${code})`);
		
			if (typeof fn === "function") {
				mergeState({
					functions: {
						...getState().functions,
						[ name ]: fn,
					}
				});
			}
		},
		[ EnumMessageType.FUNCTION_REMOVE ]: ({ data }, { getState, mergeState }) => {
			const [{ name } ]= data;
			const functions = getState().functions;
		
			delete functions[ name ];	
		
			mergeState({
				functions,
			});
		},
		[ EnumMessageType.FUNCTION_MODIFY ]: ({ data }, { getState, mergeState }) => {
			const [{ name, code }] = data;
			// eslint-disable-next-line
			const fn = eval(`(${code})`);
		
			if (typeof fn === "function") {
				mergeState({
					functions: {
						...getState().functions,
						[ name ]: fn,
					}
				});
			}
		},
		[ EnumMessageType.QUERY_ADD ]: ({ data }, { getState, mergeState }) => {
			const [{ name, query }] = data;
		
			mergeState({
				queries: {
					...getState().queries,
					[ name ]: query,
				},
			});
		},
		[ EnumMessageType.QUERY_REMOVE ]: ({ data }, { getState, mergeState }) => {
			const [{ name }]= data;
			const queries = getState().queries;
		
			delete queries[ name ];	
		
			mergeState({
				queries: queries,
			});
		},
		[ EnumMessageType.QUERY_MODIFY ]: ({ data }, { getState, mergeState }) => {
			const [{ name, query }] = data;
		
			mergeState({
				queries: {
					...getState().queries,
					[ name ]: query,
				},
			});
		},
	},
});

export default FormBuilderNetwork;
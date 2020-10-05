import { v4 as uuidv4 } from "uuid";

import Node from "../lib/Node";

const StateNode = new Node({
    state: {
        id: uuidv4(),
        title: "",
        instructions: "",
        sections: [],
    },
});

//! TODO Create "preset" options for PromptSelection (T/F, Y/N, Y/M/N, 1-5, 1-10, etc. -- Values only, Values/Labels, etc.)
//! TODO Create a Survey renderer that consumes a Survey state -- upon designing Survey, save to DB, expose URL that creates an instance of that Survey, saves responses to database

export const EnumMessageType = {
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

StateNode.addReducer(Node.TypedPayload(EnumMessageType.SURVEY_TITLE, (state, type, data) => {
    const { title } = data;

    return {
        ...state,
        title,
    };
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.SURVEY_INSTRUCTIONS, (state, type, data) => {
    const { instructions } = data;

    return {
        ...state,
        instructions,
    };
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.SECTION_ADD, (state, type, data) => {
    const { text, prompts } = data;

    return {
        ...state,
        sections: [
            ...state.sections,
            {
                id: uuidv4(),
                text,
                prompts,
            },
        ],
    };
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.SECTION_REMOVE, (state, type, data) => {
    const { section } = data;
    const sections = state.sections.filter(s => s.id !== section.id);

    return {
        ...state,
        sections,
    };
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.SECTION_TEXT, (state, t, data) => {
    const { text, section } = data;

    section.text = text;

    return state;
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.PROMPT_ADD, (state, t, data) => {
    const { type, section } = data;

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

    return state;
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.PROMPT_REMOVE, (state, type, data) => {
    const { prompt, section } = data;

    section.prompts = section.prompts.filter(p => p.id !== prompt.id);

    return state;
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.PROMPT_TEXT, (state, t, data) => {
    const { text, prompt } = data;

    prompt.text = text;

    return state;
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.INPUT_ADD, (state, type, data) => {
    const { prompt } = data;

    prompt.inputs.push({
        id: Date.now(),
        value: null,
        label: null,
    });

    return state;
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.INPUT_REMOVE, (state, type, data) => {
    const { prompt, input } = data;

    prompt.inputs = prompt.inputs.filter(i => i.id !== input.id);

    return state;
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.INPUT_MODIFY, (state, type, data) => {
    const { input, field, value } = data;

    input[ field ] = value;

    return state;
}));

export default StateNode;
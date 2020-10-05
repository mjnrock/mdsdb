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
};

StateNode.addEffect((state, oldState, type) => {
    if(type === EnumMessageType.SAVE_FORM) {
        fetch("http://localhost:3001/form/upsert", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
        });
    }
});

StateNode.addReducer(Node.TypedPayload(EnumMessageType.FORM_TITLE, (state, type, data) => {
    const { title } = data;

    return {
        ...state,
        title,
    };
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.FORM_INSTRUCTIONS, (state, type, data) => {
    const { instructions } = data;

    return {
        ...state,
        instructions,
    };
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.SECTION_ADD, (state, type, data) => {
    const { text } = data;

    return {
        ...state,
        sections: [
            ...state.sections,
            {
                id: uuidv4(),
                text,
                entries: [],
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
StateNode.addReducer(Node.TypedPayload(EnumMessageType.ENTRY_ADD, (state, type, data) => {
    const { section, type: entryType, label, validator } = data;

    section.entries.push({
        id: uuidv4(),
        type: entryType,
        label: label,
        validator: validator,
    });

    return state;
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.ENTRY_REMOVE, (state, type, data) => {
    const { section, entry } = data;

    section.entries = section.entries.filter(e => e.id !== entry.id);

    return state;
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.ENTRY_MODIFY, (state, t, data) => {
    const { section, entry, newEntry } = data;

    const index = section.entries.indexOf(entry);
    section.entries.splice(index, 1, newEntry);

    return state;
}));

export default StateNode;
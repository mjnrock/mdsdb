import { v4 as uuidv4 } from "uuid";

import Node from "../lib/Node";

const StateNode = new Node({
    state: {
        id: uuidv4(),
        title: null,
        instructions: null,
        sections: [
            {
                id: uuidv4(),
                text: null,
                entries: [],
            }
        ],
        functions: {
            test: () => console.log(`Yes`)
        },
    },
});
// const StateNode = new Node({
//     state: JSON.parse(JSON.stringify({"id":"d97caca4-6a64-4d68-83f0-cde06134587a","instructions":"**Do not** not fill out *this* form.","sections":[{"id":"4b70c549-d03e-47d4-b47c-9fefce77ba69","text":"### Section 1","entries":[{"id":"1aa7ac7d-111b-4ff4-81b7-3f861f735e27","type":"text","label":"Name"},{"id":"d9ce0ef7-8754-417e-81f1-591582ed6c4d","type":"text","label":"Other"},{"id":"ba8572c6-d951-44e9-9e6c-3ead47fdb58e","type":"number","label":"Age"},{"id":"d6b1fac6-97a8-4f80-a005-0deff2422a2e","type":"date","label":"Date"},{"id":"31d107cc-d48e-451d-bfab-0cb0eead8ef8","type":"time","label":"Time"},{"id":"121dbbd2-2336-4c87-b74b-eefe0de7ba9d","type":"datetime","label":"Datetime"}]}],"title":"Form A"}))
// });

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

    FUNCTION_ADD: "FUNCTION_ADD",
    FUNCTION_REMOVE: "FUNCTION_REMOVE",
    FUNCTION_MODIFY: "FUNCTION_MODIFY",
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
    const { section, type: entryType, label, validator, order } = data;

    section.entries.push({
        id: uuidv4(),
        type: entryType,
        label: label,
        validator: validator,
        order: order,
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
StateNode.addReducer(Node.TypedPayload(EnumMessageType.FUNCTION_ADD, (state, type, data) => {
    const { name,  code } = data;

    if(typeof code === "function") {
        state.functions[ name ] = code;
    }

    return state;
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.FUNCTION_REMOVE, (state, type, data) => {
    const { name } = data;

    delete state.functions[ name ];

    return state;
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.FUNCTION_MODIFY, (state, t, data) => {
    const { name, code } = data;

    if(typeof code === "function") {
        state.functions[ name ] = code;
    }

    return state;
}));

export default StateNode;
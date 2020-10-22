import { v4 as uuidv4 } from "uuid";

import Node from "../lib/Node";



export const EnumValidator = {
    BUTTON: input => true,
    RATING: input => true,
    CHECKBOX: input => true,
    RADIO: input => true,
    SLIDER: input => true,
    TOGGLE: input => true,
    DROPDOWN_SINGLE: input => true,
    DROPDOWN_MULTI: input => true,

    TEXT: input => true,
    TEXT_PHONE: input => input.length === 10,
    TEXT_EMAIL: input => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input),
    TEXT_MULTI: input => true,
    TEXT_MARKDOWN: input => true,
    KATEX: input => true,

    NUMBER: input => true,
    NUMBER_INTEGER: input => true,
    NUMBER_DECIMAL: input => true,
    NUMBER_PERCENT: input => true,
    NUMBER_CURRENCY: input => true,
    NUMBER_COMPUTATION: input => true,
    
    DATE: input => true,
    TIME: input => true,
    DATETIME: input => true,

    LABEL: input => true,
    COLOR: input => true,
    FILE: input => true,
};

export const EnumComponentType = {
    BUTTON: "BUTTON",
    RATING: "RATING",
    CHECKBOX: "CHECKBOX",
    RADIO: "RADIO",
    SLIDER: "SLIDER",
    TOGGLE: "TOGGLE",
    DROPDOWN_SINGLE: "DROPDOWN_SINGLE",
    DROPDOWN_MULTI: "DROPDOWN_MULTI",

    TEXT: "TEXT",
    TEXT_PHONE: "TEXT_PHONE",
    TEXT_EMAIL: "TEXT_EMAIL",
    TEXT_MULTI: "TEXT_MULTI",
    TEXT_MARKDOWN: "TEXT_MARKDOWN",
    KATEX: "TEXT_KATEX",

    NUMBER: "NUMBER",
    NUMBER_INTEGER: "NUMBER_INTEGER",
    NUMBER_DECIMAL: "NUMBER_DECIMAL",
    NUMBER_PERCENT: "NUMBER_PERCENT",
    NUMBER_CURRENCY: "NUMBER_CURRENCY",
    NUMBER_COMPUTATION: "NUMBER_COMPUTATION",
    
    DATE: "DATE",
    TIME: "TIME",
    DATETIME: "DATETIME",

    LABEL: "LABEL",
    COLOR: "COLOR",
    FILE: "FILE",
};

export const EnumComponent = {
    Control: {
        icon: "cogs",
        color: "green",
        values: [
            {
                type: EnumComponentType.BUTTON,
                label: "Button",
                icon: "hand point up outline",
                validator: EnumValidator.BUTTON,
            },
            {
                type: EnumComponentType.RATING,
                label: "Rating",
                icon: "star outline",
                validator: EnumValidator.RATING,
            },
            true,
            {
                type: EnumComponentType.CHECKBOX,
                label: "Checkbox",
                icon: "check square outline",
                validator: EnumValidator.CHECKBOX,
            },
            {
                type: EnumComponentType.RADIO,
                label: "Radio",
                icon: "dot circle outline",
                validator: EnumValidator.RADIO,
            },
            {
                type: EnumComponentType.SLIDER,
                label: "Slider",
                icon: "sliders",
                validator: EnumValidator.SLIDER,
            },
            {
                type: EnumComponentType.TOGGLE,
                label: "Toggle",
                icon: "toggle on",
                validator: EnumValidator.TOGGLE,
            },
            true,
            {
                type: EnumComponentType.DROPDOWN_SINGLE,
                label: "Dropdown - Single",
                icon: "caret square down outline",
                validator: EnumValidator.DROPDOWN_SINGLE,
            },
            {
                type: EnumComponentType.DROPDOWN_MULTI,
                label: "Dropdown - Multiple",
                icon: "plus square outline",
                validator: EnumValidator.DROPDOWN_MULTI,
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
                type: EnumComponentType.LABEL,
                label: "Label",
                icon: "bold",
                validator: EnumValidator.LABEL,
            },
            {
                type: EnumComponentType.KATEX,
                label: "KaTeX",
                icon: "calculator",
                validator: EnumValidator.KATEX,
            },
            true,
            {
                type: EnumComponentType.COLOR,
                label: "Color",
                icon: "tint",
                validator: EnumValidator.COLOR,
            },
            {
                type: EnumComponentType.FILE,
                label: "File",
                icon: "file alternate outline",
                validator: EnumValidator.FILE,
            },
        ]
    },
};

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
    const { name, code } = data;
    // eslint-disable-next-line
    const fn = eval(`(${ code })`);

    if(typeof fn === "function") {
        state.functions[ name ] = fn;
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
    // eslint-disable-next-line
    const fn = eval(`(${ code })`);

    if(typeof fn === "function") {
        state.functions[ name ] = fn;
    }

    return state;
}));

export default StateNode;
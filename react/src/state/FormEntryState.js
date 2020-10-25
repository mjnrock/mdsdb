import Node from "../lib/Node";

const StateNode = new Node({
    state: {
        data: {},
        entries: {},
    },
});

export const EnumMessageType = {
    SAVE_FORM: "SAVE_FORM",

    FORM_DATA: "FORM_DATA",
    RESPOND: "RESPOND",
};

StateNode.addEffect((state, oldState, type) => {
    if(type === EnumMessageType.SAVE_FORM) {
        fetch("http://localhost:3001/form/entry/upsert", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fid: state.data.id,
                entries: state.entries
            }),
        });
    }
});

StateNode.addReducer(Node.TypedPayload(EnumMessageType.FORM_DATA, (state, type, data) => {
    state.data = data;

    return state;
}));
StateNode.addReducer(Node.TypedPayload(EnumMessageType.RESPOND, (state, type, data) => {
    state.entries = data;

    return state;
}));

export default StateNode;
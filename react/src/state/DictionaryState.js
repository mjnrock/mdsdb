import { v4 as uuidv4 } from "uuid";

import Node from "../lib/Node";

const StateNode = new Node({
    state: {
        id: uuidv4(),
    },
});

export const EnumMessageType = {
    SAVE_FORM: "SAVE_FORM",
};

StateNode.addReducer(Node.TypedPayload(EnumMessageType.SAVE_FORM, (state, t, data) => {
    return state;
}));

export default StateNode;
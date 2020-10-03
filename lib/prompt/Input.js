import { v4 as uuidv4 } from "uuid";

export const EnumInputType = {
    CHOICES: 1,
    TEXT: 2,
};

export default class Input {
    constructor({ type, value, id } = {}) {
        this.id = id || uuidv4();
        this.type = type;
        this.value = value;

        if(typeof value === "function") {
            Promise.resolve(value()).then(val => this.value = val);
        }
    }

    check() {
        return this.value !== void 0 && this.value !== null;
    }

    toData(obj = {}) {
        return {
            [ this.id ]: {
                type: this.type,
                value: this.value,
                isValid: this.check(),
                ...obj,
            }
        }
    }
};
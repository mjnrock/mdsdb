import { v4 as uuidv4 } from "uuid";
import { deepEqual } from "fast-equals";
import Input, { EnumInputType } from "./Input";

export class Choice {
    constructor({ id, value, label } = {}) {
        this.id = id || uuidv4();
        this.value = value;
        this.label = label;
    }

    compare(input) {
        if(typeof input === "object") {
            return deepEqual(this.toObject(), input);
        } else {
            if(input === this.id) {
                return true;
            } else if(input === this.value) {
                return true;
            }
        }

        return false;
    }

    toObject() {
        return {
            id: this.id,
            value: this.value,
            label: this.label,
        };
    }

    static FromObject(obj) {
        return new InputChoices({
            id: obj.id,
            value: obj.value,
            label: obj.label,
        });
    }
}

export default class InputChoices extends Input {
    constructor({ choices, value, isMultipleSelect = false } = {}) {
        super({
            type: EnumInputType.CHOICES,
            value,
        });

        this.isMultipleSelect = isMultipleSelect;
        this.choices = [];
        if(Array.isArray(choices)) {
            this.choices = choices;
        } else if(typeof choices === "function") {
            Promise.resolve(choices()).then(choices => this.choices = choices);
        }
    }

    check() {
        return this.choices.filter(choice => deepEqual(choice, this.value)).length;
    }
};
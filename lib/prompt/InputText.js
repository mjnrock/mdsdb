import Input, { EnumInputType } from "./Input";

export const EnumTextType = {
    STRING: 1,
    NUMBER: 2,
    DATE: 3,
    TIME: 4,
    DATE_TIME: 5,
    INTEGER: 6,

    TEXTAREA: 99,
};

export default class InputText extends Input {
    constructor({ textType, validator, value } = {}) {
        super({
            type: EnumInputType.TEXT,
            value,
        });

        this.textType = textType;
        this.validator = validator;
    }

    check(...args) {
        if(typeof this.validator === "function") {
            return this.validator(this.value, ...args);
        } else if(this.validator instanceof RegExp) {
            return this.validator.test(this.value);
        }

        return this.value !== void 0 && this.value !== null;
    }

    static FromObject(obj) {
        return new InputText({
            textType: obj.textType,
            validator: obj.validator,
            value: obj.value,
        });
    }
};
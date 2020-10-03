import { v4 as uuidv4 } from "uuid";

export default class Prompt {
    constructor({ inputs = [], markdown, id } = {}) {
        this.id = id || uuidv4();
        this.markdown = markdown;
        this.inputs = new Set(inputs);
    }
}
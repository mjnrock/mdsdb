import fetch from "node-fetch";

export default async function Builder(template = {}, ...args) {
    return new Promise((resolve, reject) => {
        const proms = [];
        const obj = { ...template };
        for(let key in obj) {
            const value = obj[ key ];
    
            if(value instanceof Promise) {
                proms.push(value.then(data => {
                    obj[ key ] = data !== void 0 ? data : obj[ key ];
                }));
            } else if(typeof value === "function") {
                proms.push(Promise.resolve(value(obj, ...args)).then(data => {
                    obj[ key ] = data !== void 0 ? data : obj[ key ];
                }));
            } else if(typeof value === "object") {
                proms.push(Builder(value, ...args).then(data => {
                    obj[ key ] = data !== void 0 ? data : obj[ key ];
                }));
            }
        }

        return Promise.all(proms).then(() => {
            resolve(obj);

            return obj;
        });
    });
};


export async function Fetch(url, opts = {}) {
    return await fetch(url, opts);
};
export async function FetchJson(url, opts = {}) {
    return await fetch(url, opts).then(response => response.json());
};
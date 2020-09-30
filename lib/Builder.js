import fetch from "node-fetch";

export default async function Builder(initObj = {}, ...args) {
    return new Promise((resolve, reject) => {
        const obj = { ...initObj };
        const proms = [];

        for(let key in obj) {
            const value = obj[ key ];
    
            if(value instanceof Promise) {
                proms.push(value.then(data => {
                    obj[ key ] = data;
                }));
            } else if(typeof value === "function") {
                proms.push(Promise.resolve(value(obj, ...args)).then(data => {
                    obj[ key ] = data;
                }));
            } else if(typeof value === "object") {
                proms.push(Builder(value, ...args).then(data => {
                    obj[ key ] = data;
                }));
            }
        }

        return Promise.all(proms).then(() => {
            resolve(obj);

            return obj;
        });
    });
};


export async function FetchJson(url, opts = {}) {
    let result = await fetch(url, opts)
        .then(response => response.json());

    return result;
};

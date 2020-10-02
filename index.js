import Builder, { FetchJson } from "./lib/Builder";

const OBJ = {
    dog: 3,
    goat: (obj, ...args) => {
        // console.log(obj);
        // console.log(...args);

        return args[ 0 ];
    },
    fish: () => Math.random(),
    bird: () => Date.now(),
    squirrel: {
        cat: FetchJson("http://api.open-notify.org/iss-now.json"),
        meese: true,
        squirrel: {
            chip: "223542352353",
            meese: false,
        }
    }
};

//! Thenable
Builder(OBJ, 40).then(obj => {
    console.log(obj)
});

//! AIIFE
// (async () => {
//     const obj = await Builder({
//         dog: 3,
//         fish: () => Math.random(),
//         bird: () => Date.now(),
//         cat: FetchJson("http://api.open-notify.org/iss-now.json"),
//         squirrel: {
//             chip: "a#@$fmd1ji23",
//             meese: true,
//             squirrel: {
//                 chip: "223542352353",
//                 meese: false,
//             }
//         }
//     });

//     console.log(obj);
// })();
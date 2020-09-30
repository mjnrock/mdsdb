import Builder, { FetchJson } from "./lib/Builder";

Builder({
    dog: 3,
    fish: () => Math.random(),
    bird: () => Date.now(),
    cat: FetchJson("http://api.open-notify.org/iss-now.json"),
    squirrel: {
        chip: "a#@$fmd1ji23",
        meese: true,
        squirrel: {
            chip: "223542352353",
            meese: false,
        }
    }
}).then(obj => {
    console.log(obj);
});
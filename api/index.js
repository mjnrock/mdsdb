const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://mdsdb:mdsdb@mdsdb-1.uwpiu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const db = client.db("sample_analytics");
    const items = db.collection("customers").find({
        name: /.*Cowan/
    }).toArray().then(data => {
        console.log(data);

        client.close();
    });
});

var cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const app = express();

//taief
const port = process.env.PORT || 5000;

const users = [{ id: 1, name: "John Doe", email: "john@example.com" }, { id: 2, name: "Jane Smith", email: "jane@example.com" }, { id: 3, name: "Bob Johnson", email: "bob@example.com" }];

app.use(cors())
app.use(express.json());
const uri = "mongodb+srv://taiefsiddik2:XGAwejOhZUYdQ1He@cluster0.nebbavw.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const userData = client.db("insertDB").collection("userData");
        app.get('/', (req, res) => {
            res.send('users management server is running')
        })

        app.get('/users', async (req, res) => {
            // res.send(users);
            const cursor = userData.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/users', async (req, res) => {
            // console.log('post api hitting')
            // console.log(req.body);
            // const newUser = req.body;
            // newUser.id = users.length + 1;
            // users.push(newUser);
            // res.send(newUser);
            const user = req.body;
            const result = await userData.insertOne(user);
            res.send(result);
        })
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        //await client.close();
    }
}
run().catch(console.log);

app.listen(port, () => {
    console.log(`server is running on Port: ${port}`)
})
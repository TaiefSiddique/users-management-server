var cors = require('cors')
const express = require('express');
const app = express();

//taief
const port = process.env.PORT || 5000;

const users = [{ id: 1, name: "John Doe", email: "john@example.com" }, { id: 2, name: "Jane Smith", email: "jane@example.com" }, { id: 3, name: "Bob Johnson", email: "bob@example.com" }];

app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
    res.send('users management server is running')
})

app.get('/users', (req, res) => {
    res.send(users);
})

app.post('/users', (req, res) => {
    console.log('post api hitting')
    console.log(req.body);
    const newUser = req.body;
    newUser.id = users.length + 1;
    users.push(newUser);
    res.send(newUser);
})

app.listen(port, () => {
    console.log(`server is running on Port: ${port}`)
})
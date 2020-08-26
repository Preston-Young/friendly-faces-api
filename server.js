const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Will change this once we add a database
const database = {
    users: [
        {
            id: "123",
            name: "Preston",
            email: "pcyoung@uci.edu",
            password: "peepee",
            entries: 0,
            joined: new Date()
        },
        {
            id: "111",
            name: "Nicholas",
            email: "snydern2000@gmail.com",
            password: "daisy",
            entries: 0,
            joined: new Date()
        }
    ]
};


app.get('/', (req, res) => {
    res.send(database.users);
});

// Sign in route
app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json("Success");
        } else {
            res.status(404).json("Error logging in");
        }
});

// Register route
app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    database.users.push(
        {
            id: "222",
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        }
    );
    res.json(database.users[database.users.length-1]);
});

// Profile route
app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(404).json("no such user");
    }
});

// Image route
app.post('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(404).json("no such user");
    }
});


app.listen(3000, () => {
    console.log('app is running on port 3000');
});

/*
/ --> res => this is working
/signin --> POST => success/fail
/register --> POST => user
/profile/:userId --> GET => user
/image --> PUT => user
*/
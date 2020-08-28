const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'prestonyoung',
      password : '',
      database : 'friendly-faces-db'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

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

// Root route
app.get('/', (req, res) => {
    res.send(database.users);
});

// Sign in route
app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        } else {
            res.status(404).json("Error logging in");
        }
});

// Register route
app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => {
            res.json(user[0]);
        })
        .catch(err => res.status(404).json('Already registered under this email'));
});

// Profile route
app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    db.select('*').from('users')
    .where({id})
    .then(user => {
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(404).json("no such user");
        }
    })
    .catch(err => res.status(404).json("error getting user"));
});

// Image route
app.put('/image', (req, res) => {
    const {id} = req.body;
    db('users').where({id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        if (entries.length) {
            res.json(entries[0]);
        } else {
            res.status(404).json("no such user");
        }
    })
    .catch(err => res.status(404).json("unable to get entries"));
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
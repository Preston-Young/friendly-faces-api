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
    db.select('email', 'hash').from('login')
    .where({
        'email': req.body.email
    })
    .then(data => {
        if (data.length) {
            if (bcrypt.compareSync(req.body.password, data[0].hash)) {
                return db.select('*').from('users')
                .where({
                    'email': req.body.email
                })
                .then(user => {
                    res.json(user[0]);
                })
                .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('password and username do not match');
            }
        } else {
            res.status(400).json('password and username do not match');
        }
    })
    .catch(err => res.status(400).json('unable to login'))
});

// Register route
app.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'));
    
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
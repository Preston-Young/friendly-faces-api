const express = require('express');

const app = express();

// Will change this once we add a database
const database = {
    users: [
        {
            id: 123,
            name: "Preston",
            email: "pcyoung@uci.edu",
            password: "peepee",
            entries: 0,
            joined: new Date()
        }
    ]
};


app.get('/', (req, res) => {
    res.send('Everything is working');
});

app.post('/signin', (req, res) => {
    res.json('Signing In');
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
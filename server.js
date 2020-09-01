const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
});



// Route Handler Functions
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {res.send('Everything is working fine')});

// Sign in route
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

// Register route
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

// Profile route
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

// Image route
app.put('/image', (req, res) => {image.handleImage(req, res, db)});

// Image URL route
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

/*
/ --> res => this is working
/signin --> POST => success/fail
/register --> POST => user
/profile/:userId --> GET => user
/image --> PUT => user
*/
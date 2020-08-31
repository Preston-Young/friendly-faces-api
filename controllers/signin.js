const handleSignin = (req, res, db, bcrypt) => {
    const {email, password} = req.body;

    if (!email || !password){
        return res.status(400).json('Cannot leave fields blank');
    }

    db.select('email', 'hash').from('login')
    .where({
        'email': req.body.email
    })
    .then(data => {
        if (data.length) {
            if (bcrypt.compareSync(password, data[0].hash)) {
                return db.select('*').from('users')
                .where({
                    'email': email
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
}

module.exports = {
    handleSignin: handleSignin
};
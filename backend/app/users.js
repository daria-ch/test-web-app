const express = require('express');
const bcrypt = require('bcrypt');
const mysqlDb = require('../mysqlDb');

const router = express.Router();
const saltRounds = 10;

router.get('/', async (req, res) => {
    const users = await mysqlDb.getConnection().query('SELECT * FROM `users`');
    res.send(users);
});

router.post('/', async (req, res) => {
    const user = req.body;
    const password = user.password;

    try {
        if (!user.username) {
            res.status(400).send({error: "Username cannot be empty"});
        }
        if (!user.password) {
            res.status(400).send({error: "Password cannot be empty"});
        }

        await bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                const result = mysqlDb.getConnection().query('INSERT INTO `users` (`id`, `username`, `password`) VALUES ' +
                    '(?, ?, ?)',
                    [user.id, user.username, hash]
                );
                res.send({username: user.username, password: hash, id: result.insertId});
            });
        });
    } catch (error) {
        res.send({'error': error.sqlMessage})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await mysqlDb.getConnection().query('DELETE FROM `users` WHERE `id`= ?', req.params.id);
        res.send({"message": "user is deleted"});
    } catch (error) {
        res.send({'error': error.sqlMessage})
    }
});

router.put('/:id', async (req, res) => {
    const newUser = req.body;
    const password = newUser.password;

    try {
        if (!newUser.username) {
            res.status(400).send({error: "Username cannot be empty"});
        }
        if (!newUser.password) {
            res.status(400).send({error: "Password cannot be empty"});
        }

        await bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                const result = mysqlDb.getConnection().query('UPDATE `users` SET `username` = ?, `password` = ? WHERE `id` = ?',
                    [newUser.username, hash, req.params.id]
                );
                res.send({username: newUser.username, password: hash});
            });
        });
    } catch (error) {
        res.send({'error': error.sqlMessage})
    }

});

module.exports = router;
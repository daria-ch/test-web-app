const express = require('express');
const mysqlDb = require('../mysqlDb');

const router = express.Router();

router.get('/', async (req, res) => {
    const categories = await mysqlDb.getConnection().query('SELECT * FROM `categories`');
    res.send(categories);
});

router.get('/:id', async (req, res) => {
    const category = await mysqlDb.getConnection().query('SELECT * FROM `categories` WHERE `id`= ?', req.params.id);
    let title = category[0];
    if (!title) {
        return res.status(400).send({message: 'Not found'})
    } else {
        res.send(title);
    }
});

router.post('/', async (req, res) => {
    const category = req.body;

    try {
        if (!category.title) {
            res.status(400).send({error: "Title cannot be empty"});
        } else if (!category.parent_id) {
            category.parent_id = null;
        }

        const result = await mysqlDb.getConnection().query('INSERT INTO `categories` (`id`, `title`, `parent_id`) VALUES ' +
            '(?, ?, ?)',
            [category.id, category.title, category.parent_id]
        );
        res.send({title: category.title, parent_id: category.parent_id, id: result.insertId});

    } catch (error) {
        res.send({'error': error.sqlMessage})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await mysqlDb.getConnection().query('DELETE FROM `categories` WHERE `id`= ?', req.params.id);
        res.send({"message": "category is deleted"});
    } catch (error) {
        res.send({'error': error.sqlMessage})
    }
});

router.put('/:id', async (req, res) => {
        const newCategory = req.body;

        try {
            if (!newCategory.title) {
                res.status(400).send({error: "Title cannot be empty"});
            } else if (!newCategory.parent_id) {
                newCategory.parent_id = null;
            }

            await mysqlDb.getConnection().query('UPDATE `categories` SET `title` = ?, `parent_id` = ? WHERE `id` = ?',
                [newCategory.title, newCategory.parent_id, req.params.id]
            );
            res.send({title: newCategory.title, parent_id: newCategory.parent_id});

        } catch
            (error) {
            res.send({'error': error.sqlMessage})
        }

    }
);


module.exports = router;
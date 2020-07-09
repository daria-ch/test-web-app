const path = require('path');

const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');

const mysqlDb = require('../mysqlDb');
const config = require('../config');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    const articles = await mysqlDb.getConnection().query('SELECT * FROM `articles`');
    res.send(articles);
});

router.get('/:id', async (req, res) => {
    const article = await mysqlDb.getConnection().query('SELECT * FROM `articles` WHERE `id`= ?', req.params.id);
    let articleItem = article[0];
    if (!articleItem) {
        return res.status(400).send({message: 'Not found'})
    } else {
        res.send(articleItem);
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const article = req.body;

    try {
        if (req.file) {
            article.image = req.file.filename;
        } else {
            return res.status(400).send({message: 'Image cannot be empty'})
        }

        if (!article.title) {
            res.status(400).send({error: "Title cannot be empty"});
        } else if (!article.description) {
            res.status(400).send({error: "Description cannot be empty"});
        } else {
            const result = await mysqlDb.getConnection().query('INSERT INTO `articles` (`category_id`, `user_id`, `title`, `description`, `image`) VALUES ' +
                '(?, ? ,?, ? ,? )',
                [article.category_id, article.user_id, article.title, article.description, article.image]);
            res.send({
                category_id: article.category_id,
                user_id: article.user_id,
                title: article.title,
                description: article.description,
                image: article.image,
                id: result.insertId
            });
        }
    } catch (error) {
        res.send({'error': error.sqlMessage})
    }

});

router.delete('/:id', async (req, res) => {
    try {
        await mysqlDb.getConnection().query('DELETE FROM `articles` WHERE `id`= ?', req.params.id);
        res.send({"message": "article is deleted"});
    } catch (error) {
        res.send({'error': error.sqlMessage})
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    const newArticle = req.body;

    try {
        if (req.file) {
            newArticle.image = req.file.filename;
        } else {
            return res.status(400).send({message: 'Image cannot be empty'})
        }

        if (!newArticle.title) {
            res.status(400).send({error: "Title cannot be empty"});
        } else if (!newArticle.description) {
            res.status(400).send({error: "Description cannot be empty"});
        } else {
            const result = mysqlDb.getConnection().query('UPDATE `articles` SET `category_id` = ?, `user_id` = ?, `title` = ?, `description` = ?, `image` = ? WHERE `id` = ?',
                [newArticle.category_id, newArticle.user_id, newArticle.title, newArticle.description, newArticle.image, req.params.id]
            );
            res.send({
                category_id: newArticle.category_id,
                user_id: newArticle.user_id,
                title: newArticle.title,
                description: newArticle.description,
                image: newArticle.image,
                id: result.insertId
            });
        }
    } catch (error) {
        res.send({'error': error.sqlMessage})
    }

});


module.exports = router;
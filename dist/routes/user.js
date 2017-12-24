"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("./../repository/repository");
const express = require("express");
const { check, validationResult } = require('express-validator/check');
exports.routes = express.Router();
exports.routes.get('/all', (req, res) => {
    repository_1.getAllUsers().then((usrs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log("usrs : " + JSON.stringify(usrs));
        res.json(usrs);
        res.end();
    });
});
exports.routes.get('/:userId', (req, res) => {
    repository_1.getUser(req.params.userId).then((usr) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log("usr : " + JSON.stringify(usr));
        res.json(usr);
        res.end();
    });
});
exports.routes.post('/add', [
    check('user_id').exists(),
    check('first_name').exists(),
    check('last_name').exists(),
    check('email').optional().isEmail().withMessage('must be an email address'),
    check('phone').isLength({ min: 8, max: 15 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(JSON.stringify({ errors: errors.mapped() }));
        return res.status(400).json({ errors: errors.mapped() });
    }
    repository_1.addUser(req.body).then((response_msg) => {
        console.log(response_msg);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.send(response_msg);
        res.end();
    });
});
exports.routes.delete('/:userId', (req, res) => {
    repository_1.removeUser(req.params.userId).then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log(`user with user_id: ${req.params.userId} deleted!`);
        res.end();
    });
});
exports.routes.post('/edit', [
    check('user_id').exists(),
    check('email').optional().isEmail().withMessage('must be an email address'),
    check('phone').optional().isLength({ min: 8, max: 15 })
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(JSON.stringify({ errors: errors.mapped() }));
        return res.status(400).json({ errors: errors.mapped() });
    }
    repository_1.editUser(req.body).then((response_msg) => {
        console.log(response_msg);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.send(response_msg);
        res.end();
    }, (err) => {
        console.log(err.message);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.send(err.message);
        res.end();
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("./../repository/repository");
const express = require("express");
exports.routes = express.Router();
exports.routes.get('/all', (req, res) => {
    repository_1.getAllUsers().then((usrs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log("usrs : " + JSON.stringify(usrs));
        res.send(JSON.stringify(usrs));
        res.end();
    });
});
exports.routes.get('/:userId', (req, res) => {
    repository_1.getUser(req.params.userId).then((usr) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log("userId : " + req.params.userId);
        console.log("usr : " + JSON.stringify(usr));
        res.send(JSON.stringify(usr));
        res.end();
    });
});

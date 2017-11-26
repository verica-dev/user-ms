import { getUser, getAllUsers } from "./../repository/repository";
const express = require("express");

export const routes = express.Router();

routes.get('/all', (req: any, res: any) => {
    getAllUsers().then((usrs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log("usrs : " + JSON.stringify(usrs));
        res.send(JSON.stringify(usrs));
        res.end();
    });
});

routes.get('/:userId', (req: any, res: any) => {
    getUser(req.params.userId).then((usr) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log("userId : " + req.params.userId);
        console.log("usr : " + JSON.stringify(usr));
        res.send(JSON.stringify(usr));
        res.end();
    });
});

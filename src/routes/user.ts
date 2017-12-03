import { getUser, getAllUsers, addUser } from "./../repository/repository";
const express = require("express");

export const routes = express.Router();

routes.get('/all', (req: any, res: any) => {
    getAllUsers().then((usrs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log("usrs : " + JSON.stringify(usrs));
        //res.send(JSON.stringify(usrs));
        res.json(usrs);
        res.end();
    });
});

routes.get('/:userId', (req: any, res: any) => {
    getUser(req.params.userId).then((usr) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log("userId : " + req.params.userId);
        console.log("usr : " + JSON.stringify(usr));
        //res.send(JSON.stringify(usr));
        res.json(usr);
        res.end();
    });
});

routes.post('/add', (req: any, res: any) => {
    addUser(req.body).then((response_msg: string) => {
        console.log(response_msg);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.send(response_msg);
        res.end();
    });    
})

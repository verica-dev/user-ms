import { getUser, getAllUsers, addUser, removeUser } from "./../repository/repository";
const express = require("express");
const { check, validationResult } = require('express-validator/check');

export const routes = express.Router();

routes.get('/all', (req: any, res: any) => {
    getAllUsers().then((usrs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log("usrs : " + JSON.stringify(usrs));
        res.json(usrs);
        res.end();
    });
});

routes.get('/:userId', (req: any, res: any) => {
    getUser(req.params.userId).then((usr) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log("usr : " + JSON.stringify(usr));
        res.json(usr);
        res.end();
    });
});

routes.post('/add', [
    check('user_id').exists(),
    check('first_name').exists(),
    check('last_name').exists(),
    check('email').optional().isEmail().withMessage('must be an email address'),
    check('phone').isLength({ min: 8, max: 15 })
], (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(JSON.stringify({ errors: errors.mapped() }));
        return res.status(400).json({ errors: errors.mapped() });
    }
    addUser(req.body).then((response_msg: string) => {
        console.log(response_msg);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.send(response_msg);
        res.end();
    });
});

routes.delete('/:userId', (req: any, res: any) => {
    removeUser(req.params.userId).then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log(`user with user_id: ${req.params.userId} deleted!`);
        res.end();
    });
});


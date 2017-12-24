"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./routes/user");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/user", user_1.routes);
app.listen(3000, () => console.log('user ms listening on port 3000!'));

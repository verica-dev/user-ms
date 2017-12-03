//index.ts - main service file
import { routes } from "./routes/user";
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use("/user", routes);
app.listen(3000, () => console.log('user ms listening on port 3000!'));
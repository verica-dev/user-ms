//index.ts - main service file
import { routes } from "./routes/user";
const express = require("express");

const app = express();
app.use("/user", routes);
app.listen(3000, () => console.log('user ms listening on port 3000!'));
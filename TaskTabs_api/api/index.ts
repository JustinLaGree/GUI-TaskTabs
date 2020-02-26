import express from "express";
import mongoose from "mongoose";
import { routes } from "./routes/taskRoutes";

const app: express.Application = express();
const port: Number = 1337;

app.get('/', (req, res) => res.send('Hello World!'))

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Taskbdasdasd');

routes(app);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
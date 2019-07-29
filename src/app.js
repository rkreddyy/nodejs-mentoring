import express from "express";
import queryParser from "./middlewares/queryParser";
import cookieParser from "./middlewares/cookieParser";
import { router } from './routes';

const app = express();

app.use(queryParser);
app.use(cookieParser);
app.use(router);

export default app;

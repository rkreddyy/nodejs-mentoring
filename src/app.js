import express from "express";
import QueryParser from "./middlewares/queryParser";
import CookieParser from "./middlewares/cookieParser";
import { router } from './routes';

const app = express();

app.use(QueryParser);
app.use(CookieParser);
app.use(router);

export default app;

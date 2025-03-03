import express from "express";
import passport from "passport";
import session from "express-session";
import queryParser from "./middlewares/queryParser";
import cookieParser from "./middlewares/cookieParser";
import router from './routes';
import config from './config/config.json'

const app = express();

app.use(queryParser);
app.use(cookieParser);
app.use(express.json());
app.use(session({ secret: config.session.secret, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

export default app;

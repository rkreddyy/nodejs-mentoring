import express from 'express';
import passport from 'passport';
import * as auth from '../../controllers/auth';

const authRouter = express.Router();

authRouter.post("/", auth.auth);
authRouter.post("/local", auth.passportAuth('local'));

authRouter.get("/twitter", passport.authenticate('twitter'));
authRouter.get("/twitter/callback", auth.passportAuth('twitter'));

authRouter.get("/facebook", passport.authenticate('facebook'));
authRouter.get("/facebook/callback", auth.passportAuth('facebook'));

authRouter.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get("/google/callback", auth.passportAuth('google'));

export default authRouter;
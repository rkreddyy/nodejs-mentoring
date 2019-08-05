import express from 'express';
import * as users from '../../controllers/users';

const userRouter = express.Router();

userRouter.route('/')
  .get(users.getAllUsers);

export default userRouter;
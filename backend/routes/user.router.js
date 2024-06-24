import express from 'express';
import { authenticateUser, deleteUsers, getUserByIds, getUsers, registerUser } from '../controllers/user.controller.js';
import bruteForce from '../middlewares/brute.js';




const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUserByIds);
userRouter.post('/login', bruteForce.prevent, authenticateUser);
userRouter.post('/create', registerUser);
/* userRouter.put('/:id', updateProduct); */
userRouter.delete('/:id', deleteUsers);


export default userRouter;
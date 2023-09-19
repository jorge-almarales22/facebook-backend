import {Router} from 'express'
import { login, ping, signup } from '../controlles/auth.controller.js';

export const authRouter = Router();

authRouter.get('/ping', ping)
authRouter.post('/sign-in', login)
authRouter.post('/sign-up', signup)
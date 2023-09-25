import {Router} from 'express'
import { searchFriends } from '../controlles/friends.controller.js';

export const friendsRouter = Router();

friendsRouter.get('/search', searchFriends)


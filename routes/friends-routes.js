import {Router} from 'express'
import { getFriendRequests, searchFriends } from '../controlles/friends.controller.js';

export const friendsRouter = Router();

friendsRouter.get('/search', searchFriends)
friendsRouter.get('/friend-requests', getFriendRequests)


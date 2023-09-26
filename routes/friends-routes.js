import {Router} from 'express'
import { getAllFriends, getFriendRequests, searchFriends } from '../controlles/friends.controller.js';

export const friendsRouter = Router();

friendsRouter.get('/', getAllFriends)
friendsRouter.get('/search', searchFriends)
friendsRouter.get('/friend-requests', getFriendRequests)


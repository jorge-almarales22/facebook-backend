import {Router} from 'express';
import { getNotifications } from '../controlles/notification.controller.js';

export const notificationRouter = Router();

notificationRouter.get('/', getNotifications)
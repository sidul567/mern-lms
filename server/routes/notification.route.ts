import express from 'express';
import { authorizedRoles, isAuthenticate } from '../middleware/auth';
import { getNotifications, updateNotification } from '../controllers/notification.controller';
import { updateAccessToken } from '../controllers/user.controller';

const notificationRouter = express.Router();

// Get all notification -- only admin
notificationRouter.get('/notifications', updateAccessToken, isAuthenticate, authorizedRoles("admin"), getNotifications);

// Update notification
notificationRouter.put('/notification/:notificationId', updateAccessToken, isAuthenticate, authorizedRoles("admin"), updateNotification);

export default notificationRouter;
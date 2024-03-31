import express from 'express';
import { authorizedRoles, isAuthenticate } from '../middleware/auth';
import { createLayout, getLayoutByType, updateLayout } from '../controllers/layout.controller';
import { updateAccessToken } from '../controllers/user.controller';

const layoutRouter = express.Router();

// Create layout -- admin
layoutRouter.post('/layout/create', updateAccessToken, isAuthenticate, authorizedRoles("admin"), createLayout);

// Update layout -- admin
layoutRouter.put('/layout/update', updateAccessToken, isAuthenticate, authorizedRoles("admin"), updateLayout);

// Get layout by type
layoutRouter.get('/layout/get/:type', getLayoutByType);

export default layoutRouter;
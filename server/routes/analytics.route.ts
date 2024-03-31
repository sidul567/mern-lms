import express from "express";
import { authorizedRoles, isAuthenticate } from "../middleware/auth";
import { getCoursesAnalytics, getUsersAnalytics, getordersAnalytics } from "../controllers/analytics.controller";
import { updateAccessToken } from "../controllers/user.controller";

const analyticsRouter = express.Router();

// Get users analytics -- admin
analyticsRouter.get('/analytics/users', updateAccessToken, isAuthenticate, authorizedRoles("admin"), getUsersAnalytics);

// Get courses analytics -- admin
analyticsRouter.get('/analytics/courses', updateAccessToken, isAuthenticate, authorizedRoles("admin"), getCoursesAnalytics);

// Get orders analytics -- admin
analyticsRouter.get('/analytics/orders', updateAccessToken, isAuthenticate, authorizedRoles("admin"), getordersAnalytics);

export default analyticsRouter;
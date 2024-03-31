import express from 'express';
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registrationUser, socialAuthLogin, updateAccessToken, updateUserAvatar, updateUserInfo, updateUserPassword, updateUserRole } from '../controllers/user.controller';
import { authorizedRoles, isAuthenticate } from '../middleware/auth';

const userRouter = express.Router();

// Registration User
userRouter.post('/user/registration', registrationUser);

// Activate User Account
userRouter.post('/user/activate', activateUser);

// Login User Account
userRouter.post("/user/login", loginUser);

// Logout User Account
userRouter.get('/user/logout', isAuthenticate, logoutUser);

// Refresh token
userRouter.get('/user/refresh', updateAccessToken); 

// Get user info
userRouter.get('/user/me', updateAccessToken, isAuthenticate, getUserInfo);

// Social Login
userRouter.post('/user/socialAuthLogin', socialAuthLogin);

// Update user info
userRouter.put('/user/updateInfo', updateAccessToken, isAuthenticate, updateUserInfo);

// Update user password
userRouter.put('/user/updatePassword', updateAccessToken, isAuthenticate, updateUserPassword);

// Update user avatar
userRouter.put('/user/updateAvatar', updateAccessToken, isAuthenticate, updateUserAvatar);

// Get all users -- admin
userRouter.get('/users', updateAccessToken, isAuthenticate, authorizedRoles("admin"), getAllUsers);

// Update user role -- admin
 userRouter.put('/user/updateRole', updateAccessToken, isAuthenticate, authorizedRoles("admin"), updateUserRole);

//  Delete user
 userRouter.delete('/user/:userId', updateAccessToken, isAuthenticate, authorizedRoles("admin"), deleteUser);

export default userRouter;
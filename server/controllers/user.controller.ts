import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import { IUser, User } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import sendMail from "../mails/sendMail";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { getAllUsersService, getUserById, updateUserRoleService } from "../services/user.service";
import cloudinary from 'cloudinary';

interface IRegistrationUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

// Registration User
export const registrationUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const isEmailExist = await User.findOne({ email: email });

    if (isEmailExist) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    const user: IRegistrationUser = {
      name,
      email,
      password,
    };

    const activationToken = createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const data = { user: { name: user.name }, activationCode };

    await sendMail({
      to: email,
      template: "activationMail.ejs",
      subject: "Activate your account - MERN-LMS",
      data,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email: ${email} for activate your account!`,
      token: activationToken.token,
    });
  }
);

interface IActivationToken {
  activationCode: string;
  token: string;
}

const createActivationToken = (user: IRegistrationUser): IActivationToken => {
  const activationCode = Math.floor(Math.random() * 9000 + 1000).toString();
  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_TOKEN_SECRET as Secret,
    { expiresIn: "5m" }
  );
  return { activationCode, token };
};

interface IActivationUser {
  activationCode: string;
  activationToken: string;
}

// Activate User Account
export const activateUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activationCode, activationToken } = req.body as IActivationUser;

    const newUser: { user: IRegistrationUser; activationCode: string } =
      jwt.verify(
        activationToken,
        process.env.ACTIVATION_TOKEN_SECRET as Secret
      ) as { user: IRegistrationUser; activationCode: string };

    if (newUser.activationCode !== activationCode) {
      return next(new ErrorHandler("Invalid activation code!", 400));
    }

    const { name, email, password } = newUser.user;

    const isExistEmail = await User.findOne({ email: email });

    if (isExistEmail) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "Your account has been activated!",
    });
  }
);

interface ILoginUser {
  email: string;
  password: string;
}

// Login User
export const loginUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as ILoginUser;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    sendToken(user, 201, res);
  }
);

// Logout User
export const logoutUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });
    redis.del(req.user?._id || "");
    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  }
);

// Update access token
export const updateAccessToken = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const refresh_token = req.cookies.refresh_token;
    
    if (!refresh_token) {
      return next(new ErrorHandler("Please login at first!", 401));
    }

    const decoded = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("Invalid token!", 401));
    }

    const session = await redis.get(decoded.id);

    if (!session) {
      return next(new ErrorHandler("Please login at first!", 401));
    }

    const user: IUser = JSON.parse(session);

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN as string,
      { expiresIn: "5m" }
    );
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN as string,
      { expiresIn: "15m" }
    );

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    req.cookies.access_token = accessToken
    req.cookies.refresh_token = refreshToken

    await redis.set(user._id, JSON.stringify(user),"EX", 604800);

    next();
  }
);

// Get user info
export const getUserInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    getUserById(userId, res);
  }
);

interface ISocialUser{
  name: string,
  email: string,
  avatar: string,
}

// Social Auth Login
export const socialAuthLogin = catchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
  const { name, email, avatar } = req.body as ISocialUser;

  if(!name || !email){
    return next(new ErrorHandler("Please fill all fields", 400));
  }

  const user = await User.findOne({ email: email });
  if (user) {
    sendToken(user, 200, res);
  }else{
    const userAvatar = {
      url: avatar
    }
    const newUser = await User.create({ name, email, avatar: userAvatar });
    sendToken(newUser, 200, res);
  }
})

interface IUpateUser{
  name: string, 
}

// Update user info
export const updateUserInfo = catchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
  const {name} = req.body as IUpateUser;
  const userId = req.user?._id;
  const user = await User.findById(userId);

  if(name && user){
    user.name = name;
  }

  await user?.save();

  await redis.set(userId, JSON.stringify(user));

  res.status(200).json({
    success: true,
    user
  })
})

interface IUpdatePassword{
  oldPassword: string,
  newPassword: string,
}

// Update user password
export const updateUserPassword = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
  const {oldPassword, newPassword} = req.body as IUpdatePassword;

  if(!oldPassword || !newPassword){
    return next(new ErrorHandler("Please fill all fields", 400));
  }

  const userId = req.user?._id;
  const user = await User.findById(userId).select("+password");

  if(!user){
    return next(new ErrorHandler("User not found!", 401));
  }

  const isMatchPassword = await user.comparePassword(oldPassword);
  if(!isMatchPassword){
    return next(new ErrorHandler("Invalid old password!", 401));
  }

  user.password = newPassword;

  await user.save();
  await redis.set(req.user?._id, JSON.stringify(user));

  res.status(200).json({
    success: true,
    user,
  })
})

interface IUserAvatar{
  avatar: string,
}

// Update user avatar
export const updateUserAvatar = catchAsyncError(async(req: Request, res: Response, next: NextFunction)=>{
  const {avatar} = req.body as IUserAvatar;

  if(!avatar){
    return next(new ErrorHandler("Please upload an image!", 400));
  }

  const userId = req.user?._id;
  const user = await User.findById(userId);

  if(user && avatar){
    if(user.avatar.public_id){
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        'folder': 'avatars'
      })

      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }
    }else{
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        'folder': 'avatars'
      })

      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }
    }
    await user.save();
    await redis.set(req.user?._id, JSON.stringify(user));
  }
  
  res.status(200).json({
    success: true,
    user,
  })
})

// Get all users -- admin
export const getAllUsers = catchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
    getAllUsersService(res);
})

// Update user role -- admin
export const updateUserRole = catchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
  const {email, role} = req.body;
  const user = await User.findOne({ email });
  if(!user){
    return next(new ErrorHandler("User not found!", 400));
  }
  updateUserRoleService(res, email, role);
})

// Delete user -- admin
export const deleteUser = catchAsyncError(async(req: Request, res: Response, next: NextFunction) => {
  const {userId} = req.params;
  if(!userId){
    return next(new ErrorHandler("User not found!", 400));
  }

  await User.findByIdAndDelete(userId);
  await redis.del(userId);

  res.status(200).json({
    success: true,
    message: "User deleted successfully!",
  })
})
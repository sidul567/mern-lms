"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "../utils/styles";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRegistrationMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email address!")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password!")
    .min(6, "Password must be 6 characters!"),
});

const SignUp = ({ setRoute }: Props) => {
  const [registration, {error, isSuccess, data}] = useRegistrationMutation();

  useEffect(()=>{
    if(isSuccess){
      const message = data?.message;
      toast.success(message || "Registration Successful!");
      setRoute("verification");
    }
    if(error){
      const errorMessage = error as any;
      toast.error(errorMessage.data.message || "Something went wrong!");
    }
  },[isSuccess, error])

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {      
      const data = {
        name,
        email,
        password,
      };
      await registration(data);
    },
  });

  const { errors, touched, values, handleSubmit, handleChange } = formik;
  const [show, setShow] = useState(false);

  return (
    <div>
      <h3 className={`${styles.title}`}>Sign Up with MERN-LMS</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={`${styles.label}`}>
            Enter Your Name{" "}
            <span className="text-red-500 text-lg font-medium">*</span>{" "}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`${
              errors.name && touched.name
                ? "border-red-500 dark:border-red-500 border-2"
                : ""
            } ${styles.input}`}
            placeholder="john doe"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 font-Poppins text-xs font-light">
              {errors.name}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="email" className={`${styles.label}`}>
            Enter Your Email{" "}
            <span className="text-red-500 text-lg font-medium">*</span>{" "}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={`${
              errors.email && touched.email
                ? "border-red-500 dark:border-red-500 border-2"
                : ""
            } ${styles.input}`}
            placeholder="john@gmail.com"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 font-Poppins text-xs font-light">
              {errors.email}
            </span>
          )}
        </div>
        <div className="relative">
          <label htmlFor="password" className={`${styles.label}`}>
            Enter Your Password{" "}
            <span className="text-red-500 text-lg font-medium">*</span>{" "}
          </label>
          <input
            type={`${show ? "text" : "password"}`}
            name="password"
            id="password"
            className={`${styles.input} ${
              errors.password && touched.password
                ? "border-red-500 dark:border-red-500 border-2"
                : ""
            } relative `}
            placeholder="*******"
            value={values.password}
            onChange={handleChange}
          />

          {show ? (
            <AiOutlineEye
              size={20}
              className="dark:text-white cursor-pointer absolute top-11 right-2"
              onClick={() => setShow(false)}
            />
          ) : (
            <AiOutlineEyeInvisible
              size={20}
              className="dark:text-white cursor-pointer absolute top-11 right-2"
              onClick={() => setShow(true)}
            />
          )}

          {errors.password && touched.password && (
            <span className="text-red-500 font-Poppins text-xs font-light">
              {errors.password}
            </span>
          )}
        </div>
        <div className="mt-6">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>
      </form>
      <h5 className="mt-8 dark:text-white text-center font-Poppins font-medium text-sm">
        Or join with
      </h5>
      <div className="flex items-center justify-center mt-3 gap-2">
      <FcGoogle size={30} className="cursor-pointer" onClick={()=>signIn("google")} />
        <AiFillGithub size={30} className="cursor-pointer dark:text-white" onClick={()=>signIn("github")} />
      </div>
      <h5 className="mt-4 dark:text-white text-center font-Poppins font-medium text-sm">
        Already have an account?{" "}
        <span
          className="text-orange-500 dark:text-orange-400 cursor-pointer"
          onClick={() => setRoute("login")}
        >
          Login
        </span>{" "}
      </h5>
    </div>
  );
};

export default SignUp;

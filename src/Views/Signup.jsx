import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import * as jwt  from 'jwt-decode'
import { Button } from "@material-tailwind/react";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  async function signup(name, email, password) {
    const user_credentials = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5050/auth/signup",
        user_credentials
      );
      if (response) {
        const token = response.data.token;
        const userId = jwt.jwtDecode(token).id;
        Cookies.set("token", token, { expires: 7, secure: true });
        Cookies.set("user", userId, { expires: 7, secure: true });
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  //defining a form instance
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email required"),
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Username required"),
      password: Yup.string()
        .min(8, "Password should not be less than 8 characters")
        .required("Password required"),
    }),
    onSubmit: (values) => {
      signup(values.username, values.email, values.password);
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold text-[#6c9d98]">SIGNUP</h1>
          <p className="text-sm">Sign up to make an account with us</p>
        </div>
        {error ? <p className="text-red-500 text-center">{error}</p> : ""}
        <form onSubmit={formik.handleSubmit} className="form-group">
          <div className="form-field">
            <label className="form-label">Email address</label>
            <input
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Type email  "
              type="email"
              className="input max-w-full"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-field">
            <label className="form-label">Username</label>
            <input
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              placeholder="Type username  "
              type="text"
              className="input max-w-full"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="text-red-500">{formik.errors.username}</div>
            ) : null}
          </div>
          <div className="form-field">
            <label className="form-label">Password</label>
            <input
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Type password  "
              type="password"
              className="input max-w-full"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form-field pt-5">
            <div className="form-control justify-between">
            <Button
                type="submit"
                color="teal"
                variant="gradient"
                className="w-full"
              >
                Sign up
              </Button>
            </div>
          </div>

          <div className="form-field">
            <div className="form-control justify-center">
              <Link
                to={"/login"}
                className="link link-underline-hover text-sm"
              >
                Already have an account yet? Log in.
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

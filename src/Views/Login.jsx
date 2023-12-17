import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import * as jwt from "jwt-decode";
import { Button } from "@material-tailwind/react";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function login(email, password) {
    const user_credentials = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:5050/auth/login",
        user_credentials
      );
      if (response) {
        const token = response.data.token;
        const userId = jwt.jwtDecode(token).id;
        const userName = jwt.jwtDecode(token).user_name;
        Cookies.set("token", token, { expires: 7, secure: true });
        Cookies.set("user", userId, { expires: 7, secure: true });
        Cookies.set("user_name", userName, { expires: 7, secure: true });
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  //defining a form instance
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email required"),
      password: Yup.string().required("Password required"),
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-6 p-2">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold text-[#6c9d98]">LOGIN</h1>
          <p className="text-sm">Log in to access your account</p>
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
              placeholder="Type here"
              type="email"
              className="input max-w-full"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
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
              placeholder="Type here"
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
                Log in
              </Button>
            </div>
          </div>

          <div className="form-field">
            <div className="form-control justify-center">
              <Link
                to={"/signup"}
                className="link link-underline-hover text-sm"
              >
                Don't have an account yet? Sign up.
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

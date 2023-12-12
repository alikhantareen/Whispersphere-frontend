import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {

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
      password: Yup.string()
        .required("Password required"),
    }),
    onSubmit: (values) => {
      console.log(values.email, values.password);
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold">LOGIN</h1>
          <p className="text-sm">Log in to access your account</p>
        </div>
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
              <button type="submit" className="btn btn-primary w-full">
                Log in
              </button>
            </div>
          </div>

          <div className="form-field">
            <div className="form-control justify-center">
              <Link
                to={"/signup"}
                className="link link-underline-hover link-primary text-sm"
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
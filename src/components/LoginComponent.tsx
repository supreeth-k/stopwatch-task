import * as React from "react";
import { useEffect } from "react";
import { Button, InputLabel, OutlinedInput } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import styles from "../styles/LoginComponent.module.scss";

import "react-toastify/dist/ReactToastify.css";

interface Values {
  email: string;
  password: string;
}

const LoginComponent = () => {
  let initialValues: Values = {
    email: "",
    password: "",
  };

  function createUser(values: Values) {
    let user: Values = { email: "", password: "" };

    user.email = values.email;
    user.password = values.password;

    if (values.email && values.password) {
      localStorage.setItem("stopWatchUsers", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      toast.success("Logged in successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.href = "/stopwatch";
    } else {
      toast.error("Incomplete login details", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
      <div className={styles.loginContainer}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: Values, event) => {
            createUser(values);
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <div>
                  <div className="row mb-4 mt-1">
                    <div className="col-lg-3 col-xs-12">
                      <label htmlFor="email" className="form-label">
                        <h4>Email</h4>
                      </label>
                    </div>

                    <div className="col-lg-8 offset-lg-1 col-xs-12">
                      <Field
                        type="email"
                        className="form-control pt-2"
                        name="email"
                        id="email"
                        aria-describedby="emailHelp"
                      />
                      {errors.email && touched.email ? (
                        <p className="text-danger text-monospace mt-2">
                          <div className="ml_label">
                            <small>{errors.email}</small>
                          </div>
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-lg-3 col-xs-12">
                    <label htmlFor="password" className="form-label">
                      <h4>Password</h4>
                    </label>
                  </div>
                  <div className="col-lg-8 offset-lg-1 col-xs-12">
                    <Field
                      type="password"
                      className="form-control"
                      name="password"
                      id="password"
                      aria-describedby="emailHelp"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-danger text-monospace mt-2">
                        <small>{errors.password}</small>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={styles.loginButton}>
                  <Button variant="contained" size="large" type="submit">
                    Login
                  </Button>
                </div>
              </div>
              {/* </Link> */}
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginComponent;

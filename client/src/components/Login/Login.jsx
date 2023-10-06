import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { login } from "../../schemas/login";
//import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getMyUser, getUserByEmail } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";

const LogUser = () => {
  const dispatch = useDispatch();
  const [email] = useState("");
  const navigate = useNavigate();
  let user = useSelector((state) => state.user);

  const onSubmit = async (values, actions) => {
    axios
      .post("http://localhost:3001/login", values, {})
      .then((res) => {
        localStorage.setItem("jwt", res.data.data);
        dispatch(getMyUser());
        console.log(getMyUser());

        navigate("/home");
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Authentication Failed",
            text: "Invalid email or password.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while trying to log in.",
          });
        }
      });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: login,
    onSubmit,
  });
  console.log(errors);

  useEffect(() => {
    dispatch(getMyUser());
  }, [dispatch]);

  useEffect(() => {
    if (user.length < 1) dispatch(getUserByEmail(email));
  }, [dispatch, user, email]);

  return (
    <div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li>
            <a class="nav-link" href="/login">
              <div>
                <Link to={"/home"}>
                  <button class="btn bg-light">Home</button>
                </Link>
              </div>
            </a>
          </li>
        </ul>
      </nav>
      <div >
        <div className="login">
          <h1 className="Login1">LOGIN</h1>
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="form-group">
              <label htmlFor="email" className="lebel1"></label>
              <br></br>
              <input
                value={values.email}
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="Enter your email"
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""}
              />
              {errors.email && touched.email && (
                <p className="error">{errors.email}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password" className="lebel1"></label>
              <br></br>
              <input
                id="password"
                type="password"
                placeholder="Enter your Password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password ? "input-error" : ""
                }
              />
              {errors.password && touched.password && (
                <p className="error">{errors.password}</p>
              )}
            </div>
            <button disabled={isSubmitting} type="submit" class="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LogUser;

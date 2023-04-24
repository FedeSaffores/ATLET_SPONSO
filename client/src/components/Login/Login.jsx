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

const LogUser = () => {
  const [formSuccess] = useState(false);
  const dispatch = useDispatch();
  const [email] = useState("");
  const navigate = useNavigate();
  let user = useSelector((state) => state.user);

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    axios
      .post("http://localhost:3001/login", values, {})
      .then((res) => {
        localStorage.setItem("jwt", res.data.data);
        dispatch(getMyUser());
        navigate("/");
      })
      .catch((error) => {
        axios.post("http://localhost:3001/user", values, {}).then((res) =>
          Swal.fire({
            title: `Done!`,
            showConfirmButton: false,
            timer: 5000,
          })
        );
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
    setFieldValue,
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
                <Link to={"/"}>
                  <button class="btn btn-info">HOME</button>
                </Link>
              </div>
            </a>
          </li>
        </ul>
      </nav>
      <div className="p-3 mb-2 bg-secondary text-white">
        <div class="container p-3 my-3 border bg-light">
          <div class="container p-3 my-3 bg-dark text-white">
            <div class="container p-3 my-3 bg-primary text-white">
              <div className="p-3 mb-2 bg-secondary text-white">
                <h1 className="h1">LOGIN</h1>
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <div className="form-group">
                    <label htmlFor="email" className="lebel">
                      EMAIL:
                    </label>
                    <br></br>
                    <input
                      value={values.email}
                      onChange={handleChange}
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email ? "input-error" : ""
                      }
                    />
                    {errors.email && touched.email && (
                      <p className="error">{errors.email}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="lebel">
                      PASSWORD:
                    </label>
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
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    class="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogUser;

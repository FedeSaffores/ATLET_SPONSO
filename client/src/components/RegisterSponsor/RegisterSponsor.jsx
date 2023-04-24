import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { schemaSponsor } from "../../schemas/sponsor";
import { useEffect } from "react";
import { getMyUser } from "../../Redux/actions";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const FormSponsor = () => {
  const dispatch = useDispatch();
  let Myuser = useSelector((state) => state.myUser);
  const onSubmit = async (values, actions) => {
    const parceValues = {
      name: Myuser.name,
      email: Myuser.email,
      companyName: values.companyName,
      description: values.description,
    };
    axios
      .post("http://localhost:3001/newSponsor", parceValues, {})
      .then((res) => {
        Swal.fire({
          title: `Created Sponsor!`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "existe un error",
          text: `${error}`,
        });
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
      companyName: "",
      description: "",
    },
    //validationSchema: schemaSponsor,
    onSubmit,
  });
  console.log(errors);
  useEffect(() => {
    dispatch(getMyUser());
  }, [dispatch]);

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
                <h1 className="h1">SPONSOR REGISTRATION</h1>
                <form
                  encType="multipart/form-data"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <div className="form-group">
                    <label html="firstName" className="lebel">
                      USER NAME:
                    </label>
                    <br></br>
                    <h2>{Myuser.name}</h2>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="lebel">
                      EMAIL:
                    </label>
                    <br></br>
                    <h2>{Myuser.email}</h2>
                  </div>
                  <div className="form-group">
                    <label html="description" className="lebel">
                      COMPANY NAME:
                    </label>
                    <br></br>
                    <input
                      value={values.companyName}
                      onChange={handleChange}
                      id="companyName"
                      type="companyName"
                      placeholder="Enter your companyName"
                      onBlur={handleBlur}
                      className={
                        errors.companyName && touched.companyName
                          ? "input-error"
                          : ""
                      }
                    />
                    {errors.companyName && touched.companyName && (
                      <p className="error">{errors.companyName}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label html="description" className="lebel">
                      ACTIVITY COMPANY:
                    </label>
                    <br></br>
                    <input
                      value={values.description}
                      onChange={handleChange}
                      id="description"
                      type="description"
                      placeholder="Enter your description"
                      onBlur={handleBlur}
                      className={
                        errors.description && touched.description
                          ? "input-error"
                          : ""
                      }
                    />
                    {errors.description && touched.description && (
                      <p className="error">{errors.description}</p>
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
export default FormSponsor;

import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
//import { basicSchema } from "../../schemas/index";
import "./RegisterFighter.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { getMyUser } from "../../Redux/actions";
import { Link } from "react-router-dom";
//import { json } from "react-router-dom";

const RegisterFighter = () => {
  const dispatch = useDispatch();
  const Myuser = useSelector((state) => state.myUser);
  const onSubmit = async (values, actions) => {
    let formdata = new FormData();
    formdata.append("image", values.image);
    //formdata.append()
    const parceValues = {
      name: Myuser.name,
      lastname: Myuser.lastname,
      email: Myuser.email,
      password: Myuser.password,
      tel: Myuser.tel,
      address: Myuser.address,
      description: values.description,
      quality: values.quality,
      instagram: values.instagram,
    };
    console.log(parceValues);
    formdata.append("data", JSON.stringify(parceValues));
    axios
      .post("http://localhost:3001/newFighter", formdata, {
        headers: {
          "Content-Type": "multipart/formdata",
        },
      })
      .then((res) => {
        Swal.fire({
          title: `Created Fighter!`,
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
    setFieldValue,
  } = useFormik({
    initialValues: {
      description: "",
      quality: "",
      image: null,
      instagram: "",
    },
    //  validationSchema: basicSchema,
    onSubmit,
  });
  // console.log(errors);

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

      <div class="container p-3 my-3 border bg-light">
        <div class="container p-3 my-3 bg-dark text-white">
          <div class="container p-3 my-3 bg-primary text-white">
            <div className="p-3 mb-2 bg-secondary text-white">
              <h1 className="h1">ATHLETE REGISTRATION</h1>
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <div className="form-group">
                  <h2>{Myuser.name}</h2>
                  <h2>{Myuser.lastname}</h2>
                  <h2>{Myuser.email}</h2>
                  <h2>{Myuser.tel}</h2>
                  <h2>{Myuser.address}</h2>
                  <label html="description" className="lebel">
                    DESCRIPTION:
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
                <div>
                  <label html="instagram" className="lebel">
                    Instagram:
                  </label>
                  <br></br>
                  <input
                    value={values.instagram}
                    onChange={handleChange}
                    id="instagram"
                    type="instagram"
                    placeholder="Enter your link of instagram"
                    onBlur={handleBlur}
                    className={
                      errors.instagram && touched.instagram ? "input-error" : ""
                    }
                  />
                  {errors.instagram && touched.instagram && (
                    <p className="error">{errors.instagram}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="description" className="lebel">
                    QUALITY:
                  </label>
                  <br></br>
                  <select
                    value={values.quality}
                    onChange={handleChange}
                    id="quality"
                    type="quality"
                    placeholder="Enter your quality"
                    onBlur={handleBlur}
                    className={
                      errors.quality && touched.quality ? "input-error" : ""
                    }
                  >
                    <option value="">SELECT QUALITY</option>
                    <option value="amateur">AMATEUR</option>
                    <option value="profesional">PROFESIONAL</option>
                  </select>
                  {errors.quality && touched.quality && (
                    <p className="error">{errors.quality}</p>
                  )}
                </div>
                <div class="form-group">
                  <label htmlFor="image" className="lebel">
                    ENTER YOUR IMAGE:
                  </label>
                  <br></br>
                  <input
                    //     value={values.image}
                    onChange={(e) =>
                      setFieldValue("image", e.currentTarget.files[0])
                    }
                    //onChange={handleChange}
                    id="file"
                    name="image"
                    accept="image/*"
                    type="file"
                    placeholder="Enter your Image"
                    onBlur={handleBlur}
                    className={
                      errors.image && touched.image ? "input-error" : ""
                    }
                  />
                  {errors.image && touched.image && (
                    <p className="error">{errors.image}</p>
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
  );
};
export default RegisterFighter;

import React from "react";

import { useFormik } from "formik";
import axios from "axios";
import { schemauser } from "../../schemas/user";

import Swal from "sweetalert2";

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  axios
    .post("http://localhost:3001/user", values, {})
    .then((res) => {
      Swal.fire({
        title: `Created User!`,
        showConfirmButton: false,
        timer: 5000,
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

const FormUser = () => {
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
      name: "",
      lastname: "",
      email: "",
      password: "",
      address: "",
      tel: "",
    },
    validationSchema: schemauser,
    onSubmit,
  });
  console.log(errors);

  return (
    <div className="container">
      <div className="p-3 mb-2 bg-secondary text-white">
        <h1 className="h1">REGISTER USER</h1>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="form-group">
            <label html="name" className="lebel">
              NAME:
            </label>
            <br></br>
            <input
              value={values.name}
              onChange={handleChange}
              id="name"
              type="name"
              placeholder="Enter Name"
              onBlur={handleBlur}
              className={errors.name && touched.name ? "input-error" : ""}
            />
            {errors.name && touched.name && (
              <p className="error">{errors.name}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastname" className="lebel">
              LASTNAME:
            </label>
            <br></br>
            <input
              value={values.lastname}
              onChange={handleChange}
              id="lastname"
              type="lastname"
              placeholder="Enter your lastname"
              onBlur={handleBlur}
              className={
                errors.lastname && touched.lastname ? "input-error" : ""
              }
            />
            {errors.lastname && touched.lastname && (
              <p className="error">{errors.lastname}</p>
            )}
          </div>
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
              className={errors.email && touched.email ? "input-error" : ""}
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
          <div className="form-group">
            <label htmlFor="tel" className="lebel">
              ENTER YOUR TEL:
            </label>
            <br></br>
            <input
              value={values.tel}
              onChange={handleChange}
              id="tel"
              type="tel"
              placeholder="Enter your tel"
              onBlur={handleBlur}
              className={errors.tel && touched.tel ? "input-error" : ""}
            />
            {errors.tel && touched.tel && <p className="error">{errors.tel}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="address" className="lebel">
              EDDRESS:
            </label>
            <br></br>
            <input
              value={values.address}
              onChange={handleChange}
              id="address"
              type="address"
              placeholder="Enter your address"
              onBlur={handleBlur}
              className={errors.address && touched.address ? "input-error" : ""}
            />
            {errors.address && touched.address && (
              <p className="error">{errors.address}</p>
            )}
          </div>
          <button disabled={isSubmitting} type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default FormUser;

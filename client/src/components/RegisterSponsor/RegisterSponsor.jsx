import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { schemaSponsor } from "../../schemas/sponsor";
import { useEffect } from "react";
import { getMyUser } from "../../Redux/actions";
import Swal from "sweetalert2";

const FormSponsor = () => {
  const dispatch = useDispatch();
  let Myuser = useSelector((state) => state.myUser);
  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    axios
      .post("http://localhost:3001/newSponsor", values, {})
      .then((res) => {
        Swal.fire({
          title: `Created Sponsor!`,
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
      sponsorName: `${Myuser.name}`,
      email: `${Myuser.email}`,
      password: `${Myuser.password}`,
      description: "",
      image: "",
    },
    validationSchema: schemaSponsor,
    onSubmit,
  });
  console.log(errors);
  useEffect(() => {
    dispatch(getMyUser());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="p-3 mb-2 bg-secondary text-white">
        <h1 className="h1">SPONSOR REGISTRATION</h1>
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="form-group">
            <label html="firstName" className="lebel">
              COMPANY:
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
                errors.description && touched.description ? "input-error" : ""
              }
            />
            {errors.description && touched.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
          <div class="form-group">
            <label htmlFor="image" className="lebel">
              ENTER YOUR IMAGE:
            </label>
            <br></br>
            <input
              value={values.image}
              //onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
              onChange={handleChange}
              id="file"
              name="image"
              accept="image/*"
              type="file"
              placeholder="Enter your Image"
              onBlur={handleBlur}
              className={errors.image && touched.image ? "input-error" : ""}
            />
            {errors.image && touched.image && (
              <p className="error">{errors.image}</p>
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
export default FormSponsor;

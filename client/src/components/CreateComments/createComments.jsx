import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { DatePicker } from "@material-ui/pickers";
import "./createComment.css";

const RegisterComment = () => {
  const [selectDate, setSelectDate] = useState(new Date());

  const onSubmit = async (values, actions) => {
    axios
      .post("http://localhost:3001/comments", values, {})
      .then((res) => {
        Swal.fire({
          title: `Created Comment!`,
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
      eventName: "",
      date: selectDate,
      texto: "",
    },
    onSubmit,
  });
  console.log(errors);

  return (
    <div class="container p-3 my-3 bg-info text-dark container-sm row">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="form-group">
          <label htmlFor="eventName" className="lebel">
            EVENT NAME:
          </label>
          <br></br>
          <input
            value={values.eventName}
            onChange={handleChange}
            id="eventName"
            type="eventName"
            placeholder="Enter the Event Name"
            onBlur={handleBlur}
            className={
              errors.eventName && touched.eventName ? "input-error" : ""
            }
          />
          <div className="form-group">
            <label htmlFor="texto" className="lebel">
              DESCRIBE EVENT:
            </label>
            <br></br>
            <input
              value={values.texto}
              onChange={handleChange}
              id="texto"
              type="texto"
              placeholder="Describe the event"
              onBlur={handleBlur}
              className="texto"
            />
            <br></br>
            <br></br>
            <label>DATE</label>
            <br></br>
            <DatePicker value={selectDate} onChange={setSelectDate} />

            <button
              disabled={isSubmitting}
              type="submit"
              class="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterComment;

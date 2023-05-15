import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { validComment } from "../../schemas/comments";
import instance from "../../Redux/actions";
import Swal from "sweetalert2";
import { DatePicker } from "@material-ui/pickers";

import "./createComment.css";
import { useSelector } from "react-redux";

const RegisterComment = () => {
  const { id } = useParams();
  const [selectDate, setSelectDate] = useState(new Date());

  const onSubmit = async (values, actions) => {
    const parceValues = {
      eventName: values.eventName,
      date: selectDate,
      texto: values.texto,
      /*     Fighters: id, */
    };

    instance
      .post("/comments", parceValues, {})
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
      idFighterComent: id.toString(),
    },
    validationSchema: validComment,
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
          {errors.eventName && touched.eventName && (
            <p className="error">{errors.eventName}</p>
          )}
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
              className={errors.texto && touched.texto ? "input-error" : ""}
            />
            {errors.texto && touched.texto && (
              <p className="error">{errors.texto}</p>
            )}
            <br></br>
            <br></br>
            <label>DATE</label>
            <br></br>
            <DatePicker
              value={selectDate}
              onChange={setSelectDate}
              /*     className={
                errors.selectDate && touched.selectDate ? "input-error" : ""
              } */
            />
            {/* {errors.selectDate && touched.selectDate && (
              <p className="error">{errors.selectDate}</p>
            )} */}
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

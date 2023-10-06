
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { validComment } from "../../schemas/comments";
import instance from "../../Redux/actions";
import Swal from "sweetalert2";
import { DatePicker } from "@material-ui/pickers";
import "./createComments.css";

const RegisterComment = () => {
  const { id } = useParams();
  console.log(id)
  const [selectDate, setSelectDate] = useState(new Date());

  const onSubmit = async (values, actions) => {
    const parceValues = {
      eventName: values.eventName,
      date: selectDate,
      texto: values.texto,
           Fighters: id, 
    };

    instance
      .post("/comments", parceValues, {})
      .then((res) => {
        Swal.fire({
          title: `Created Comment!`,
          showConfirmButton: false,
          timer: 2000,
        });
        window.location.href = "/home";
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
      eventName: "",
      date: selectDate,
      texto: "",
      idFighterComent: id.toString(),
    },
    validationSchema: validComment,
    onSubmit,
  });
  console.log(errors);
  const handleGoBack = () => {
    window.history.back(); // Redirige a la página anterior
  }

  return (
    <div>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <a className="navbar-brand" href="#">
    <button class="btn btn-light" onClick={()=>handleGoBack()}>
      GO BACK
    </button>
    </a>
</nav>
   
    <div className="container p-3 my-3 bg-dark text-white custom-container">
       
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="form-group">
          <label htmlFor="eventName" className="lebel">
            NOMBRE DEL EVENTO
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
              DESCRIPCION
            </label>
            <br></br>
            <textarea
              multiple
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
        
            <label className="lebel">FECHA DEL EVENTO</label>

            <br></br>
            <DatePicker
              value={selectDate}
              onChange={setSelectDate}
              className="date"
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
    </div>
  );
};
export default RegisterComment;

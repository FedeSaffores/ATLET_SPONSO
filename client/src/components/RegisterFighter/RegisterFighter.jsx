import React, { useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
//import { basicSchema } from "../../schemas/index";
import "./RegisterFighter.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
import instance, { getMyUser } from "../../Redux/actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHand, faImage } from "@fortawesome/free-solid-svg-icons";
//import { json } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { Modal } from "react-bootstrap";

const RegisterFighter = () => {
  const dispatch = useDispatch();
  const Myuser = useSelector((state) => state.myUser);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const onSubmit = async (values, actions) => {
    let formdata = new FormData();
    formdata.append("image", values.image);
    //formdata.append()
    const parceValues = {
      completeName: Myuser.completeName,
      email: Myuser.email,
      password: Myuser.password,
      tel: Myuser.tel,
      address: Myuser.address,
      city: Myuser.city,
      description: values.description,
      quality: values.quality,
      instagram: values.instagram,
    };
    formdata.append("data", JSON.stringify(parceValues));
    instance
      .post("/newFighter", formdata, {
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
                <Link to={"/home"}>
                  <button class="btn btn-light">HOME</button>
                </Link>
              </div>
            </a>
          </li>
        </ul>
      </nav>
      <div className="container-fluid vh-100 d-flex flex-column justify-content-start align-items-center"> 
        <div class="container p-3 my-3 ">
          <h1 style={{textShadow: "3px 3px 8px white", fontFamily: "fantasy" }}>REGISTRO DEL ATLETA </h1>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="form-group" style={{marginTop:"5%", textShadow: "3px 3px 8px white", fontFamily: "fantasy" }}>
              <h3 >
                BIENVENIDO! <FontAwesomeIcon icon={faHand} />
              </h3>
              <h3 style={{marginTop:"5%", textAlign: "justify",  textShadow: "3px 3px 8px white", fontFamily: "fantasy" }}>
                Estimado {Myuser.completeName} necesitamos que ingreses estos datos a los fines de brindarte el mejor servicio.
              </h3>
            </div>
            <div style={{textAlign:"left"}}  >
              <label html="instagram" style={{marginTop:"2%", textShadow: "3px 3px 8px white", fontFamily: "fantasy" }} >
                <FaInstagram /> INSTAGRAM
              </label>
              <br></br>
              <input
                value={values.instagram}
                onChange={handleChange}
                id="instagram"
                type="instagram"
                placeholder="Link completo de Instagram"
                onBlur={handleBlur}
                className={
                  errors.instagram && touched.instagram ? "input-error" : ""
                }
              />
              {errors.instagram && touched.instagram && (
                <p className="error">{errors.instagram}</p>
              )}
            </div>

            <div >
              <div className="form-group" style={{textAlign:"left"}}>
                <label htmlFor="description" style={{marginTop:"2%", textShadow: "3px 3px 8px white", fontFamily: "fantasy" }}>
                  ELIGE TU DEPORTE:
                </label>
                <br></br>

                <select
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
                >
                  <option value="">DEPORTE</option>
                  <option value="KICK BOXER">KICK BOXER</option>
                  <option value="BOXER">BOXER</option>
                  <option value="JIU JITSU FIGHTER">JIU JITSU FIGHTER</option>
                  <option value="MMA FIGHTER">MMA FIGHTER</option>
                  <option value="JUDO">JUDO</option>
                  <option value="ATHLETICS">ATHLETICS</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
                {errors.quality && touched.quality && (
                  <p className="error">{errors.quality}</p>
                )}
              </div>
            </div>
            <div >
              <div className="form-group" style={{textAlign:"left"}} >
                <label htmlFor="description" style={{marginTop:"2%", textShadow: "3px 3px 8px white", fontFamily: "fantasy" }}>
                  EXPERIENCIA:
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
                  <option value="">EXPERIENCIA</option>
                  <option value="Beginner">BEGINNER</option>
                  <option value="Amateur">AMATEUR</option>
                  <option value="Professional">PROFESSIONAL</option>
                </select>
                {errors.quality && touched.quality && (
                  <p className="error">{errors.quality}</p>
                )}
              </div>
            </div>
            <div >
              <div class="form-group" style={{textAlign:"left"}}>
                <label htmlFor="image" style={{marginTop:"2%", textShadow: "3px 3px 8px white", fontFamily: "fantasy" }}>
                  FOTO DE PERFIL <br /> <FontAwesomeIcon icon={faImage} />
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
                  className={errors.image && touched.image ? "input-error" : ""}
                />
                {errors.image && touched.image && (
                  <p className="error">{errors.image}</p>
                )}
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                class="btn btn-dark"
                onClick={() => setShowRecommendation(false)}
              >
                Submit
              </button>
              <Modal show={showRecommendation} onHide={() => setShowRecommendation(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Recomendación</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Aquí puedes agregar tu mensaje de recomendación antes de la carga.
  </Modal.Body>
  <Modal.Footer>
    <button
      className="btn btn-secondary"
      onClick={() => setShowRecommendation(false)}
    >
      Cerrar
    </button>
  </Modal.Footer>
</Modal>
              <br></br>
              <br></br>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterFighter;

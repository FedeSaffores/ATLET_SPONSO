import React from "react";
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

const RegisterFighter = () => {
  const dispatch = useDispatch();
  const Myuser = useSelector((state) => state.myUser);

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
    console.log(parceValues);
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
                <Link to={"/"}>
                  <button class="btn btn-light">HOME</button>
                </Link>
              </div>
            </a>
          </li>
        </ul>
      </nav>

      <div>
        <div class="container p-3 my-3 ">
          <h1 className="h1">ATHLETE REGISTRATION</h1>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="form-group">
              <h3 className="bienvenida">
                Hello! <FontAwesomeIcon icon={faHand} />
              </h3>
              <h3 className="msj">
                {Myuser.completeName} we need you enter this information
              </h3>
              <p>{Myuser.city}</p>
            </div>
            <div className="boxis">
              <label html="instagram" className="lebel">
                <FaInstagram /> INSTAGRAM
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

            <div className="boxis2">
              <div className="form-group">
                <label htmlFor="description" className="lebel">
                  CHOOSE YOUR SPORT:
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
                  <option value="">SELECT SPORT</option>
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
            <div className="boxis3">
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
                  <option value="Beginner">BEGINNER</option>
                  <option value="Amateur">AMATEUR</option>
                  <option value="Professional">PROFESSIONAL</option>
                </select>
                {errors.quality && touched.quality && (
                  <p className="error">{errors.quality}</p>
                )}
              </div>
            </div>
            <div className="boxis4">
              <div class="form-group">
                <label htmlFor="image" className="lebel">
                  ENTER YOUR PICTURE <br /> <FontAwesomeIcon icon={faImage} />
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
              >
                Submit
              </button>
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

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { schemauser } from "../../schemas/user";
import { getCities, getCitiesByName } from "../../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./RegisterUser.css";

const onSubmit = async (values, actions) => {
  console.log(values);
  axios
    .post("http://localhost:3001/user", values, {})
    .then((res) => {
      Swal.fire({
        title: `Created User!`,
        showConfirmButton: false,
        timer: 1000,
      });
      window.location.href = "/login";
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
  const [busqueda, setBusqueda] = useState("");
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

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
      completeName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      city: "",
      address: "",
      tel: "",
    },
    validationSchema: schemauser,
    onSubmit,
  });
  console.log(errors);

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    values.city = selectedCity;
  };
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setBusqueda(searchTerm);
    dispatch(getCitiesByName(searchTerm));
  };

  return (
    <div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav"></ul>
        <li>
          <Link to={"/login"}>
            <button class="btn btn-light">Login</button>
          </Link>
        </li>
      </nav>

      <div className="caja">
        <div className="raja">
          <h1 className="h1">REGISTER USER</h1>
          <br></br>
          <FontAwesomeIcon icon={faUser} className="icon"></FontAwesomeIcon>

          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="form-group">
              <label html="completeName" className="lebel"></label>
              <br></br>
              <input
                value={values.completeName}
                onChange={handleChange}
                id="completeName"
                type="completeName"
                placeholder="Enter completeName"
                onBlur={handleBlur}
                className={
                  errors.completeName && touched.completeName
                    ? "input-error"
                    : ""
                }
              />
              {errors.completeName && touched.completeName && (
                <p className="error">{errors.completeName}</p>
              )}
            </div>
            <div className="form-group">
              <div className="input-group">
                <div>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Buscar por nombre"
                    value={busqueda}
                    onChange={handleSearchChange}
                  />
                </div>
                <div>
                  <select
                    className="form-select custom-select-sm"
                    type="city"
                    value={values.city}
                    onChange={handleCityChange}
                  >
                    <option value="">Todas las ciudades</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.nombre} - {city.provincia} -{city.pais}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="lebel"></label>
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
              <label htmlFor="password" className="lebel"></label>
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
              <label htmlFor="passwordConfirm" className="lebel"></label>
              <br />
              <input
                id="passwordConfirm"
                type="password"
                placeholder="Confirm your Password"
                onChange={handleChange}
                value={values.passwordConfirm}
                onBlur={handleBlur}
                className={
                  errors.passwordConfirm && touched.passwordConfirm
                    ? "input-error"
                    : ""
                }
              />
              {errors.passwordConfirm && touched.passwordConfirm && (
                <p className="error">{errors.passwordConfirm}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="tel" className="lebel"></label>
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
              {errors.tel && touched.tel && (
                <p className="error">{errors.tel}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="address" className="lebel"></label>
              <br></br>
              <input
                value={values.address}
                onChange={handleChange}
                id="address"
                type="address"
                placeholder="Enter your address"
                onBlur={handleBlur}
                className={
                  errors.address && touched.address ? "input-error" : ""
                }
              />
              {errors.address && touched.address && (
                <p className="error">{errors.address}</p>
              )}
            </div>
            <button disabled={isSubmitting} type="submit" class="btn btn-light">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormUser;

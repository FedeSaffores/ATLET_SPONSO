import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSponsors, getSponsorsByName } from "../../Redux/actions";
import "./ListSponsor.css";

function Sponsors() {
  const dispatch = useDispatch();
  const sponsors = useSelector((state) => state.sponsors);
  const [busqueda, setBusqueda] = useState("");

  const InputHandler = (e) => {
    setBusqueda(e.target.value);
  };
  const onClickHandler = () => {
    dispatch(getSponsorsByName(busqueda));
  };
  const HomeHandler = () => {
    dispatch(getSponsors());
  };

  useEffect(() => {
    dispatch(getSponsors());
  }, [dispatch]);

  return (
    <div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li>
            <div className="botonera">
              <input
                type="text"
                placeholder="Search"
                className="Input"
                name="input"
                autoComplete="off"
                onChange={InputHandler}
                value={busqueda}
              />
              <button
                type="button"
                class="btn btn-info"
                onClick={onClickHandler}
              >
                Search
              </button>
              <button type="button" class="btn btn-info" onClick={HomeHandler}>
                Reset
              </button>
            </div>
            <Link to={"/"}>
              <button class="btn btn-info">HOME</button>
            </Link>
          </li>
        </ul>
      </nav>

      <div class="container p-3 my-3 -white">
        <h2 className="Title">SPONSORS LIST</h2>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Description </th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody className="leter">
              {sponsors?.map((e) => (
                <tr>
                  <td>{e.companyName}</td>
                  <td> {e.description}</td>
                  <td> {e.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Sponsors;

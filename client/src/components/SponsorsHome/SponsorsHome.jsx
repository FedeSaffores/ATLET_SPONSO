import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import React from "react";

import { getSponsors, getSponsorsByName } from "../../Redux/actions";

function SponsorHome() {
  const dispatch = useDispatch();

  const sponsor = useSelector((state) => state.sponsors);

  const [busqueda, setBusqueda] = useState("");

  const InputHandler = (e) => {
    //console.log(e.target.value);
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
          <li class="nav-item">
            <a class="nav-link" href="/newFighter">
              CREATE FIGHTER
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/formSponsor">
              CREATE SPONSOR
            </a>
          </li>
        </ul>
        <input
          type="text"
          placeholder="Search"
          className="Input"
          name="input"
          autoComplete="off"
          onChange={InputHandler}
          value={busqueda}
        />
        <div className="botonera">
          <button type="button" class="btn btn-info" onClick={onClickHandler}>
            Search
          </button>
          <button type="button" class="btn btn-info" onClick={HomeHandler}>
            Reset
          </button>
        </div>
      </nav>
      <div className="contenedor">
        {sponsor?.map((e) => {
          return (
            <div className="box">
              <h1>{e.sponsorName}</h1>
              <h1>{e.email}</h1>
              <h2>{e.description}</h2>
              <img src={e.image} alt={e.image} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default SponsorHome;

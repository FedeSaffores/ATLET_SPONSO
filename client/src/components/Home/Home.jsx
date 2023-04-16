import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
//import Nav from "react-bootstrap/Nav";

import React from "react";
import "./Home.css";

import { getFighters, getFightersByName, getMyUser } from "../../Redux/actions";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myuser = useSelector((state) => state.myUser);

  const fighters = useSelector((state) => state.fighters);

  const [busqueda, setBusqueda] = useState("");

  const InputHandler = (e) => {
    //console.log(e.target.value);
    setBusqueda(e.target.value);
  };
  const onClickHandler = () => {
    dispatch(getFightersByName(busqueda));
  };
  const HomeHandler = () => {
    dispatch(getFighters());
  };
  useEffect(() => {
    dispatch(getFighters());
    dispatch(getMyUser());
  }, [dispatch]);
  return (
    <div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li>
            <a class="nav-link" href="/login">
              <div className="Botonera2">
                {!myuser?.id ? (
                  <>
                    <Link to={"/login"}>
                      <button class="btn btn-info"> Sign in</button>
                    </Link>
                    <Link to={"/formuser"}>
                      <button class="btn btn-info">Sign up</button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={"#"}
                      onClick={() => {
                        localStorage.removeItem("jwt");
                        navigate(0);
                      }}
                    >
                      <button class="btn btn-info">Sign out</button>
                    </Link>
                  </>
                )}
              </div>
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
      <h1 className="Title">SPOATLET</h1>
      <div className="ContBot">
        {myuser?.id ? (
          <>
            <Link to={"/newFighter"}>
              <button className="button">CREATE FIGHTER</button>
            </Link>
            <Link to={"/formSponsor"}>
              <button className="button">CREATE SPONSOR</button>
            </Link>
          </>
        ) : (
          <>
            <div className="alert">
              <strong>Warnign!</strong> You need Register and Login to have
              acces
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Home;

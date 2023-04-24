import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
//import Nav from "react-bootstrap/Nav";

import "./Home.css";

import { getMyUser } from "../../Redux/actions";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myuser = useSelector((state) => state.myUser);

  /*  const fighters = useSelector((state) => state.Fighters);
  console.log(fighters); */

  useEffect(() => {
    //dispatch(getFighters());
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
          <br></br>
          <br></br>
          <li className="BotFight">
            <Link to={"/fighters"}>
              <button class="btn btn-info"> Fighters</button>
            </Link>
            <Link to={"/sponsor"}>
              <button class="btn btn-info"> Sponsors</button>
            </Link>
          </li>
        </ul>
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

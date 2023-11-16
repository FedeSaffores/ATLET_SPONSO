import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
//import Nav from "react-bootstrap/Nav";
import Events from "../Events/events";
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
  console.log(myuser);
  return (
    <div>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        {myuser?.id ? (
          <>
            <ul class="navbar-nav">
              <a class="navbar-brand" href="#">
                <p className="userName">{myuser.completeName.toUpperCase()}</p>
              </a>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="/home"
                  onClick={() => {
                    localStorage.removeItem("jwt");
                    navigate('/home');
                  }}
                >
                  <button class="btn bg-light"> Salir</button>
                </a>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  <button class="btn bg-light">Ingresar</button>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/formuser">
                  <button class="btn bg-light">Registrarse</button>
                </a>
              </li>
            </ul>
          </>
        )}
        <ul class="navbar-nav ml-5">
          {myuser?.id ? (
            <li class="dropdown">
              <button
                type="button"
                class="btn bg-light dropdown-toggle"
                data-toggle="dropdown"
              >
                Menu
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="/newFighter">
                  Crear Atleta
                </a>
                <a class="dropdown-item" href="/formSponsor">
                  Crear Sponsors
                </a>
                <a class="dropdown-item" href="/fighters">
                  Atletas
                </a>
                <a class="dropdown-item" href="/sponsor">
                  Sponsors
                </a>
              </div>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      <div>
        <Events />
      </div>
    </div>
  );
}
export default Home;

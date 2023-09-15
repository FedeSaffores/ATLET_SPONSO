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
                    <div className="Logbot">
                      <div
                        classname="element1"
                        style={{
                          marginRight: "75px",
                        }}
                      >
                        <a>
                          <p>{myuser.completeName.toUpperCase()}</p>
                        </a>
                      </div>
                      <div
                        className="element1"
                        style={{
                          display: "flex",
                          marginLeft: "5px",
                          marginRight: "5px",
                        }}
                      >
                        <Link
                          to={"#"}
                          onClick={() => {
                            localStorage.removeItem("jwt");
                            navigate(0);
                          }}
                        >
                          <button class="btn btn-info">Sign out</button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </a>
          </li>

          <li>
            <div className="BotFight">
              {!myuser?.id ? (
                <></>
              ) : (
                <>
                  {" "}
                  <div className="fightexpo" style={{ display: "flex" }}>
                    <Link to={"/fighters"}>
                      <button
                        class="btn btn-info"
                        style={{ marginRight: "10px" }}
                      >
                        {" "}
                        Fighters
                      </button>
                    </Link>
                    <Link to={"/sponsor"}>
                      <button class="btn btn-info"> Sponsors</button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </li>
          <li>
            {" "}
            {myuser?.id ? (
              <>
                <div className="margin">
                  <div>
                    <Link to={"/newFighter"}>
                      <button class="btn btn-success"> CREATE FIGHTER </button>
                    </Link>
                  </div>
                  <div>
                    <Link to={"/formSponsor"}>
                      <button class="btn btn-success">CREATE SPONSOR</button>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div class="alert alert-danger">
                  <strong> Warnign! </strong> You need Register and Login to
                  have acces
                </div>
              </>
            )}
          </li>
        </ul>
      </nav>

      <div>
        <Events />
      </div>
    </div>
  );
}
export default Home;

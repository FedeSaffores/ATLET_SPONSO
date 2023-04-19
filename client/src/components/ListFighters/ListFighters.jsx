import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getFighters, getFightersByName } from "../../Redux/actions";
import "./ListFghters.css";

function Fighters() {
  const dispatch = useDispatch();
  const fighters = useSelector((state) => state.Fighters);
  const [busqueda, setBusqueda] = useState("");

  const InputHandler = (e) => {
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
              <button class="btn btn-info"> HOME</button>
            </Link>
          </li>
        </ul>
      </nav>
      {fighters?.map((e) => (
        <>
          <div className="box">
            <div className="boxFighter">
              <h3 className="Atleta">ATHLETE</h3>
              <h3 className="NOMBRE">
                {e.name}
                <br></br>
                {e.lastname}
              </h3>
              <br />

              <br></br>
              <></>
              <img
                className="img"
                src={`http://localhost:3001/fotos/${e.image}`}
                alt={e.name}
              />
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
export default Fighters;

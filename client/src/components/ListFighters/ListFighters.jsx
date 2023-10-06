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
  const [sport, setSport] = useState("");
  const [page, setPage] = useState(0);
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
              <select
                onChange={(e) => {
                  setSport(e.target.value);
                }}
                defaultValue={""}
                className="ORDSPORT"
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
                class="btn btn-light"
                onClick={onClickHandler}
              >
                Search
              </button>
              <button type="button" class="btn btn-light" onClick={HomeHandler}>
                Reset
              </button>
            </div>
            <Link to={"/"}>
              <button class="btn btn-light"> HOME</button>
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <div className="bt">
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 0}
          >
            Anterior
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            onClick={() => {
              setPage(page + 1);
            }}
            disabled={fighters?.slice((page + 1) * 3).length === 0}
          >
            Siguiente
          </button>
        </div>
        {fighters.length === 0 && <h1>NOT FIGHTERS</h1>}
        <div className="supercaja">
          {fighters
            ?.filter((x) => (sport !== "" ? x.description === sport : true))
            .slice(page * 3, (page + 1) * 3)
            .map((e) => (
              <div key={e.id} className="box">
                <div class="card" style={{ width: "400px" }}>
                  <img
                    class="card-img-top"
                    src={`http://localhost:3001/fotos/${e.image}`}
                    alt={e.completeName}
                  />

                  <div class="card bg-dark">
                    <div class="card-body text-center">
                      <h4 style={{ color: "white" }}>{e.completeName}</h4>
                      <h4 style={{ color: "white" }}>{e.description}</h4>

                      <a href={`/profile/${e.id}`} class="btn btn-light">
                        Ver Perfil
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
export default Fighters;

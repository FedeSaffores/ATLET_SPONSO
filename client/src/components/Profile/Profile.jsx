import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMobileRetro,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function Profile() {
  const { id } = useParams();
  const [fighter, setFighter] = useState();

  useEffect(() => {
    if (id)
      fetch(`http://localhost:3001/fighters/${id}`)
        .then((res) => res.json())
        .then((res) => setFighter(res));
  }, [id, setFighter]);
  console.log(id);
  if (!id) {
    return null;
  }
  return (
    <div key={id}>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav"></ul>
        <li>
          <div className="Boton">
            <Link to={"/fighters"}>
              <button class="btn btn-info">FIGHTERS</button>
            </Link>
            <Link className="Insta" to={`${fighter?.instagram}`}>
              Instagra
            </Link>
          </div>
        </li>
      </nav>
      <div class="container p-3 my-3 border bg-light">
        {/*   <div class="container p-3 my-3 border"> */}
        <div class="container p-3 my-3 bg-dark text-white">
          <h1 className="atleta">ATLETA</h1>
          <div className="name">
            <h1>
              {fighter?.name}
              {"  "}
              {fighter?.lastname}
            </h1>
          </div>
          <h3 className="SPORT">SPORT {fighter?.description}</h3>

          <h3 className="SPORT">LEVEL {fighter?.quality}</h3>

          <div>
            <img
              className="img"
              src={`http://localhost:3001/fotos/${fighter?.image}`}
              alt={fighter?.name}
            />
          </div>
          <h2 className="SPORT">
            {" "}
            <FontAwesomeIcon icon={faEnvelope} /> {fighter?.email}
          </h2>
          <h2 className="SPORT">
            <FontAwesomeIcon icon={faMobileRetro} /> {fighter?.tel}
          </h2>
          <h3 className="SPORT">
            <FontAwesomeIcon icon={faStar} />
            {fighter?.score}
          </h3>
        </div>
      </div>
    </div>
  );
}
export default Profile;

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
import RemoverFighter from "../DeleteFighter/DeleteFighter.jsx";
import RegisterComment from "../CreateComments/createComments";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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
            <br></br>
            <br></br>
          </div>
        </li>
      </nav>
      {/*   <div class="container p-3 my-3 border"> */}
      <div class="container p-3 my-3 bg-secondary text-white ">
        <h1 className="atleta">ATLETA</h1>

        <div className="name">
          <h1>
            {fighter?.name}
            {"  "}
            {fighter?.lastname}
          </h1>
        </div>
        <div class="row">
          <div class="col-sm">
            <h3 className="SPORT">SPORT {fighter?.description}</h3>

            <h3 className="SPORT">LEVEL {fighter?.quality}</h3>
            <div>
              <img
                className="img"
                src={`http://localhost:3001/fotos/${fighter?.image}`}
                alt={fighter?.name}
              />
            </div>
          </div>
          <div class="col-sm">
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

            <div className="comments">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <RegisterComment />
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;

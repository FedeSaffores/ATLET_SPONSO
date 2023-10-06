import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { faHand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Landing = () => {
  return (
    <div>
      <div class="container">
      <div className="buttons">
        <Link className="fighter" to={"/home"}>
          <button type="button" class="custom-button">
            WELCOME
            <FontAwesomeIcon icon={faHand} size="150px" />
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};
export default Landing;

import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Landing = () => {
  return (
    <div>
      <h1 className="title"> WELCOME TO AMONGUS</h1>
      <p className="p">
        AMONGOS IS A WEBSITE WHOSE OBJECTIVE IS CRETE ONE SPACE BETWEEN THE
        ATHLETES AND THE SPONSORS{" "}
      </p>
      <div className="buttons">
        <Link className="fighter" to={"/newFighter"}>
          <button type="button" class="btn btn-dark">
            Fighter Register
          </button>
        </Link>
        <Link className="fighter" to={"/newSponsor"}>
          {" "}
          <button type="button" class="btn btn-dark">
            Sponsor Register
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Landing;

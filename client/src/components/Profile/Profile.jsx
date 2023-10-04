import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMobileRetro } from "@fortawesome/free-solid-svg-icons";

import instance from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import RegisterComment from "../CreateComments/createComments";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FaInstagram } from "react-icons/fa";
import { getMyUser } from "../../Redux/actions";


function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [fighter, setFighter] = useState();
  const [userWithRelations, setUserWithRelations] = useState(null);
  const [hasFetchedUser, setHasFetchedUser] = useState(false);
  const navigate = useNavigate();

  const myuser = useSelector((state) => state.myUser);

  function deleteFighter(id) {
    instance
      .delete(`/fighters/${id}`, {
        method: "DELETE",
      })
      .then((result) => {
        if (result.status === 200) {
          navigate.push("/");
        }
        result.json().then((resp) => {
          console.log(resp);
        });
      });
  }

  useEffect(() => {
    if (myuser === null || !myuser.relationshipsAreLoaded) {
      if (!hasFetchedUser) {
        dispatch(getMyUser()).then(() => {
          setUserWithRelations(myuser);
          setHasFetchedUser(true);
        });
      }
    } else {
      setUserWithRelations(myuser);
    }
  }, [dispatch, myuser, hasFetchedUser]);

  useEffect(() => {
    if (id)
      instance
        .get(`/fighters/${id}`)
        .then((res) => res.data)
        .then((res) => setFighter(res));
  }, [id, setFighter]);

  useEffect(() => {
    dispatch(getMyUser());
  }, [dispatch]);
  if (!id) {
    return null;
  }

  return (
    <div key={id}>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav"></ul>
        <li>
          <Link to={"/fighters"}>
            <button class="btn btn-light">FIGHTERS</button>
          </Link>
        </li>
        <li>
          <Link to={"/"}>
            <button class="btn btn-light">HOME</button>
          </Link>
        </li>
      </nav>

      <div class="container p-3 my-3 ">
        <h1 className="atleta">ATLETA</h1>
        <div className="name">
          <h1>{fighter?.completeName}</h1>
        </div>
        <div class="row">
          <div class="col-sm">
            <h3 className="SPORT">{fighter?.description}</h3>

            <h3 className="SPORT">{fighter?.quality}</h3>
            <h3>{fighter?.city}</h3>
            <div>
              <img
                className="img"
                src={`http://localhost:3001/fotos/${fighter?.image}`}
                alt={fighter?.completeName}
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
            {/*    <h3 className="SPORT">
                <FontAwesomeIcon icon={faStar} />
                {fighter?.score}
              </h3> */}
            <i class="fa-brands fa-instagram"></i>

            <Link className="Insta" to={`${fighter?.instagram}`}>
              <FaInstagram /> Instagram
            </Link>
            <div>
              {myuser?.FighterId === fighter?.id ? (
                <>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <RegisterComment />
                  </MuiPickersUtilsProvider>
                </>
              ) : (
                <div className="ALERTA">
                  <strong className="alertatex">
                    Only the Fighters of this profile can Create events!!
                  </strong>
                </div>
              )}
            </div>
            <div>
              {
                <div>
                  {id === userWithRelations?.FighterId ? (
                    <Link to={`/event/fighter/${myuser.FighterId}`}>List Events</Link>
                  ) : (
                    <></>
                  )}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;

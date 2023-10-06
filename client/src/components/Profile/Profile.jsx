import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMobileRetro } from "@fortawesome/free-solid-svg-icons";
import instance from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { FaInstagram } from "react-icons/fa";
import { getMyUser } from "../../Redux/actions";
import DeleteFighter from "../DeleteFighter/DeleteFighter";

function Profile() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [fighter, setFighter] = useState();
  const [userWithRelations, setUserWithRelations] = useState(null);
  const [hasFetchedUser, setHasFetchedUser] = useState(false);
  const navigate = useNavigate();

  const myuser = useSelector((state) => state.myUser);

 

/*   function deleteFighter(id) {
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
  } */

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
  <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul className="navbar-nav">
      <li className="nav-item ml-3">
        <Link to={"/fighters"}>
          <button className="btn btn-light">FIGHTERS</button>
        </Link>
      </li>
      <li className="nav-item ml-3">
        <Link to={"/"}>
          <button className="btn btn-light">HOME</button>
        </Link>
      </li>
      </ul>
    {myuser?.FighterId === fighter?.id ?( 
          <ul className="navbar-nav ml-5">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
              Menu
            </a>
            <div className="dropdown-menu">
            {myuser?.FighterId === fighter?.id ? (
             <button className="btn btn-light">  <a className="dropdown-item" href={`/coment-fighter/${fighter?.id}`}> 
              Crear Evento
            </a>
            </button>
            ) : null}
            {myuser?.FighterId === fighter?.id && id === userWithRelations?.FighterId ? (
             <button className="btn btn-light">   <a className="dropdown-item" href={`/event/fighter/${myuser.FighterId}`}>
             List Events
            </a>
            </button>
            ) : null}
            {myuser?.FighterId === fighter?.id && id === userWithRelations?.FighterId ? (
               <button className="btn btn-light">
  <DeleteFighter fighterId={myuser.FighterId} />
  </button>
) : null}
            </div>
          </li>
        </ul>) :(
  null)
}
  </nav>


      <div class="container p-3 my-3 ">
        <div style={{ color: "black", textShadow: "3px 3px white" }} className="name">
          <h1>{fighter?.completeName}</h1>
        </div>
        <div class="row">
          <div class="col-sm">
            <h3 style={{ color: "black", textShadow: "3px 3px white" }}className="SPORT">{fighter?.description}</h3>

            <h3 style={{ color: "black", textShadow: "3px 3px white" }} className="SPORT">{fighter?.quality}</h3>
            <h3 style={{ color: "black", textShadow: "3px 3px white" }}>{fighter?.city}</h3>
            <div>
              <img
                className="img"
                src={`http://localhost:3001/fotos/${fighter?.image}`}
                alt={fighter?.completeName}
              />
            </div>
          </div>
          <div class="col-sm">
            <h2 style={{ color: "black", textShadow: "3px 3px white" }} className="SPORT">
              {" "}
              <FontAwesomeIcon icon={faEnvelope} /> {fighter?.email}
            </h2>
            <h2 style={{ color: "black", textShadow: "3px 3px white" }}className="SPORT">
              <FontAwesomeIcon icon={faMobileRetro} /> {fighter?.tel}
            </h2>
            <i class="fa-brands fa-instagram"></i>
            <Link className="Insta" to={`${fighter?.instagram}`}>
              <FaInstagram /> Instagram
            </Link>
        </div>
          </div>
         
      </div>
    </div>
  );
}
export default Profile;

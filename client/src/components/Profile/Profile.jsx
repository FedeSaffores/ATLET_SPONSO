import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [fighter, setFighter] = useState();
  useEffect(() => {
    console.log(id);
    if (id)
      fetch("http://localhost:3001/fighters" + id)
        .then((res) => res.json())
        .then((res) => setFighter(res));
  }, [id, setFighter]);

  if (fighter) {
    return null;
  }
  return (
    <div>
      <h3>{fighter.name}</h3>
      <h3>{fighter.lastname}</h3>
      <h3>{fighter.description}</h3>
      <Link to={`${fighter.instagram}`}>Instagram</Link>
      <h2>Email</h2>
      <h3>{fighter.email}</h3>
      <h2>Tel</h2>
      <h3>{fighter.tel}</h3>
      <h3>{fighter.score}</h3>
      <h3>{fighter.quality}</h3>
      <h3>{fighter.image}</h3>
      <h3>{fighter.instergram}</h3>
    </div>
  );
}
export default Profile;

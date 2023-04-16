import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Profile() {
  const { idFighter } = useParams();
  const [fighter, setFighter] = useState();
  useEffect(() => {
    if (idFighter) console.log(idFighter);
    fetch("http://localhost:3001/fighters" + idFighter)
      .then((res) => res.json())
      .then((res) => setFighter(res));
  }, [idFighter, setFighter]);
  if (fighter) {
    return null;
  }
  return (
    <div>
      <h3>{fighter.name}</h3>
      <h3>{fighter.lastname}</h3>
      <h3>{fighter.email}</h3>
      <h3>{fighter.description}</h3>
      <h3>{fighter.score}</h3>
      <h3>{fighter.quality}</h3>
      <h3>{fighter.image}</h3>
      <h3>{fighter.instergram}</h3>
    </div>
  );
}
export default Profile;

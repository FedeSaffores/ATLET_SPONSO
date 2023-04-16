import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getFighters, getFightersByName } from "../../Redux/actions";

function Fighters() {
  const dispatch = useDispatch();
  const fighters = useSelector((state) => state.fighters);
  console.log(fighters);
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
      {fighters?.id(
        <>
          <h2>NAME</h2>
          {fighters.name}
          <h2>LASTNAME</h2>
          {fighters.lastname}
          <br></br>
          <br></br>
          {fighters.image}
        </>
      )}
    </div>
  );
}

export default Fighters;

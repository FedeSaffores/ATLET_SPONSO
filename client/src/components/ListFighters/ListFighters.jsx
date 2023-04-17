import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFighters, getFightersByName } from "../../Redux/actions";

function Fighters() {
  const dispatch = useDispatch();
  const fighters = useSelector((state) => state.Fighters);

  useEffect(() => {
    dispatch(getFighters());
  }, [dispatch]);

  return (
    <div>
      {fighters?.map((e) => (
        <>
          <h2>NAME</h2>
          {e.name}
          <h2>LASTNAME</h2>
          {e.lastname}
          <br></br>
          <br></br>
          {e.image}
        </>
      ))}
    </div>
  );
}
export default Fighters;

import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllComments } from "../../Redux/actions";

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.coments);

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  return (
    <div>
      {events?.map((x) => (
        <h2>
          {x.eventName}
          <br></br>
          {x.date}
          <br></br>
          {x.texto}
        </h2>
      ))}
    </div>
  );
};
export default Events;

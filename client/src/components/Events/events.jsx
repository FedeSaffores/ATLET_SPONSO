import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllComments } from "../../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import "./events.css";

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.coments);

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  return (
    <div>
      {events?.map((x) => (
        <div class="container p-3 my-3 bg-dark text-white">
          <div>
            <h3 className="titevent">{x.eventName}</h3>
            <h3 className="date">
              DATE <FontAwesomeIcon icon={faCalendarDays} />
              <> </>
              {x.date}
            </h3>
            <h3 className="razon">
              DESCRIPTION <FontAwesomeIcon icon={faStickyNote} />
            </h3>
            <h4 className="razon">{x.texto}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Events;

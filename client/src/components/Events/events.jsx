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
  console.log(events);
  return (
    <div className="Box">
      {events.slice(1).map((x) => (
        <div>
          <div class="media border ">
            <img
              src={`http://localhost:3001/fotos/${x.Fighter?.image}`}
              alt={x.Fighter?.name}
              class="mr-3 mt-1 rounded-circle"
              style={{ width: "150px" }}
            />
            <div class="media-body">
              <div className="bor">
                <h4>
                  {x.Fighter?.name} {x.Fighter?.lastname}
                </h4>
              </div>
              <div className="ber">
                <h4 className="date">
                  {<FontAwesomeIcon icon={faCalendarDays} />}
                  <> </>
                  {x.date.split(/[^0-9]/)[2]}-{x.date.split(/[^0-9]/)[1]}-
                  {x.date.split(/[^0-9]/)[0]}
                </h4>

                {/*  <div className="ecole"> */}
                <h3 className="titevent">{x.eventName}</h3>

                <h4 className="razon">
                  {/*  <FontAwesomeIcon icon={faStickyNote} /> */}

                  {x.texto}
                </h4>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Events;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllComments,
  getLikesByUser,
  getAllLikes,
} from "../../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { addLikes, removeFav } from "../../Redux/actions";
import "./events.css";

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.coments);
  const [page, setPage] = useState(0);
  const myuser = useSelector((state) => state.myUser);
  const userLikes = useSelector((state) => state.allLikes);

  const mapLike = userLikes?.likes?.map((i) => i.ComentarioId);

  const maplike1 = mapLike && mapLike.length > 0 ? mapLike : null;

  const remfav = (id) => {
    dispatch(removeFav(id, myuser.id)).then(() =>
      dispatch(getLikesByUser(myuser.id))
    );
    dispatch(getLikesByUser(null));
  };

  const addFav = (id) => {
    dispatch(addLikes(id, myuser.id)).then(() =>
      dispatch(getLikesByUser(myuser.id))
    );
  };
  useEffect(() => {
    dispatch(getAllComments());
    dispatch(getLikesByUser(myuser.id));
  }, [dispatch, myuser.id]);

  return (
    <div className="Box">
      <div className="bt">
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 0}
        >
          Anterior
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={events?.slice((page + 1) * 3).length === 0}
        >
          Siguiente
        </button>
      </div>
      {events.length === 0 && <h1>NO EVENTS</h1>}
      {events
        .slice(1)
        .slice(page * 3, (page + 1) * 3)
        .map((x) => (
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
                  <h4>{x.Fighter?.completeName}</h4>
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
                  <p className="texto">{x.texto}</p>
                </div>
                {maplike1 && maplike1.includes(x.id) ? (
                  <button onClick={() => remfav(x.id)}>❤️</button>
                ) : (
                  <button onClick={() => addFav(x.id)}>🖤</button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Events;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllComments, getLikesByUser } from "../../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faHeartCirclePlus,
  faHeartCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { addLikes, removeFav } from "../../Redux/actions";
import "./events.css";

const Events = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.coments);
  const [page, setPage] = useState(0);
  const [Likes, setLikes] = useState([]);
  console.log(Likes);
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
    axios
      .get("http://localhost:3001/comments/likes")
      .then((response) => {
        const likes = response.data;
        setLikes(likes);
      })
      .catch((error) => {
        console.error("Error al obtener likes:", error);
      });
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllComments());
    if (myuser.id) {
      dispatch(getLikesByUser(myuser.id));
    }
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
            <div class="media border p-3">
              <img
                src={`http://localhost:3001/fotos/${x.Fighter?.image}`}
                alt={x.Fighter?.name}
                class="mr-3 mt-3 rounded-circle"
                style={{ width: "60px" }}
              />
              <div class="media-body">
                <div className="bor">
                  <h4>{x.Fighter?.completeName}</h4>
                </div>
                <div>
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
                <div className="likEv">
                  {maplike1 && maplike1.includes(x.id) ? (
                    <>
                      <FontAwesomeIcon
                        className="iconThun"
                        size="3x"
                        icon={faHeartCircleCheck}
                        onClick={() => remfav(x.id)}
                      />
                    </>
                  ) : (
                    <FontAwesomeIcon
                      className="iconThun"
                      size="3x"
                      icon={faHeartCirclePlus}
                      onClick={() => addFav(x.id)}
                    />
                  )}
                  {
                    Likes.likesCount.filter((l) => l.ComentarioId === x.id)
                      .length
                  }
                </div>
              </div>
              <div></div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Events;

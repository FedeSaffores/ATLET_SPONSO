
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import instance, { getAllComments } from "../../Redux/actions";


function AllEventsFighter(){
  const { id } = useParams();
  const [elEvento, setEvento] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
console.log(elEvento)

const deleteComment = async (id) => {
  try {
    const response = await instance.delete(`/delete/${id}`);
    if (response.status === 200) {
      const updatedComments = await getAllComments();
      window.location.reload();
      return {
        message: "Se eliminó correctamente",
        comments: updatedComments, 
      };
    } else {
      return {
        message: "No se pudo eliminar",
        comments: [],
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Ocurrió un error al eliminar el comentario",
      comments: [],
    };
};
};
useEffect(() => {
 
  const fetchData = async () => {
    try {
      const response = await instance.get(`/all-coment/${id}`);
      const evento = response.data;
      setEvento(evento);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setError(error);
    }
  };

  fetchData(); 
}, [id]);

return(
  <div>
    {elEvento?.map((x) => (
    <ul class="list-group" key={x.eventName}>
      <li class="list-group-item">
        {x.eventName} -- {x.date}
        <button onClick={() => deleteComment(x.id)}>Eliminar</button>
      </li>
    </ul>
  ))}
  </div>
)

}
export default AllEventsFighter;
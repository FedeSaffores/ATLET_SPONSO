
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import instance, { getAllComments } from "../../Redux/actions";


function AllEventsFighter(){
  const { id } = useParams();
  const [elEvento, setEvento] = useState([]);
  const [error, setError] = useState(null);
console.log(elEvento)

const deleteComment = async (id) => {
  try {
    const response = await instance.delete(`/delete-comment/${id}`);
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
const handleGoBack = () => {
  window.history.back(); // Redirige a la página anterior
}

const styles ={
  box:{
    marginTop: "2%",
    marginLeft:"5%",
    marginRight:"5%",
  },
}

return(
<div>
  <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <a className="navbar-brand" href="#">
      <button class="btn btn-light" onClick={()=>handleGoBack()}>
        GO BACK
      </button>
      </a>
  </nav>
  {elEvento.length===0?(
  <h1>NO TIENES NINGUN EVENTO CREADO AUN</h1>):(<></>) }
  {elEvento?.map((x) => (
    <div style={styles.box}>
    <ul className="list-group" key={x.eventName}>
      <li className="list-group-item d-flex justify-content-between align-items-center">
        {x.eventName.toUpperCase()} <br /> <br /> {x.date}
        <button onClick={() => deleteComment(x.id)} className="btn btn-danger">
          Eliminar
        </button>
      </li>
    </ul>
    </div>
  ))}
</div>
)
}
export default AllEventsFighter;
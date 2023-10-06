import React,{useState} from "react";
import instance from "../../Redux/actions";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";



function DeleteFighter(){
  const {id} = useParams(); 
  const [showModal, setShowModal] = useState(false);

  const hableDelete = async()=> {
    try{
      const response = await instance.delete(`/delete/${id}`);
      if (response.status === 200) {     
        window.location.href = "/home";
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

  return(
    <div>
    <button className="btn btn-light" onClick={() => setShowModal(true)}>
      Delete Fighter
    </button>

    {/* Modal de confirmación */}
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Esta seguro que desea borrar el atleta?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button variant="danger" onClick={hableDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
  )
}
export default DeleteFighter;
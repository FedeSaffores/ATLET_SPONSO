import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function AdminFighters() {
  const [fighter, setFighter] = useState([]);
  useEffect(() => {
    getFighter();
  }, []);
  function getFighter() {
    fetch("http://localhost:3001/fighters/").then((result) => {
      result.json().then((resp) => {
        setFighter(resp);
      });
    });
  }
  function deleteFighter(id) {
    fetch(`http://localhost:3001/fighters/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getFighter();
      });
    });
  }
  return (
    <div>
      {fighter.length === 0 && <h1>NOT FIGHTERS</h1>}
      <div class="container">
        <table class="table table-dark">
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {fighter.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.lastname}</td>
                <td>{e.email}</td>
                <td>
                  <button onClick={() => deleteFighter(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminFighters;

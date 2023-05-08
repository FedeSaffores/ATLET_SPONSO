import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function AdminSponsors() {
  const [sponsors, setSponsors] = useState([]);
  useEffect(() => {
    getSponsor();
  }, []);
  function getSponsor() {
    fetch("http://localhost:3001/sponsor/").then((result) => {
      result.json().then((resp) => {
        setSponsors(resp);
      });
    });
  }
  function deleteFighter(id) {
    fetch(`http://localhost:3001/sponsor/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        getSponsor();
      });
    });
  }
  return (
    <div>
      {sponsors.length === 0 && <h1>NOT SPONSORS</h1>}
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
            {sponsors.map((e) => (
              <tr>
                <td>{e.companyName}</td>
                <td>{e.description}</td>
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

export default AdminSponsors;

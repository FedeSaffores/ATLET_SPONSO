import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Confirm = () => {
  const [verify, setVerify] = useState(null);
  const { confirmationCode } = useParams();
  useEffect(() => {
    if (confirmationCode)
      axios
        .get(`http://localhost:3001/confirm/${confirmationCode}`)
        .then((response) => {
          setVerify(true);
        })
        .catch(() => {
          setVerify(false);
        });
  }, [confirmationCode]);

  if (verify === null) return <div>We are checking your Account </div>;
  if (!verify) return <div>We Can't verify your account </div>;
  return (
    <div>
      <header>
        <h3>
          <strong>Confirmed Account!</strong>
        </h3>
      </header>
      <br />
      <Link to={"/login"} type="button">
        SIGN IN
      </Link>
    </div>
  );
};
export default Confirm;

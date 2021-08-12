import React from "react";
import AuthServices from "./AuthServices";
import { Link } from "react-router-dom";

const Welcome = (props) => {
  if (props.match.path === "/confirm/:confirmationCode") {
    AuthServices.verifyUser(props.match.params.confirmationCode);
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Account confirmed!</strong>
        </h3>
      </header>
      <Link to={"/"}>
        Please Login
      </Link>
    </div>
  );
};

export default Welcome;
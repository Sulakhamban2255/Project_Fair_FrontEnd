import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import MyProjects from "../Components/MyProjects";
import Profile from "../Components/Profile";

function DashBoard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("username")) {
      setUsername(sessionStorage.getItem("username"));
    }
  }, []);
  return (
    <>
      <Header btn ={true} />
      <h3>
        Welcome <span style={{ color: "red" }}>{username}</span>{" "}
      </h3>
      <div className="row p-5 justify-content-between">
        <div className="col-lg-7 p-3 border border dark shadow">
          <MyProjects />
        </div>
        <div className="col-lg-4 p-2 border border dark shadow">
          <Profile />
        </div>
      </div>
    </>
  );
}

export default DashBoard;

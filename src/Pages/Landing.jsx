import React, { useEffect, useState } from "react";
import ProjectCard from "../Components/ProjectCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { getAllProjects } from "../Services/allApis";

function Landing() {
  const [logStatus, setLogStatus] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLogStatus(true);
      getData();
    } else {
      setLogStatus(false);
    }
  }, []);
  const getData = async () => {
    const res = await getAllProjects();
    if (res.status == 200) {
      setProjects(res.data.slice(0, 3));
    } else {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="row p-3 bg-info" style={{ height: "100vh" }}>
        <div className="col-sm-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="display-4 text-warning mb-3">
            <i className="fa-solid fa-diagram-project" /> Project Fair
          </h1>
          <p className="text-light mt-4" style={{ textAlign: "justify" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            veritatis cupiditate, dolores, illo sequi incidunt obcaecati debitis
            distinctio odio sit illum laboriosam, deleniti ipsa. Assumenda
            pariatur eos officiis eum facilis.
          </p>
          {logStatus ? (
            <Link className="btn btn-warning" to={"/dash"}>
              {" "}
              Go to Dash Board
            </Link>
          ) : (
            <Link to="/auth" className="btn btn-lg btn-success mt-3">
              Start to explore...
            </Link>
          )}
        </div>
        <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center">
          <img
            className="img-fluid rounded shadow-lg"
            src="https://png.pngtree.com/png-vector/20190521/ourlarge/pngtree-illustration-project-management-the-concept-of-people-discussing-in-front-of-png-image_1055905.jpg"
            alt="Project Management Illustration"
          />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-center mb-4">Sample Projects</h3>
        <marquee behavior="scroll" direction="left" scrollamount="6">
          {projects.length > 0 ? (
            <div
              className="d-flex justify-content-around"
              style={{ width: "100%" }}
            >
              {projects.map((item) => (
                <ProjectCard project={item} />
              ))}
            </div>
          ) : (
            <p>No Projects available </p>
          )}
        </marquee>
        <p>
          <Link to="/allprojects">View More </Link>
        </p>
      </div>
    </div>
  );
}

export default Landing;

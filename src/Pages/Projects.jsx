import React, { useState, useEffect } from "react";
import ProjectCard from "../Components/ProjectCard";
import Header from "../Components/Header";
import { getAllProjects } from "../Services/allApis";

function Projects() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoginStatus(true);
      fetchProjects();
    } else {
      setLoginStatus(false);
    }
  }, []);

  const fetchProjects = async () => {
    try {
      const result = await getAllProjects();
      if (result.status === 200) {
        setProjects(result.data);
      } else {
        console.log("Failed to fetch projects:", result);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <>
      <Header />
      {loginStatus ? (
        <div className="container">
          <h3 className="text-center">All Projects</h3>
          {projects.length > 0 ? (
            <div className="project-list mt-3 p-5">
              {projects.map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          ) : (
            <div>
              <h3 className="text-danger text-center">No Projects available</h3>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3 className="text-center text-danger">Please Login</h3>
        </div>
      )}
    </>
  );
}

export default Projects;

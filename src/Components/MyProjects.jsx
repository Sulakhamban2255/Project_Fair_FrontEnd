import React, { useContext, useEffect, useState } from "react";
import Add from "./Add";
import Edit from "./Edit";
import { deleteProject, getUserProjects } from "../Services/allApis";
import { editResponseContext, projectAddResponse } from "../../Context/ContextShare";
import { toast } from "react-toastify";

function MyProjects() {
  const [userProjects, setUserProjects] = useState([]);
  const { addResponse, setAddResponse } = useContext(projectAddResponse);
  const {editResponse , setEditResponse} = useContext(editResponseContext)

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getData();
    }
  }, [addResponse, editResponse]);

  const getData = async () => {
    const header = {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
    };
    const res = await getUserProjects(header);
    if (res.status === 200) {
      console.log(res.data);
      setUserProjects(res.data);
    } else {
      console.log(res);
    }
  };

  const deletePro = async (id) => {
    const header = {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
    };
    const result = await deleteProject(id, header);
    if (result.status == 200) {
 
      toast.success(result.data);
    } else {
      console.log(result, "project delete error");
      toast.error("deletion Failed");
    }
  };

  return (
    <>
      <div>
        <Add />
        <div className="mt-4">
          {userProjects.length > 0 ? (
            <div>
              {userProjects.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between border shadow bg-light p-3 rounded"
                >
                  <h5>{item.title}</h5>
                  <div className="d-flex">
                    <a
                      href={item.github}
                      className="btn p-1 border border-dark me-3"
                    >
                      <i className="fa-brands fa-github fa-2x" />
                    </a>
                    <Edit project={item} />
                    <button
                      className="btn p-1 border border-dark me-3"
                      onClick={() => {
                        deletePro(item._id);
                      }}
                    >
                      <i
                        className="fa-solid fa-trash fa-2x"
                        style={{ color: "#d92202" }}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center my-5">No projects available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MyProjects;

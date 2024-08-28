import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import base_url from "../Services/base_url";
import { updateProjectAPI } from "../Services/allApis";
import { toast } from "react-toastify";
import { editResponseContext } from "../../Context/ContextShare";

function Edit({ project }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [imgstatus, setImgStatus] = useState(false);
  const [preview, setPreview] = useState("");
  const [projectData, setProjectData] = useState({ ...project });
  const { editResponse, setEditResponse } = useContext(editResponseContext);

  useEffect(() => {
    if (
      projectData?.picture?.type !== "image/jpg" &&
      projectData?.picture?.type !== "image/png" &&
      projectData?.picture?.type !== "image/jpeg"
    ) {
      console.log("Invalid File type");
      setImgStatus(false);
      setPreview("");
    } else {
      setImgStatus(true);
      setPreview(URL.createObjectURL(projectData.picture));
    }
  }, [projectData.picture]);

  const handleClose = () => {
    setPreview("");
    setShow(false);
    setProjectData({ ...project });
  };

  const handleUpdate = async () => {
    const { title, description, languages, demo, github, picture } =
      projectData;
    if (!title || !description || !languages || !demo || !github || !picture) {
      toast.warning("Fill form with valid data");
    } else {
      if (imgstatus) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("languages", languages);
        formData.append("demo", demo);
        formData.append("github", github);
        formData.append("picture", picture);

        const header = {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        };

        const result = await updateProjectAPI(project._id, formData, header);
        if (result.status === 200) {
          toast.success("Project updated successfully");
          handleClose();
          setEditResponse(result);
        } else {
          toast.error("Updation failed");
          console.log(result);
        }
        console.log("Update.......>", result);
      } else {
        const header = {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        };
        const result = await updateProjectAPI(project._id, projectData, header);
        if (result.status === 200) {
          toast.success("Project updated successfully");
          handleClose();
          setEditResponse(result);
        } else {
          toast.error("Updation failed");
          console.log(result);
        }
        console.log("Update2.....>", result);
      }
    }
  };

  return (
    <div>
      <button onClick={handleShow} className="btn p-1 border border-dark me-3">
        <i className="fa-regular fa-pen-to-square fa-2x" />
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <label htmlFor="img">
                <input
                  type="file"
                  accept="image/*"
                  id="img"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    setProjectData({
                      ...projectData,
                      picture: e.target.files[0],
                    });
                  }}
                />
                <img
                  src={
                    preview
                      ? preview
                      : `${base_url}/upload/${projectData?.picture}`
                  }
                  className="img-fluid"
                  alt="Preview"
                />
              </label>
            </div>
            <div className="col">
              <FloatingLabel controlId="tit" className="mb-2" label="Title">
                <Form.Control
                  type="text"
                  value={projectData?.title}
                  onChange={(e) =>
                    setProjectData({ ...projectData, title: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="des"
                label="Description"
              >
                <Form.Control
                  type="text"
                  value={projectData?.description}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      description: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
              <FloatingLabel className="mb-2" controlId="Lang" label="Language">
                <Form.Control
                  type="text"
                  value={projectData?.languages}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      languages: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="github"
                label="GitHub URL"
              >
                <Form.Control
                  type="text"
                  value={projectData?.github}
                  onChange={(e) =>
                    setProjectData({ ...projectData, github: e.target.value })
                  }
                />
              </FloatingLabel>
            </div>
          </div>
          <FloatingLabel className="mb-2" controlId="demo" label="Demo URL">
            <Form.Control
              type="text"
              value={projectData?.demo}
              onChange={(e) =>
                setProjectData({ ...projectData, demo: e.target.value })
              }
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdate} variant="success">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Edit;

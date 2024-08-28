import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import { addProjectApi } from "../Services/allApis";
import { projectAddResponse } from "../../Context/ContextShare";


function Add() {
  
  const [show, setShow] = useState(false);
  const { addResponse, setAddResponse } = useContext(projectAddResponse);
  const [imgstatus, setimgStatus] = useState(false);
  const [preview, setPreview] = useState();

  const handleClose = () => {
    setShow(false);
    setProjectData({
      title: "",
      description: "",
      languages: "",
      github: "",
      demo: "",
      picture: "",
    });
    setPreview("");
  };
  const handleShow = () => setShow(true);
  const [projectData, setProjectData] = useState({
    title: " ",
    description: "",
    languages: "",
    demo: "",
    github: "",
    picture: "",
  });


  useEffect(() => {
    console.log(projectData.picture);
    if (
      projectData?.picture.type != "image/jpg" &&
      projectData?.picture.type != "image/png" &&
      projectData?.picture.type != "image/jpeg"
    ) {
      console.log("Invalid File type ");
      setimgStatus(false);
      setProjectData({
        title: "",
        description: "",
        languages: "",
        github: "",
        demo: "",
        picture: "",
      });
      setPreview("");
    } else {
      setimgStatus(true);
      console.log("valid");
      setPreview(URL.createObjectURL(projectData.picture));
    }
  }, [projectData.picture]);
  console.log(projectData);

  const handleSubmission = async () => {
    const { title, description, languages, demo, github, picture } =
      projectData;
    if (!title || !description || !languages || !demo || !github || !picture) {
      toast.warning("Fill Form with valid Data");
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("languages", languages);
      formData.append("demo", demo);
      formData.append("github", github);
      formData.append("picture", picture);

      const header = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };
      const res = await addProjectApi(formData, header);
      console.log(res);

      if (res.status == 201) {
        setAddResponse(res);
        toast.success("Project Added Successfully");
        handleClose();
        setProjectData({
          title: "",
          description: "",
          languages: "",
          github: "",
          demo: "",
          picture: "",
        });
        setPreview("");
      } else {
        toast.error("Project adding Failed ");
      }
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn btn-info ">
        {" "}
        Add project{" "}
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <label htmlFor="img">
                <input
                  type="file"
                  name=""
                  id="img"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      picture: e.target.files[0],
                    })
                  }
                />
                <img
                  src={
                    preview
                      ? preview
                      : "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"
                  }
                  className="img-fluid"
                  alt=""
                />
                {!imgstatus && (
                  <p>Image file must be .png , .jpg, or jpeg format</p>
                )}
              </label>
            </div>
            <div className="col">
              <FloatingLabel controlId="tit" className="mb-2" label="Title ">
                <Form.Control
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    setProjectData({ ...projectData, title: e.target.value });
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="des"
                label="Description "
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    setProjectData({
                      ...projectData,
                      description: e.target.value,
                    });
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="Lang"
                label="Language "
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    setProjectData({
                      ...projectData,
                      languages: e.target.value,
                    });
                  }}
                />
              </FloatingLabel>
              <FloatingLabel
                className="mb-2"
                controlId="tit"
                label="Git-Hub URL "
              >
                <Form.Control
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    setProjectData({ ...projectData, github: e.target.value });
                  }}
                />
              </FloatingLabel>
            </div>
          </div>
          <FloatingLabel className="mb-2" controlId="tit" label="Demo-URL ">
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => {
                setProjectData({ ...projectData, demo: e.target.value });
              }}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleSubmission} variant="success ">
            Save{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;

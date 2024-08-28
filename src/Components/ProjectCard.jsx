import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import base_url from "../Services/base_url";

function ProjectCard({ project }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(`${base_url}/uplaod/${project.picture}`);

  return (
    <div className="d-flex justify-content-center mt-4">
      <Card
        style={{
          width: "18rem",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
        onClick={handleShow}
      >
        <Card.Img
          variant="top"
          src={`${base_url}/uplaod/${project.picture}`}
          height={"180px"}
        />
        <Card.Body>
          <Card.Title className="text-center">{project.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{project.title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <img
                className="w-100"
                src={`${base_url}/uplaod/${project.picture}`}
                alt="Project"
              />
            </div>
            <div className="col-md-6">
              <h2>{project.title}</h2>
              <p style={{ textAlign: "justify" }}>{project.description}</p>
              <div className="d-flex justify-content-between mt-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-github fa-2x"></i>
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-link fa-2x"></i>
                </a>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProjectCard;

import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-secondary p-3 mt-5">
      <div className="row">
        <div className="col">
          <h4> Project Fair 2024 </h4>
          <p style={{ textAlign: "justify" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            esse quas voluptate ratione rem, amet nostrum temporibus explicabo
            mollitia commodi totam in magnam atque sit? Voluptatem quo corporis
            pariatur minima!
          </p>
        </div>
        <div className="col d-flex flex-column align-items-center">
          <h4>Links </h4>
          <p>
            <Link to="/" className="text-dark">
              Landing
            </Link>
          </p>
          <p>
            <Link to="/auth" className="text-dark">
              Login
            </Link>
          </p>
        </div>
        <div className="col">
          <h4>FeedBack</h4>
          <textarea name="" className="form-control my-3" id=""></textarea>
          <button className="btn btn-success">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Footer;

import React, { useEffect, useState } from "react";
import base_url from "../Services/base_url";
import { toast } from "react-toastify";
import { updateProfileApi } from "../Services/allApis";

function Profile() {
  const [profstate, setProfState] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    github: "",
    linkdin: "",
    profile_pic: "",
  });
  const [pic, setPic] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    const profiledata = JSON.parse(sessionStorage.getItem("userDetails"));
    if (sessionStorage.getItem("token")) {
      setProfile(profiledata);
    }
    if (pic) {
      setPreview(URL.createObjectURL(pic));
      setProfile({ ...profile });
    }
  }, [pic]);

  const handleProfileUpdate = async() => {
    console.log(profile);
    const {username, github,linkdin} = profile
    if(!username|| !github||!linkdin){
      toast.warning("Enter the valid Inputs")
    }
    else{
      if(pic){
        const formData = new FormData()
        formData.append("username", username)
        formData.append("github", github)
        formData.append("linkdin", linkdin)
        formData.append("profile_pic", profile_pic)
        const header = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${sessionStorage.getItem('token')}`
        }
        const res = await updateProfileApi(formData, header)
        console.log(res)
        if(res.status ==200){
          toast.success("Profile Updation successfully")
          toggle()
          nav('/auth')
        }
        else{
          toast.error("Updation Failed")
        }
      }
    }
  };

  const toggle = () => {
    setProfState(!profstate);
  };

  return (
    <>
      <div>
        <div className="d-flex justify-content-between">
          <h1>Profile</h1>
          <button onClick={toggle} className="btn btn-light">
            {profstate ? (
              <i className="fa-solid fa-angle-up" />
            ) : (
              <i className="fa-solid fa-angle-down" />
            )}
          </button>
        </div>
        <div style={profstate ? { display: "block" } : { display: "none" }}>
          <label
            htmlFor="pro"
            className="d-flex justify-content-center img-fluid"
          >
            <input
              type="file"
              id="pro"
              style={{ display: "none" }}
              onChange={(e) => {
                setPic(e.target.files[0]);
              }}
            />
            <img
              src={
                preview
                  ? preview
                  : profile.profile_pic
                  ? `${base_url}/upload/${profile.profile_pic}`
                  : "https://i.pinimg.com/474x/8e/0c/fa/8e0cfaf58709f7e626973f0b00d033d0.jpg"
              }
              alt="Profile"
            />
          </label>
          <input
            type="text"
            placeholder="UserName"
            className="form-control my-3"
            value={profile.username}
            onChange={(e) => {
              setProfile({ ...profile, username: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Github - Link"
            className="form-control my-3"
            value={profile.github}
            onChange={(e) => {
              setProfile({ ...profile, github: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Linked-In"
            className="form-control my-3"
            value={profile.linkdin}
            onChange={(e) => {
              setProfile({ ...profile, linkdin: e.target.value });
            }}
          />
          <button onClick={handleProfileUpdate} className="btn btn-success">
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;

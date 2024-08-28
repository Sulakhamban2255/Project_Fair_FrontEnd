import React, { useContext, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { loginApi, registerApi } from "../Services/allApis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";



function Auth() {
  const [regStatus, setregStatus] = useState(false);
  const { authStatus, setAuthStatus } = useContext(authContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [log, setLog] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const statechng = () => {
    setregStatus(!regStatus);
  };
  const handleReg = async () => {
    const { username, password, email } = user;
    if (!username || !password || !email) {
      toast.warning("Enter Valid Data ");
    } else {
      const result = await registerApi(user);
      console.log(result);
      if (result.status == 200) {
        toast.success("Registartion Successful");
        setUser({
          username: "",
          password: "",
          email: "",
        });
        statechng();
      } else {
        toast.error("Registration Failed !!!");
      }
    }
  };
 

  const UserLogin = async () => {
    const { password, email } = user;
    if (!password || !email) {
      toast.warning("Enter the Valid Inputs");
    } else {
      try {
        const logRes = await loginApi(user);
        console.log(logRes);
        if (logRes.status == 200) {
          setAuthStatus(true)
          toast.success("Login Successful");

          setUser({
            email: "",
            username:"",
            password: "",
          });
          sessionStorage.setItem('token', logRes.data.token)
          sessionStorage.setItem('username', logRes.data.username)
          const userDetails = {username: logRes.data.username, github:logRes.data.userGit , linkdin:logRes.data.userLink
          
          }
          sessionStorage.setItem("userDetails", JSON.stringify(userDetails))
          navigate('/')
       
        } else {
          toast.error(logRes.response.data);
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login Failed !!!");
      }
    }
  };

  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center bg-light"
      style={{ height: "100vh" }}
    >
      <div className="w-50 border border-3 border-dark shadow-lg p-4 bg-white rounded">
        <div className="row g-0">
          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
            <img
              className="img-fluid rounded-start"
              src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-4468581-3783954.png?f=webp"
              alt="Login Illustration"
            />
          </div>
          <div className="col-md-6 p-3">
            <h5 className="text-center my-3">
              {regStatus ? <span> Register</span> : <span>Login</span>}
            </h5>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
              />
            </FloatingLabel>
            {regStatus && (
              <FloatingLabel
                controlId="floatingUser"
                label="UserName"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="UserName"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      username: e.target.value,
                    })
                  }
                />
              </FloatingLabel>
            )}

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.target.value,
                  })
                }
              />
            </FloatingLabel>
            <div className="mt-4 d-flex justify-content-between">
              {regStatus ? (
                <Button onClick={handleReg} className="btn btn-info">
                  {" "}
                  Register
                </Button>
              ) : (
                <Button onClick={UserLogin} variant="success" className="me-2">
                  Login
                </Button>
              )}
              {regStatus ? (
                <Button onClick={statechng} variant="link">
                  {" "}
                  Already a User
                </Button>
              ) : (
                <Button onClick={statechng} variant="link">
                  New User
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./bootstrap.min.css";
import Auth from "./Pages/Auth";
import DashBoard from "./Pages/DashBoard";
import Landing from "./Pages/Landing";
import Projects from "./Pages/Projects";
import Footer from "./Components/Footer";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { authContext } from "../Context/AuthContext";

function App() {
  const {authStatus,setAuthStatus}=useContext(authContext)
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dash" element={authStatus?<DashBoard />:<Auth/>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/allprojects" element={authStatus?<Projects />:<Auth/>} />
      </Routes>
      <Footer />
      <ToastContainer stacked />
    </>
  );
}

export default App;

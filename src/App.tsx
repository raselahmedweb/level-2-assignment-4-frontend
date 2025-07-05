import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;

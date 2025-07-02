import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <div className="mx-4 md:mx-20 lg:mx-40">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;

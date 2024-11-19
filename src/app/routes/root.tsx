import { Navbar } from "../../components/Navbar";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div id="main">
      <div id="menu">
        <Navbar />
      </div>
      <div id="main-page">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;

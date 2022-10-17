import { Outlet } from "react-router";
import Sidebar from "../sidebar/Sidebar";

const AppLayout = () => {
  return (
    <div style={{}}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AppLayout;

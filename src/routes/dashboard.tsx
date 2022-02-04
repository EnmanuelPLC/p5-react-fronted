import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManageUsers from "../requirements/manageUsers";
import "./css/dashboard.css";
interface DashboardProps {
  user: {
    name: string;
    type: string;
    token: string;
  };
}

const Dashboard: FunctionComponent<DashboardProps> = ({ user }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (typeof user.name !== "string") {
      navigate("/");
    }
  }, [navigate, user]);

  switch (user.type) {
    case "admin":
      return <ManageUsers />;
    case "profes":
      return <h1>Xddd</h1>;
    case "student":
      return <h1 style={{ color: "white" }}>Holaaaaaaa</h1>;
    default:
      return <h1 style={{ color: "white" }}>Cargando ...</h1>;
  }
};

export default Dashboard;

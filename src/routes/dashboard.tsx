import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManageUsers from "../requirements/manageUsers";
import StudentDashboard from "../requirements/studentDashboard";
import TeacherDashboard from "../requirements/teacherDashboard";
import "./css/dashboard.css";
interface DashboardProps {
  user: {
    name: string;
    username:string,
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
    case "student":
      return <StudentDashboard student={user.username}/>;
    case "teacher":
      return <TeacherDashboard />;
    default:
      return <h1 style={{ color: "white" }}>Cargando ...</h1>;
  }
};

export default Dashboard;

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
  } | string;
}

const Dashboard: FunctionComponent<DashboardProps> = ({ user }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (typeof user !== "object") {
      navigate("/");
    }
  }, [navigate, user]);
  
  let usr = {username: '', type: ''};
  if (typeof user === 'object') {
    usr = user
  }

  switch (usr.type) {
    case "admin":
      return <ManageUsers />;
    case "student":
      return <StudentDashboard student={usr.username}/>;
    case "teacher":
      return <TeacherDashboard teacher={usr.username}/>;
    default:
      return <h1 style={{ color: "white" }}>Cargando ...</h1>;
  }
};

export default Dashboard;

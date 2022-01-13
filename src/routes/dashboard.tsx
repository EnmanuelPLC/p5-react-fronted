import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManageUser from "../requirements/manageUsers";

interface DashboardProps {
    user: {
        user: string,
        type: string
    }
}
 
const Dashboard: FunctionComponent<DashboardProps> = ({user}) => {
    let navigate = useNavigate();
    console.log(typeof user.user);
    
    useEffect(() => {
        if (typeof user.user !== 'string') {
            navigate('/');
        }
    }, [navigate, user]);

    switch (user.type) {
        case 'admin':
            return (<ManageUser currentUser={user}/>)    
        default:
            return ( <h1 style={{color: 'white'}}>Dashboard!!</h1> );
    }
}
 
export default Dashboard;

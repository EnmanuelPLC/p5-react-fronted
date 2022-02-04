import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/notFound.css";

interface NotFoundProps {
    user: any
}
 
const NotFound: FunctionComponent<NotFoundProps> = ({user}) => {
    let navigate = useNavigate();
    const [message, setMessage] = useState('Pagina no encontrada en el servidor');
    
    useEffect(() => {
        if (typeof user.user !== 'string') {
            navigate('/');
        } else {
            setTimeout(() => {
                setMessage('Redirijiendo a dashboard en 10 segundos');
                setTimeout(() => {
                    navigate('/dashboard');
                }, 10000);
            }, 3000);
        }
    }, [navigate, user]);
    return (
        <div className="errorPage">
            <h1>Error 404!</h1>
            <p>{message}</p>
        </div>
    );
}
 
export default NotFound;

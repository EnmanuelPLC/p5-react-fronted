import { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../modal/modal";
import { FaUser } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import './css/manageUsers.css';
import { RiUserSettingsFill } from "react-icons/ri";
import { TiUserDelete } from "react-icons/ti";
import { TiUserAdd } from "react-icons/ti";

interface ManageUsersProps {
    currentUser: {
        user: string,
        type: string
    }
}
 
const ManageUsers: FunctionComponent<ManageUsersProps> = ({currentUser}) => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [users, setUsers] = useState([]);    
    const [userType, setUserType] = useState('');
    const types = {
        'admin': 'Administrador',
        'jefdep': 'Jefe de departamento',
        'profes': 'Profesor',
        'student': 'Estudiante'
    }
    
    useEffect(() => {
        fetch('/allUsers').then((e) => {
            e.json().then((e) => {
                setUsers(e);
            });
        });
    }, []);

    const editUser = (e: any) => {
        console.log(e.target.value);
    }

    const delUser = (e: any) => {
        if (!window.confirm(`Confirme la eliminacion de ${e.target.value} del sistema`)) return;
        fetch('/delUser', {
            method: 'POST',
            body: JSON.stringify({user: e.target.value}),
            headers:{ 'Content-Type': 'application/json' }
        }).then((res) => {
            res.json().then((dat) => {
                if (dat.delUser) {
                    alert('Usuario eliminado correctamente');
                    window.location.reload();
                } else alert('El usuario NO existe en el sistema');
            }).catch((e) => {
                console.log(e);
                alert('El usuario no fue eliminado');
            })
        }).catch((e) => {
            console.log(e);
            alert('El usuario no fue eliminado');
        });
    }

    return (
        <div className="usersContainer">
            <ul className="list-group item-wrapper">
                {(users.length > 0 ? users.length > 1 ? users.map((usr: {username: string, type: 'admin' | 'profes' | 'jefdep' | 'student'}, i) => (
                    (usr.username !== currentUser.user ? 
                        <li className="list-group-item" key={i}>
                            <div className="userName"><FaUser/>{usr.username}</div>
                            <div className="userType">{types[usr.type]}</div>
                            <div className="userActions">
                                <button className="btn btn-outline-info editUser" type="button" value={usr.username} onClick={editUser}><RiUserSettingsFill/></button>
                                <button className="btn btn-outline-danger delUser" type="button" value={usr.username} onClick={delUser}><TiUserDelete/></button>
                            </div>
                        </li> : '')
                )): (
                    <li className="list-group-item noUsers">No hay usuarios</li>
                ) : (
                    <li className="list-group-item">
                        <div className="load">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 8c-0.020-1.045-0.247-2.086-0.665-3.038-0.417-0.953-1.023-1.817-1.766-2.53s-1.624-1.278-2.578-1.651c-0.953-0.374-1.978-0.552-2.991-0.531-1.013 0.020-2.021 0.24-2.943 0.646-0.923 0.405-1.758 0.992-2.449 1.712s-1.237 1.574-1.597 2.497c-0.361 0.923-0.533 1.914-0.512 2.895 0.020 0.981 0.234 1.955 0.627 2.847 0.392 0.892 0.961 1.7 1.658 2.368s1.523 1.195 2.416 1.543c0.892 0.348 1.851 0.514 2.799 0.493 0.949-0.020 1.89-0.227 2.751-0.608 0.862-0.379 1.642-0.929 2.287-1.604s1.154-1.472 1.488-2.335c0.204-0.523 0.342-1.069 0.415-1.622 0.019 0.001 0.039 0.002 0.059 0.002 0.552 0 1-0.448 1-1 0-0.028-0.001-0.056-0.004-0.083h0.004zM14.411 10.655c-0.367 0.831-0.898 1.584-1.55 2.206s-1.422 1.112-2.254 1.434c-0.832 0.323-1.723 0.476-2.608 0.454-0.884-0.020-1.759-0.215-2.56-0.57-0.801-0.354-1.526-0.867-2.125-1.495s-1.071-1.371-1.38-2.173c-0.31-0.801-0.457-1.66-0.435-2.512s0.208-1.694 0.551-2.464c0.342-0.77 0.836-1.468 1.441-2.044s1.321-1.029 2.092-1.326c0.771-0.298 1.596-0.438 2.416-0.416s1.629 0.202 2.368 0.532c0.74 0.329 1.41 0.805 1.963 1.387s0.988 1.27 1.272 2.011c0.285 0.74 0.418 1.532 0.397 2.32h0.004c-0.002 0.027-0.004 0.055-0.004 0.083 0 0.516 0.39 0.94 0.892 0.994-0.097 0.544-0.258 1.075-0.481 1.578z"></path>
                            <animateTransform attributeName="transform" attributeType="XML" dur="2s" from="0 0 0" repeatCount="indefinite" to="360 0 0" type="rotate"></animateTransform>
                            </svg>
                            <span>Cargando datos...</span>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="btn btn-light createUserButton" data-bs-toggle="modal" data-bs-target="#createUserModal"><TiUserAdd/> Crear usuario</button>
            <Modal title="Crear Usuario" id="createUserModal">
                <form className="modal-form" onSubmit={
                 handleSubmit((dat, e) => {
                    fetch('/createUser', {
                        method: 'POST',
                        body: JSON.stringify({user: dat.username, pass: dat.password, type: userType}), // data can be `string` or {object}!
                        headers:{ 'Content-Type': 'application/json' }
                    }).then((res) => {
                        res.json().then((dat) => {
                            if (dat.createUser) {
                                alert('Usuario creado correctamente');
                                window.location.reload();
                            } else alert('El usuario ya existe en el sistema');
                        }).catch((e) => {
                            console.log(e);
                            alert('El usuario no fue creado');
                        })
                    }).catch((e) => {
                        console.log(e);
                        alert('El usuario no fue creado');
                    });
                 })}>
                <div className='form-container'>
                    <div className="form-group">
                        <input className='form-control' id='uname' type="text" placeholder="Nombre del usuario" autoComplete="username"
                        {...register("username", { required: true, minLength: 5, maxLength: 15 })} />
                        {errors.username?.type === "required" && <p className='no-valid'>Debes escribir un nombre</p>}
                        {errors.username?.type === "minLength" && <p className='no-valid'>El nombre debe tener al menos 5 caracteres</p>}
                        {errors.username?.type === "maxLength" && <p className='no-valid'>El nombre es muy grande</p>}
                    </div>

                    <div className="form-group">
                        <input className="form-control" id="pwd" type="password" placeholder="Contraseña" autoComplete="current-password"
                        {...register("password", { required: true, pattern: /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, minLength: 8 })} />
                        {errors.password?.type === "required" && <p className='no-valid'>Debes escribir una contraseña</p>}
                        {errors.password?.type === "minLength" && <p className='no-valid'>La contraseña debe tener al menos 8 caracteres</p>}
                        {errors.password?.type === "pattern" && <p className='no-valid'>Su contraseña debe contener mayuscula y minusculas, 1 digito y 1 caracter especial</p>}
                    </div>
                    {/*@ts-ignore*/}
                    <div className="form-group">
                        <select id="select" className="form-select user-type-select"
                        {...register("userType", { required: true, onChange: console.log })} onChange={e=>setUserType(e.target.value)}>
                            <option value="">Selecciona tipo de usuario</option>
                            <option value="student">Estudiante</option>
                            <option value="profes">Profesor</option>
                            <option value="jefdep">Jefe de departamento</option>
                        </select>
                        {errors.userType?.type === "required" && <p className="no-valid">Debe seleccionar un tipo de usuario</p> }
                    </div>
                </div>
                <button className="btn btn-success w-100" id="btn-login" type="submit">Crear</button>
            </form>
            </Modal>
        </div>
    );
}
 
export default ManageUsers;

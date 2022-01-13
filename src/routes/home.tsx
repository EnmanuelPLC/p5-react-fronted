//@ts-nocheck
import { FunctionComponent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './css/home.css';


interface HomeProps {
    
}
 
const Home: FunctionComponent<HomeProps> = ({onSignIn, user}) => {
    let navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        if (user.user) {
            navigate('/dashboard');
        }
    }, [navigate, user]);
 
    return (
        <>
        <label id="auth" className="active" htmlFor="formularios"> Autenticar Usuario </label>
        <form id='formulario' onSubmit={
                handleSubmit((dat, e) => {
                    if (e) e.preventDefault();
                    fetch('/login', {
                        method: 'POST', // or 'PUT'
                        body: JSON.stringify({ username: dat.username, password: dat.password }), // data can be `string` or {object}!
                        headers:{ 'Content-Type': 'application/json' }
                    }).then((res) => {
                        res.json().then(e => {
                            if (e.login) {
                                alert('Usted se ha Autenticado.');
                                onSignIn({user: dat.username, type: e.type});
                                localStorage.setItem("user", JSON.stringify(dat.username));
                                localStorage.setItem("type", JSON.stringify(e.type));
                                navigate("/dashboard");
                            } else {
                                alert('Usuario o contraseña incorrecta.');
                            }
                        });
                    }).catch((e) => {
                        alert(e);
                    });
                })
            }>
            <div className='form-container'>
                <div className="frm1 form-group">
                    <input className='form-control' id='uname' type="text" placeholder="Nombre del usuario" autoComplete="username"
                    {...register("username", { required: true, minLength: 5, maxLength: 15 })} />
                    {errors.username?.type === "required" && <p className='no-valid'>Debes escribir un nombre</p>}
                    {errors.username?.type === "minLength" && <p className='no-valid'>El nombre debe tener al menos 5 caracteres</p>}
                    {errors.username?.type === "maxLength" && <p className='no-valid'>El nombre es muy grande</p>}
                </div>

                <div className="frm2 form-group">
                    <input className="form-control" id="pwd" type="password" placeholder="Contraseña" autoComplete="current-password"
                    {...register("password", { required: true, pattern: /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, minLength: 8 })} />
                    {errors.password?.type === "required" && <p className='no-valid'>Debes escribir una contraseña</p>}
                    {errors.password?.type === "minLength" && <p className='no-valid'>La contraseña debe tener al menos 8 caracteres</p>}
                    {errors.password?.type === "pattern" && <p className='no-valid'>Su contraseña debe contener mayuscula y minusculas, 1 digito y 1 caracter especial</p>}
                </div>
            </div>
            <button className="btn btn-success w-100" id="btn-login" type="submit">Iniciar Sesion</button>
        </form>
        </>
    );
}
 
export default Home;
//@ts-nocheck
import { FunctionComponent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import './css/home.css';


interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = ({ onSignIn, user }) => {
  let navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();

  useEffect(() => {
    if (user.name) {
      navigate('/dashboard');
    }
  }, [navigate, user]);

  const sleep = async (ms) => {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const showAlert = async (ops: { type: string, msg: string }) => {
    let typeAlert = "", alertObj = document.getElementById("myAlert"); let ico = alertObj.getElementsByClassName("ico")[0];
    if (ops.type === "ok") {
      typeAlert = "alert-success";
      ico.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>';
    } else if (ops.type === "err") {
      typeAlert = "alert-danger";
      ico.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6zM7.9 7.5L10.3 5l.7.7-2.4 2.5 2.4 2.5-.7.7-2.4-2.5-2.4 2.5-.7-.7 2.4-2.5-2.4-2.5.7-.7 2.4 2.5z"></path></svg>';
    } else if (ops.type === "war") {
      typeAlert = "alert-warning";
      ico.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M955.7 856l-416-720c-6.2-10.7-16.9-16-27.7-16s-21.6 5.3-27.7 16l-416 720C56 877.4 71.4 904 96 904h832c24.6 0 40-26.6 27.7-48zM480 416c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v184c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V416zm32 352a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg>';
    } else {
      typeAlert = "alert-info";
      ico.innerHTML = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg>';
    }
    alertObj.style.display = "";
    let txt = alertObj.getElementsByClassName("text")[0];
    txt.textContent = ops.msg;
    alertObj.classList.add(typeAlert);
    await sleep(500);
    alertObj.classList.add("show");
    await sleep(2000);
    alertObj.classList.remove("show");
    await sleep(500);
    alertObj.classList.remove(typeAlert);
    txt.textContent = "";
    alertObj.style.display = "none";
  }

  return (
    <>
      <label id="auth" className="active" htmlFor="formularios"> Autenticar Usuario </label>
      <form id='formulario' onSubmit={
        handleSubmit(async (dat, e) => {
          if (e) e.preventDefault();
          console.log(dat);
          await fetch('/login', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({ name: dat.username, pass: dat.password }), // data can be `string` or {object}!
            headers: { 'Content-Type': 'application/json' }
          }).then(async (res) => {
            await res.json().then(async (e) => {
              if (e.login) {
                await showAlert({
                  type: "ok",
                  msg: e.msg,
                });
                localStorage.setItem("name", JSON.stringify(e.name));
                localStorage.setItem("type", JSON.stringify(e.type));
                localStorage.setItem("token", JSON.stringify(e.token));
                onSignIn({ name: e.name, type: e.type, token: e.token });
                navigate("/dashboard");
                window.location.reload();
              } else {
                await showAlert({
                  type: "war",
                  msg: e.msg,
                });
              }
            });
          }).catch(async (e) => {
            await showAlert({
              type: "err",
              msg: e.msg,
            });
          });
        })}>
        <div className='form-container'>
          <div className="frm1 form-group">
            <input className='form-control' id='u_user' type="text" placeholder="Nombre del usuario" autoComplete="username"
              {...register("username", { required: true, minLength: 5, maxLength: 15 })} />
            {errors.username?.type === "required" && <p className='no-valid'>Debes escribir un nombre</p>}
            {errors.username?.type === "minLength" && <p className='no-valid'>El nombre debe tener al menos 5 caracteres</p>}
            {errors.username?.type === "maxLength" && <p className='no-valid'>El nombre es muy grande</p>}
          </div>

          <div className="frm2 form-group">
            <input className="form-control" id="u_pass" type="password" placeholder="Contraseña" autoComplete="current-password"
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

export default Home
import { FunctionComponent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import showAlert from "../utils/alerts";
import './css/home.css';


interface HomeProps {
  onSignIn: any,
  user: {
    name: string
  } | string
}

const Home: FunctionComponent<HomeProps> = ({ onSignIn, user }) => {
  let navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit } = useForm();

  useEffect(() => {
    if (typeof user === 'object' && user.name) {
      navigate('/dashboard');
    }
  }, [navigate, user]);

  return (
    <>
      <label id="auth" className="active" htmlFor="formularios"> Autenticar Usuario </label>
      <form id='formulario' onSubmit={
        handleSubmit(async (dat, e) => {
          if (e) e.preventDefault();
          await fetch(`http://localhost:5000/login?user=${dat.username}&pass=${dat.password}`).then(async (res) => {
            await res.json().then(async (e) => {
              if (e.login) {
                await showAlert({
                  type: "ok",
                  msg: e.msg,
                });
                localStorage.setItem("name", JSON.stringify(e.name));
                localStorage.setItem("username", JSON.stringify(dat.username));
                localStorage.setItem("type", JSON.stringify(e.type));
                localStorage.setItem("token", JSON.stringify(e.token));
                onSignIn({ name: e.name, username: dat.username, type: e.type, token: e.token });
                navigate("/dashboard");
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
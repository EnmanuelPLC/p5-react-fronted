import { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../modal/modal";
import showAlert from "../utils/alerts";
import './css/manageUsers.css';
import { FaUser } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { TiUserDelete } from "react-icons/ti";
import { TiUserAdd } from "react-icons/ti";
import hideModal from '../utils/hideModal';

interface ManageUsersProps {

}

const ManageUsers: FunctionComponent<ManageUsersProps> = () => {
	const [dbInfo, setDbInfo] = useState({'users': [], yearsInfo: Object(), groupsCharges: [], feuCharges: []});
	const [userEdit, setUserEdit] = useState(Object);
	const [userType, setUserType] = useState('');
	const [userTypeEdit, setUserTypeEdit] = useState('');
	const [pass, setPass] = useState('');
	const [groups, setGroups] = useState(Array<number>());
	const [pass2, setPass2] = useState('');
	const [lastUserAction, setlastUserAction] = useState(0);
	const { register, formState: { errors }, handleSubmit, reset } = useForm();
	const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, reset: reset2 } = useForm();

	const lett = ['er', 'do', 'er', 'to', 'to'];

	const types = {
		'admin': 'Administrador',
		'teacher': 'Profesor',
		'student': 'Estudiante'
	}

	const getInfoLoop = async () => {
		await fetch('http://localhost:5000/adminInfo').then((e) => {
			e.json().then((e) => {
				setDbInfo(e);
			}).catch((e) => {
				console.log(e);
				setDbInfo({ 'users': [], yearsInfo: Object(), groupsCharges: [], feuCharges: [] });
			});
		}).catch((e) => {
			console.log(e);
			setDbInfo({ 'users': [], yearsInfo: Object(), groupsCharges: [], feuCharges: [] });
		});
	};

	useEffect(() => {
		getInfoLoop();
	}, [lastUserAction]);

	const editUser = (e: any) => {
		dbInfo.users.forEach((usr: any, i: number) => {
			if (usr.username === e.target.value) {
				setUserEdit(usr);
				setUserTypeEdit(usr.systemCharge);
				changeYear({target:{value: usr.group}});
			}
		});
	}

	const delUser = (e: any) => {
		if (!window.confirm(`Confirme la eliminacion de ${e.target.value} del sistema`)) return;
		fetch('http://localhost:5000/delUser', {
			method: 'POST',
			body: JSON.stringify({ user: e.target.value }),
			headers: { 'Content-Type': 'application/json' }
		}).then((res) => {
			res.json().then(async (e) => {
				if (e.delUser) {
					await showAlert({type: 'ok', msg: e.msg});
					setlastUserAction(lastUserAction+1);
				} else await showAlert({ type: 'war', msg: e.msg });
			}).catch(async (e) => {
				console.log(e);
				await showAlert({ type: 'ok', msg: 'Error en el servidor al eliminar usuario'});
			})
		}).catch(async (e) => {
			console.log(e);
			await showAlert({ type: 'ok', msg: 'Error al conectar con el servidor' });
		});
	}

	const savePass = (e: any) => {
		setPass(e.target.value);
	};

	const savePass2 = (e: any) => {
		setPass2(e.target.value);
	};

	const changeYear = (e: any) => {
		let yearx = e.target.value, groupsz = [];
		console.log(yearx);
		for (let i = 0; i < dbInfo.yearsInfo[yearx]; i++) {
			groupsz.push(i+1);
		}
		setGroups(groupsz);
	};

	const typeEv = (e: any) => {
		setUserType(e.target.value);
	}

	const typeEvEdit = (e: any) => {
		setUserTypeEdit(e.target.value);
	}

	return (
		<>
			<div className="usersContainer">
				<ul className="list-group item-wrapper">
					<li className="list-group-item list-head">
						<span>Usuario</span>
						<span>Año</span>
						<span>Grupo</span>
						<span>Cargo</span>
						<span>Acciones</span>
					</li>
					{(dbInfo.users.length > 0 ? dbInfo.users.length > 1 ? dbInfo.users.map((usr: { username: string, systemCharge: 'admin' | 'teacher' | 'student', year: string, group: string }, i: number) => (
						(usr.username !== 'admin' ?
							<li className="list-group-item" key={i}>
								<div className="userName"><FaUser /><span>{usr.username}</span></div>
								<div className="userYear">{usr.year}</div>
								<div className="userGroup">{usr.group}</div>
								<div className="userType">{types[usr.systemCharge]}</div>
								<div className="userActions">
									<button className="btn btn-outline-info editUser" type="button" value={usr.username} onClick={editUser} data-bs-toggle="modal" data-bs-target="#editUserModal"><RiUserSettingsFill /></button>
									<button className="btn btn-outline-danger delUser" type="button" value={usr.username} onClick={delUser}><TiUserDelete /></button>
								</div>
							</li> : '')
					)) : (
						<li className="list-group-item noUsers">No hay usuarios</li>
					) : (
						<li className="list-group-item">
							<div className="load">
								<svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
									<path d="M0.001 8.025l-0 0c0 0 0 0.001 0 0.003 0.002 0.061 0.009 0.12 0.021 0.177 0.003 0.027 0.007 0.057 0.011 0.090 0.003 0.029 0.007 0.061 0.011 0.095 0.006 0.040 0.012 0.083 0.019 0.128 0.013 0.090 0.028 0.189 0.045 0.296 0.021 0.101 0.044 0.21 0.068 0.326 0.011 0.058 0.028 0.117 0.044 0.178s0.032 0.123 0.049 0.188c0.009 0.032 0.016 0.065 0.027 0.097s0.021 0.065 0.031 0.098 0.043 0.134 0.065 0.203c0.006 0.017 0.011 0.035 0.017 0.052s0.013 0.034 0.019 0.052 0.026 0.070 0.039 0.105c0.027 0.070 0.053 0.142 0.081 0.215 0.031 0.071 0.062 0.144 0.094 0.218 0.016 0.037 0.032 0.074 0.048 0.111s0.035 0.073 0.053 0.111 0.073 0.148 0.11 0.224c0.039 0.075 0.081 0.149 0.123 0.224 0.021 0.037 0.042 0.075 0.063 0.113s0.045 0.074 0.068 0.112 0.093 0.149 0.14 0.224c0.198 0.295 0.417 0.587 0.66 0.864 0.245 0.275 0.511 0.535 0.792 0.775 0.284 0.236 0.582 0.452 0.886 0.642 0.306 0.188 0.619 0.349 0.928 0.487 0.078 0.032 0.156 0.063 0.232 0.095 0.038 0.015 0.076 0.032 0.115 0.046s0.077 0.027 0.115 0.041 0.151 0.054 0.226 0.078c0.075 0.022 0.15 0.044 0.224 0.066 0.037 0.011 0.073 0.022 0.109 0.031s0.073 0.018 0.109 0.027 0.143 0.035 0.213 0.052c0.070 0.014 0.139 0.027 0.207 0.040 0.034 0.006 0.067 0.013 0.101 0.019 0.017 0.003 0.033 0.006 0.049 0.009s0.033 0.005 0.049 0.007c0.066 0.009 0.13 0.018 0.192 0.027 0.031 0.004 0.062 0.009 0.093 0.013s0.061 0.006 0.091 0.009 0.118 0.010 0.174 0.015c0.056 0.005 0.111 0.011 0.164 0.012 0.004 0 0.007 0 0.011 0 0.010 0.544 0.453 0.982 1 0.982 0.008 0 0.017-0 0.025-0.001v0c0 0 0.001-0 0.004-0 0.061-0.002 0.12-0.009 0.177-0.021 0.027-0.003 0.057-0.007 0.090-0.011 0.029-0.003 0.061-0.007 0.095-0.011 0.040-0.006 0.083-0.012 0.128-0.019 0.090-0.013 0.189-0.028 0.296-0.045 0.101-0.021 0.21-0.044 0.326-0.068 0.058-0.011 0.117-0.028 0.178-0.044s0.123-0.033 0.188-0.049c0.032-0.009 0.065-0.016 0.097-0.027s0.065-0.021 0.098-0.031 0.134-0.043 0.203-0.065c0.017-0.006 0.035-0.011 0.052-0.017s0.034-0.013 0.052-0.019 0.070-0.026 0.105-0.039c0.070-0.027 0.142-0.053 0.215-0.081 0.071-0.031 0.144-0.062 0.218-0.094 0.037-0.016 0.074-0.032 0.111-0.048s0.073-0.035 0.111-0.053 0.148-0.073 0.224-0.11c0.075-0.039 0.149-0.081 0.224-0.123 0.037-0.021 0.075-0.042 0.113-0.063s0.074-0.045 0.112-0.068 0.149-0.093 0.224-0.14c0.295-0.197 0.587-0.417 0.864-0.66 0.275-0.245 0.535-0.511 0.775-0.792 0.236-0.284 0.452-0.582 0.642-0.886 0.188-0.306 0.349-0.619 0.487-0.928 0.032-0.078 0.063-0.156 0.095-0.232 0.015-0.038 0.032-0.076 0.046-0.115s0.027-0.077 0.040-0.115 0.054-0.151 0.078-0.226c0.022-0.075 0.044-0.15 0.066-0.224 0.011-0.037 0.022-0.073 0.031-0.109s0.018-0.073 0.027-0.109 0.035-0.143 0.052-0.213c0.014-0.070 0.027-0.139 0.040-0.207 0.006-0.034 0.013-0.067 0.019-0.101 0.003-0.017 0.006-0.033 0.009-0.049s0.005-0.033 0.007-0.050c0.009-0.065 0.018-0.13 0.027-0.192 0.004-0.031 0.009-0.062 0.013-0.093s0.006-0.061 0.009-0.091 0.010-0.118 0.015-0.174c0.005-0.056 0.011-0.111 0.012-0.165 0-0.008 0.001-0.016 0.001-0.025 0.55-0.002 0.996-0.449 0.996-1 0-0.008-0-0.017-0.001-0.025h0c0 0-0-0.001-0-0.003-0.002-0.061-0.009-0.12-0.021-0.177-0.003-0.027-0.007-0.057-0.011-0.090-0.003-0.029-0.007-0.061-0.011-0.095-0.006-0.040-0.012-0.083-0.019-0.128-0.013-0.090-0.028-0.189-0.045-0.296-0.021-0.101-0.044-0.21-0.068-0.326-0.011-0.058-0.028-0.117-0.044-0.178s-0.032-0.123-0.049-0.188c-0.009-0.032-0.016-0.065-0.027-0.097s-0.021-0.065-0.031-0.098-0.043-0.134-0.065-0.203c-0.005-0.017-0.011-0.035-0.017-0.052s-0.013-0.034-0.019-0.052-0.026-0.070-0.039-0.105c-0.027-0.070-0.053-0.142-0.081-0.215-0.031-0.071-0.062-0.144-0.094-0.218-0.016-0.037-0.032-0.074-0.048-0.111s-0.035-0.073-0.053-0.111-0.073-0.148-0.11-0.224c-0.039-0.075-0.081-0.149-0.123-0.224-0.021-0.037-0.042-0.075-0.063-0.113s-0.045-0.074-0.068-0.112-0.093-0.149-0.14-0.224c-0.197-0.295-0.417-0.587-0.66-0.864-0.245-0.275-0.511-0.535-0.792-0.775-0.284-0.236-0.582-0.452-0.886-0.642-0.306-0.188-0.619-0.349-0.928-0.487-0.078-0.032-0.156-0.063-0.232-0.095-0.038-0.015-0.076-0.032-0.115-0.046s-0.077-0.027-0.115-0.040-0.151-0.054-0.226-0.078c-0.075-0.022-0.15-0.044-0.224-0.066-0.037-0.010-0.073-0.022-0.109-0.031s-0.073-0.018-0.109-0.027-0.143-0.035-0.213-0.052c-0.070-0.014-0.139-0.027-0.207-0.040-0.034-0.006-0.067-0.013-0.101-0.019-0.017-0.003-0.033-0.006-0.049-0.009s-0.033-0.005-0.049-0.007c-0.066-0.009-0.13-0.018-0.192-0.027-0.031-0.004-0.062-0.009-0.093-0.013s-0.061-0.006-0.091-0.009-0.118-0.010-0.174-0.015c-0.056-0.005-0.111-0.011-0.164-0.012-0.013-0-0.026-0.001-0.039-0.001-0.010-0.543-0.454-0.981-0.999-0.981-0.008 0-0.017 0-0.025 0.001l-0-0c0 0-0.001 0-0.003 0-0.061 0.002-0.12 0.009-0.177 0.021-0.027 0.003-0.057 0.007-0.090 0.011-0.029 0.003-0.061 0.007-0.095 0.011-0.040 0.006-0.083 0.012-0.128 0.019-0.090 0.013-0.189 0.028-0.296 0.045-0.101 0.021-0.21 0.044-0.326 0.068-0.058 0.011-0.117 0.028-0.178 0.044s-0.123 0.033-0.188 0.049c-0.032 0.009-0.065 0.016-0.097 0.027s-0.065 0.021-0.098 0.031-0.134 0.043-0.203 0.065c-0.017 0.006-0.035 0.011-0.052 0.017s-0.034 0.013-0.052 0.019-0.070 0.026-0.105 0.039c-0.070 0.027-0.142 0.053-0.215 0.081-0.071 0.031-0.144 0.062-0.218 0.094-0.037 0.016-0.074 0.032-0.111 0.048s-0.073 0.035-0.111 0.053-0.148 0.073-0.224 0.11c-0.075 0.039-0.149 0.081-0.224 0.123-0.037 0.021-0.075 0.042-0.113 0.063s-0.074 0.045-0.112 0.068-0.149 0.093-0.224 0.14c-0.295 0.198-0.587 0.417-0.864 0.66-0.275 0.245-0.535 0.511-0.775 0.792-0.236 0.284-0.452 0.582-0.642 0.886-0.188 0.306-0.349 0.619-0.487 0.928-0.032 0.078-0.063 0.156-0.095 0.232-0.015 0.038-0.032 0.076-0.046 0.115s-0.027 0.077-0.040 0.115-0.054 0.151-0.078 0.226c-0.022 0.075-0.044 0.15-0.066 0.224-0.011 0.037-0.022 0.073-0.032 0.109s-0.018 0.073-0.027 0.109-0.035 0.143-0.052 0.213c-0.014 0.070-0.027 0.139-0.040 0.207-0.006 0.034-0.013 0.067-0.019 0.101-0.003 0.017-0.006 0.033-0.009 0.049s-0.005 0.033-0.007 0.050c-0.009 0.065-0.018 0.13-0.027 0.192-0.004 0.031-0.009 0.062-0.013 0.093s-0.006 0.061-0.009 0.091-0.010 0.118-0.015 0.174c-0.005 0.056-0.011 0.111-0.012 0.165-0 0.009-0.001 0.017-0.001 0.025-0.537 0.017-0.967 0.458-0.967 0.999 0 0.008 0 0.017 0.001 0.025zM1.149 7.011c0.001-0.003 0.001-0.006 0.002-0.009 0.010-0.051 0.026-0.102 0.040-0.155s0.030-0.107 0.045-0.163c0.008-0.028 0.015-0.056 0.024-0.084s0.019-0.057 0.028-0.086 0.038-0.116 0.058-0.176c0.005-0.015 0.010-0.030 0.015-0.045s0.012-0.030 0.017-0.045 0.023-0.060 0.035-0.091 0.048-0.123 0.073-0.186c0.028-0.062 0.056-0.125 0.084-0.189 0.014-0.032 0.028-0.064 0.043-0.096s0.032-0.064 0.048-0.096 0.065-0.128 0.098-0.194c0.034-0.065 0.073-0.128 0.109-0.194 0.018-0.032 0.037-0.065 0.056-0.098s0.040-0.064 0.061-0.096c0.041-0.064 0.082-0.129 0.124-0.194 0.176-0.255 0.369-0.506 0.583-0.744 0.217-0.236 0.451-0.459 0.697-0.665 0.25-0.202 0.511-0.385 0.776-0.547 0.268-0.159 0.541-0.294 0.808-0.41 0.068-0.027 0.135-0.053 0.202-0.079 0.033-0.013 0.066-0.027 0.099-0.038s0.067-0.022 0.1-0.033 0.131-0.045 0.196-0.065c0.065-0.018 0.13-0.036 0.194-0.054 0.032-0.009 0.063-0.019 0.095-0.026s0.063-0.014 0.094-0.021 0.123-0.028 0.184-0.042c0.061-0.011 0.12-0.021 0.179-0.032 0.029-0.005 0.058-0.010 0.087-0.015 0.014-0.003 0.029-0.005 0.043-0.008s0.029-0.003 0.043-0.005c0.056-0.007 0.112-0.014 0.166-0.020 0.027-0.003 0.053-0.007 0.080-0.010s0.053-0.004 0.078-0.006 0.102-0.007 0.15-0.011c0.049-0.003 0.095-0.008 0.142-0.008 0.091-0.002 0.177-0.004 0.256-0.006 0.073 0.003 0.14 0.005 0.2 0.007 0.030 0.001 0.058 0.002 0.085 0.002 0.033 0.002 0.064 0.004 0.093 0.006 0.033 0.002 0.063 0.004 0.091 0.006 0.051 0.008 0.103 0.012 0.156 0.012 0.007 0 0.015-0 0.022-0.001 0.002 0 0.004 0 0.004 0v-0c0.487-0.012 0.887-0.372 0.962-0.84 0.008 0.002 0.017 0.004 0.025 0.006 0.051 0.010 0.102 0.026 0.155 0.040s0.107 0.030 0.163 0.045c0.028 0.008 0.056 0.015 0.084 0.024s0.057 0.019 0.086 0.028 0.116 0.038 0.176 0.058c0.015 0.005 0.030 0.010 0.045 0.015s0.030 0.012 0.045 0.017 0.060 0.023 0.091 0.035 0.123 0.048 0.186 0.073c0.062 0.028 0.125 0.056 0.189 0.084 0.032 0.014 0.064 0.028 0.096 0.043s0.064 0.032 0.096 0.048 0.128 0.065 0.194 0.098c0.065 0.034 0.129 0.073 0.194 0.109 0.032 0.018 0.065 0.037 0.098 0.056s0.064 0.040 0.096 0.061 0.129 0.082 0.194 0.124c0.255 0.176 0.506 0.369 0.744 0.583 0.236 0.217 0.459 0.451 0.665 0.697 0.202 0.25 0.385 0.511 0.547 0.776 0.159 0.268 0.294 0.541 0.41 0.808 0.027 0.068 0.053 0.135 0.079 0.202 0.013 0.033 0.027 0.066 0.038 0.099s0.022 0.067 0.033 0.1 0.045 0.131 0.065 0.196c0.018 0.065 0.036 0.13 0.054 0.194 0.009 0.032 0.019 0.063 0.026 0.095s0.014 0.063 0.021 0.094 0.028 0.123 0.042 0.184c0.011 0.061 0.021 0.12 0.032 0.179 0.005 0.029 0.010 0.058 0.015 0.087 0.003 0.014 0.005 0.029 0.008 0.043s0.003 0.029 0.005 0.043c0.007 0.056 0.014 0.112 0.020 0.166 0.003 0.027 0.007 0.053 0.010 0.080s0.004 0.053 0.006 0.078 0.007 0.102 0.011 0.15c0.003 0.049 0.008 0.095 0.008 0.142 0.002 0.091 0.004 0.177 0.006 0.256-0.003 0.073-0.005 0.14-0.007 0.2-0.001 0.030-0.002 0.058-0.002 0.085-0.002 0.033-0.004 0.064-0.006 0.093-0.002 0.033-0.004 0.063-0.006 0.091-0.008 0.051-0.012 0.103-0.012 0.156 0 0.007 0 0.015 0.001 0.022-0 0.002-0 0.004-0 0.004h0c0.012 0.481 0.363 0.877 0.823 0.959-0.001 0.005-0.002 0.009-0.003 0.014-0.010 0.051-0.025 0.102-0.040 0.155s-0.030 0.107-0.045 0.163c-0.008 0.028-0.015 0.056-0.024 0.084s-0.019 0.057-0.028 0.086-0.039 0.116-0.058 0.176c-0.005 0.015-0.010 0.030-0.015 0.045s-0.012 0.030-0.017 0.045-0.023 0.060-0.035 0.091-0.048 0.123-0.073 0.186c-0.028 0.062-0.056 0.125-0.084 0.189-0.014 0.032-0.028 0.064-0.043 0.096s-0.032 0.064-0.048 0.096-0.065 0.128-0.098 0.194c-0.034 0.065-0.073 0.129-0.109 0.194-0.018 0.032-0.037 0.065-0.056 0.098s-0.040 0.064-0.061 0.096-0.082 0.129-0.124 0.194c-0.176 0.255-0.369 0.506-0.583 0.744-0.217 0.236-0.451 0.459-0.697 0.665-0.25 0.202-0.511 0.385-0.776 0.547-0.268 0.159-0.541 0.294-0.808 0.41-0.068 0.027-0.135 0.053-0.202 0.079-0.033 0.013-0.066 0.027-0.099 0.038s-0.067 0.022-0.1 0.033-0.131 0.045-0.196 0.065c-0.065 0.018-0.13 0.036-0.194 0.054-0.032 0.009-0.063 0.019-0.095 0.026s-0.063 0.014-0.094 0.021-0.123 0.028-0.184 0.042c-0.061 0.011-0.12 0.021-0.179 0.032-0.029 0.005-0.058 0.010-0.087 0.015-0.014 0.003-0.028 0.005-0.043 0.008s-0.029 0.003-0.043 0.005c-0.056 0.007-0.112 0.014-0.166 0.020-0.027 0.003-0.053 0.007-0.080 0.010s-0.053 0.004-0.078 0.006-0.102 0.007-0.15 0.011c-0.049 0.003-0.095 0.008-0.142 0.008-0.091 0.002-0.177 0.004-0.256 0.006-0.073-0.003-0.14-0.005-0.2-0.007-0.030-0.001-0.058-0.002-0.085-0.002-0.033-0.002-0.064-0.004-0.093-0.006-0.033-0.002-0.063-0.004-0.091-0.006-0.051-0.008-0.103-0.012-0.156-0.012-0.007 0-0.015 0-0.022 0.001-0.002-0-0.003-0-0.003-0v0c-0.484 0.012-0.883 0.369-0.961 0.834-0.050-0.010-0.101-0.025-0.153-0.039s-0.107-0.030-0.163-0.045c-0.028-0.008-0.056-0.015-0.084-0.024s-0.057-0.019-0.086-0.028-0.116-0.039-0.176-0.058c-0.015-0.005-0.030-0.010-0.045-0.015s-0.030-0.012-0.045-0.017-0.060-0.023-0.091-0.035-0.123-0.048-0.186-0.073c-0.062-0.028-0.125-0.056-0.189-0.084-0.032-0.014-0.064-0.028-0.096-0.043s-0.064-0.032-0.096-0.048-0.128-0.065-0.194-0.098c-0.065-0.034-0.129-0.073-0.194-0.109-0.032-0.018-0.065-0.037-0.098-0.056s-0.064-0.040-0.096-0.061c-0.064-0.041-0.129-0.082-0.194-0.124-0.255-0.175-0.506-0.369-0.744-0.583-0.236-0.217-0.459-0.451-0.665-0.697-0.202-0.25-0.385-0.511-0.547-0.776-0.159-0.268-0.294-0.541-0.41-0.808-0.027-0.068-0.053-0.135-0.079-0.202-0.013-0.033-0.027-0.066-0.038-0.099s-0.022-0.067-0.033-0.1-0.045-0.131-0.065-0.196c-0.018-0.065-0.036-0.13-0.054-0.194-0.009-0.032-0.019-0.063-0.026-0.095s-0.014-0.063-0.021-0.094-0.028-0.123-0.042-0.184c-0.011-0.061-0.021-0.12-0.032-0.179-0.005-0.029-0.010-0.058-0.015-0.087-0.003-0.014-0.005-0.028-0.008-0.043s-0.003-0.029-0.005-0.043c-0.007-0.056-0.014-0.112-0.020-0.166-0.003-0.027-0.007-0.053-0.010-0.080s-0.004-0.053-0.006-0.078-0.007-0.101-0.011-0.15c-0.003-0.049-0.008-0.095-0.008-0.142-0.002-0.091-0.004-0.177-0.006-0.256 0.003-0.073 0.005-0.14 0.007-0.2 0.001-0.030 0.002-0.058 0.002-0.085 0.002-0.033 0.004-0.064 0.006-0.093 0.002-0.033 0.004-0.063 0.006-0.091 0.008-0.051 0.012-0.103 0.012-0.156 0-0.007-0-0.015-0.001-0.022 0-0.002 0-0.003 0-0.003h-0c-0.012-0.49-0.377-0.893-0.851-0.964z"></path>
									<animateTransform attributeName="transform" attributeType="XML" dur="2s" from="0 0 0" repeatCount="indefinite" to="360 0 0" type="rotate"></animateTransform>
								</svg>
								<span>Cargando datos...</span>
							</div>
						</li>
					))}
				</ul>
				<button type="button" className="btn btn-primary createUserButton" data-bs-toggle="modal" data-bs-target="#createUserModal"><TiUserAdd /> Crear usuario</button>
			</div>

			<Modal title="Crear Usuario" id="createUserModal">
					<form key={1} className="modal-form" onSubmit={
						handleSubmit((dat, e) => {
							fetch('http://localhost:5000/createUser', {
								method: 'POST',
								body: JSON.stringify(dat), // data can be `string` or {object}!
								headers: { 'Content-Type': 'application/json' }
							}).then((res) => {
								res.json().then(async (e) => {
									if (e.createUser) {
										await hideModal('createUserModal');
										setlastUserAction(lastUserAction+1);
										await showAlert({type: 'ok', msg: e.msg});
										reset(); setUserType('');
									} else await showAlert({ type: 'war', msg: e.msg });
								}).catch(async (e) => {
									console.log(e);
									await showAlert({ type: 'err', msg: 'Error en el servidor al crear usuario'});
								})
							}).catch(async (e) => {
								console.log(e);
								await showAlert({ type: 'err', msg: 'Error en la conexion con el servidor' });
							});
						})}>
						<div className='form-container'>
							<div className="form-group">
								<input className='form-control' id='u_user' type="text" placeholder="Usuario" autoComplete="username"
								{...register("username", { required: true, minLength: 5, maxLength: 15, pattern: /^[a-z]+$/})} />
								{errors.username?.type === "required" && <p className='no-valid'>Debes escribir un usuario</p>}
								{errors.username?.type === "pattern" && <p className='no-valid'>El usuario debe ser en minusculas y solo letras</p>}
								{errors.username?.type === "minLength" && <p className='no-valid'>El nombre debe tener al menos 5 caracteres</p>}
								{errors.username?.type === "maxLength" && <p className='no-valid'>El nombre es muy grande</p>}
							</div>

							<div className="form-group">
								<input className='form-control' id='u_name' type="text" placeholder="Nombre completo" autoComplete="username"
								{...register("userFullName", { required: true, minLength: 15, maxLength: 30, pattern: /^[a-z A-Z]+$/ })} />
								{errors.userFullName?.type === "required" && <p className='no-valid'>Debes completar el campo</p>}
								{errors.userFullName?.type === "pattern" && <p className='no-valid'>El nombre solo debe contener letras</p>}
								{errors.userFullName?.type === "minLength" && <p className='no-valid'>Escriba el nombre y los 2 apellidos</p>}
								{errors.userFullName?.type === "maxLength" && <p className='no-valid'>El nombre completo es muy grande</p>}
							</div>

							<div className="form-group">
								<input className="form-control" id="u_pass" type="password" placeholder="Contraseña" autoComplete="current-password" 
								{...register("password", { required: true, pattern: /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, minLength: 8 })} />
								{errors.password?.type === "required" && <p className='no-valid'>Debes escribir una contraseña</p>}
								{errors.password?.type === "minLength" && <p className='no-valid'>La contraseña debe tener al menos 8 caracteres</p>}
								{errors.password?.type === "pattern" && <p className='no-valid'>Su contraseña debe contener mayuscula y minusculas, 1 digito y 1 caracter especial</p>}
							</div>

							<div className="form-group">
								<select id="select" className="form-select user-type-select"
									{...register("userType", { required: true, onChange: typeEv })}>
									<option value="">Selecciona un tipo de usuario</option>
									<option value="student">Estudiante</option>
									<option value="teacher">Profesor</option>
								</select>
								{errors.userType?.type === "required" && <p className="no-valid">Debe seleccionar un tipo de usuario</p>}
							</div>

							{(userType !== '') ? (userType === 'student' ? (
								<div style={{ display: 'flex', flexDirection: 'column', height: '30%', justifyContent: 'space-between'}}>
									
									<div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
										<div className="form-group">
											<select id="student-year-select" className="form-select user-type-select" 
												{...register("studentYear", { required: true, onChange: changeYear })}>
												<option value="">Elija un año</option>
												{Object.keys(dbInfo.yearsInfo).map((year, i) => (
													<option key={i} value={year}>{year + lett[i]} año</option>
												))}
											</select>
											{errors.studentYear?.type === "required" && <p className="no-valid">Debe seleccionar un año</p>}
										</div>
										<div className="form-group">
											<select id="student-charge-select" className="form-select user-type-select"
												{...register("studentCharge", { required: true })}>
												<option value="">Cargo en el grupo</option>
												<option value="none">Ninguno</option>
												{dbInfo.groupsCharges.length > 0 ? dbInfo.groupsCharges.map((charge: any, i) => (
													<option key={i} value={charge}>{charge}</option>
												)) : ''}
											</select>
											{errors.studentCharge?.type === "required" && <p className="no-valid">Debe seleccionar un cargo</p>}
										</div>
									</div>

									<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
										<div className="form-group">
											<select id="student-group-select" className="form-select user-type-select"
												{...register("studentGroup", { required: true })}>
												<option value="">Elija un grupo</option>
												{groups.length > 0 ? groups.map((group: any, i) => (
													<option key={i} value={group}>Grupo {group}</option>
												)) : ''}
											</select>
											{errors.studentGroup?.type === "required" && <p className="no-valid">Debe seleccionar un grupo</p>}
										</div>
										<div className="form-group">
											<select id="student-feuCharge-select" className="form-select user-type-select"
												{...register("studentFeuCharge", { required: true })}>
												<option value="">Cargo en la Feu</option>
												<option value="none">Ninguno</option>
												{dbInfo.feuCharges.length > 0 ? dbInfo.feuCharges.map((charge: any, i) => (
													<option key={i} value={charge}>{charge}</option>
												)) : ''}
											</select>
											{errors.studentFeuCharge?.type === "required" && <p className="no-valid">Debe seleccionar un cargo</p>}
										</div>
									</div>

								</div>
							) : userType === 'teacher' ? (
								<div style={{ display: 'flex', flexDirection: 'column', height: '80px'}}>
									<div style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
										<div className="form-group">
											<select id="teacher-year-select" className="form-select user-type-select"
												{...register("teacherYear", { required: true, onChange: changeYear })}>
												<option value="">Elija un año</option>
												{Object.keys(dbInfo.yearsInfo).map((year, i) => (
													<option key={i} value={year}>{year + lett[i]} año</option>
												))}
											</select>
											{errors.teacherYear?.type === "required" && <p className="no-valid">Debe seleccionar un año</p>}
										</div>

										<div className="form-group">
											<select id="teacher-group-select" className="form-select user-type-select"
												{...register("teacherGroup", { required: true })}>
												<option value="">Elija un grupo</option>
												{groups.length > 0 ? groups.map((group: any, i) => (
													<option key={i} value={group}>Grupo {group}</option>
												)) : ''}
											</select>
											{errors.teacherGroup?.type === "required" && <p className="no-valid">Debe seleccionar un grupo</p>}
										</div>
									</div>

									<div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center' }}>
										<div className="form-check form-switch">
											<input id="teacherPrincipalYaer" className="form-check-input" type="checkbox"
											{...register("teacherPrincipalYear", {})} />
											<label className="form-check-label" htmlFor="teacherPrincipalYaer">¿Profesor principal del año?</label>
										</div>
										<div className="form-check form-switch">
											<input id="teacherGroupGuide" className="form-check-input" type="checkbox"
											{...register("teacherGroupGuide", {})} />
											<label className="form-check-label" htmlFor="teacherGroupGuide">¿Guia del grupo?</label>
										</div>
									</div>
								</div>
							) : '') : ('')}

						</div>
						<div className="buttons" style={{display: 'flex', justifyContent: 'space-around'}}>
							<button className="btn btn-secondary w-25" id="btn-close" type="button" data-bs-dismiss="modal" onClick={() => {
								reset(); setUserType('');
							}}>Cancelar</button>
						<button className="btn btn-success w-25" id="btn-login" type="submit" name="create">Crear</button>
						</div>
					</form>
			</Modal>

			<Modal title={"Editando a "+ userEdit.fullname?.split(' ')[0]} id="editUserModal">
				<form key={2} className="modal-form" id="edit-form" onSubmit={
					handleSubmit2((dat, e) => {
						fetch('http://localhost:5000/editUser', {
							method: 'PUT',
							body: JSON.stringify({username: userEdit.username, editedUser: dat}),
							headers: { 'Content-Type': 'application/json' }
						}).then((res) => {
							res.json().then(async (dat) => {
								if (dat.editUser) {
									await hideModal('editUserModal');
									setlastUserAction(lastUserAction + 1);
									await showAlert({ type: 'ok', msg: dat.msg});
									reset2();
								} else showAlert({ type: 'war', msg: dat.msg});
							}).catch(async (e) => {
								console.log(e);
								await showAlert({type:'err', msg: 'Error al editar usuario'});
							});
						}).catch(async (e) => {
							console.log(e);
							await showAlert({type: 'err', msg: 'Error en la conexion.'});
						});
					})}>
					<div className='form-container'>
						<div className="form-group">
							<input className='form-control' id='u_user' type="text" placeholder={userEdit.username} autoComplete="username"
								{...register2("usernameEdit", { minLength: 5, maxLength: 15 })} />
							{errors2.usernameEdit?.type === "minLength" && <p className='no-valid'>El usuario debe tener al menos 5 caracteres</p>}
							{errors2.usernameEdit?.type === "maxLength" && <p className='no-valid'>El usuario es muy grande</p>}
						</div>

						<div className="form-group">
							<input className="form-control" id="pwdEdit" type="password" placeholder="Nueva contraseña"
								{...register2("pwdEdit", { pattern: /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/, minLength: 8, onChange: savePass })} />
							{errors2.pwdEdit?.type === "minLength" && <p className='no-valid'>La contraseña debe tener al menos 8 caracteres</p>}
							{errors2.pwdEdit?.type === "pattern" && <p className='no-valid'>Su contraseña debe contener mayuscula y minusculas, 1 digito y 1 caracter especial</p>}
						</div>

						<div className="form-group">
							<input className="form-control" id="pwdEditCheck" type="password" placeholder="Confirmar nueva contraseña"
							{...register2("pwdEditCheck", { onChange: savePass2 })} />
							{pass2.length > 0 ? (pass !== pass2 && <p className="no-valid">Las contraseñas deben coincidir</p>) : ''}
						</div>
						
						{userEdit.systemCharge === 'student' ? (
							<div className="form-group">
								<select id="selectEdit" className="form-select user-type-select"
									{...register2("userTypeEdit", { required: true, onChange: typeEvEdit })}>
									<option value="student">No cambiar</option>
									<option value="teacher">Profesor</option>
								</select>
								{errors2.userTypeEdit?.type === "required" && <p className="no-valid">Debe seleccionar un tipo de usuario</p>}
							</div>
						): ''}

						{(userTypeEdit !== '') ? (userTypeEdit === 'student' ? (
							<div style={{ display: 'flex', flexDirection: 'column', height: '30%', justifyContent: 'space-between' }}>
								<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
									<div className="form-group">
										<select id="student-year-select" className="form-select user-type-select"
											{...register2("studentEditYear", { required: true, onChange: changeYear })}>
											<option value={Object.keys(dbInfo.yearsInfo).filter((year) => Number(year) === userEdit.year)}>{Object.keys(dbInfo.yearsInfo).filter((year) => Number(year) === userEdit.year) + lett[Object.keys(dbInfo.yearsInfo).indexOf(Object.keys(dbInfo.yearsInfo).filter((year) => Number(year) === userEdit.year)[0])]} año</option>
											
											{Object.keys(dbInfo.yearsInfo).map((year, i) => (
												Number(year) !== userEdit.year ? <option key={i+5} value={year}>{year + lett[i]} año</option> : ('')
											))}
										</select>
										{errors2.studentEditYear?.type === "required" && <p className="no-valid">Debe seleccionar un año</p>}
									</div>
									<div className="form-group">
										<select id="student-charge-select" className="form-select user-type-select"
											{...register2("studentEditCharge", { required: true })}>
											<option value={userEdit.groupCharge}>{userEdit.groupCharge}</option>
											<option value="none">Ninguno</option>
											{dbInfo.groupsCharges.length > 0 ? dbInfo.groupsCharges.map((charge: any, i) => (
												charge !== userEdit.groupCharge ? <option key={i} value={charge}>{charge}</option> : ''
											)) : ''}
										</select>
										{errors2.studentEditCharge?.type === "required" && <p className="no-valid">Debe seleccionar un cargo</p>}
									</div>
								</div>

								<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
									<div className="form-group">
										<select id="student-group-select" className="form-select user-type-select"
											{...register2("studentEditGroup", { required: true })}>
											<option value={userEdit.group}>Grupo {userEdit.group}</option>
											{groups.length > 0 ? groups.map((group: any, i) => (
												Number(group) !== userEdit.group ? <option key={i} value={group}>Grupo {group}</option> : ''
											)) : ''}
										</select>
										{errors2.studentEditGroup?.type === "required" && <p className="no-valid">Debe seleccionar un grupo</p>}
									</div>
									<div className="form-group">
										<select id="student-feuCharge-select" className="form-select user-type-select"
											{...register2("studentEditFeuCharge", { required: true })}>
											<option value={userEdit.feuCharge}>{userEdit.feuCharge}</option>
											<option value="none">Ninguno</option>
											{dbInfo.feuCharges.length > 0 ? dbInfo.feuCharges.map((charge: any, i) => (
												charge !== userEdit.feuCharge ? <option key={i} value={charge}>{charge}</option> : ''
											)) : ''}
										</select>
										{errors2.studentEditFeuCharge?.type === "required" && <p className="no-valid">Debe seleccionar un cargo</p>}
									</div>
								</div>

							</div>
						) : userTypeEdit === 'teacher' ? (
							<div style={{ display: 'flex', flexDirection: 'column', height: '80px' }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
									<div className="form-group">
										<select id="teacher-year-select" className="form-select user-type-select"
											{...register2("teacherEditYear", { required: true, onChange: changeYear })}>
											<option value="">Elija un año</option>
											{Object.keys(dbInfo.yearsInfo).map((year, i) => (
												<option key={i} value={year}>{year + lett[i]} año</option>
											))}
										</select>
											{errors2.teacherEditYear?.type === "required" && <p className="no-valid">Debe seleccionar un año</p>}
									</div>

									<div className="form-group">
										<select id="teacher-group-select" className="form-select user-type-select"
											{...register2("teacherEditGroup", { required: true })}>
											<option value="">Elija un grupo</option>
											{groups.length > 0 ? groups.map((group: any, i) => (
												<option key={i} value={group}>Grupo {group}</option>
											)) : ''}
										</select>
											{errors2.teacherEditGroup?.type === "required" && <p className="no-valid">Debe seleccionar un grupo</p>}
									</div>
								</div>

								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
									<div className="form-check form-switch">
										<input id="teacherEditPrincipalYaer" className="form-check-input" type="checkbox"
											{...register2("teacherEditPrincipalYear", {})} />
										<label className="form-check-label" htmlFor="teacherPrincipalYaer">¿Profesor principal del año?</label>
									</div>
									<div className="form-check form-switch">
										<input id="teacherEditGroupGuide" className="form-check-input" type="checkbox"
											{...register2("teacherEditGroupGuide", {})} />
										<label className="form-check-label" htmlFor="teacherGroupGuide">¿Guia del grupo?</label>
									</div>
								</div>
							</div>
						) : '') : ('')}
					</div>
					<div className="buttons" style={{ display: 'flex', justifyContent: 'space-around' }}>
						<button className="btn btn-secondary w-25" id="btn-close" type="button" data-bs-dismiss="modal" onClick={() => {
							reset2(); setUserTypeEdit('');
						}}>Cancelar</button>
						<button className="btn btn-success w-25" id="btn-loginEdit" type="submit" name="edit">Editar</button>
					</div>
				</form>
			</Modal>
		</>
	);
}

export default ManageUsers;

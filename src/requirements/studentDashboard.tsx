import { FunctionComponent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../modal/modal";
import showAlert from "../utils/alerts";
import './css/studentDashboard.css';
import hideModal from '../utils/hideModal';
import { FaRegEdit } from "react-icons/fa";
import { TiDocumentDelete } from "react-icons/ti";

interface StudentDashboardProps {
  student: string;
}

const StudentDashboard: FunctionComponent<StudentDashboardProps> = ({student}) => {
  const [user, setUser] = useState(Object);
  const [lastUserAction, setlastUserAction] = useState(0);
  const [integrality, setIntegrality] = useState({
    group: Number(), information: String(), date: String(),
    status: String(), username: String(), year: Number(), modifyDate: String()
  });
  const [meetingsActs, setMeetingsActs] = useState({
    group: Number(), description: String(), date: String(),
    username: String(), year: Number(), modifyDate: String()
  });
  const [activityPlan, setActivityPlan] = useState({
    name: String(), group: Number(), description: String(), date: String(),
    username: String(), year: Number(), modifyDate: String()
  });
  
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, reset: reset2 } = useForm();
  const { register: register3, formState: { errors: errors3 }, handleSubmit: handleSubmit3, reset: reset3 } = useForm();
  const { register: register4, formState: { errors: errors4 }, handleSubmit: handleSubmit4, reset: reset4 } = useForm();
  const { register: register5, formState: { errors: errors5 }, handleSubmit: handleSubmit5, reset: reset5 } = useForm();
  const { register: register6, formState: { errors: errors6 }, handleSubmit: handleSubmit6, reset: reset6 } = useForm();

  useEffect(() => {
    fetch(`http://localhost:5000/getUser?user=${student}`).then(e => e.json().then((e) => {
      setUser(e[0]);
      if (e[0].isGroupLeader || e[0].isViceGroupLeader) {
        fetch(`http://localhost:5000/getMeetingAct?user=${student}`).then(e => e.json().then((e) => {
          if (e.length > 0) setMeetingsActs(e[0]);
          else setMeetingsActs({ group: -1, description: '', date: '', username: '', year: -1, modifyDate: '' });
        }));
        fetch(`http://localhost:5000/getActivityPlan?user=${student}`).then(e => e.json().then((e) => {
          if (e.length > 0) setActivityPlan(e[0]);
          else setActivityPlan({ name: '', group: -1, description: '', date: '', username: '', year: -1, modifyDate: '' });
        }));
      }
    }));
    fetch(`http://localhost:5000/getIntegrality?user=${student}`).then(e => e.json().then((e) => {
      if (e.length > 0) setIntegrality(e[0]);
      else setIntegrality({group: -1, information: '', date: '', status: '', username: '', year: -1, modifyDate: ''});
    }));
  }, [lastUserAction, student]);

  const editIntegralityAct = (e: any) => {
    console.log(e.target.value);
  }
  const editMeetingAct = (e: any) => {
    console.log(e.target.value);
  }
  const editActivityPlan = (e: any) => {
    console.log(e.target.value);
  }
  const deleteMeetingActModal = (e: any) => {
    if (!window.confirm(`Confirme la eliminacion del acta de reunion`)) return;
    fetch('http://localhost:5000/delMeetingAct', {
      method: 'POST',
      body: JSON.stringify({ user: e.target.value }),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      res.json().then(async (e) => {
        if (e.deleted) {
          await showAlert({ type: 'ok', msg: e.msg });
        } else await showAlert({ type: 'war', msg: e.msg });
      }).catch(async (e) => {
        console.log(e);
        await showAlert({ type: 'ok', msg: 'Error en el servidor al eliminar acta de reunion' });
      })
    }).catch(async (e) => {
      console.log(e);
      await showAlert({ type: 'ok', msg: 'Error al conectar con el servidor' });
    });
  }

  return (
    <>
      <div className="studentActionsContainer">
        <div className="actWrapper">
          {user.username ?
            integrality.group > 0 ? (
              <div className="integralityAct">
                <div className="actHeader">
                  <h2>Acta de Autoevaluacion de Integralidad</h2>
                  <button className="btn btn-outline-success" type="button" value={integrality.username} onClick={editIntegralityAct} data-bs-toggle="modal" data-bs-target="#editIntegralityActModal"><FaRegEdit /></button>
                </div>

                <div className="actContent">
                  <div className="userFullname"><strong>Nombre:</strong> {user.fullname}</div>
                  <div className="date"><strong>Fecha de creacion:</strong> {integrality.date}</div>
                  <div className="date"><strong>Fecha de Modificacion:</strong> {integrality.modifyDate}</div>
                  <div className="status"><strong>Estado:</strong> {integrality.status}</div>
                  <div className="info"><strong>Descripcion:</strong> {integrality.information}</div>
                </div>
              </div>
            ) : (
              <div className="emptyAct">
                <h3>No has creado tu acta de Integralidad</h3>
                <button type="button" className="btn btn-primary createUserButton" data-bs-toggle="modal" data-bs-target="#createIntegralityModal">Crear Acta</button>
              </div>
            )
          : (
              <div className="loading">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.001 8.025l-0 0c0 0 0 0.001 0 0.003 0.002 0.061 0.009 0.12 0.021 0.177 0.003 0.027 0.007 0.057 0.011 0.090 0.003 0.029 0.007 0.061 0.011 0.095 0.006 0.040 0.012 0.083 0.019 0.128 0.013 0.090 0.028 0.189 0.045 0.296 0.021 0.101 0.044 0.21 0.068 0.326 0.011 0.058 0.028 0.117 0.044 0.178s0.032 0.123 0.049 0.188c0.009 0.032 0.016 0.065 0.027 0.097s0.021 0.065 0.031 0.098 0.043 0.134 0.065 0.203c0.006 0.017 0.011 0.035 0.017 0.052s0.013 0.034 0.019 0.052 0.026 0.070 0.039 0.105c0.027 0.070 0.053 0.142 0.081 0.215 0.031 0.071 0.062 0.144 0.094 0.218 0.016 0.037 0.032 0.074 0.048 0.111s0.035 0.073 0.053 0.111 0.073 0.148 0.11 0.224c0.039 0.075 0.081 0.149 0.123 0.224 0.021 0.037 0.042 0.075 0.063 0.113s0.045 0.074 0.068 0.112 0.093 0.149 0.14 0.224c0.198 0.295 0.417 0.587 0.66 0.864 0.245 0.275 0.511 0.535 0.792 0.775 0.284 0.236 0.582 0.452 0.886 0.642 0.306 0.188 0.619 0.349 0.928 0.487 0.078 0.032 0.156 0.063 0.232 0.095 0.038 0.015 0.076 0.032 0.115 0.046s0.077 0.027 0.115 0.041 0.151 0.054 0.226 0.078c0.075 0.022 0.15 0.044 0.224 0.066 0.037 0.011 0.073 0.022 0.109 0.031s0.073 0.018 0.109 0.027 0.143 0.035 0.213 0.052c0.070 0.014 0.139 0.027 0.207 0.040 0.034 0.006 0.067 0.013 0.101 0.019 0.017 0.003 0.033 0.006 0.049 0.009s0.033 0.005 0.049 0.007c0.066 0.009 0.13 0.018 0.192 0.027 0.031 0.004 0.062 0.009 0.093 0.013s0.061 0.006 0.091 0.009 0.118 0.010 0.174 0.015c0.056 0.005 0.111 0.011 0.164 0.012 0.004 0 0.007 0 0.011 0 0.010 0.544 0.453 0.982 1 0.982 0.008 0 0.017-0 0.025-0.001v0c0 0 0.001-0 0.004-0 0.061-0.002 0.12-0.009 0.177-0.021 0.027-0.003 0.057-0.007 0.090-0.011 0.029-0.003 0.061-0.007 0.095-0.011 0.040-0.006 0.083-0.012 0.128-0.019 0.090-0.013 0.189-0.028 0.296-0.045 0.101-0.021 0.21-0.044 0.326-0.068 0.058-0.011 0.117-0.028 0.178-0.044s0.123-0.033 0.188-0.049c0.032-0.009 0.065-0.016 0.097-0.027s0.065-0.021 0.098-0.031 0.134-0.043 0.203-0.065c0.017-0.006 0.035-0.011 0.052-0.017s0.034-0.013 0.052-0.019 0.070-0.026 0.105-0.039c0.070-0.027 0.142-0.053 0.215-0.081 0.071-0.031 0.144-0.062 0.218-0.094 0.037-0.016 0.074-0.032 0.111-0.048s0.073-0.035 0.111-0.053 0.148-0.073 0.224-0.11c0.075-0.039 0.149-0.081 0.224-0.123 0.037-0.021 0.075-0.042 0.113-0.063s0.074-0.045 0.112-0.068 0.149-0.093 0.224-0.14c0.295-0.197 0.587-0.417 0.864-0.66 0.275-0.245 0.535-0.511 0.775-0.792 0.236-0.284 0.452-0.582 0.642-0.886 0.188-0.306 0.349-0.619 0.487-0.928 0.032-0.078 0.063-0.156 0.095-0.232 0.015-0.038 0.032-0.076 0.046-0.115s0.027-0.077 0.040-0.115 0.054-0.151 0.078-0.226c0.022-0.075 0.044-0.15 0.066-0.224 0.011-0.037 0.022-0.073 0.031-0.109s0.018-0.073 0.027-0.109 0.035-0.143 0.052-0.213c0.014-0.070 0.027-0.139 0.040-0.207 0.006-0.034 0.013-0.067 0.019-0.101 0.003-0.017 0.006-0.033 0.009-0.049s0.005-0.033 0.007-0.050c0.009-0.065 0.018-0.13 0.027-0.192 0.004-0.031 0.009-0.062 0.013-0.093s0.006-0.061 0.009-0.091 0.010-0.118 0.015-0.174c0.005-0.056 0.011-0.111 0.012-0.165 0-0.008 0.001-0.016 0.001-0.025 0.55-0.002 0.996-0.449 0.996-1 0-0.008-0-0.017-0.001-0.025h0c0 0-0-0.001-0-0.003-0.002-0.061-0.009-0.12-0.021-0.177-0.003-0.027-0.007-0.057-0.011-0.090-0.003-0.029-0.007-0.061-0.011-0.095-0.006-0.040-0.012-0.083-0.019-0.128-0.013-0.090-0.028-0.189-0.045-0.296-0.021-0.101-0.044-0.21-0.068-0.326-0.011-0.058-0.028-0.117-0.044-0.178s-0.032-0.123-0.049-0.188c-0.009-0.032-0.016-0.065-0.027-0.097s-0.021-0.065-0.031-0.098-0.043-0.134-0.065-0.203c-0.005-0.017-0.011-0.035-0.017-0.052s-0.013-0.034-0.019-0.052-0.026-0.070-0.039-0.105c-0.027-0.070-0.053-0.142-0.081-0.215-0.031-0.071-0.062-0.144-0.094-0.218-0.016-0.037-0.032-0.074-0.048-0.111s-0.035-0.073-0.053-0.111-0.073-0.148-0.11-0.224c-0.039-0.075-0.081-0.149-0.123-0.224-0.021-0.037-0.042-0.075-0.063-0.113s-0.045-0.074-0.068-0.112-0.093-0.149-0.14-0.224c-0.197-0.295-0.417-0.587-0.66-0.864-0.245-0.275-0.511-0.535-0.792-0.775-0.284-0.236-0.582-0.452-0.886-0.642-0.306-0.188-0.619-0.349-0.928-0.487-0.078-0.032-0.156-0.063-0.232-0.095-0.038-0.015-0.076-0.032-0.115-0.046s-0.077-0.027-0.115-0.040-0.151-0.054-0.226-0.078c-0.075-0.022-0.15-0.044-0.224-0.066-0.037-0.010-0.073-0.022-0.109-0.031s-0.073-0.018-0.109-0.027-0.143-0.035-0.213-0.052c-0.070-0.014-0.139-0.027-0.207-0.040-0.034-0.006-0.067-0.013-0.101-0.019-0.017-0.003-0.033-0.006-0.049-0.009s-0.033-0.005-0.049-0.007c-0.066-0.009-0.13-0.018-0.192-0.027-0.031-0.004-0.062-0.009-0.093-0.013s-0.061-0.006-0.091-0.009-0.118-0.010-0.174-0.015c-0.056-0.005-0.111-0.011-0.164-0.012-0.013-0-0.026-0.001-0.039-0.001-0.010-0.543-0.454-0.981-0.999-0.981-0.008 0-0.017 0-0.025 0.001l-0-0c0 0-0.001 0-0.003 0-0.061 0.002-0.12 0.009-0.177 0.021-0.027 0.003-0.057 0.007-0.090 0.011-0.029 0.003-0.061 0.007-0.095 0.011-0.040 0.006-0.083 0.012-0.128 0.019-0.090 0.013-0.189 0.028-0.296 0.045-0.101 0.021-0.21 0.044-0.326 0.068-0.058 0.011-0.117 0.028-0.178 0.044s-0.123 0.033-0.188 0.049c-0.032 0.009-0.065 0.016-0.097 0.027s-0.065 0.021-0.098 0.031-0.134 0.043-0.203 0.065c-0.017 0.006-0.035 0.011-0.052 0.017s-0.034 0.013-0.052 0.019-0.070 0.026-0.105 0.039c-0.070 0.027-0.142 0.053-0.215 0.081-0.071 0.031-0.144 0.062-0.218 0.094-0.037 0.016-0.074 0.032-0.111 0.048s-0.073 0.035-0.111 0.053-0.148 0.073-0.224 0.11c-0.075 0.039-0.149 0.081-0.224 0.123-0.037 0.021-0.075 0.042-0.113 0.063s-0.074 0.045-0.112 0.068-0.149 0.093-0.224 0.14c-0.295 0.198-0.587 0.417-0.864 0.66-0.275 0.245-0.535 0.511-0.775 0.792-0.236 0.284-0.452 0.582-0.642 0.886-0.188 0.306-0.349 0.619-0.487 0.928-0.032 0.078-0.063 0.156-0.095 0.232-0.015 0.038-0.032 0.076-0.046 0.115s-0.027 0.077-0.040 0.115-0.054 0.151-0.078 0.226c-0.022 0.075-0.044 0.15-0.066 0.224-0.011 0.037-0.022 0.073-0.032 0.109s-0.018 0.073-0.027 0.109-0.035 0.143-0.052 0.213c-0.014 0.070-0.027 0.139-0.040 0.207-0.006 0.034-0.013 0.067-0.019 0.101-0.003 0.017-0.006 0.033-0.009 0.049s-0.005 0.033-0.007 0.050c-0.009 0.065-0.018 0.13-0.027 0.192-0.004 0.031-0.009 0.062-0.013 0.093s-0.006 0.061-0.009 0.091-0.010 0.118-0.015 0.174c-0.005 0.056-0.011 0.111-0.012 0.165-0 0.009-0.001 0.017-0.001 0.025-0.537 0.017-0.967 0.458-0.967 0.999 0 0.008 0 0.017 0.001 0.025zM1.149 7.011c0.001-0.003 0.001-0.006 0.002-0.009 0.010-0.051 0.026-0.102 0.040-0.155s0.030-0.107 0.045-0.163c0.008-0.028 0.015-0.056 0.024-0.084s0.019-0.057 0.028-0.086 0.038-0.116 0.058-0.176c0.005-0.015 0.010-0.030 0.015-0.045s0.012-0.030 0.017-0.045 0.023-0.060 0.035-0.091 0.048-0.123 0.073-0.186c0.028-0.062 0.056-0.125 0.084-0.189 0.014-0.032 0.028-0.064 0.043-0.096s0.032-0.064 0.048-0.096 0.065-0.128 0.098-0.194c0.034-0.065 0.073-0.128 0.109-0.194 0.018-0.032 0.037-0.065 0.056-0.098s0.040-0.064 0.061-0.096c0.041-0.064 0.082-0.129 0.124-0.194 0.176-0.255 0.369-0.506 0.583-0.744 0.217-0.236 0.451-0.459 0.697-0.665 0.25-0.202 0.511-0.385 0.776-0.547 0.268-0.159 0.541-0.294 0.808-0.41 0.068-0.027 0.135-0.053 0.202-0.079 0.033-0.013 0.066-0.027 0.099-0.038s0.067-0.022 0.1-0.033 0.131-0.045 0.196-0.065c0.065-0.018 0.13-0.036 0.194-0.054 0.032-0.009 0.063-0.019 0.095-0.026s0.063-0.014 0.094-0.021 0.123-0.028 0.184-0.042c0.061-0.011 0.12-0.021 0.179-0.032 0.029-0.005 0.058-0.010 0.087-0.015 0.014-0.003 0.029-0.005 0.043-0.008s0.029-0.003 0.043-0.005c0.056-0.007 0.112-0.014 0.166-0.020 0.027-0.003 0.053-0.007 0.080-0.010s0.053-0.004 0.078-0.006 0.102-0.007 0.15-0.011c0.049-0.003 0.095-0.008 0.142-0.008 0.091-0.002 0.177-0.004 0.256-0.006 0.073 0.003 0.14 0.005 0.2 0.007 0.030 0.001 0.058 0.002 0.085 0.002 0.033 0.002 0.064 0.004 0.093 0.006 0.033 0.002 0.063 0.004 0.091 0.006 0.051 0.008 0.103 0.012 0.156 0.012 0.007 0 0.015-0 0.022-0.001 0.002 0 0.004 0 0.004 0v-0c0.487-0.012 0.887-0.372 0.962-0.84 0.008 0.002 0.017 0.004 0.025 0.006 0.051 0.010 0.102 0.026 0.155 0.040s0.107 0.030 0.163 0.045c0.028 0.008 0.056 0.015 0.084 0.024s0.057 0.019 0.086 0.028 0.116 0.038 0.176 0.058c0.015 0.005 0.030 0.010 0.045 0.015s0.030 0.012 0.045 0.017 0.060 0.023 0.091 0.035 0.123 0.048 0.186 0.073c0.062 0.028 0.125 0.056 0.189 0.084 0.032 0.014 0.064 0.028 0.096 0.043s0.064 0.032 0.096 0.048 0.128 0.065 0.194 0.098c0.065 0.034 0.129 0.073 0.194 0.109 0.032 0.018 0.065 0.037 0.098 0.056s0.064 0.040 0.096 0.061 0.129 0.082 0.194 0.124c0.255 0.176 0.506 0.369 0.744 0.583 0.236 0.217 0.459 0.451 0.665 0.697 0.202 0.25 0.385 0.511 0.547 0.776 0.159 0.268 0.294 0.541 0.41 0.808 0.027 0.068 0.053 0.135 0.079 0.202 0.013 0.033 0.027 0.066 0.038 0.099s0.022 0.067 0.033 0.1 0.045 0.131 0.065 0.196c0.018 0.065 0.036 0.13 0.054 0.194 0.009 0.032 0.019 0.063 0.026 0.095s0.014 0.063 0.021 0.094 0.028 0.123 0.042 0.184c0.011 0.061 0.021 0.12 0.032 0.179 0.005 0.029 0.010 0.058 0.015 0.087 0.003 0.014 0.005 0.029 0.008 0.043s0.003 0.029 0.005 0.043c0.007 0.056 0.014 0.112 0.020 0.166 0.003 0.027 0.007 0.053 0.010 0.080s0.004 0.053 0.006 0.078 0.007 0.102 0.011 0.15c0.003 0.049 0.008 0.095 0.008 0.142 0.002 0.091 0.004 0.177 0.006 0.256-0.003 0.073-0.005 0.14-0.007 0.2-0.001 0.030-0.002 0.058-0.002 0.085-0.002 0.033-0.004 0.064-0.006 0.093-0.002 0.033-0.004 0.063-0.006 0.091-0.008 0.051-0.012 0.103-0.012 0.156 0 0.007 0 0.015 0.001 0.022-0 0.002-0 0.004-0 0.004h0c0.012 0.481 0.363 0.877 0.823 0.959-0.001 0.005-0.002 0.009-0.003 0.014-0.010 0.051-0.025 0.102-0.040 0.155s-0.030 0.107-0.045 0.163c-0.008 0.028-0.015 0.056-0.024 0.084s-0.019 0.057-0.028 0.086-0.039 0.116-0.058 0.176c-0.005 0.015-0.010 0.030-0.015 0.045s-0.012 0.030-0.017 0.045-0.023 0.060-0.035 0.091-0.048 0.123-0.073 0.186c-0.028 0.062-0.056 0.125-0.084 0.189-0.014 0.032-0.028 0.064-0.043 0.096s-0.032 0.064-0.048 0.096-0.065 0.128-0.098 0.194c-0.034 0.065-0.073 0.129-0.109 0.194-0.018 0.032-0.037 0.065-0.056 0.098s-0.040 0.064-0.061 0.096-0.082 0.129-0.124 0.194c-0.176 0.255-0.369 0.506-0.583 0.744-0.217 0.236-0.451 0.459-0.697 0.665-0.25 0.202-0.511 0.385-0.776 0.547-0.268 0.159-0.541 0.294-0.808 0.41-0.068 0.027-0.135 0.053-0.202 0.079-0.033 0.013-0.066 0.027-0.099 0.038s-0.067 0.022-0.1 0.033-0.131 0.045-0.196 0.065c-0.065 0.018-0.13 0.036-0.194 0.054-0.032 0.009-0.063 0.019-0.095 0.026s-0.063 0.014-0.094 0.021-0.123 0.028-0.184 0.042c-0.061 0.011-0.12 0.021-0.179 0.032-0.029 0.005-0.058 0.010-0.087 0.015-0.014 0.003-0.028 0.005-0.043 0.008s-0.029 0.003-0.043 0.005c-0.056 0.007-0.112 0.014-0.166 0.020-0.027 0.003-0.053 0.007-0.080 0.010s-0.053 0.004-0.078 0.006-0.102 0.007-0.15 0.011c-0.049 0.003-0.095 0.008-0.142 0.008-0.091 0.002-0.177 0.004-0.256 0.006-0.073-0.003-0.14-0.005-0.2-0.007-0.030-0.001-0.058-0.002-0.085-0.002-0.033-0.002-0.064-0.004-0.093-0.006-0.033-0.002-0.063-0.004-0.091-0.006-0.051-0.008-0.103-0.012-0.156-0.012-0.007 0-0.015 0-0.022 0.001-0.002-0-0.003-0-0.003-0v0c-0.484 0.012-0.883 0.369-0.961 0.834-0.050-0.010-0.101-0.025-0.153-0.039s-0.107-0.030-0.163-0.045c-0.028-0.008-0.056-0.015-0.084-0.024s-0.057-0.019-0.086-0.028-0.116-0.039-0.176-0.058c-0.015-0.005-0.030-0.010-0.045-0.015s-0.030-0.012-0.045-0.017-0.060-0.023-0.091-0.035-0.123-0.048-0.186-0.073c-0.062-0.028-0.125-0.056-0.189-0.084-0.032-0.014-0.064-0.028-0.096-0.043s-0.064-0.032-0.096-0.048-0.128-0.065-0.194-0.098c-0.065-0.034-0.129-0.073-0.194-0.109-0.032-0.018-0.065-0.037-0.098-0.056s-0.064-0.040-0.096-0.061c-0.064-0.041-0.129-0.082-0.194-0.124-0.255-0.175-0.506-0.369-0.744-0.583-0.236-0.217-0.459-0.451-0.665-0.697-0.202-0.25-0.385-0.511-0.547-0.776-0.159-0.268-0.294-0.541-0.41-0.808-0.027-0.068-0.053-0.135-0.079-0.202-0.013-0.033-0.027-0.066-0.038-0.099s-0.022-0.067-0.033-0.1-0.045-0.131-0.065-0.196c-0.018-0.065-0.036-0.13-0.054-0.194-0.009-0.032-0.019-0.063-0.026-0.095s-0.014-0.063-0.021-0.094-0.028-0.123-0.042-0.184c-0.011-0.061-0.021-0.12-0.032-0.179-0.005-0.029-0.010-0.058-0.015-0.087-0.003-0.014-0.005-0.028-0.008-0.043s-0.003-0.029-0.005-0.043c-0.007-0.056-0.014-0.112-0.020-0.166-0.003-0.027-0.007-0.053-0.010-0.080s-0.004-0.053-0.006-0.078-0.007-0.101-0.011-0.15c-0.003-0.049-0.008-0.095-0.008-0.142-0.002-0.091-0.004-0.177-0.006-0.256 0.003-0.073 0.005-0.14 0.007-0.2 0.001-0.030 0.002-0.058 0.002-0.085 0.002-0.033 0.004-0.064 0.006-0.093 0.002-0.033 0.004-0.063 0.006-0.091 0.008-0.051 0.012-0.103 0.012-0.156 0-0.007-0-0.015-0.001-0.022 0-0.002 0-0.003 0-0.003h-0c-0.012-0.49-0.377-0.893-0.851-0.964z"></path>
                  <animateTransform attributeName="transform" attributeType="XML" dur="2s" from="0 0 0" repeatCount="indefinite" to="360 0 0" type="rotate"></animateTransform>
                </svg>
                <h3>Cargando...</h3>
              </div>
          )}
        </div>
      </div>
  
      <Modal title="Crea tu acta de Integralidad" id="createIntegralityModal">
        <form key={1} className="modal-form" onSubmit={
          handleSubmit((dat, e) => {
            fetch('http://localhost:5000/createIntegralityAct', {
              method: 'POST',
              body: JSON.stringify({ user: user.username, year: user.year, group: user.group, date: new Date(Date.now()).toLocaleString(), information: dat.description}),
              headers: { 'Content-Type': 'application/json' }
            }).then((res) => {
              res.json().then(async (e) => {
                if (e.create) {
                  await hideModal('createIntegralityModal');
                  setlastUserAction(lastUserAction + 1);
                  await showAlert({ type: 'ok', msg: e.msg });
                  reset();
                } else await showAlert({ type: 'war', msg: e.msg });
              }).catch(async (e) => {
                console.log(e);
                await showAlert({ type: 'err', msg: 'Error en el servidor al crear acta de integralidad' });
              })
            }).catch(async (e) => {
              console.log(e);
              await showAlert({ type: 'err', msg: 'Error en la conexion con el servidor' });
            });
          })}>
          <div className='form-container'>
            <div className="form-group">
              <textarea className="form-control" rows={12} {...register('description', {required: true, minLength: 25})}></textarea>
              {errors.description?.type === 'minLength' && <p className="no-valid">Debes escribir al menos 25 letras</p>}
              {errors.description?.type === 'required' && <p className="no-valid">El campo es obligatorio</p>}
            </div>
          </div>
          <div className="buttons" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button className="btn btn-secondary w-25" id="btn-close" type="button" data-bs-dismiss="modal" onClick={() => {
              reset();
            }}>Cancelar</button>
            <button id="integCancel" className="btn btn-success w-25" type="submit" name="createIntegralityAct">Crear</button>
          </div>
        </form>
      </Modal>

      <Modal title="Crear Acta de Reunion" id="createMeetingActModal">
        <form key={2} className="modal-form" onSubmit={
          handleSubmit2((dat, e) => {
            fetch('http://localhost:5000/createMeetingAct', {
              method: 'POST',
              body: JSON.stringify({ user: user.username, year: user.year, group: user.group, date: new Date(Date.now()).toLocaleString(), information: dat.meetingDescription }),
              headers: { 'Content-Type': 'application/json' }
            }).then((res) => {
              res.json().then(async (e) => {
                if (e.create) {
                  await hideModal('createMeetingActModal');
                  setlastUserAction(lastUserAction + 1);
                  await showAlert({ type: 'ok', msg: e.msg });
                  reset2();
                } else await showAlert({ type: 'war', msg: e.msg });
              }).catch(async (e) => {
                console.log(e);
                await showAlert({ type: 'err', msg: 'Error en el servidor al crear acta de reunion' });
              })
            }).catch(async (e) => {
              console.log(e);
              await showAlert({ type: 'err', msg: 'Error en la conexion con el servidor' });
            });
          })}>
          <div className='form-container'>
            <div className="form-group">
              <textarea className="form-control" placeholder="Escribe la informacion mas importante expuesta en la reunion de brigada" rows={12} {...register2('meetingDescription', { required: true, minLength: 25 })}></textarea>
              {errors2.meetingDescription?.type === 'minLength' && <p className="no-valid">Debes escribir al menos 25 letras</p>}
              {errors2.meetingDescription?.type === 'required' && <p className="no-valid">El campo es obligatorio</p>}
            </div>
          </div>
          <div className="buttons" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button className="btn btn-secondary w-25" id="btn-close" type="button" data-bs-dismiss="modal" onClick={() => {
              reset2();
            }}>Cancelar</button>
            <button className="btn btn-success w-25" id="btn-login" type="submit" name="create">Crear</button>
          </div>
        </form>
      </Modal>

      <Modal title="Crear Plan de Actividades" id="createActivityPlanModal">
        <form key={3} className="modal-form" onSubmit={
          handleSubmit3((dat, e) => {
            fetch('http://localhost:5000/createActivityPlan', {
              method: 'POST',
              body: JSON.stringify({ name: dat.name, user: user.username, year: user.year, group: user.group, date: new Date(Date.now()).toLocaleString(), information: dat.activityPlanDescription }),
              headers: { 'Content-Type': 'application/json' }
            }).then((res) => {
              res.json().then(async (e) => {
                if (e.create) {
                  await hideModal('createActivityPlanModal');
                  setlastUserAction(lastUserAction + 1);
                  await showAlert({ type: 'ok', msg: e.msg });
                  reset3();
                } else await showAlert({ type: 'war', msg: e.msg });
              }).catch(async (e) => {
                console.log(e);
                await showAlert({ type: 'err', msg: 'Error en el servidor al crear acta de integralidad' });
              })
            }).catch(async (e) => {
              console.log(e);
              await showAlert({ type: 'err', msg: 'Error en la conexion con el servidor' });
            });
          })}>
          <div className='form-container'>
            <div className="form-group">
              <input className='form-control' id='name' type="text" placeholder="Nombre del plan de actividades"
              {...register3("name", { required: true, minLength: 5, maxLength: 15 })} />
              {errors3.userFullName?.type === "required" && <p className='no-valid'>Debes completar el campo</p>}
              {errors3.userFullName?.type === "minLength" && <p className='no-valid'>El nombre debe tener al menos 5 caracteres</p>}
              {errors3.userFullName?.type === "maxLength" && <p className='no-valid'>El nombre es muy grande</p>}
            </div>
            <div className="form-group">
              <textarea className="form-control" placeholder="Escribe las actividades a realizar" rows={12} {...register3('activityPlanDescription', { required: true, minLength: 25 })}></textarea>
              {errors3.activityPlanDescription?.type === 'minLength' && <p className="no-valid">Debes escribir al menos 25 letras</p>}
              {errors3.activityPlanDescription?.type === 'required' && <p className="no-valid">El campo es obligatorio</p>}
            </div>
          </div>
          <div className="buttons" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button className="btn btn-secondary w-25" id="btn-close" type="button" data-bs-dismiss="modal" onClick={() => {
              reset3();
            }}>Cancelar</button>
            <button className="btn btn-success w-25" id="btn-login" type="submit" name="create">Crear</button>
          </div>
        </form>
      </Modal>

      <Modal title="Editar acta de integralidad" id="editIntegralityActModal">
        <form key={4} className="modal-form" onSubmit={
          handleSubmit4((dat, e) => {
            fetch('http://localhost:5000/editIntegralityAct', {
              method: 'PUT',
              body: JSON.stringify({ user: user.username, modifyDate: new Date(Date.now()).toLocaleString(), description: dat.integralityEditDescription }),
              headers: { 'Content-Type': 'application/json' }
            }).then((res) => {
              res.json().then(async (e) => {
                if (e.edited) {
                  await hideModal('editIntegralityActModal');
                  setlastUserAction(lastUserAction + 1);
                  await showAlert({ type: 'ok', msg: e.msg });
                  reset4();
                } else await showAlert({ type: 'war', msg: e.msg });
              }).catch(async (e) => {
                console.log(e);
                await showAlert({ type: 'err', msg: 'Error en el servidor al crear acta de integralidad' });
              })
            }).catch(async (e) => {
              console.log(e);
              await showAlert({ type: 'err', msg: 'Error en la conexion con el servidor' });
            });
          })}>
          <div className='form-container'>
            <div className="form-group">
              <textarea className="form-control" rows={12} defaultValue={integrality.information} {...register4('integralityEditDescription', { required: true, minLength: 25 })} ></textarea>
              {errors4.integralityEditDescription?.type === 'minLength' && <p className="no-valid">Debes escribir al menos 25 letras</p>}
              {errors4.integralityEditDescription?.type === 'required' && <p className="no-valid">El campo es obligatorio</p>}
            </div>
          </div>
          <div className="buttons" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button className="btn btn-secondary w-25" id="btn-close" type="button" data-bs-dismiss="modal" onClick={() => {
              reset4();
            }}>Cancelar</button>
            <button className="btn btn-success w-25" id="btn-login" type="submit" name="create">Editar</button>
          </div>
        </form>
      </Modal>

      <Modal title="Editar acta de reunion" id="editMeetingActModal">
        <form key={5} className="modal-form" onSubmit={
          handleSubmit5((dat, e) => {
            fetch('http://localhost:5000/editMeetingAct', {
              method: 'PUT',
              body: JSON.stringify({ user: user.username, date: new Date(Date.now()).toLocaleString(), information: dat.meetingEditDescription }),
              headers: { 'Content-Type': 'application/json' }
            }).then((res) => {
              res.json().then(async (e) => {
                if (e.edited) {
                  await hideModal('editMeetingActModal');
                  setlastUserAction(lastUserAction + 1);
                  await showAlert({ type: 'ok', msg: e.msg });
                  reset5();
                } else await showAlert({ type: 'war', msg: e.msg });
              }).catch(async (e) => {
                console.log(e);
                await showAlert({ type: 'err', msg: 'Error en el servidor al crear acta de integralidad' });
              })
            }).catch(async (e) => {
              console.log(e);
              await showAlert({ type: 'err', msg: 'Error en la conexion con el servidor' });
            });
          })}>
          <div className='form-container'>
            <div className="form-group">
              <textarea className="form-control" rows={12} defaultValue={meetingsActs.description} {...register5('meetingEditDescription', { required: true, minLength: 25 })}></textarea>
              {errors5.meetingEditDescription?.type === 'minLength' && <p className="no-valid">Debes escribir al menos 25 letras</p>}
              {errors5.meetingEditDescription?.type === 'required' && <p className="no-valid">El campo es obligatorio</p>}
            </div>
          </div>
          <div className="buttons" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button className="btn btn-secondary w-25" id="btn-close" type="button" data-bs-dismiss="modal" onClick={() => {
              reset5();
            }}>Cancelar</button>
            <button className="btn btn-success w-25" id="btn-login" type="submit" name="create">Editar</button>
          </div>
        </form>
      </Modal>

      <Modal title="Editar plan de actividades" id="editActivityPlanModal">
        <form key={6} className="modal-form" onSubmit={
          handleSubmit6((dat, e) => {
            fetch('http://localhost:5000/editActivityPlan', {
              method: 'PUT',
              body: JSON.stringify({ user: user.username, name: dat.activityPlanEditName, date: new Date(Date.now()).toLocaleString(), information: dat.activityPlanEditDescription }),
              headers: { 'Content-Type': 'application/json' }
            }).then((res) => {
              res.json().then(async (e) => {
                if (e.edited) {
                  await hideModal('editActivityPlanModal');
                  setlastUserAction(lastUserAction + 1);
                  await showAlert({ type: 'ok', msg: e.msg });
                  reset6();
                } else await showAlert({ type: 'war', msg: e.msg });
              }).catch(async (e) => {
                console.log(e);
                await showAlert({ type: 'err', msg: 'Error en el servidor al crear acta de integralidad' });
              })
            }).catch(async (e) => {
              console.log(e);
              await showAlert({ type: 'err', msg: 'Error en la conexion con el servidor' });
            });
          })}>
          <div className='form-container'>
            <div className="form-group">
              <input className='form-control' id='name' type="text" defaultValue={activityPlan.name}
                {...register6("activityPlanEditName", { required: true, maxLength: 15 })} />
              {errors6.userFullName?.type === "required" && <p className='no-valid'>Debes completar el campo</p>}
              {errors6.userFullName?.type === "minLength" && <p className='no-valid'>El nombre debe tener al menos 5 caracteres</p>}
              {errors6.userFullName?.type === "maxLength" && <p className='no-valid'>El nombre es muy grande</p>}
            </div>
            <div className="form-group">
              <textarea className="form-control" rows={12} defaultValue={activityPlan.description}
              {...register6('activityPlanEditDescription', { required: true, minLength: 25 })}></textarea>
              {errors6.activityPlanEditDescription?.type === 'minLength' && <p className="no-valid">Debes escribir al menos 25 letras</p>}
              {errors6.activityPlanEditDescription?.type === 'required' && <p className="no-valid">El campo es obligatorio</p>}
            </div>
          </div>
          <div className="buttons" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button className="btn btn-secondary w-25" id="btn-close" type="button" data-bs-dismiss="modal" onClick={() => {
              reset6();
            }}>Cancelar</button>
            <button className="btn btn-success w-25" id="btn-login" type="submit" name="create">Editar</button>
          </div>
        </form>
      </Modal>

      {user.isGroupLeader ? (
        <>
          <div className="studentGroupLeaderContainer">
            <div className="meetActWrapper">
              {user.username ?
                meetingsActs.group > 0 ? (
                  <div className="meetingAct">
                    <div className="actHeader">
                      <h2>Acta de Reunion de brigada</h2>
                      <button className="btn btn-outline-success" type="button" value={meetingsActs.username} onClick={editMeetingAct} data-bs-toggle="modal" data-bs-target="#editMeetingActModal"><FaRegEdit /></button>
                      <button className="btn btn-outline-danger" type="button" value={meetingsActs.username} onClick={deleteMeetingActModal} ><TiDocumentDelete /></button>
                    </div>

                    <div className="actContent">
                      <div className="userFullname"><strong>Creada por:</strong> {user.fullname}</div>
                      <div className="date"><strong>Fecha de creacion:</strong> {meetingsActs.date}</div>
                      <div className="date"><strong>Fecha de Modificacion:</strong> {meetingsActs.modifyDate}</div>
                      <div className="info"><strong>Descripcion:</strong> {meetingsActs.description}</div>
                    </div>
                  </div>
                ) : (
                  <div className="emptyAct">
                    <h3>No hay actas de Reunion</h3>
                    <button type="button" className="btn btn-primary createUserButton" data-bs-toggle="modal" data-bs-target="#createMeetingActModal">Crear Acta</button>
                  </div>
                )
                : ''}
            </div>
          </div>
          <div className="studentGroupLeaderContainer">
            <div className="activityPlanWrapper">
              {user.username ?
                activityPlan.group > 0 ? (
                  <div className="activityPlan">
                    <div className="actHeader">
                      <h2>Plan de Actividades</h2>
                      <button className="btn btn-outline-success" type="button" value={activityPlan.username} onClick={editActivityPlan} data-bs-toggle="modal" data-bs-target="#editActivityPlanModal"><FaRegEdit /></button>
                    </div>

                    <div className="actContent">
                      <div className="userFullname"><strong>Creado por:</strong> {user.fullname}</div>
                      <div className="name"><strong>Nombre:</strong> {activityPlan.name}</div>
                      <div className="date"><strong>Fecha de creacion:</strong> {activityPlan.date}</div>
                      <div className="date"><strong>Fecha de Modificacion:</strong> {activityPlan.modifyDate}</div>
                      <div className="info"><strong>Descripcion:</strong> {activityPlan.description}</div>
                    </div>
                  </div>
                ) : (
                  <div className="emptyAct">
                    <h3>No hay plan de actividades</h3>
                    <button type="button" className="btn btn-primary createUserButton" data-bs-toggle="modal" data-bs-target="#createActivityPlanModal">Crear Plan</button>
                  </div>
                ) : ''}
            </div>
          </div>
        </>
      ) : ('')}

      {user.isViceGroupLeader ? (
        <>
          <div className="studentViceGroupLeaderContainer">
            <div className="meetActWrapper">
              {user.username ?
                meetingsActs.group > 0 ? (
                  <div className="meetingAct">
                    <div className="actHeader">
                      <h2>Acta de Reunion de brigada</h2>
                    </div>

                    <div className="actContent">
                      <div className="userFullname"><strong>Creada por:</strong> {user.fullname}</div>
                      <div className="date"><strong>Fecha de creacion:</strong> {meetingsActs.date}</div>
                      <div className="date"><strong>Fecha de Modificacion:</strong> {meetingsActs.modifyDate}</div>
                      <div className="info"><strong>Descripcion:</strong> {meetingsActs.description}</div>
                    </div>
                  </div>
                ) : (
                  <div className="emptyAct">
                    <h3>No hay actas de Reunion</h3>
                    <button type="button" className="btn btn-primary createUserButton" data-bs-toggle="modal" data-bs-target="#createMeetingActModal">Crear Acta</button>
                  </div>
                )
                : ''}
            </div>
          </div>
          <div className="studentViceGroupLeaderContainer">
            <div className="activityPlanWrapper">
              {user.username ?
                activityPlan.group > 0 ? (
                  <div className="activityPlan">
                    <div className="actHeader">
                      <h2>Plan de Actividades</h2>
                    </div>

                    <div className="actContent">
                      <div className="userFullname"><strong>Creado por:</strong> {user.fullname}</div>
                      <div className="name"><strong>Nombre:</strong> {activityPlan.name}</div>
                      <div className="date"><strong>Fecha de creacion:</strong> {activityPlan.date}</div>
                      <div className="date"><strong>Fecha de Modificacion:</strong> {activityPlan.modifyDate}</div>
                      <div className="info"><strong>Descripcion:</strong> {activityPlan.description}</div>
                    </div>
                  </div>
                ) : (
                  <div className="emptyAct">
                    <h3>No hay plan de actividades</h3>
                    <button type="button" className="btn btn-primary createUserButton" data-bs-toggle="modal" data-bs-target="#createActivityPlanModal">Crear Plan</button>
                  </div>
                ) : ''}
            </div>
          </div>
        </>
      ) : ''}
    </>
  )
}

export default StudentDashboard;

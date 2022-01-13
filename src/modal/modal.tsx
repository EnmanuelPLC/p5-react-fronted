//@ts-nocheck
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./modal.css";

const Modal = (props: any) => {
  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
      <div className="modal fade" id={props.id} onClick={props.onClose}>
        <div className="modal-dialog">
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h4 className="modal-title">{props.title}</h4>
            </div>
            <div className="modal-body">{props.children}</div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
  );
};

export default Modal;

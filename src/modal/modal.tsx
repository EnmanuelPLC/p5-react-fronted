//@ts-nocheck
import React, { useEffect } from "react";
import "./modal.css";

const Modal = (props: any) => {

  useEffect(() => {
    
  }, []);

  return (
    <>
    <div className="modal fade" id={props.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Modal;

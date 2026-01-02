import React from "react";

const ModalPort = ({ button = "Delete", color = "btn-danger", onConfirm, onCancel }) => {
  return (
    <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this color?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className={`btn ${color}`} onClick={onConfirm}>
              {button}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPort;
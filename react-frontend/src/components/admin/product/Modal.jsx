import React from 'react';

const Modal = ({ button, color, onConfirm, onCancel, text }) => {
    return (
        <div className="modal" style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Deletion</h5>
                        <button type="button" className="close ms-80" onClick={onCancel} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{text}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className={`btn ${color}`} onClick={onConfirm}>{button}</button>
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;

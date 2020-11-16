import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const modalContainer = document.getElementById("modal-container");

export default function ProfileModal({ onClose, onDelete }) {
  return createPortal(
    <>
      <div className="modal-backdrop show" onClick={onClose}></div>
      <div className="modal" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Are you sure you want to delete this song?
              </h5>
            </div>
            <div className="modal-body">
              <button onClick={onDelete}>Delete</button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>,
    modalContainer
  );
}

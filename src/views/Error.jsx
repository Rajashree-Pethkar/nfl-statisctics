import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function Error({ ifError, onClose }) {
  return (
    <Modal
      show={!!ifError}
      onHide={onClose}
      className="rounded-0"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <Modal.Header closeButton className="border-top-0 rounded-0">
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{ifError}</p>
      </Modal.Body>
      <Modal.Footer className="rounded-0">
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

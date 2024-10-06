import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Ensure correct default export
const UserInfoModal = ({ show, handleClose, selectedUser }) => {
  if (!selectedUser) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>User Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Name:</strong> {selectedUser.name}</p>
        <p><strong>Email:</strong> {selectedUser.email}</p>
        <p><strong>Phone:</strong> {selectedUser.phone}</p>
        <p><strong>Username:</strong> {selectedUser.username}</p>
        <p><strong>Address:</strong> {selectedUser.address.street}, {selectedUser.address.city}</p>
        <p><strong>Company:</strong> {selectedUser.company.name}</p>
        <p><strong>Website:</strong> {selectedUser.website}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserInfoModal;

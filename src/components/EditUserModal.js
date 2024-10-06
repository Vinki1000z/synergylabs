import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DashboardContext from '../createcontext/DashboardContext';
import { useParams } from 'react-router-dom';

const EditUserModal = ({ show, handleClose, userId }) => {
  const [user, setUser] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    username: '',
    address: { street: '', city: '' }, 
    company: { name: '' }, 
    website: ''
  });
  const [loading, setLoading] = useState(false);

  const { editUser, users } = useContext(DashboardContext);

  useEffect(() => {
    if (userId) {
      const localUser = users.find(user => user.id === parseInt(userId, 10)); 
      if (localUser) {
        setUser(localUser);
      } else {
        console.error('User not found in local state');
      }
    }
  }, [userId, users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await editUser(userId, user); // Ensure editUser returns a promise
    setLoading(false);
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={user.name} 
            onChange={(e) => setUser({ ...user, name: e.target.value })} 
            required 
          />
          <input 
            type="email" 
            value={user.email} 
            onChange={(e) => setUser({ ...user, email: e.target.value })} 
            required 
          />
          <input 
            type="tel" 
            value={user.phone} 
            onChange={(e) => setUser({ ...user, phone: e.target.value })} 
            required 
          />
          <input 
            type="text" 
            value={user.username} 
            onChange={(e) => setUser({ ...user, username: e.target.value })} 
            required 
          />
          <input 
            type="text" 
            value={user.address.street} 
            onChange={(e) => setUser({
              ...user,
              address: { ...user.address, street: e.target.value }
            })} 
            required 
          />
          <input 
            type="text" 
            value={user.address.city} 
            onChange={(e) => setUser({
              ...user,
              address: { ...user.address, city: e.target.value }
            })} 
            required 
          />
          <input 
            type="text" 
            value={user.company.name} 
            onChange={(e) => setUser({
              ...user,
              company: { ...user.company, name: e.target.value }
            })} 
            required 
          />
          <input 
            type="text" 
            value={user.website} 
            onChange={(e) => setUser({ ...user, website: e.target.value })} 
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;

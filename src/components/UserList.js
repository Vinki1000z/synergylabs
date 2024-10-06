import React, { useContext, useState } from 'react';
import DashboardContext from '../createcontext/DashboardContext';
import { Link } from 'react-router-dom';
import UserInfoModal from './UserInfoModal';  
import CreateUserModal from './CreateUserModal';  
import EditUserModal from './EditUserModal';  
import './UserList.css'; // Import the CSS file

const UserList = () => {
  const { users, handleDelete, addUser, deleteLoading } = useContext(DashboardContext);
  const [showInfo, setShowInfo] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCloseInfo = () => setShowInfo(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowInfo = (user) => {
    setSelectedUser(user);
    setShowInfo(true);
  };
  const handleShowCreate = () => {
    setShowCreate(true);
  };
  const handleShowEdit = (user) => {
    setSelectedUser(user);
    setShowEdit(true);
  };

  return (
    <div className="table-container">
      <button className="btn btn-primary" style={{marginBottom:"2px"}} onClick={handleShowCreate}>Add New User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td data-label="Name">{user.name}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Phone">{user.phone}</td>
              <td data-label="Actions">
                <button className="btn btn-secondary" style={{marginRight:"2px"}} onClick={() => handleShowEdit(user)}>Edit</button>
                <button className="btn btn-info" style={{marginRight:"2px"}}  onClick={() => handleShowInfo(user)}>Info</button>
                <button className="btn btn-danger" style={{marginRight:"2px"}}  onClick={() => handleDelete(user.id)} disabled={deleteLoading}>
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for user info */}
      <UserInfoModal show={showInfo} handleClose={handleCloseInfo} selectedUser={selectedUser} />

      {/* Modal for creating a user */}
      <CreateUserModal show={showCreate} handleClose={handleCloseCreate} addUser={addUser} />

      {/* Modal for editing a user */}
      <EditUserModal show={showEdit} handleClose={handleCloseEdit} userId={selectedUser ? selectedUser.id : null} />
    </div>
  );
};

export default UserList;

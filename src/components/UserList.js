import React, { useContext, useState } from 'react';
import DashboardContext from '../createcontext/DashboardContext';
import { Link } from 'react-router-dom';
import UserInfoModal from './UserInfoModal';  
import CreateUserModal from './CreateUserModal';  
import EditUserModal from './EditUserModal';  // Import the EditUserModal component

const UserList = () => {
  const { users, handleDelete, addUser, deleteLoading } = useContext(DashboardContext);
  const [showInfo, setShowInfo] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);  // State for Edit User Modal
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCloseInfo = () => setShowInfo(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleCloseEdit = () => setShowEdit(false);  // Function to close Edit Modal
  const handleShowInfo = (user) => {
    setSelectedUser(user);
    setShowInfo(true);
  };
  const handleShowCreate = () => {
    setShowCreate(true);
  };
  const handleShowEdit = (user) => {
    setSelectedUser(user);
    setShowEdit(true);  // Open Edit Modal
  };

  return (
    <div>
      <button onClick={handleShowCreate}>Add New User</button>
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
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => handleShowEdit(user)}>Edit</button> {/* Show Edit Modal */}
                <button onClick={() => handleShowInfo(user)}>Info</button>
                <button onClick={() => handleDelete(user.id)} disabled={deleteLoading}>
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
      <EditUserModal show={showEdit} handleClose={handleCloseEdit} userId={selectedUser ? selectedUser.id : null} /> {/* Pass userId */}
    </div>
  );
};

export default UserList;

import React, { useContext, useState } from 'react';
import DashboardContext from '../createcontext/DashboardContext';
import { Link } from 'react-router-dom';
import UserInfoModal from './UserInfoModal';  
import CreateUserModal from './CreateUserModal';  
import EditUserModal from './EditUserModal';  
import './UserList.css'; // Import the CSS file

const UserList = () => {
  const { users, handleDelete, addUser, deleteLoading } = useContext(DashboardContext);
  
  // States for modals
  const [showInfo, setShowInfo] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  
  // States for user selection and search
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term

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

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-container">
      <div className="user-list-header">
        <button className="btn btn-primary" style={{ marginBottom: '10px' }} onClick={handleShowCreate}>
          Add New User
        </button>
        <input
          type="text"
          className="search-input"
          placeholder="Search by name"
          style={{marginRight:"10px"}}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>
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
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td data-label="Name">{user.name}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Phone">{user.phone}</td>
              <td data-label="Actions">
                <button className="btn btn-secondary" style={{ marginRight: '5px' }} onClick={() => handleShowEdit(user)}>
                  Edit
                </button>
                <button className="btn btn-info" style={{ marginRight: '5px' }} onClick={() => handleShowInfo(user)}>
                  Info
                </button>
                <button className="btn btn-danger" style={{ marginRight: '5px' }} onClick={() => handleDelete(user.id)} disabled={deleteLoading}>
                  {deleteLoading ? 'Deleting...' : 'Delete'}
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

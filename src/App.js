import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import CreateUser from './components/CreateUserModal';
import EditUser from './components/EditUserModal.js';
import DashboardState from './createcontext/DashboardState';

function App() {
  return (
    <Router>
      <DashboardState>
        <div>
          <h1>User Management App</h1>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/edit/:id" element={<EditUser />} />
            {/* <Route path="/moreinfo/:id" element={<MoreInfo />} /> Handle modal state in MoreInfo */}
          </Routes>
        </div>
      </DashboardState>
    </Router>
  );
}

export default App;

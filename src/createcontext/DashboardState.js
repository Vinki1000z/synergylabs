import React, { useState, useEffect } from "react";
import DashboardContext from "./DashboardContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DashboardState(props) {
  const network = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching users
  const [deleteLoading, setDeleteLoading] = useState(false); // Loading state for deleting users
  const [error, setError] = useState(null); // State for error handling

  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(network);
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching users."); // Set error state
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchUsers();
  }, []);

  // Create New User
  const addUser = async (name, email, phone, username, address, company, website) => {
    try {
      const response = await axios.post(network, {
        name,
        email,
        phone,
        username,
        address: { street: address.street, city: address.city },
        company: { name: company },
        website,
      });
      setUsers((prevUsers) => [...prevUsers, response.data]); // Use functional update for state
      navigate("/");
    } catch (error) {
      setError("Error creating user."); // Set error state
      console.error("Error creating user:", error);
    }
  };

  // Delete User
  const handleDelete = async (id) => {
    setDeleteLoading(true); // Start loader for delete operation
    try {
      await axios.delete(`${network}/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Update users state
    } catch (error) {
      setError("Error deleting user."); // Set error state
      console.error("Error deleting user:", error);
    } finally {
      setDeleteLoading(false); // Stop loader for delete operation
    }
  };

  // Edit User
  const editUser = async (id, updatedUser) => {
    try {
      await axios.put(`${network}/${id}`, updatedUser); // Make sure to update via API
      setUsers((prevUsers) => {
        return prevUsers.map((user) =>
          user.id === parseInt(id, 10) ? { ...user, ...updatedUser } : user
        );
      });
      navigate('/');
    } catch (error) {
      setError("Error updating user."); // Set error state
      console.error("Error updating user:", error);
    }
  };

  return (
    <DashboardContext.Provider
      value={{ users, loading, deleteLoading, error, handleDelete, addUser, editUser }} // Provide loading and error states
    >
      {loading ? (
        <div>Loading...</div> // Show loading message while fetching
      ) : (
        <>
          {error && <div style={{ color: 'red' }}>{error}</div>} {/* Show error message if there's an error */}
          {props.children}
        </>
      )}
    </DashboardContext.Provider>
  );
}

  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
  import EditUserForm from '../form_components/editUserInfo';
  import AddUserForm from '../form_components/AddUserForm';

  const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [editingUserId, setEditingUserId] = useState(null);
    const [showAddUserForm, setShowAddUserForm] = useState(false);

    useEffect(() => {
      // Fetch user data from the API
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
          const { data } = response;
          setUsers(data);
          setTotalUsers(data.length);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []);

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleEditUser = (userId) => {
      setEditingUserId(userId);
    };

    const handleSaveUser = (editedUserData) => {
      // Update the user data with the edited user data
      const updatedUsers = users.map((user) => {
        if (user.id === editedUserData.id) {
          return { ...user, ...editedUserData };
        }
        return user;
      });

      setUsers(updatedUsers);
      setEditingUserId(null);
    };

    const handleDeleteUser = (userId) => {
      // Handle delete user logic here
      console.log(`Deleting user with ID: ${userId}`);
    };

    const handleToggleAddUserForm = () => {
      setShowAddUserForm(!showAddUserForm);
    };

    const handleAddUser = (newUser) => {
      // Add the new user to the users list
      setUsers([...users, newUser]);
      setTotalUsers(totalUsers + 1);
      handleToggleAddUserForm();
    };

    const handleCancelEdit = () => {
      setEditingUserId(null);
    };


    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl text-indigo-600">List of All Users</h1>
          <button
            className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300 ease-in-out"
            onClick={handleToggleAddUserForm}
          >
            <FaPlus />
          </button>
        </div>
        <h2 className="text-xl mb-4 text-indigo-600">Total Users: {totalUsers}</h2>
        {showAddUserForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg text-indigo-600 mb-4">Add User</h2>
              <AddUserForm onAddUser={handleAddUser} onCancel={handleToggleAddUserForm} />
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <div className="sm:overflow-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300">ID</th>
                  <th className="py-2 px-4 border-b border-gray-300">Name</th>
                  <th className="py-2 px-4 border-b border-gray-300">Username</th>
                  <th className="py-2 px-4 border-b border-gray-300">Email</th>
                  <th className="py-2 px-4 border-b border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b border-gray-300">{user.id}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{user.name}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{user.username}</td>
                    <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                    <td className="py-2 px-4 border-b border-gray-300">
                      <button
                        className="text-indigo-500 hover:text-indigo-600 mr-2"
                        onClick={() => handleEditUser(user.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="flex items-center">
              {Array.from({ length: Math.ceil(totalUsers / usersPerPage) }).map((_, index) => (
                <li key={index}>
                  <button
                    className={`py-1 px-3 mx-1 rounded-md ${
                      currentPage === index + 1
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {editingUserId && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg p-4">
              <h2 className="text-lg text-indigo-600 mb-4">Edit User</h2>
              <EditUserForm
                user={users.find((user) => user.id === editingUserId)}
                onSaveUser={handleSaveUser}
                onCancelEdit={handleCancelEdit}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  export default UserTable;

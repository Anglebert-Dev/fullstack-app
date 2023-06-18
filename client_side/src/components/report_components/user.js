import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

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
    // Handle edit user logic here
    console.log(`Editing user with ID: ${userId}`);
  };

  const handleDeleteUser = (userId) => {
    // Handle delete user logic here
    console.log(`Deleting user with ID: ${userId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 text-indigo-600">Total Users: {totalUsers}</h2>
      <div className="overflow-x-auto">
        <div className="sm:overflow-auto">
          <table className="min-w-full divide-y divide-gray-200 table-auto md:table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-indigo-600">ID</th>
                <th className="py-2 px-4 text-indigo-600">Name</th>
                <th className="py-2 px-4 text-indigo-600">Email</th>
                <th className="py-2 px-4 text-indigo-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300 ease-in-out"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-600 transition-colors duration-300 ease-in-out"
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
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={totalUsers}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded ${
            currentPage === number ? 'bg-indigo-600' : ''
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default UserTable;

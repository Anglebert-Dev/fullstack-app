import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage] = useState(10);

  useEffect(() => {
    // Fetch vehicle data from the API
    axios
      .get('http://localhost:8000/api/v1/vehicle/all')
      .then((response) => {
        const { data } = response;
        setVehicles(data);
        setTotalVehicles(data.length);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  // Pagination logic
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditVehicle = (vehicleId) => {
    // Handle edit vehicle logic here
    console.log(`Editing vehicle with ID: ${vehicleId}`);
  };

  const handleDeleteVehicle = (vehicleId) => {
    // Handle delete vehicle logic here
    console.log(`Deleting vehicle with ID: ${vehicleId}`);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl text-indigo-600">List of All Vehicles</h1>
        <button
          className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300 ease-in-out"
          onClick={() => console.log('Add vehicle clicked')}
        >
          <FaPlus />
        </button>
      </div>
      <h2 className="text-xl mb-4 text-indigo-600">Total Vehicles: {totalVehicles}</h2>
      <div className="overflow-x-auto">
        <div className="sm:overflow-auto">
          <table className="min-w-full divide-y divide-gray-200 table-auto md:table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-indigo-600">ID</th>
                <th className="py-2 px-4 text-indigo-600">Title</th>
                <th className="py-2 px-4 text-indigo-600">Body</th>
                <th className="py-2 px-4 text-indigo-600">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentVehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="py-2 px-4">{vehicle.id}</td>
                  <td className="py-2 px-4">{vehicle.title}</td>
                  <td className="py-2 px-4">{vehicle.body}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleEditVehicle(vehicle.id)}
                      className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300 ease-in-out"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteVehicle(vehicle.id)}
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
      <div className="mt-4">
        <Pagination
          vehiclesPerPage={vehiclesPerPage}
          totalVehicles={totalVehicles}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

const Pagination = ({ vehiclesPerPage, totalVehicles, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVehicles / vehiclesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
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

export default VehicleTable;

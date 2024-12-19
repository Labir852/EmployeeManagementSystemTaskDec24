import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/employees"; // Replace with your actual backend URL

export const getEmployees = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${pageNumber}/${pageSize}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    const response = await axios.post(API_BASE_URL, employee);
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

export const updateEmployee = async (employee) => {
  try {
    const response = await axios.put(API_BASE_URL, employee);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

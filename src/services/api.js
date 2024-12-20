import axios from 'axios';
import instance from './axiosheader';

const API_BASE_URL = 'http://localhost:5000/api';

export const getEmployees = (params) => instance.get(`/Employee`, params );

export const addEmployee = (data) => instance.post(`/Employees`, data);

export const updateEmployee = (id, data) => instance.put(`/Employees/${id}`, data);

export const deleteEmployee = (id) => instance.delete(`/Employees/${id}`);

export const getDepartments = () => instance.get(`/Departments`);

export const addDepartment = (data) => instance.post(`/Departments`, data);

export const getDepartmentPerformance = () => instance.get(`/Departments/performance`);

export const getPerformanceReviews = (employeeId) =>
  instance.get(`/Performance-reviews`, { params: { employeeId } });

export const addPerformanceReview = (data) =>
  instance.post(`/Performance-reviews`, data);

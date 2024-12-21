
import instance from './axiosheader';

export const getEmployees = async (data) => {let response = await instance.get(`/Employee`, data );return response}


export const addEmployee =async (data) => {let response =await instance.post(`/Employee`, data);return response}

export const updateEmployee =async (id, data) => {let response =await instance.put(`/Employee/${id}`, data);return response}

export const deleteEmployee = async (id) => {let response =await instance.post(`/Employee/delete/${id}`);return response}

export const getDepartments =async () =>  {let response =await instance.get(`/Department`); return response}

export const addDepartment =async (data) => {let response =await instance.post(`/Department`, data);return response}

export const getEmployeesByDept = async (id) => {let response = await instance.get(`/Employee/department/${id}`);return response}

export const addManager =async (id,data) => {let response =await instance.put(`/Department/addManager/${id}`, data);return response}



export const getPerformanceReviews =async (employeeId) =>
  {let response =await instance.get(`/PerformanceReview`);return response}

export const addPerformanceReview =async (data) =>
  {let response =await instance.post(`/PerformanceReview`, data);return response}

export const searchEmployees = async ({ name, department, position, page, pageSize }) => {
  const response = await instance.get("/Employee/SearchEmployees", {
    params: {
      searchQuery: name,
      departmentId: department || null,
      position,
      page,
      pageSize,
    },
  });
  return response.data;
};


import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem,Table,
  TableBody,  TableCell,  TableContainer,  TableHead,  TableRow,  Paper, } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { getDepartments, searchEmployees } from "../../services/api";


const EmployeeSearch = () => {
  const [data, setData] = useState({
    name: "",
    department: 0,
    position: "",
  });
  const [Department, setDepartment] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [DepartmentList,setDepartmentList] = useState([]);

  // Fetch employees based on filters
  const fetchEmployees = async () => {
    try {
      const result = await searchEmployees({
        name: data.name,
        department: data.department,
        position: data.position,
        page,
        pageSize,
      });
      setEmployees(result); // Assuming the API returns { employees: [], totalCount: number }
      setTotalPages(Math.ceil(result.totalCount / pageSize));
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page
    fetchEmployees();
  };

  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value);
    setData((prevValues) => ({ ...prevValues, department: event.target.value }));
  };

  useEffect(() => {
    
    fetchDepartments();
    fetchEmployees();
    setEmployees([]);
  }, [page, pageSize]);
 
    
     
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments();
        setDepartmentList(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "2rem",
        boxShadow: 3,
        padding: "2rem",
        borderRadius: "8px",
        backgroundColor: "#fff",
        marginBottom: "30px",
      }}
    >
      <Typography variant="h5">Search Employee</Typography>
      <Box sx={{ display: "flex" }}>
        <TextField
          label="Name"
          fullWidth
          value={data.name}
          margin="normal"
          onChange={(e) => setData((prevValues) => ({ ...prevValues, name: e.target.value }))}
          style={{ margin: "5px" }}
        />
        <TextField
          label="Position"
          type="text"
          fullWidth
          margin="normal"
          value={data.position}
          onChange={(e) => setData((prevValues) => ({ ...prevValues, position: e.target.value }))}
          style={{ margin: "5px" }}
        />
        <FormControl fullWidth  style={{margin:"5px"}}>
                  <InputLabel id="demo-simple-select-label">Department</InputLabel>
                  <Select 
                    value={data.departmentID}
                    label="Department"
                    onChange={handleChangeDepartment}
                    
                  >
                    {
                      DepartmentList.map((department) =>{
                       return(<MenuItem key={department.departmentID} value={department.departmentID}>{department.departmentName}</MenuItem>) 
                      })
                    }
                  </Select>
                </FormControl>
      </Box>
      <Box sx={{ width: "100%", display: "block", justifyContent: "center", marginTop: "10px" }}>
        <Button variant="contained" onClick={handleSubmit}>
          Search
        </Button>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ marginTop: "2rem" }}>
          Employee Results:
        </Typography>
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Joining Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees?.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.departmentName}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.joiningDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) =>{ setPage(value)}}
          sx={{ marginTop: "1rem" }}
        />
      </Box>
    </Container>
  );
};

export default EmployeeSearch;

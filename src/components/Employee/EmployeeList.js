import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,TextField
} from "@mui/material";
import api, { updateEmployee, deleteEmployee, getEmployees } from "../../services/api";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [Department, setDepartment] = React.useState('');

  const handleChange = (event) => {
    setDepartment(event.target.value);
    setData(prevValues=>({...prevValues,department:event.target.value}));
  };
  
  const [data, setData]= useState({
    id:0,
    name:"",
    email:"",
    phone:"",
    department:0,
    position:""
  });



  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees({page:1,pageSize:10})
      console.log(response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #eee',
    boxShadow: '2px 2px 2px 2px #eee',
    borderRadius:"10px",
    p: 4,
    textAlign:"center"
  };

  const [open, setOpen] = useState(false);

const handleClose = () => {
  setOpen(false);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await updateEmployee(data.id,data);
  } catch (error) {
    console.error("Error adding employee:", error);
  }
};


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>joiningDate</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.departmentName}</TableCell>
              <TableCell>{employee.joiningDate}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                    onClick={()=>{
                      setOpen(true);
                      setData({
                        id:employee.id,
                        name:employee.name,
                        email:employee.email,
                        phone:employee.phone,
                        department:employee.departmentId,
                        position:employee.position
                      })
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={()=>deleteEmployee(employee.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                    backdrop: {
                        timeout: 500,
                    }}}
                >
                    <Fade in={open}>
                    <Box sx={style} >
                        <h3>Edit Employee</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                            <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={data.name}
          onChange={(e) => setData(prevValues=>({...prevValues,name:e.target.value}))}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={data.email}
          onChange={(e) => setData(prevValues=>({...prevValues,email:e.target.value}))}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            value={Department}
            label="Department"
            onChange={handleChange}
          >
            <MenuItem value={1}>HR</MenuItem>
            <MenuItem value={2}>Engineering</MenuItem>
            <MenuItem value={3}>Sales</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Position"
          fullWidth
          margin="normal"
          value={data.position}
          onChange={(e) => setData(prevValues=>({...prevValues,position:e.target.value}))}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          value={data.phone}
          onChange={(e) => setData(prevValues=>({...prevValues,phone:e.target.value}))}
        />
        </div>
          <Button variant="contained" color="warning" type="submit">
          Update Employee
        </Button>
                        </form>
                    </Box>
                    </Fade>
                </Modal>
    </Container>
  );
};

export default EmployeeList;

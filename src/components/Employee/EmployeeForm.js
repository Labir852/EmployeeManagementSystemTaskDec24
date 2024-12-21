import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { addEmployee, getDepartments } from "../../services/api";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from "sweetalert2";

const EmployeeForm = () => {
  
  const [Department,setDepartment] = useState([]);

    useEffect( () => {
      fetchDepartment();
    }, []);
    const fetchDepartment = async ()=>{
      let response = await getDepartments();
      let departmentlist = response.data;
      setDepartment(departmentlist);
    }
  const handleChange = (event) => {
    setData(prevValues=>({...prevValues,departmentId:event.target.value}));
  };
  
  const [data, setData]= useState({
    name:"",
    email:"",
    phone:"",
    departmentId:0,
    position:"",
    joiningDate:dayjs(Date.now()),
    status:""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addEmployee(data);
      Swal.fire({
        title: "Success!",
        text: `${response.data}!`,
        icon: "success"
      });
    } catch (error) {
      Swal.fire({
        title: "Oops! Something Went wrong",
        text: `${error}!`,
        icon: "error"
      });
    }
  };
  




  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add New Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:"15px"}}>
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
            value={data.departmentId}
            label="Department"
            onChange={handleChange}
          >
            {
              Department.map((department) =>{
               return(<MenuItem key={department.departmentID} value={department.departmentID}>{department.departmentName}</MenuItem>) 
              })
            }
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
        

<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
      
        components={[
          'DateField'
        ]}
        
      >
        <DateField
          label="Joining Date"
          defaultValue={dayjs(Date.now())}
          format="DD-MM-YYYY"
          fullWidth
          onChange={(date) => {
            date = date ? date.format("YYYY-MM-DD") : "";
            setData(prevState => ({
            ...prevState,
            joiningDate: date
          }))
        
        }
          
             
            }
        />
      </DemoContainer>
    </LocalizationProvider>
    <FormControl fullWidth style={{marginTop:"10px"}}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            value={data.status}
            label="Status"
            onChange={(e)=>{
              setData(prevState => ({
                ...prevState,
                status: e.target.value
              }))
            }}
          >
            <MenuItem value={"active"}>Active</MenuItem>
            <MenuItem value={"inactive"}>Inactive</MenuItem>
          </Select>
        </FormControl>

                  





    </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default EmployeeForm;

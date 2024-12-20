import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { addEmployee } from "../../services/api";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EmployeeForm = ({ onSubmitSuccess }) => {
  
  const [Department, setDepartment] = React.useState('');

  const handleChange = (event) => {
    setDepartment(event.target.value);
    setData(prevValues=>({...prevValues,department:event.target.value}));
  };
  
  const [data, setData]= useState({
    name:"",
    email:"",
    phone:"",
    department:0,
    position:"",
    joiningDate:"",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(data);
      onSubmitSuccess();
    } catch (error) {
      console.error("Error adding employee:", error);
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


                  





    </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default EmployeeForm;

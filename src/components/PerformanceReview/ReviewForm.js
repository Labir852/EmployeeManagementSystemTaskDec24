import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { addPerformanceReview, getEmployees } from "../../services/api";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
import Swal from "sweetalert2";
const ReviewForm = () => {
  const [Employee, setEmployee] = React.useState([]);
  const [data,setData] = useState({
    id:0,
    EmployeeId:0,
    ReviewDate:dayjs(Date.now()),
    Score:0.0,
    Notes:"",
    EmployeeName:""
  })
useEffect(() => {
  fetchEmployees();
  }, []);
  const fetchEmployees = async (id) => {
      try {
        const response = await getEmployees()
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

  const handleChange = (event) => {
    setData(prevValues=>({...prevValues,EmployeeId:event.target.value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addPerformanceReview(data);
       if(response.data)
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
        Add Performance Review
      </Typography>
      <form onSubmit={handleSubmit}>
        
      <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" style={{margin:"10px"}}>Employee</InputLabel>
          <Select
            value={data.EmployeeId}
            label="Employee"
            onChange={handleChange}
            style={{margin:"10px"}}
          >
            {
              Employee.map(emp =>{
                return (<MenuItem key={emp.id} value={emp.id}>{emp.name} ({emp.position})</MenuItem>)
              })
            }
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
      
        components={[
          'DateField'
        ]}
        
      >
        <DateField
          label="Review Date"
          value={dayjs(Date.now())}
          format="DD-MM-YYYY"
          fullWidth
          readOnly
        />
      </DemoContainer>
    </LocalizationProvider>
        <TextField
          label="Review Score"
          fullWidth
          margin="normal"
          value={data.ReviewScore}
          type="number"
          onChange={(e) => setData(prevValues=>({...prevValues,Score:e.target.value}))}
        />
        <TextField
          label="Review Notes"
          fullWidth
          margin="normal"
          value={data.ReviewNotes}
          onChange={(e) => setData(prevValues=>({...prevValues,Notes:e.target.value}))}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ReviewForm;

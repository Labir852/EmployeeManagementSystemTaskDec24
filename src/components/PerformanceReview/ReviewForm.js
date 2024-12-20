import React, { useState } from "react";
import { TextField, Button, Container, Typography, Rating } from "@mui/material";
import { addPerformanceReview } from "../../services/api";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
const ReviewForm = ({ onSubmitSuccess }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [Employee, setEmployee] = React.useState('');
  const [data,setData] = useState({
    EmployeeId:0,
    ReviewDate:dayjs(Date.now()),
    ReviewScore:0.0,
    ReviewNotes:""
  })

  const handleChange = (event) => {
    setEmployee(event.target.value);
    setData(prevValues=>({...prevValues,EmployeeId:event.target.value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPerformanceReview({ employeeId, review, rating });
      onSubmitSuccess();
      setEmployeeId("");
      setReview("");
      setRating("");
    } catch (error) {
      console.error("Error adding performance review:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add Performance Review
      </Typography>
      <form onSubmit={handleSubmit}>
        
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Employee</InputLabel>
          <Select
            value={data.EmployeeId }
            label="Employee"
            onChange={handleChange}
          >
            <MenuItem value={1}>Labir</MenuItem>
            <MenuItem value={2}>Abir</MenuItem>
            <MenuItem value={3}>Sagir</MenuItem>
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
          onChange={(e) => setData(prevValues=>({...prevValues,ReviewScore:e.target.value}))}
        />
        <TextField
          label="Review Notes"
          fullWidth
          margin="normal"
          value={data.ReviewNotes}
          onChange={(e) => setData(prevValues=>({...prevValues,ReviewNotes:e.target.value}))}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ReviewForm;

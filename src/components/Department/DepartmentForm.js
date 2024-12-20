import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import  { addDepartment } from "../../services/api";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DepartmentForm = ({ onSubmitSuccess }) => {
  const [name, setName] = useState("");
  const [Manager, setManager] = React.useState('');
  const [data,setData] = useState({
    DepartmentName:"",
    ManagerId:0,
    DepartmentBudget:0

  })

  const handleChange = (event) => {
    setManager(event.target.value);
    setData(prevValues=>({...prevValues,ManagerId:event.target.value}));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDepartment(data);
      onSubmitSuccess();
      setName("");
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add New Department
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Department Name"
          fullWidth
          margin="normal"
          value={data.DepartmentName}
          onChange={(e) => setData(prevValues=>({...prevValues,DepartmentName:e.target.value}))}
        />
              <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Manager</InputLabel>
          <Select
            value={Manager}
            label="Manager"
            onChange={handleChange}
          >
            <MenuItem value={1}>Labir</MenuItem>
            <MenuItem value={2}>Abir</MenuItem>
            <MenuItem value={3}>Sagir</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Department Budget"
          fullWidth
          margin="normal"
          type="number"
          value={data.DepartmentBudget}
          onChange={(e) => setData(prevValues=>({...prevValues,DepartmentBudget:e.target.value}))}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default DepartmentForm;

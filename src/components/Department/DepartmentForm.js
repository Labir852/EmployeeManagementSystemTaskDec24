import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import  { addDepartment } from "../../services/api";

const DepartmentForm = ({ onSubmitSuccess }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDepartment(name);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default DepartmentForm;

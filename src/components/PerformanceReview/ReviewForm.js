import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import api, { addPerformanceReview } from "../../services/api";

const ReviewForm = ({ onSubmitSuccess }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

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
        <TextField
          label="Employee ID"
          fullWidth
          margin="normal"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <TextField
          label="Review"
          fullWidth
          margin="normal"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <TextField
          label="Rating"
          fullWidth
          margin="normal"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ReviewForm;

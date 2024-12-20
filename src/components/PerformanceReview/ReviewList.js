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
} from "@mui/material";
import api, { getPerformanceReviews } from "../../services/api";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchPerformanceReviews();
  }, []);

  const fetchPerformanceReviews = async () => {
    try {
      const response = await getPerformanceReviews();
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching performance reviews:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Performance Reviews
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Review</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.employeeId}</TableCell>
                <TableCell>{review.review}</TableCell>
                <TableCell>{review.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ReviewList;

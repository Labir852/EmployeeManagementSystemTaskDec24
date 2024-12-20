import React, { useState, useEffect } from 'react';
import { getDepartmentPerformance } from '../../services/api';
import { Table } from 'react-bootstrap';

const DepartmentPerformance = () => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    fetchDepartmentPerformance();
  }, []);

  const fetchDepartmentPerformance = async () => {
    const response = await getDepartmentPerformance();
    setPerformanceData(response.data);
  };

  return (
    <div>
      <h2>Department Performance</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Average Performance Score</th>
          </tr>
        </thead>
        <tbody>
          {performanceData.map((department) => (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>{department.averageScore.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DepartmentPerformance;

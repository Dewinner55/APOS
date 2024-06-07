import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, LinearProgress } from '@mui/material';

const EmployeeLoad = () => {
  const employeeLoads = [
    { name: 'Employee 1', load: 80 },
    { name: 'Employee 2', load: 60 },
    { name: 'Employee 3', load: 90 },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Загрузка сотрудников
        </Typography>
        <List>
          {employeeLoads.map((employee, index) => (
            <ListItem key={index}>
              <ListItemText primary={employee.name} secondary={`Load: ${employee.load}%`} />
              <LinearProgress variant="determinate" value={employee.load} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default EmployeeLoad;

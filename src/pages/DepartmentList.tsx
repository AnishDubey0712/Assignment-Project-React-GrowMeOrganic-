import React, { useState, useCallback } from 'react';
import { Box, Typography, Checkbox, List, ListItem, ListItemIcon, ListItemText, IconButton, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const departments = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const DepartmentList: React.FC = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);

  const handleDepartmentToggle = useCallback((department: string) => {
    const isSelected = selectedDepartments.includes(department);
    const subDeps = departments.find((dep) => dep.department === department)?.sub_departments || [];
    if (isSelected) {
      setSelectedDepartments((prev) => prev.filter((dep) => dep !== department && !subDeps.includes(dep)));
    } else {
      setSelectedDepartments((prev) => [...prev, department, ...subDeps]);
    }
  }, [selectedDepartments]);

  const handleSubDepartmentToggle = useCallback((department: string, subDepartment: string) => {
    const isSelected = selectedDepartments.includes(subDepartment);
    const departmentSubDeps = departments.find((dep) => dep.department === department)?.sub_departments || [];
    const newSelectedDepartments = isSelected
      ? selectedDepartments.filter((dep) => dep !== subDepartment)
      : [...selectedDepartments, subDepartment];

    const allSubDepsSelected = departmentSubDeps.every((subDep) => newSelectedDepartments.includes(subDep));

    if (allSubDepsSelected && !newSelectedDepartments.includes(department)) {
      setSelectedDepartments([...newSelectedDepartments, department]);
    } else if (!allSubDepsSelected && newSelectedDepartments.includes(department)) {
      setSelectedDepartments(newSelectedDepartments.filter((dep) => dep !== department));
    } else {
      setSelectedDepartments(newSelectedDepartments);
    }
  }, [selectedDepartments]);

  const handleExpandToggle = useCallback((department: string) => {
    if (expandedDepartments.includes(department)) {
      setExpandedDepartments((prev) => prev.filter((dep) => dep !== department));
    } else {
      setExpandedDepartments((prev) => [...prev, department]);
    }
  }, [expandedDepartments]);

  return (
    <Box>
      <Typography variant="h5">Departments</Typography>
      {departments.map((dep) => (
        <Box key={dep.department} mb={2}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selectedDepartments.includes(dep.department)}
                  onChange={() => handleDepartmentToggle(dep.department)}
                />
              </ListItemIcon>
              <ListItemText primary={dep.department} />
              <IconButton onClick={() => handleExpandToggle(dep.department)}>
                {expandedDepartments.includes(dep.department) ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
            <Collapse in={expandedDepartments.includes(dep.department)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {dep.sub_departments.map((subDep) => (
                  <ListItem key={subDep} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selectedDepartments.includes(subDep)}
                        onChange={() => handleSubDepartmentToggle(dep.department, subDep)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={subDep} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default DepartmentList;

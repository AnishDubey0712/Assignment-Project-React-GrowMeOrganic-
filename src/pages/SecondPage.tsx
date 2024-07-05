// src/pages/SecondPage.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import DepartmentList from './DepartmentList';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userId', headerName: 'User ID', width: 130 },
    { field: 'title', headerName: 'Title', width: 400 },
    { field: 'body', headerName: 'Body', width: 600 },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Data Table
      </Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={posts}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
        />
      </div>
      <DepartmentList />
    </Container>
  );
};

export default SecondPage;

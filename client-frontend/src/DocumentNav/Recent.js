
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'; // PDF icon
import Chip from '@mui/material/Chip';
import Box from '@mui/system/Box';
const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2, 
    renderCell: (params) => (
    
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PictureAsPdfIcon sx={{ marginRight: 1, color: '#d32f2f' }} />
        <span style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', color: '#1976d3' }}>
      {params.value}
    </span>
        
      </div>
    ),
  },
  { field: 'uploaded', headerName: 'Uploaded', flex: 1 }, 
  { field: 'lastAction', headerName: 'Last Action', flex: 1 }, 
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => (
      <Chip 
        label={params.value} 
        color={params.value === 'partially signed' ? 'warning' : 'default'} 
      />
    ),
  },
];

const rows = [
  {
    id: 1,
    name: 'utility-june-2024.pdf',
    uploaded: 'jun-21-2024',
    lastAction: 'sep-22-2024',
    status: 'partially signed',
  },
];

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <Box ml={2}> 
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        sx={{ border: 0 }}
      />
      </Box>
    </Paper>
  );
}


import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Box, Typography } from '@mui/material';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2, 
    renderCell: (params) => (
      <span style={{ whiteSpace: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', color: '#1976d3' }}>
        {params.value}
      </span>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1, // Ensure equal spacing
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === 'Signed' ? 'success' : 'default'}
      />
    ),
  },
  { field: 'date', headerName: 'Date', flex: 1 }, // Ensure equal spacing
  { field: 'signed', headerName: 'Signed', flex: 1 }, // Ensure equal spacing
];

// Updated rows data
const rows = [
  {
    id: 1,
    name: 'SNP-EN (US) Letter of Engagement – Financial Statements & Tax Services',
    status: 'Signed',
    date: 'feb-15',
    signed: '1/1',
  },
];

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <Box ml={2}>
        <Typography variant="h6" gutterBottom>
          Proposals & ELs
        </Typography>
      </Box>

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


import React from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';

const Invoices = () => {
  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }} className='cbilling-cards'>
        <Grid item xs={12} sm={6} md={5} display="flex" justifyContent="center">
          <Box sx={{ border: '2px dotted #94a3b8', width: '60%', minHeight: '148px', maxHeight: '148px' }} className='card1'>

            <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <PaymentsRoundedIcon sx={{ fontSize: '70px' }} />
                  <MonetizationOnRoundedIcon sx={{ position: 'absolute', top: 0, left: 0, fontSize: '24px', backgroundColor: '#fff', borderRadius: '50%', color: '#24c875' }} />
                </Box>
                <Typography sx={{ color: '#697991' }} variant="h7">outstanding balance</Typography>
              </Box>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#1976d3" }}>
              <Typography sx={{ fontSize: '30px' }} variant='h6'>$0.00</Typography>
            </Box>


          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={5} display="flex" justifyContent="center">
          <Box sx={{ border: '2px dotted #94a3b8', width: '60%', minHeight: '148px', maxHeight: '148px' }} className='card1'>

            <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <PaymentsRoundedIcon sx={{ fontSize: '70px' }} />
                  <StarsRoundedIcon sx={{ position: 'absolute', top: 0, left: 0, fontSize: '24px', backgroundColor: '#fff', borderRadius: '50%', color: '#24c875' }} />
                </Box>
                <Typography sx={{ color: '#697991' }} variant="h7">Credits Available</Typography>
              </Box>

            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#24c875" }}>
              <Typography sx={{ fontSize: '30px' }} variant='h6'>$0.00</Typography>
            </Box>


          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
    </Box>
  )
}

export default Invoices


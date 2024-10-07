import React from 'react'
import { Box, Typography, Divider,Paper,Card,CardContent} from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import billingCardData from '../DummyData/BillingData';

import { useNavigate } from 'react-router-dom';
// import './billing.css';


const ClientBilling = () => {
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -25,
          top: 12,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: '0 4px',
        },
      }));

      const navigate = useNavigate();

      const handdlebill=()=>{
        navigate('/bill')
      }
    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px' }}>
                    <Typography variant='h6'> Billing</Typography>
                    <HelpOutlineRoundedIcon style={{ color: '#0496ff', fontSize: '25px', cursor: 'pointer', }} />
                </Box>
                       
              <Box>
                <Box> 
              <StyledBadge badgeContent={1} color="success">
                <Typography ml={2}>Waiting for action</Typography>
                </StyledBadge>
                </Box>
                 
                 <Box sx={{height:'25vh',backgroundColor:'#F1F5F9',borderRadius:'15px',}}>
                   
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 ,}} >
                            {billingCardData.map((card, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        height: '22vh',
                                        width: '18%',
                                        border: '1px solid #EFF3F8',
                                      
                                        margin:1


                                    }}
                                >
                                    <Box onClick ={handdlebill} sx={{ cursor: 'pointer' }}>
                                        <CardContent >
                                            <Box sx={{ alignItems: 'center' }}>
                                                <Box sx={{ color: 'rgb(50, 205, 50)', ml: 2 }}>
                                                    {card.icon}
                                                </Box>
                                                <Box sx={{ marginLeft: 2 }}>
                                                    <Typography>{card.title}</Typography>
                                                    <Typography color='#697991' variant="body2">{card.description}</Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Box>
                                </Card>
                            ))}
                        </Box>
                 
                 </Box>

              </Box>

                <Box className="client-billing">
                    <Box
                        className="client-billing-nav"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            mt: 5,
                            width: '100%',
                            margin: '20px',
                            gap: '10px',
                            '& a': {
                                textDecoration: 'none',
                                padding: '10px 16px',
                                borderRadius: '4px',
                                color: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'white',
                                },
                                '&.active': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                },
                            },
                        }}
                    >
                        <NavLink to='invoices'>Invoices</NavLink>
                        <NavLink to='recurringinvoice'>Recurring Invoices</NavLink>
                        <NavLink to='payments'>Payments</NavLink>
                    </Box>
                    <Divider sx={{ my: 2, margin: '20px' }} />
                    <Outlet />
                </Box>

            </Box>
        </>
    )
}

export default ClientBilling


import { Box, Button, InputLabel, TextField, Divider, Select } from '@mui/material'
import React, { useState, } from 'react';
import Drawer from '@mui/material/Drawer';
import { useTheme, useMediaQuery, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';//autoclassnameGenerator
ClassNameGenerator.configure((componentName) => `foo-bar-${componentName}`);//autoclassnameGenerator

const TeamMember = () => {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [isNewDrawerOpen, setIsNewDrawerOpen] = useState(false);
    const handleNewDrawerClose = () => {
        setIsNewDrawerOpen(false);
    };

    return (
        <Box>


            <Button onClick={setIsNewDrawerOpen} variant="contained" color="primary" >
                Team Member
            </Button>

            <Drawer
                anchor="right"
                open={isNewDrawerOpen}
                onClose={handleNewDrawerClose}
                PaperProps={{
                    sx: {
                        borderRadius: isSmallScreen ? '0' : '10px 0 0 10px',
                        width: isSmallScreen ? '100%' : '650px',

                    },
                }}
            >
                <Box role="presentation" sx={{ borderRadius: isSmallScreen ? '0' : '15px' }}>
                    <Box>

                        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', }}>
                            <Typography sx={{ fontWeight: 'bold' }} variant="h4"> Add Team Member</Typography>
                            <CloseRoundedIcon style={{ cursor: 'pointer' }} />
                        </Box>
                        <Divider />
                    </Box>
                    <form style={{ margin: '15px' }}>

                        <Box>
                            <Box sx={{ width: '100%', mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <Box>
                                            <InputLabel sx={{ color: 'black' }}>First name</InputLabel>
                                            <TextField
                                                fullWidth
                                                name="First name"
                                                placeholder="First name"
                                                size="small"
                                                sx={{ mt: 1 }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Box sx={{ mr: '15px' }}>
                                            <InputLabel sx={{ color: 'black' }}>Middle Name</InputLabel>
                                            <TextField
                                                fullWidth
                                                name="Middle Name"
                                                placeholder="Middle Name"
                                                size="small"
                                                sx={{ mt: 1 }}
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <Box sx={{ mr: '15px' }}>
                                            <InputLabel sx={{ color: 'black' }}>Last Name</InputLabel>
                                            <TextField
                                                fullWidth
                                                name="Last Name"
                                                placeholder="Last Name"
                                                size="small"
                                                sx={{ mt: 1 }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ mt: 3 }}>
                                <InputLabel sx={{ color: 'black' }}>Email</InputLabel>
                                <TextField
                                    // margin="normal"
                                    fullWidth
                                    name="Email"
                                    placeholder="Email"
                                    size="small"
                                    sx={{ mt: 2 }}
                                />
                            </Box>


                            <Box >

                                <Select
                                    size='small'
                                    sx={{ width: '100%', mt: 2 }}
                                />
                            </Box>

                        </Box>
                    </form>

                    <Box sx={{ pt: 48, display: 'flex', alignItems: 'center', gap: 5, margin: "8px", ml: 3 }}>
                        <Button variant="contained" color="primary">Save</Button>
                        <Button variant="outlined" onClick={handleNewDrawerClose}>Cancel</Button>
                    </Box>



                </Box>


            </Drawer>
        </Box>
    )
}

export default TeamMember











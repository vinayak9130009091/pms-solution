import React from 'react';
import { Select, Grid, InputLabel, TextField, MenuItem, Box } from '@mui/material';

const Invoice = () => {


    return (
        <Box >

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={6}>
                    <Box><InputLabel sx={{ color: 'black' }}>Account name,ID or email</InputLabel>
                        <TextField
                            fullWidth
                            name="TemplateName"
                            placeholder="Template Name"
                            size="small"
                            sx={{ mt: 1 }}
                        /></Box>

                </Grid>
                <Grid xs={6}>
                    <Box>
                        <InputLabel sx={{ color: 'black' }}>Invoice Template</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"

                            sx={{ width: '100%', marginTop: '8px' }}
                            size="small"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                        </Select>

                    </Box>
                </Grid>

            </Grid>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={2}>
                <Grid xs={6}>
                    <Box><InputLabel sx={{ color: 'black' }}>Invoice Number</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"

                            sx={{ width: '100%', marginTop: '8px' }}
                            size="small"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                        </Select>

                    </Box>

                </Grid>
                <Grid xs={6}>
                    <Box>
                        <InputLabel sx={{ color: 'black' }}>Choose payment method</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"

                            sx={{ width: '100%', marginTop: '8px' }}
                            size="small"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                        </Select>

                    </Box>
                </Grid>

            </Grid>

            <Box sx={{ position: 'relative', mt: 2 }}>
                <InputLabel sx={{ color: 'black' }}>Description</InputLabel>
                <TextField
                    fullWidth
                    size='small'
                    margin='normal'
                    type="text"

                    placeholder="Description"


                />
            </Box>





        </Box>
    );
};

export default Invoice;

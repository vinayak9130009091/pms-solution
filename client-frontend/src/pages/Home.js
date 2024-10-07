
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Paper, Typography, Button, InputLabel, TextField, Divider,Link } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
import NoteAddRoundedIcon from '@mui/icons-material/NoteAddRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme, useMediaQuery } from '@mui/material';
import Texteditor from '../pages/Texteditor';
import HomeData from '../DummyData/HomeData';
import Badge from '@mui/material/Badge';
const Home = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [content, setContent] = useState('');
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };
  const handleDocumentUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.onchange = (e) => {
      const files = e.target.files;
      console.log('Selected documents:', files);
    };
    fileInput.click();
  };

  const handleFolderUpload = () => {
    const folderInput = document.createElement('input');
    folderInput.type = 'file';
    folderInput.webkitdirectory = true;
    folderInput.onchange = (e) => {
      const files = e.target.files;
      console.log('Selected folder contents:', files);
    };
    folderInput.click();
  };

  const [isNewChatOpen, setNewChat] = useState(false);

  const handleNewDrawerClose = () => {
    setNewChat(false);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -10,
      top: 12,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={1} columns={16} >
        <Grid size={11}>
          <Box sx={{ backgroundColor: '#f1f5f9',height:'800px' }}>
            <Box ml={2}>
              <Box fontWeight="bold">Waiting for action</Box>
            </Box>
            {/* Documents */}
            <Box m={2}>
              <Box mt={2} fontWeight="bold" display="flex" justifyContent="space-between">
                <StyledBadge badgeContent={1} color="success">
                  <Typography variant="body1">Documents</Typography>
                </StyledBadge>
              </Box>
              <Box mt={3}>
                {HomeData.slice(0, 1).map((card, index) => (
                  <Paper
                    key={index}
                    sx={{
                      position: 'relative',
                      '&:hover .signText': {
                        opacity: 1, // Make the "Sign" text visible on hover
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        mb: 2,
                      }}
                    >
                      <Box sx={{ color: 'rgb(255, 142, 0)', mr: 2 }}>{card.icon}</Box>
                      <Box>
                        <Typography fontWeight="bold">{card.title}</Typography>
                        <Typography variant="body2">{card.description}</Typography>
                      </Box>
                    </Box>
                    <Box
                      className="signText"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '95%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: '#1976d3',
                      }}
                    >
                      Sign
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
            {/* organizer */}
            <Box m={2}>
              <Box mt={2} fontWeight="bold" display="flex" justifyContent="space-between">
                <StyledBadge badgeContent={4} color="success">
                  <Typography variant="body1">Organizers</Typography>
                </StyledBadge>

                <Typography color="#1976d3" variant="body1">See all</Typography>
              </Box>

              <Box mt={3}>
                {HomeData.map((card, index) => (
                  <Paper key={index}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        mb: 2,
                        position: 'relative',
                        '&:hover .complete-text': {
                          opacity: 1,
                        },
                      }}
                    >
                      <Box sx={{ color: 'rgb(255, 142, 0)', mr: 2 }}>{card.icon}</Box>
                      <Box>
                        <Typography fontWeight="bold">{card.title}</Typography>
                        <Typography variant="body2">{card.description}</Typography>
                      </Box>
                      <Box
                        className="complete-text"
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '95%',
                          transform: 'translate(-50%, -50%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          cursor: 'pointer',
                          fontSize: '15px',
                          color: '#1976d3',
                        }}
                      >
                        Complete
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>
            {/* Billing */}
            <Box m={2}>
              <Box mt={2} fontWeight="bold" display="flex" justifyContent="space-between">
                <StyledBadge badgeContent={1} color="success">
                  <Typography variant="body1">Billing</Typography>
                </StyledBadge>
              </Box>
              <Box mt={3}>
                {HomeData.slice(0, 1).map((card, index) => (
                  <Paper
                    key={index}
                    sx={{
                      position: 'relative',
                      '&:hover .PayText': {
                        opacity: 1, // Make the "Sign" text visible on hover
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        mb: 2,
                      }}
                    >
                      <Box sx={{ color: 'rgb(255, 142, 0)', mr: 2 }}>{card.icon}</Box>
                      <Box>
                        <Typography fontWeight="bold">{card.title}</Typography>
                        <Typography variant="body2">{card.description}</Typography>
                      </Box>
                    </Box>
                    <Box
                      className="PayText"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '95%',
                        transform: 'translate(-50%, -50%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: '#1976d3',
                      }}
                    >
                      Pay
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Box>

          </Box>
        </Grid>
        <Grid size={5} >
          <Box sx={{
            height: '800px',
            boxShadow: "0px 4px 8px 2px rgba(0, 0, 0, 0.2)"
          }}>
            <Typography variant='h6' sx={{ml:2,fontWeight:'bold'}}>
              Quick links
            </Typography>
            <Divider />
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', m: 2, color: '#135ea9' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }} onClick={handleDocumentUpload}>
                  <CreateNewFolderRoundedIcon sx={{ fontSize: '20px' }} />
                  <Typography variant='h7'>Upload Documents</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#135ea9', cursor: 'pointer' }} onClick={handleFolderUpload}>
                  <NoteAddRoundedIcon sx={{ fontSize: '20px' }} />
                  <Typography variant='h7'>Upload Folder</Typography>
                </Box>
              </Box>

              <Box sx={{ color: '#135ea9', display: 'flex', alignItems: 'center', gap: '5px', mb: 2, cursor: 'pointer', m: 2 }}>
                <TelegramIcon sx={{ fontSize: '20px' }} />
                <Typography sx={{ fontWeight: 600 }} onClick={() => setNewChat(true)} variant='h7'>Chat</Typography>
              </Box>
            </Box>

            <Box >
            <Drawer
              anchor="right"
              open={isNewChatOpen}
              onClose={handleNewDrawerClose}
              PaperProps={{
                sx: {
                  borderRadius: isSmallScreen ? '0' : '10px 0 0 10px',
                  width: isSmallScreen ? '100%' : '600px',
                  maxWidth: '95%',
                },
              }}
            >
              <Box m={2} >
              <Box>
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
                  <Typography>NEW Chat</Typography>
                  <CloseIcon onClick={handleNewDrawerClose} style={{ cursor: 'pointer' }} />
                </Box>
                <Divider />
              </Box>

              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '64ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <InputLabel sx={{ color: 'black', }}>Subject</InputLabel>
                <TextField id="outlined-basic" label="Subject" variant="outlined" />
              </Box>

              <Box sx={{ mt: 3, m: 1 }}>
                <Texteditor initialContent={content} onChange={handleContentChange} />
              </Box>

              <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5, margin: "8px", ml: 3 }}>
                <Button variant="contained" color="primary">Create</Button>
                <Button variant="outlined" onClick={handleNewDrawerClose}>Cancel</Button>
              </Box>

              </Box>
            </Drawer>
            </Box>


            <Box sx={{ mt: 6 }}>
              <Box sx={{ml:2}} ><Typography variant='h6'> <strong>Balance  </strong></Typography></Box>
              <Divider />
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography sx={{ color: "#697991" }} variant='h7'>Credits Available</Typography>
                  </Box>
                  <Box sx={{ fontWeight: 600, fontSize: '20px' }}>$0.00</Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box>
                    <Typography sx={{ color: "#697991" }} variant='h7'>Outstanding Balance</Typography>
                  </Box>
                  <Box sx={{ fontWeight: 600, fontSize: '20px' }}>$0.00</Box>
                </Box>
              </Box>
            </Box>
              
          
            <Box mt={3}>
              <Box sx={{ml:2,}}><Typography variant='h6'><strong>Contact info</strong> </Typography></Box>
              <Divider />
              <Box sx={{ padding: 2 }}>
                <Typography variant="h6">Phone</Typography>
                <Typography variant="body1">(925) 800-3561</Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>Address</Typography>
                <Typography variant="body1">
                  3015 Hopyard Rd, Ste M, Pleasanton, CA 94588
                </Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>Email</Typography>
                <Typography variant="body1">
                  <Link href="mailto:silpa@snptaxandfinancials.com" underline="hover">
                    silpa@snptaxandfinancials.com
                  </Link>
                </Typography>

                <Typography variant="h6" sx={{ mt: 2 }}>Website</Typography>
                <Typography variant="body1">
                  <Link href="http://www.snptaxandfinancials.com" target="_blank" underline="hover">
                    www.snptaxandfinancials.com
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

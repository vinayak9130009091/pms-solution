
// import * as React from 'react';
// import TelegramIcon from '@mui/icons-material/Telegram';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid2';
// import { Container, Divider, Typography } from '@mui/material';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles('dark', {
//     backgroundColor: '#1A2027',
//   }),
// }));

// export default function Chat() {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpand = () => {
//     setExpanded(!expanded);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={3}>
//         <Grid size="grow">
//           <Container sx={{height:'90vh',borderRight:'1px solid #697991'}}> 
//             <Box onClick={handleExpand} sx={{cursor:'pointer',}}>
//           <Box display={'flex'}>
//             <TelegramIcon sx={{ color: 'rgb(113, 53, 247)' }} />
//             <Typography fontSize={13} color={'#697991'}>chat with SNPTax & Financials</Typography>
//           </Box>

//           <Box>
//            <Typography fontSize={14} > <strong>[Action Required] We have noticed a few {!expanded ? '...' : ' documents/items missing!'}</strong> </Typography>
//           </Box>
           
//           <Box>
//                 <Typography color={'#697991'} fontSize={14}>
//                   Dear Vinayak Kumhar,
//                   {!expanded
//                     ? ' After reviewing your previous returns...'
//                     : ` After reviewing your previous returns and uploaded documents, we have noticed a few missing items. I will list them here as client tasks. Once you have uploaded them (you can do so right in this chat) - please check them off. If you have any questions, please reply here.`}
//                 </Typography>
//               </Box>
//           <Divider/>

//           </Box>
//           </Container>
//         </Grid>
        
//         <Grid size={6}>
//           <Item>size=6</Item>
//         </Grid>
//         <Grid size="grow">
//           <Item>size=grow</Item>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }


import * as React from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Container, Divider, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function Chat() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* First Grid: Always Visible */}
        <Grid item xs>
          <Container sx={{ height: '90vh', borderRight: '1px solid #697991' }}>
            <Box onClick={handleExpand} sx={{ cursor: 'pointer', padding: 2 }}>
              <Box display={'flex'}>
                <TelegramIcon sx={{ color: 'rgb(113, 53, 247)' }} />
                <Typography fontSize={13} color={'#697991'}>chat with SNPTax & Financials</Typography>
              </Box>

              <Box>
                <Typography fontSize={14}>
                  <strong>[Action Required] We have noticed a few {!expanded ? '...' : ' documents/items missing!'}</strong>
                </Typography>
              </Box>

              <Box>
                <Typography color={'#697991'} fontSize={14}>
                  Dear Vinayak Kumhar,
                  {!expanded
                    ? ' After reviewing your previous returns...'
                    : ` After reviewing your previous returns and uploaded documents, we have noticed a few missing items. I will list them here as client tasks. Once you have uploaded them (you can do so right in this chat) - please check them off. If you have any questions, please reply here.`}
                </Typography>
              </Box>
              <Divider />
            </Box>
          </Container>
        </Grid>

        {/* Second Grid: Shown on Expand */}
        <Grid item xs={6}>
          {expanded && (
            <>
              <Typography fontSize={14}>
                <strong>[Action Required] We have noticed a few documents/items missing!</strong>
              </Typography>
              <Typography color={'#697991'} fontSize={14}>
                Dear Vinayak Kumhar, After reviewing your previous returns and uploaded documents, we have noticed a few missing items. I will list them here as client tasks. Once you have uploaded them (you can do so right in this chat) - please check them off. If you have any questions, please reply here.
              </Typography>
            </>
          )}
        </Grid>

        {/* Third Grid: Additional Content */}
        {expanded && (
          <Grid item xs>
            <Item>Additional content can go here</Item>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}






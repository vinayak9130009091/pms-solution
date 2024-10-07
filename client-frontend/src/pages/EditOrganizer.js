
// import React from 'react';
// import { Box, Typography, Container, InputLabel, TextField, Button } from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// import DescriptionIcon from '@mui/icons-material/Description';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import CloseIcon from '@mui/icons-material/Close';
// import LinearProgress from '@mui/material/LinearProgress';
// import { DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// const EditOrganizer = () => {
//   const totalSteps = 5; 
//   const [progress, setProgress] = React.useState(0);

//   const handleButtonClick = () => {
//     setProgress((prevProgress) => {
//       if (prevProgress < totalSteps) {
//         return prevProgress + 1;
//       }
//       return totalSteps; 
//     });
//   };

//   const [cleared, setCleared] = React.useState(false);

//   React.useEffect(() => {
//     if (cleared) {
//       const timeout = setTimeout(() => {
//         setCleared(false);
//       }, 1500);

//       return () => clearTimeout(timeout);
//     }
//     return () => {};
//   }, [cleared]);

//   return (
//     <Container>
//       <Box>
//         <Box sx={{ height: "10vh" }}> {/* Removed the borderBottom */}
//           <Typography color='#94a3b8' fontSize={'14px'}>2021-1040 NR Tax Organizer (Student)</Typography>

//           <Box display={'flex'} gap={2} alignItems={'center'}>
//             <Typography variant='h6' mt={1}>Basic Info</Typography>
//             <Box sx={{ color: '#1976d3', mt: 1 }}>
//               <Typography variant='body' display="flex" alignItems="center">
//                 Go to section <KeyboardArrowDownIcon />
//               </Typography>
//             </Box>

//             <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'} flexGrow={1}>
//               <Box display={'flex'} alignItems={'center'} mr={2} color={'#1976d3'}>
//                 <CompareArrowsIcon /> compare answers
//               </Box>
//               <Box display={'flex'} alignItems={'center'} mr={2} color={'#1976d3'}>
//                 <DescriptionIcon /> Attached docs
//               </Box>
//               <Box display={'flex'} alignItems={'center'} mr={2} color={'#1976d3'}>
//                 <MoreVertIcon />
//               </Box>
//               <Box display={'flex'} alignItems={'center'} mr={2} color={'#1976d3'}>
//                 <HelpOutlineIcon />
//               </Box>
//               <Box display={'flex'} alignItems={'center'} color={'#1976d3'}>
//                 <CloseIcon />
//               </Box>
//             </Box>
//           </Box>

//           <Box sx={{ width: '100%', mt: 2 }}>
//             <LinearProgress 
//               variant="determinate" 
//               value={(progress / totalSteps) * 100} 
//               sx={{
//                 '& .MuiLinearProgress-bar': {
//                   backgroundColor: '#00C000', // Set the color to green
//                 },
//               }}
//             />
//           </Box>
//         </Box>

//         <Box overflow={'auto'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} padding={2} maxHeight={'80vh'}>
//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 91 }}>Stimulus Payment #3 (Enter received amount)</InputLabel>
//             <TextField
//               name="Free entry answer"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1,width:'550px' }}
//             />
//               </Box>

//               <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>First Name</InputLabel>
//             <TextField
//               name="Free entry answer"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1,width:'550px' }}
//             />
//               </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>Last Name</InputLabel>
//             <TextField
//               name="Free entry answer"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1, width: '550px' }}
//             />
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>Phone Number</InputLabel>
//             <TextField
//               name="Phone Number"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1, width: '550px' }}
//             />
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>Email Address</InputLabel>
//             <TextField
//               name="Email Address"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1, width: '550px' }}
//             />
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>Social Security Number</InputLabel>
//             <TextField
//               name="Social Security Number"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1, width: '550px' }}
//             />
//           </Box>

//           <Box>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <Box>
//                 <DemoItem sx={{mt:4}} label="DOB">
//                   <DesktopDatePicker
//                     sx={{ width: 550 }}
//                   />
//                 </DemoItem>
//               </Box>
//             </LocalizationProvider>
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>Occupation</InputLabel>
//             <TextField
//               name="Occupation"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1, width: '550px' }}
//             />
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>USA address</InputLabel>
//             <TextField
//               name="USA address"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1, width: '550px' }}
//             />
//           </Box>


//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>
//             Indian Residency Address</InputLabel>
//             <TextField
//               name="USA address"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1, width: '550px' }}
//             />
//           </Box>


//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>
//             Passport Number</InputLabel>
//             <TextField
//               name="Passport Number"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1, width: '550px' }}
//             />
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>
//             Academic Institution Information (Name &amp; Address)</InputLabel>
//             <TextField
//               name="Passport Number"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1, width: '550px' }}
//             />
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>
//             Director of the Academic (Name &amp; Address)</InputLabel>
//             <TextField
//               name="Director of the Academic"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1, width: '550px' }}
//             />
//           </Box>

//           <Box>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <Box>
//                 <DemoItem sx={{mt:4}} label="Date of Visa acquired">
//                   <DesktopDatePicker
//                     sx={{ width: 550 }}
//                   />
//                 </DemoItem>
//               </Box>
//             </LocalizationProvider>
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>
//               Please let us know for how many years you’re in OPT Visa
//             </InputLabel>
//             <TextField
//               type="number"
//               name="Director of the Academic"
//               placeholder="Numerical answer"
//               size="large"
//               sx={{
//                 mt: 1,
//                 width: '550px',
//                 '& input[type=number]': {
//                   MozAppearance: 'textfield',
//                 },
//                 '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
//                   WebkitAppearance: 'none',
//                   margin: 0,
//                 },
//               }}
//             />
//           </Box>

//           <Box>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <Box>
//                 <DemoItem sx={{mt:4}} label="First entry in USA (MMM/DD/YYYY)">
//                   <DesktopDatePicker
//                     sx={{ width: 550 }}
//                   />
//                 </DemoItem>
//               </Box>
//             </LocalizationProvider>
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>
//             Type of Visa</InputLabel>
//             <TextField
//               name="Director of the Academic"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1, width: '550px' }}
//             />
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>If any changes in Visa type and if yes, nature of change</InputLabel>
//             <TextField
//               name="Director of the Academic"
//               placeholder="Free entry answer"
//               size="large"
//               sx={{ mt: 1, width: '550px' }}
//             />
//           </Box>

//           <Box>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <Box>
//                 <DemoItem sx={{mt:4}} label="If you moved to different state, Date of move">
//                   <DesktopDatePicker
//                     sx={{ width: 550 }}
//                   />
//                 </DemoItem>
//               </Box>
//             </LocalizationProvider>
//           </Box>

//           <Box>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <Box>
//                 <DemoItem sx={{mt:4}} label="Date of Visa acquired">
//                   <DesktopDatePicker
//                     sx={{ width: 550 }}
//                   />
//                 </DemoItem>
//               </Box>
//             </LocalizationProvider>
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>
//             Un-reimbursed Moving Expences

//             </InputLabel>
//             <TextField
//               type="number"
//               name="Director of the Academic"
//               placeholder="Numerical answer"
//               size="large"
//               sx={{
//                 mt: 1,
//                 width: '550px',
//                 '& input[type=number]': {
//                   MozAppearance: 'textfield',
//                 },
//                 '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
//                   WebkitAppearance: 'none',
//                   margin: 0,
//                 },
//               }}
//             />
//           </Box>




//         </Box>
//         <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
//           <Typography variant="body1">{`${progress} / ${totalSteps} steps`}</Typography> {/* Step display next to button */}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleButtonClick} // Add click handler
//           >
//             Next Step
//           </Button>
//         </Box>

//       </Box>
//     </Container>
//   );
// }

// export default EditOrganizer;

//final code
// import React from 'react';
// import { Box, Typography, Container, InputLabel, TextField, Button } from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// import DescriptionIcon from '@mui/icons-material/Description';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import CloseIcon from '@mui/icons-material/Close';
// import LinearProgress from '@mui/material/LinearProgress';
// import { DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import Checkbox from '@mui/material/Checkbox';

// const EditOrganizer = () => {
//   const totalSteps = 5; // Number of steps for progress
//   const [progress, setProgress] = React.useState(1); // Initialize progress at step 1

//   const handleButtonClick = () => {
//     setProgress((prevProgress) => {
//       if (prevProgress < totalSteps) {
//         return prevProgress + 1; // Increase progress by 1 on each click
//       }
//       return totalSteps; // Ensure progress doesn't exceed totalSteps
//     });
//   };

//   const [checked, setChecked] = React.useState();

//   const handleChange = (event) => {
//     setChecked(event.target.checked);
//   };

//   return (
//     <Container>
//       <Box>
//         <Box sx={{ height: "10vh" }}>
//           <Typography color='#94a3b8' fontSize={'14px'}>2021-1040 NR Tax Organizer (Student)</Typography>

//           <Box display={'flex'} gap={2} alignItems={'center'}>
//             <Typography variant='h6' mt={1}>Basic Info</Typography>
//             <Box sx={{ color: '#1976d3', mt: 1 }}>
//               <Typography variant='body' display="flex" alignItems="center">
//                 Go to section <KeyboardArrowDownIcon />
//               </Typography>
//             </Box>

//             <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'} flexGrow={1}>
//               <Box display={'flex'} alignItems={'center'} mr={2} color={'#1976d3'}>
//                 <CompareArrowsIcon /> compare answers
//               </Box>
//               <Box display={'flex'} alignItems={'center'} mr={2} color={'#1976d3'}>
//                 <DescriptionIcon /> Attached docs
//               </Box>
//               <Box display={'flex'} alignItems={'center'} mr={2} color={'#1976d3'}>
//                 <MoreVertIcon />
//               </Box>
//               <Box display={'flex'} alignItems={'center'} mr={2} color={'#1976d3'}>
//                 <HelpOutlineIcon />
//               </Box>
//               <Box display={'flex'} alignItems={'center'} color={'#1976d3'}>
//                 <CloseIcon />
//               </Box>
//             </Box>
//           </Box>

//           <Box sx={{ width: '100%', mt: 2 }}>
//             <LinearProgress
//               variant="determinate"
//               value={(progress / totalSteps) * 100}
//               sx={{
//                 '& .MuiLinearProgress-bar': {
//                   backgroundColor: '#00C000', // Set the progress bar color to green
//                 },
//               }}
//             />
//           </Box>
//         </Box>

//         <Box overflow={'auto'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} padding={2} maxHeight={'80vh'}>
//           {/* Form Fields for the First Step */}
//           {progress === 1 && (
//             <>
//               <Box overflow={'auto'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} padding={2} maxHeight={'80vh'}>
//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 91 }}>Stimulus Payment #3 (Enter received amount)</InputLabel>
//                   <TextField
//                     name="Free entry answer"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>First Name</InputLabel>
//                   <TextField
//                     name="Free entry answer"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>Last Name</InputLabel>
//                   <TextField
//                     name="Free entry answer"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>Phone Number</InputLabel>
//                   <TextField
//                     name="Phone Number"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>Email Address</InputLabel>
//                   <TextField
//                     name="Email Address"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>Social Security Number</InputLabel>
//                   <TextField
//                     name="Social Security Number"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>

//                 <Box>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <Box>
//                       <DemoItem sx={{ mt: 4 }} label="DOB">
//                         <DesktopDatePicker
//                           sx={{ width: 550 }}
//                         />
//                       </DemoItem>
//                     </Box>
//                   </LocalizationProvider>
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>Occupation</InputLabel>
//                   <TextField
//                     name="Occupation"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>USA address</InputLabel>
//                   <TextField
//                     name="USA address"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>


//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>
//                     Indian Residency Address</InputLabel>
//                   <TextField
//                     name="USA address"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>


//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>
//                     Passport Number</InputLabel>
//                   <TextField
//                     name="Passport Number"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>
//                     Academic Institution Information (Name &amp; Address)</InputLabel>
//                   <TextField
//                     name="Passport Number"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>
//                     Director of the Academic (Name &amp; Address)</InputLabel>
//                   <TextField
//                     name="Director of the Academic"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>

//                 <Box>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <Box>
//                       <DemoItem sx={{ mt: 4 }} label="Date of Visa acquired">
//                         <DesktopDatePicker
//                           sx={{ width: 550 }}
//                         />
//                       </DemoItem>
//                     </Box>
//                   </LocalizationProvider>
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>
//                     Please let us know for how many years you’re in OPT Visa
//                   </InputLabel>
//                   <TextField
//                     type="number"
//                     name="Director of the Academic"
//                     placeholder="Numerical answer"
//                     size="large"
//                     sx={{
//                       mt: 1,
//                       width: '550px',
//                       '& input[type=number]': {
//                         MozAppearance: 'textfield',
//                       },
//                       '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
//                         WebkitAppearance: 'none',
//                         margin: 0,
//                       },
//                     }}
//                   />
//                 </Box>

//                 <Box>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <Box>
//                       <DemoItem sx={{ mt: 4 }} label="First entry in USA (MMM/DD/YYYY)">
//                         <DesktopDatePicker
//                           sx={{ width: 550 }}
//                         />
//                       </DemoItem>
//                     </Box>
//                   </LocalizationProvider>
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>
//                     Type of Visa</InputLabel>
//                   <TextField
//                     name="Director of the Academic"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>If any changes in Visa type and if yes, nature of change</InputLabel>
//                   <TextField
//                     name="Director of the Academic"
//                     placeholder="Free entry answer"
//                     size="large"
//                     sx={{ mt: 1, width: '550px' }}
//                   />
//                 </Box>

//                 <Box>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <Box>
//                       <DemoItem sx={{ mt: 4 }} label="If you moved to different state, Date of move">
//                         <DesktopDatePicker
//                           sx={{ width: 550 }}
//                         />
//                       </DemoItem>
//                     </Box>
//                   </LocalizationProvider>
//                 </Box>

//                 <Box>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <Box>
//                       <DemoItem sx={{ mt: 4 }} label="Date of Visa acquired">
//                         <DesktopDatePicker
//                           sx={{ width: 550 }}
//                         />
//                       </DemoItem>
//                     </Box>
//                   </LocalizationProvider>
//                 </Box>

//                 <Box>
//                   <InputLabel sx={{ color: 'black', mt: 4 }}>
//                     Un-reimbursed Moving Expences

//                   </InputLabel>
//                   <TextField
//                     type="number"
//                     name="Director of the Academic"
//                     placeholder="Numerical answer"
//                     size="large"
//                     sx={{
//                       mt: 1,
//                       width: '550px',
//                       '& input[type=number]': {
//                         MozAppearance: 'textfield',
//                       },
//                       '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
//                         WebkitAppearance: 'none',
//                         margin: 0,
//                       },
//                     }}
//                   />
//                 </Box>

//               </Box>
//             </>
//           )}

//           {/* Form Fields for the Second Step */}
//           {progress === 2 && (
//             <>
//               <Box>
//                 <InputLabel sx={{ color: 'black',mt:4 }}>Name of the financial institution</InputLabel>
//                 <TextField
//                   name="Free entry answer"
//                   placeholder="Free entry answer"
//                   size="large"
//                   sx={{ mt: 1, width: '550px' }}
//                 />
//               </Box>

//               <Box>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <Box>
//                     <DemoItem sx={{ mt: 4 }} label="Date of Visa acquired">
//                       <DesktopDatePicker
//                         sx={{ width: 550 }}
//                       />
//                     </DemoItem>
//                   </Box>
//                 </LocalizationProvider>
//               </Box>

//               <Box>
//                 <InputLabel sx={{ color: 'black', mt: 4 }}>

//                   Routing Number
//                 </InputLabel>
//                 <TextField
//                   type="number"
//                   name="Director of the Academic"
//                   placeholder="Numerical answer"
//                   size="large"
//                   sx={{
//                     mt: 1,
//                     width: '550px',
//                     '& input[type=number]': {
//                       MozAppearance: 'textfield',
//                     },
//                     '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
//                       WebkitAppearance: 'none',
//                       margin: 0,
//                     },
//                   }}
//                 />
//               </Box>

//               <Box>
//                 <InputLabel sx={{ color: 'black', mt: 4 }}>

//                   Routing Number
//                 </InputLabel>
//                 <TextField
//                   type="number"
//                   name="Director of the Academic"
//                   placeholder="Numerical answer"
//                   size="large"
//                   sx={{
//                     mt: 1,
//                     width: '550px',
//                     '& input[type=number]': {
//                       MozAppearance: 'textfield',
//                     },
//                     '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
//                       WebkitAppearance: 'none',
//                       margin: 0,
//                     },
//                   }}
//                 />
//               </Box>

//               <Box>
//                 <InputLabel sx={{ color: 'black', mt: 4 }}>
//                   Account Number
//                 </InputLabel>
//                 <TextField
//                   type="number"
//                   name="Director of the Academic"
//                   placeholder="Numerical answer"
//                   size="large"
//                   sx={{
//                     mt: 1,
//                     width: '550px',
//                     '& input[type=number]': {
//                       MozAppearance: 'textfield',
//                     },
//                     '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
//                       WebkitAppearance: 'none',
//                       margin: 0,
//                     },
//                   }}
//                 />
//               </Box>

//               {/* <Box display={'flex'} flexDirection="column" mt={4}>
//                 <label>Bank Account Type (multiple options)</label>

//                 <Box display={'flex'} alignItems="center" border={'1px solid grey'} mt={2}>
//                   <Checkbox
//                     checked={checked.checking}
//                     onChange={handleChange}
//                     name="checking"
//                     inputProps={{ 'aria-label': 'Checking' }}
//                   />
//                   <Typography>Checking</Typography>
//                 </Box>

//                 <Box display={'flex'} alignItems="center" border={'1px solid grey'} mt={2}>
//                   <Checkbox
//                     checked={checked.savings}
//                     onChange={handleChange}
//                     name="savings"
//                     inputProps={{ 'aria-label': 'Savings' }}
//                   />
//                   <Typography>Savings</Typography>
//                 </Box>
//               </Box> */}

//             </>
//           )}

//           {/* Form Fields for the Third Step */}
//           {progress === 3 && (
//             <>
//              <Box>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <Box>
//                 <DemoItem sx={{mt:4}} label="Date of Visa acquired">
//                   <DesktopDatePicker
//                     sx={{ width: 550 }}
//                   />
//                 </DemoItem>
//               </Box>
//             </LocalizationProvider>
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>
//             Days in 2019
//             </InputLabel>
//             <TextField
//               type="number"
//               name="Director of the Academic"
//               placeholder="Numerical answer"
//               size="large"
//               sx={{
//                 mt: 1,
//                 width: '550px',
//                 '& input[type=number]': {
//                   MozAppearance: 'textfield',
//                 },
//                 '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
//                   WebkitAppearance: 'none',
//                   margin: 0,
//                 },
//               }}
//             />
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>
//             Days in 2020
//             </InputLabel>
//             <TextField
//               type="number"
//               name="Director of the Academic"
//               placeholder="Numerical answer"
//               size="large"
//               sx={{
//                 mt: 1,
//                 width: '550px',
//                 '& input[type=number]': {
//                   MozAppearance: 'textfield',
//                 },
//                 '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
//                   WebkitAppearance: 'none',
//                   margin: 0,
//                 },
//               }}
//             />
//           </Box>

//           <Box>
//             <InputLabel sx={{ color: 'black', mt: 4 }}>
//             Days in 2021
//             </InputLabel>
//             <TextField
//               type="number"
//               name="Director of the Academic"
//               placeholder="Numerical answer"
//               size="large"
//               sx={{
//                 mt: 1,
//                 width: '550px',
//                 '& input[type=number]': {
//                   MozAppearance: 'textfield',
//                 },
//                 '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
//                   WebkitAppearance: 'none',
//                   margin: 0,
//                 },
//               }}
//             />
//           </Box>

//               <Box>
//                 <InputLabel sx={{ color: 'black', mt: 4 }}>All dates of entry into and out of USA (MMM/DD/YYYY)</InputLabel>
//                 <TextField
//                   name="Free entry answer"
//                   placeholder="Free entry answer"
//                   size="large"
//                   sx={{ mt: 1, width: '550px' }}
//                 />
//               </Box>
//             </>
//           )}

//           {/* Form Fields for the Fourth Step */}
//           {progress === 4 && (
//             <>
//               <Box>
//                 <InputLabel sx={{ color: 'black', mt: 4 }}>W-2</InputLabel>
//                 <TextField
//                   name="Passport Number"
//                   placeholder="Enter passport number"
//                   size="large"
//                   sx={{ mt: 1, width: '550px' }}
//                 />
//               </Box>

//               <Box>
//                 <InputLabel sx={{ color: 'black', mt: 4 }}>Academic Institution</InputLabel>
//                 <TextField
//                   name="Academic Institution"
//                   placeholder="Enter institution details"
//                   size="large"
//                   sx={{ mt: 1, width: '550px' }}
//                 />
//               </Box>
//             </>
//           )}

//           {/* Form Fields for the Fifth Step */}
//           {progress === 5 && (
//             <>
//               <Box>
//                 <InputLabel sx={{ color: 'black', mt: 4 }}>Type of Visa</InputLabel>
//                 <TextField
//                   name="Visa Type"
//                   placeholder="Enter Visa type"
//                   size="large"
//                   sx={{ mt: 1, width: '550px' }}
//                 />
//               </Box>

//               <Box>
//                 <InputLabel sx={{ color: 'black', mt: 4 }}>Un-reimbursed Moving Expenses</InputLabel>
//                 <TextField
//                   type="number"
//                   name="Moving Expenses"
//                   placeholder="Enter expenses"
//                   size="large"
//                   sx={{ mt: 1, width: '550px' }}
//                 />
//               </Box>
//             </>
//           )}

//         </Box>

//         <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
//           <Typography variant="body1">{`${progress} / ${totalSteps} steps`}</Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleButtonClick}
//             disabled={progress >= totalSteps}
//           >
//             {progress === totalSteps ? "Submitted" : "Next Step"}
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default EditOrganizer;

import React from 'react'

const EditOrganizer = () => {
  return (
    <div>
      EditOrganizer
    </div>
  )
}

export default EditOrganizer




// import React, { useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
// import ReactPaginate from 'react-paginate';
// import { toast } from 'react-toastify';



// const Organizers = () => {

//   const navigate = useNavigate();
//   const API_KEY = process.env.REACT_APP_API_IP;
//   const { data } = useParams();
//   console.log(data)

//   const handleAddNewOrganizer = () => {
//     navigate(`/createOrganizer/${data}`);
//   };


//   //get all templateName Record 
//   const [organizerAccountwise, setOrganizerAccountwise] = useState([]);


//   useEffect(() => {
//     fetchOrganizerTemplates();
//   }, []);

//   const fetchOrganizerTemplates = async () => {
//     try {

//       const requestOptions = {
//         method: "GET",
//         redirect: "follow"
//       };
//       const url = `${API_KEY}/workflow/organizeraccountwise/organizerbyaccount/${data}`;
//       fetch(url, requestOptions)
//         .then((response) => response.json())
//         .then((result) => {
//           console.log(result)
//           setOrganizerAccountwise(result.organizerAccountWise);
//           console.log(organizerAccountwise);
//         })
//         .catch((error) => console.error(error));
//     } catch (error) {
//       console.error('Error fetching Invoice Templates:', error);
//     }
//   };



  

//   console.log(organizerAccountwise);

//   const itemsPerPage = 10;
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(organizerAccountwise.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = Math.min(startIndex + itemsPerPage, organizerAccountwise.length);
//   const currentTemplates = organizerAccountwise.slice(startIndex, endIndex);

//   console.log(currentTemplates)

//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   const [openMenuId, setOpenMenuId] = useState(null);
//   const toggleMenu = (_id) => {
//     setOpenMenuId(openMenuId === _id ? null : _id);
//   };

//   const handleEdit = (_id) => {
//       // navigate('invoicestempupdate/' + _id)
//       navigate('/CreateOrganizerUpdate/' + _id)
//   };


//   //delete template
//   const handleDelete = (_id) => {
//     const requestOptions = {
//       method: "DELETE",
//       redirect: "follow"
//     };
//     const url = `${API_KEY}/workflow/organizeraccountwise/`;
//     fetch(url + _id, requestOptions)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to delete item');
//         }
//         return response.text();
//       })
//       .then((result) => {
//         console.log(result);
//         toast.success('account organizer deleted successfully');
//         fetchOrganizerTemplates();
//         // setTimeout(() => {
//         //   navigate('/organizers')
//         // }, 1000);
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error('Failed to delete item');
//       })
//       // .finally(() => {
//       //   setTimeout(() => {
//       //     window.location.reload();
//       //   }, 1000);
//       // });
//   };





//   return (
//     <>
//       <h4>Organizers</h4>

//       <div>
//         <button className='btn1' onClick={handleAddNewOrganizer}>Create Organizer</button>
//       </div>

//       <div >

//         <div>
//           <table style={{width:'100%'}}>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Last Updated</th>
//                 <th>Status</th>
//                 <th>Progress</th>
//                 <th>Seal</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentTemplates.map(template => (
//                 <tr key={template._id}>
//                   <td onClick={() => handleEdit(template._id)} style={{ cursor: "pointer", color: 'var( --text-color)' }}>
//                     {template.organizertemplateid ? template.organizertemplateid.organizerName : 'Unknown Organizer'}
//                   </td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                   <td></td>
//                   <td>
//                     <div className="ci-menu-kebab" onClick={() => toggleMenu(template._id)} style={{ cursor: 'pointer', fontSize: '20px' }}>
//                       &#8942;
//                     </div>
//                     {openMenuId === template._id && (
//                       <div>
//                         <div onClick={() => handleEdit(template._id)} style={{ color: 'blue', cursor: 'pointer' }}>Edit</div>
//                         <div onClick={(txt) => handleDelete(template._id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</div>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div>
//             <ReactPaginate
//               pageCount={totalPages}
//               pageRangeDisplayed={5} // Adjust this value as needed
//               marginPagesDisplayed={2} // Adjust this value as needed
//               onPageChange={handlePageChange}
//               containerClassName={'pagination'}
//               activeClassName={'active'}
//               previousLabel={<MdKeyboardDoubleArrowLeft style={{ cursor: 'pointer' }} />}
//               nextLabel={<MdKeyboardDoubleArrowRight style={{ cursor: 'pointer' }} />}
//             />
//           </div>
//         </div>

//       </div>

//     </>
//   )
// }

// export default Organizers

import React from 'react'

const Organizers = () => {
  return (
    <div>Organizers</div>
  )
}

export default Organizers
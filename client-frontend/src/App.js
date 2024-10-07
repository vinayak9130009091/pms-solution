// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SidebarComponent from './sidebar/sidebar';
// import Home from './pages/Home';
// import Documents from './pages/Documents';
// import Chat from './pages/Chat';
// import Organizer from './pages/Organizers';
// import Proposals from './pages/Proposals';
// import Billing from './pages/Billing';
// import Settings from './pages/Setting';
// import Invoices from './BillingNav/Invoices';
// import Payments from './BillingNav/Payments';
// import RecurringInvoice from './BillingNav/RecurringInvoice';
// import clientLogIn from './clientSignup/clientLogIn';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<SidebarComponent />}>
//         <Route path='/home' element={<Home />} />
//         <Route path='/document' element={<Documents/>} />
//         <Route path='/chats&tasks' element={<Chat/>} />
//         <Route path='/organizers' element={<Organizer/>} />
//         <Route path='/proposals&els' element={<Proposals/>} />
//           <Route path='/billing' element={<Billing />}>
//             <Route path='invoices' element={<Invoices />} />
//             <Route path='recurringinvoice' element={<RecurringInvoice />} />
//             <Route path='payments' element={<Payments />} />
//           </Route>
//         <Route path='/settings' element={<Settings/>} />
//         </Route>
//       </Routes>

//     </BrowserRouter>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarComponent from "./sidebar/sidebar";
import Home from "./pages/Home";
import Documents from "./pages/Documents";
import Chat from "./pages/Chat";
import Organizer from "./pages/Organizers";
import Proposals from "./pages/Proposals";
import Billing from "./pages/Billing";
import Settings from "./pages/Setting";
import Invoices from "./BillingNav/Invoices";
import Payments from "./BillingNav/Payments";
import RecurringInvoice from "./BillingNav/RecurringInvoice";
import ClientLogIn from "./clientSignup/clientLogIn";
import ClientSignup from "./clientSignup/ClientSignup";
import Bill from "./pages/Bill";
import Recent from "./DocumentNav/Recent";
import Folder from "./DocumentNav/Folder";
import Trash from "./DocumentNav/Trash";
import Active from "./OrganizerNav/Active";
import Archived from "./OrganizerNav/Archived";
import EditOrganizer from "./pages/EditOrganizer";
import NewOrganizer from "./pages/NewOrganizer";
import Forgotpassword from "./clientSignup/Forgotpassword";
import OrganizerForm from "./pages/organizerform";
import ResetPassword from "./clientSignup/ResetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ClientLogIn />} />
        <Route path="/signup" element={<ClientSignup />} />
        <Route path="forgotpass" element={<Forgotpassword />} />
        <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
        <Route path="/" element={<SidebarComponent />}>
          <Route path="/home" element={<Home />} />
          <Route path="/document" element={<Documents />}>
            <Route path="recent" element={<Recent />} />
            <Route path="folders" element={<Folder />} />
            <Route path="trash" element={<Trash />} />
          </Route>

          <Route path="/chats&tasks" element={<Chat />} />
          <Route path="/organizers" element={<Organizer />}>
            <Route path="active" element={<Active />} />
            <Route path="archived" element={<Archived />} />
          </Route>

          <Route path="/proposals&els" element={<Proposals />} />
          <Route path="/billing" element={<Billing />}>
            <Route path="invoices" element={<Invoices />} />
            <Route path="recurringinvoice" element={<RecurringInvoice />} />
            <Route path="payments" element={<Payments />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/editorganizer" element={<EditOrganizer />} />
          <Route path="/neworganizer" element={<NewOrganizer />} />
          <Route path="/organizerform/:_id" element={<OrganizerForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

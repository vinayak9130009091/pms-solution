import React, { useState, useEffect, useMemo } from 'react';
import { Checkbox, Autocomplete, Switch, FormControlLabel, Box, Button, Drawer, Typography, IconButton, Divider, Select, MenuItem, InputLabel, TextField, FormControl, FormLabel, InputAdornment, Popover, ListItem, List, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CiDiscount1 } from 'react-icons/ci';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';
import './invoices.css'
import {  toast } from 'react-toastify';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { CiMenuKebab } from "react-icons/ci";
import CreatableSelect from 'react-select/creatable';
const Invoices = ({ charLimit = 4000 }) => {
    const ACCOUNT_API = process.env.REACT_APP_ACCOUNTS_URL;
    const SERVICE_API = process.env.REACT_APP_SERVICES_URL
    const [open, setOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [payInvoice, setIsPayInvoice] = useState(false);
    const [emailInvoice, setIsEmailInvoice] = useState(false);
    const [reminders, setReminders] = useState(false);
    const [scheduledInvoice, setScheduledInvoice] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [invoicenumber, setinvoicenumber] = useState();
    const handlePayInvoiceChange = (event) => {
        setIsPayInvoice(event.target.checked);
    };
    const handleEmailInvoiceChange = (event) => {
        setIsEmailInvoice(event.target.checked);
    };
    const handleRemindersChange = (event) => {
        setReminders(event.target.checked);
    };
    const handleScheduledInvoiceChange = (event) => {
        setScheduledInvoice(event.target.checked);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        const value = event.target.value;
        if (value.length <= charLimit) {
            setDescription(value);
            setCharCount(value.length);
        }
    };
    //for shortcodes
    const [showDropdown, setShowDropdown] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [filteredShortcuts, setFilteredShortcuts] = useState([]);
    const [shortcuts, setShortcuts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('contacts');

    const handleAddShortcut = (shortcut) => {
        const updatedTextValue = description + `[${shortcut}]`;
        if (updatedTextValue.length <= charLimit) {
            setDescription(updatedTextValue);
            setCharCount(updatedTextValue.length);
        }
        setShowDropdown(false);
    };

    const toggleDropdown = (event) => {
        setAnchorEl(event.currentTarget);
        setShowDropdown(!showDropdown);
    };





    useEffect(() => {
        // Simulate filtered shortcuts based on some logic (e.g., search)
        setFilteredShortcuts(shortcuts.filter((shortcut) => shortcut.title.toLowerCase().includes('')));
    }, [shortcuts]);


    useEffect(() => {
        // Set shortcuts based on selected option
        if (selectedOption === 'contacts') {
            const contactShortcuts = [
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
                { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
                { title: 'Contact Shortcodes', isBold: true, },
                { title: 'Contact Name', isBold: false, value: 'CONTACT_NAME' },
                { title: 'First Name', isBold: false, value: 'FIRST_NAME' },
                { title: 'Middle Name', isBold: false, value: 'MIDDLE_NAME' },
                { title: 'Last Name', isBold: false, value: 'LAST_NAME' },
                { title: 'Phone number', isBold: false, value: 'PHONE_NUMBER' },
                { title: 'Country', isBold: false, value: 'COUNTRY' },
                { title: 'Company name', isBold: false, value: 'COMPANY_NAME ' },
                { title: 'Street address', isBold: false, value: 'STREET_ADDRESS' },
                { title: 'City', isBold: false, value: 'CITY' },
                { title: 'State/Province', isBold: false, value: 'STATE / PROVINCE' },
                { title: 'Zip/Postal code', isBold: false, value: 'ZIP / POSTAL CODE' },
                { title: 'Custom field:Email', isBold: false, value: 'CONTACT_CUSTOM_FIELD:Email' },
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
                { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
                { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
                { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
                { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
                { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
                { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
                { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
                { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
                { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
                { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
                { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
                { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
                { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
                { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
                { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
                { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
                { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
                { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
                { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
                { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
                { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
                { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
                { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
            ];
            setShortcuts(contactShortcuts);
        } else if (selectedOption === 'account') {
            const accountShortcuts = [
                { title: 'Account Shortcodes', isBold: true },
                { title: 'Account Name', isBold: false, value: 'ACCOUNT_NAME' },
                { title: 'Custom field:Website', isBold: false, value: 'ACCOUNT_CUSTOM_FIELD:Website' },
                { title: 'Date Shortcodes', isBold: true },
                { title: 'Current day full date', isBold: false, value: 'CURRENT_DAY_FULL_DATE' },
                { title: 'Current day number', isBold: false, value: 'CURRENT_DAY_NUMBER' },
                { title: 'Current day name', isBold: false, value: 'CURRENT_DAY_NAME' },
                { title: 'Current week', isBold: false, value: 'CURRENT_WEEK' },
                { title: 'Current month number', isBold: false, value: 'CURRENT_MONTH_NUMBER' },
                { title: 'Current month name', isBold: false, value: 'CURRENT_MONTH_NAME' },
                { title: 'Current quarter', isBold: false, value: 'CURRENT_QUARTER' },
                { title: 'Current year', isBold: false, value: 'CURRENT_YEAR' },
                { title: 'Last day full date', isBold: false, value: 'LAST_DAY_FULL_DATE' },
                { title: 'Last day number', isBold: false, value: 'LAST_DAY_NUMBER' },
                { title: 'Last day name', isBold: false, value: 'LAST_DAY_NAME' },
                { title: 'Last week', isBold: false, value: 'LAST_WEEK' },
                { title: 'Last month number', isBold: false, value: 'LAST_MONTH_NUMBER' },
                { title: 'Last month name', isBold: false, value: 'LAST_MONTH_NAME' },
                { title: 'Last quarter', isBold: false, value: 'LAST_QUARTER' },
                { title: 'Last_year', isBold: false, value: 'LAST_YEAR' },
                { title: 'Next day full date', isBold: false, value: 'NEXT_DAY_FULL_DATE' },
                { title: 'Next day number', isBold: false, value: 'NEXT_DAY_NUMBER' },
                { title: 'Next day name', isBold: false, value: 'NEXT_DAY_NAME' },
                { title: 'Next week', isBold: false, value: 'NEXT_WEEK' },
                { title: 'Next month number', isBold: false, value: 'NEXT_MONTH_NUMBER' },
                { title: 'Next month name', isBold: false, value: 'NEXT_MONTH_NAME' },
                { title: 'Next quarter', isBold: false, value: 'NEXT_QUARTER' },
                { title: 'Next year', isBold: false, value: 'NEXT_YEAR' }
            ];
            setShortcuts(accountShortcuts);
        }
    }, [selectedOption]);
    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };
    //for table
    const [rows, setRows] = useState([]);
    const [servicedata, setServiceData] = useState([]);



    useEffect(() => {


        fetchServiceData();
      }, []);
      const fetchServiceData = async () => {
        try {
          const url = `${SERVICE_API}/workflow/services/servicetemplate`;
          const response = await fetch(url);
          const data = await response.json();
          console.log(data.serviceTemplate)
          setServiceData(data.serviceTemplate);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      const serviceoptions = servicedata.map((service) => ({
        value: service._id,
        label: service.serviceName,
      }));

    const handleServiceChange = (index, selectedOptions) => {
        const newRows = [...rows];
        newRows[index].productName = selectedOptions ? selectedOptions.label : '';
        setRows(newRows);

    };

    const handleServiceInputChange = (inputValue, actionMeta, index) => {
        if (actionMeta.action === 'input-change') {
            const newRows = [...rows];
            newRows[index].productName = inputValue;
            setRows(newRows);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        const newRows = [...rows];

        if (name === 'rate' || name === 'qty') {
            newRows[index][name] = newValue;

            const rate = parseFloat(newRows[index].rate.replace('$', '')) || 0;
            const qty = parseInt(newRows[index].qty) || 0;
            const amount = (rate * qty).toFixed(2);
            newRows[index].amount = `$${amount}`;
        } else {
            newRows[index][name] = newValue;
        }

        setRows(newRows);
    };



    const addRow = (isDiscountRow = false) => {
        const newRow = isDiscountRow
            ? { productName: '', description: '', rate: '$-10.00', qty: '1', amount: '$-10.00', tax: false, isDiscount: true }
            : { productName: '', description: '', rate: '$0.00', qty: '1', amount: '$0.00', tax: false, isDiscount: false };
        setRows([...rows, newRow]);
    };

    const deleteRow = (index) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
    };

   
    const [paymentMode, setPaymentMode] = useState('');
    const paymentsOptions = [
        { value: 'Bank Debits', label: 'Bank Debits' },
        { value: 'Credit Card', label: 'Credit Card' },
        { value: 'Credit Card or Bank Debits', label: 'Credit Card or Bank Debits' }
    ];
    const handlePaymentOptionChange = (event, selectedOption) => {
        setPaymentMode(selectedOption);
    };


    //****************Accounts */
    const [accountdata, setaccountdata] = useState([]);
    const [selectedaccount, setSelectedaccount] = useState();


    const handleAccountChange = (event, newValue) => {
        setSelectedaccount(newValue);

    }



    useEffect(() => {
        fetchAccountData();
    }, []);

    const fetchAccountData = async () => {
        try {
            const response = await fetch(`${ACCOUNT_API}/accounts/accountdetails`);
            const data = await response.json();
            setaccountdata(data.accounts);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // console.log(userdata);
    const accountoptions = accountdata.map((account) => ({
        value: account._id,
        label: account.accountName
    }));

    // team member
    const USER_API = process.env.REACT_APP_USER_URL;
    const [selecteduser, setSelectedUser] = useState('');

    const [userData, setUserData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const url = `${USER_API}/api/auth/users`;
            const response = await fetch(url);
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleuserChange = (event, selectedOptions) => {
        setSelectedUser(selectedOptions);

    };
    const options = userData.map((user) => ({
        value: user._id,
        label: user.username,
    }));

    //get all templateName Record 
    const INVOICE_API = process.env.REACT_APP_INVOICE_TEMP_URL
    const [invoiceTemplates, setInvoiceTemplates] = useState([]);



    const fetchInvoiceTemplates = async () => {
        try {

            const url = `${INVOICE_API}/workflow/invoicetemp/invoicetemplate`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch InvoiceTemplate');
            }
            const data = await response.json();
            setInvoiceTemplates(data.invoiceTemplate);
            console.log(data);
        } catch (error) {
            console.error('Error fetching Invoice Templates:', error);
        }
    };

    useEffect(() => {
        fetchInvoiceTemplates();
    }, []);

    const invoiceoptions = invoiceTemplates.map((invoice) => ({
        value: invoice._id,
        label: invoice.templatename,
    }));

    const [selectInvoiceTemp, setSelectedInvoiceTemp] = useState('');
    const handleInvoiceTempChange = (event, selectedOptions) => {
        setSelectedInvoiceTemp(selectedOptions);
        fetchinvoicetempbyid(selectedOptions.value);
    };

    const fetchinvoicetempbyid = async (id) => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        const url = `${INVOICE_API}/workflow/invoicetemp/invoicetemplate/${id}`;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.invoiceTemplate)
                setDescription(result.invoiceTemplate.description)
                setIsPayInvoice(result.invoiceTemplate.payInvoicewithcredits)
                setIsEmailInvoice(result.invoiceTemplate.sendEmailWhenInvCreated)
                setReminders(result.invoiceTemplate.sendReminderstoClients)

                const paymentMethod = ({
                    value: result.invoiceTemplate.paymentMethod,
                    label: result.invoiceTemplate.paymentMethod,
                });
                setPaymentMode(paymentMethod)
                // Assuming lineitems is an array of objects and each object matches the structure needed for rows
                console.log(result.invoiceTemplate.lineItems)
                const lineitems = result.invoiceTemplate.lineItems.map(item => ({
                    productName: item.productorService || '',
                    description: item.description || '',
                    rate: String(item.rate || '$0.00'), // Convert rate to string
                    qty: String(item.quantity || '1'), // Convert qty to string
                    amount: String(item.amount || '$0.00'), // Convert amount to string
                    tax: item.tax || false,
                    isDiscount: item.isDiscount || false
                }));
                setRows(lineitems);

            })
            .catch((error) => console.error(error));
    }
    const [startDate, setStartDate] = useState(null);
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    const [subtotal, setSubtotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const handleSubtotalChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setSubtotal(value);
    calculateTotal(value, taxRate);
  };

  const handleTaxRateChange = (event) => {
    const value = parseFloat(event.target.value) || 0;
    setTaxRate(value);
    calculateTotal(subtotal, value);
  };

  const calculateTotal = (subtotal, taxRate) => {
    const tax = subtotal * (taxRate / 100);
    setTaxTotal(tax);
    setTotalAmount((subtotal + tax).toFixed(2));
  };
  useEffect(() => {
    const calculateSubtotal = () => {
      let subtotal = 0;

      rows.forEach(row => {

        subtotal += parseFloat(row.amount.replace('$', '')) || 0;

      });
      console.log(subtotal)
      setSubtotal(subtotal);
      calculateTotal(subtotal, taxRate);
    };
    calculateSubtotal();
  }, [rows]);

  const INVOICE_NEW = process.env.REACT_APP_INVOICES_URL;
  const lineItems = rows.map(item => ({
    productorService: item.productName, // Assuming productName maps to productorService
    description: item.description,
    rate: item.rate.replace('$', ''), // Removing '$' sign from rate
    quantity: item.qty,
    amount: item.amount.replace('$', ''), // Removing '$' sign from amount
    tax: item.tax.toString() // Converting boolean to string
  }));
  const createinvoice = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      account: selectedaccount.value,
      invoicenumber: invoicenumber,
      invoicedate: startDate,
      description: description,
      invoicetemplate: selectInvoiceTemp.value,
      paymentMethod: paymentMode.value,
      teammember: selecteduser.value,
      emailinvoicetoclient: emailInvoice,
      scheduleinvoicedate: "Wed May 08 2024 00:00:00 GMT+0530 (India Standard Time)",
      scheduleinvoicetime: "12.00",
      payInvoicewithcredits: payInvoice,
      reminders: reminders,
      scheduleinvoice: scheduledInvoice,
      daysuntilnextreminder: "",
      numberOfreminder: "",
      lineItems: lineItems,
      summary: {
        subtotal: subtotal,
        taxRate: taxRate,
        taxTotal: taxTotal,
        total: totalAmount
      },
      active: "true"
    });

    // console.log(raw)
    // console.log(raw);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    const url = `${INVOICE_NEW}/workflow/invoices/invoice`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result && result.message === "Invoice created successfully") {
          toast.success("Invoice created successfully");
          handleClose();
          fetchInvoiceData();

        } else {
          toast.error(result.message || "Failed to create InvoiceTemplate");
        }
      })
      .catch((error) => console.error(error));
  }


  const [billingInvoice, setBillingInvoice] = useState([]);
  const fetchInvoiceData = async () => {
      try {
          const url = `${INVOICE_NEW}/workflow/invoices/invoice`;
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error('Failed to fetch email templates');
          }
          const data = await response.json();

          setBillingInvoice(data.invoice);

      } catch (error) {
          console.error('Error fetching email templates:', error);

      }
  };

  useEffect(() => {
    fetchInvoiceData();
  }, []);

  const [tempIdget, setTempIdGet] = useState("");
    const [openMenuId, setOpenMenuId] = useState(null);
    const toggleMenu = (_id) => {
      setOpenMenuId(openMenuId === _id ? null : _id);
      setTempIdGet(_id);
    };

  const columns = useMemo(() => [
    {
      accessorKey: 'invoicenumber',
      header: 'Invoice Number',

    },
    
    {
      accessorKey: 'Setting', header: 'Setting',
      Cell: ({ row }) => (
        <IconButton onClick={() => toggleMenu(row.original._id)} style={{ color: "#2c59fa" }}>
          <CiMenuKebab style={{ fontSize: "25px" }} />
          {openMenuId === row.original._id && (
            <Box sx={{ position: 'absolute', zIndex: 1, backgroundColor: '#fff', boxShadow: 1, borderRadius: 1, p: 1, left: '30px', m: 2 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}  >Edit</Typography>
              <Typography sx={{ fontSize: '12px', color: 'red', fontWeight: 'bold' }} onClick={() => handleDelete(row.original._id)}
              >Delete</Typography>
            </Box>
          )}
        </IconButton>

      ),

    },

  ], [openMenuId]);

  const table = useMaterialReactTable({
    columns,
    data: billingInvoice,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: "custom", // Render own filtering UI
    enableRowSelection: true, // Enable row selection
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    initialState: {
      columnPinning: { left: ["mrt-row-select", "tagName"], right: ['settings'], },
    },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.mode === "dark-theme" ? theme.palette.grey[900] : theme.palette.grey[50],
      }),
    },
  });

  const handleDelete = (_id) => {
    const requestOptions = {
        method: 'DELETE',
        redirect: 'follow',
    };
    const url = `${INVOICE_NEW}/workflow/invoices/invoice/`;
    fetch(url + _id, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to delete item');
            }
            return response.json();
        })
        .then((result) => {
            toast.success('Data deleted successfully');
            fetchInvoiceData();
          
        })
        .catch((error) => {
            console.error(error);
        });
};
    return (
        <Box>
            <Button type='button' variant="contained" onClick={handleOpen} >
                Create Invoice
            </Button>
<Box sx={{marginTop:3}}>
            <MaterialReactTable columns={columns} table={table} />
            </Box>
            <Drawer
                anchor='right'
                open={open}
                onClose={handleClose}
                classes={{ paper: 'custom-right-drawer' }}
                PaperProps={{
                    sx: {
                        width: '60%',
                        // padding: 2,

                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
                    <Typography variant="h6">Create Invoice</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider />
                <Box mt={3} p={2} sx={{ height: '80vh', overflowY: 'auto' }} className='create-invoice'>
                    <Box >

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid xs={6}>
                                <Box>
                                    <InputLabel sx={{ color: 'black' }}>Account name,ID or email</InputLabel>

                                    <Autocomplete
                                        options={accountoptions}
                                        value={selectedaccount}
                                        onChange={handleAccountChange}
                                        renderOption={(props, option) => (
                                            <Box
                                                component="li"
                                                {...props}
                                                sx={{ cursor: 'pointer', margin: '5px 10px' }} // Add cursor pointer style
                                            >
                                                {option.label}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                placeholder="Select Account"
                                                variant="outlined"
                                                size="small"
                                                sx={{ backgroundColor: '#fff' }}
                                            />
                                        )}
                                        sx={{ width: '100%', marginTop: '8px' }}
                                    />
                                </Box>

                            </Grid>
                            <Grid xs={6}>
                                <Box>
                                    <InputLabel sx={{ color: 'black' }}>Invoice Template</InputLabel>
                                    <Autocomplete

                                        options={invoiceoptions}
                                        sx={{ mt: 1, mb: 2, backgroundColor: '#fff' }}
                                        size='small'
                                        value={selectInvoiceTemp}
                                        onChange={handleInvoiceTempChange}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        getOptionLabel={(option) => option.label || ""}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}

                                                placeholder="Invoice Template"
                                            />
                                        )}
                                        isClearable={true}

                                    />

                                </Box>
                            </Grid>

                        </Grid>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid xs={6}>
                                <Box>
                                    <InputLabel sx={{ color: 'black' }}>Invoice Number</InputLabel>
                                    <TextField
                                        fullWidth
                                        onChange={(e) => setinvoicenumber(e.target.value)}
                                        placeholder="Invoice Number"
                                        size="small"
                                        sx={{ mt: 1 }}
                                    />

                                </Box>

                            </Grid>
                            <Grid xs={6}>
                                <Box>
                                    <InputLabel sx={{ color: 'black' }}>Choose payment method</InputLabel>
                                    <Autocomplete
                                        size='small'
                                        fullWidth
                                        sx={{ mt: 1 }}
                                        options={paymentsOptions}
                                        getOptionLabel={(option) => option?.label || ''}
                                        onChange={handlePaymentOptionChange}
                                        value={paymentMode}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder="Select Payment Mode" variant="outlined" />
                                        )}
                                        isOptionEqualToValue={(option, value) => option.value === value?.value}
                                        clearOnEscape
                                    />

                                </Box>
                            </Grid>

                        </Grid>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={2}>
                            <Grid xs={6}>
                                <Box>
                                    <FormControl fullWidth>
                                        <FormLabel sx={{ marginBottom: '8px', color: 'black' }}>Date</FormLabel>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker

                                                format="DD/MM/YYYY"
                                                sx={{ width: '100%', backgroundColor: '#fff' }}

                                                selected={startDate} onChange={handleStartDateChange}
                                                renderInput={(params) => <TextField {...params} size="small" />}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>


                                </Box>

                            </Grid>
                            <Grid xs={6}>
                                <Box>


                                    <label className='email-input-label'>Team Member</label>


                                    <Autocomplete

                                        options={options}
                                        sx={{ mt: 2, mb: 2, backgroundColor: '#fff' }}
                                        size='small'
                                        value={selecteduser}
                                        onChange={handleuserChange}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        getOptionLabel={(option) => option.label || ""}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}

                                                placeholder="Team Member"
                                            />
                                        )}
                                        isClearable={true}

                                    />

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
                                value={description}
                                onChange={handleChange}
                                placeholder="Description"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Typography sx={{ color: 'gray', fontSize: '12px', position: 'absolute', bottom: '15px', right: '15px' }}>
                                                {charCount}/{charLimit}
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                }}

                            />
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={toggleDropdown}
                                sx={{ mt: 2, }}
                            >
                                Add Shortcode
                            </Button>

                            <Popover
                                open={showDropdown}
                                anchorEl={anchorEl}
                                onClose={handleCloseDropdown}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <Box >
                                    <List className="dropdown-list" sx={{ width: '300px', height: '300px', cursor: 'pointer' }}>
                                        {filteredShortcuts.map((shortcut, index) => (
                                            <ListItem
                                                key={index}
                                                onClick={() => handleAddShortcut(shortcut.value)}
                                            >
                                                <ListItemText
                                                    primary={shortcut.title}
                                                    primaryTypographyProps={{
                                                        style: {
                                                            fontWeight: shortcut.isBold ? 'bold' : 'normal',
                                                        },
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Popover>
                        </Box>
                        <Box mt={2}>
                            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Additioal</Typography>
                            <Box mt={2}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={payInvoice}
                                            onChange={handlePayInvoiceChange}
                                            color="primary"

                                        />
                                    }
                                    label={"Pay invoice using client credits"}
                                />
                            </Box>
                            <Box mt={1}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={emailInvoice}
                                            onChange={handleEmailInvoiceChange}
                                            color="primary"

                                        />
                                    }
                                    label={"Email invoice to client"}
                                />
                            </Box>
                            <Box mt={1}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={reminders}
                                            onChange={handleRemindersChange}
                                            color="primary"

                                        />
                                    }
                                    label={"Reminders"}
                                />
                            </Box>
                            <Box mt={1}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={scheduledInvoice}
                                            onChange={handleScheduledInvoiceChange}
                                            color="primary"

                                        />
                                    }
                                    label={"Scheduled invoice"}
                                />
                            </Box>
                        </Box>

                        <Box className='invoice-section-three'>
                            <Box >
                                <Typography sx={{ mt: 2, fontWeight: 'bold' }} variant='h5'>Line Items</Typography>
                                <p style={{ color: 'grey', }}>Client-facing itemized list of products and services</p>
                            </Box>
                            {/* <Box >
                                <MaterialReactTable columns={columns} table={table} />
                            </Box> */}
                            <Box sx={{ overflowX: 'auto', width: '100%' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >PRODUCT OR SERVICE</TableCell>
                                            <TableCell>DESCRIPTION</TableCell>
                                            <TableCell>RATE</TableCell>
                                            <TableCell>QTY</TableCell>
                                            <TableCell>AMOUNT</TableCell>
                                            <TableCell>TAX</TableCell>
                                            <TableCell />
                                            <TableCell />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <TableRow key={index}>

                                                <TableCell>
                                                    <CreatableSelect
                                                        placeholder="Product or Service"
                                                        options={serviceoptions}
                                                        value={serviceoptions.find(option => option.label === row.productName) || { label: row.productName, value: row.productName }}
                                                        onChange={(selectedOption) => handleServiceChange(index, selectedOption)}
                                                        onInputChange={(inputValue, actionMeta) => handleServiceInputChange(inputValue, actionMeta, index)}
                                                        isClearable
                                                        styles={{
                                                            container: (provided) => ({
                                                                ...provided,
                                                                width: '180px',
                                                            }),
                                                            control: (provided) => ({
                                                                ...provided,
                                                                width: '180px',

                                                            }),
                                                        }}
                                                    />

                                                </TableCell>

                                                <TableCell>
                                                    <input type='text' name='description' value={row.description} onChange={(e) => handleInputChange(index, e)} style={{ border: 'none' }} placeholder='Description' />
                                                </TableCell>
                                                <TableCell>
                                                    <input type='text' name='rate' value={row.rate} onChange={(e) => handleInputChange(index, e)} style={{ border: 'none' }} />
                                                </TableCell>
                                                <TableCell>
                                                    <input type='text' name='qty' value={row.qty} onChange={(e) => handleInputChange(index, e)} style={{ border: 'none' }} />
                                                </TableCell>
                                                <TableCell className={row.isDiscount ? 'discount-amount' : ''}>{row.amount}</TableCell>
                                                <TableCell>
                                                    <Checkbox name='tax' checked={row.tax} onChange={(e) => handleInputChange(index, e)} />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton>
                                                        <BsThreeDotsVertical />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => deleteRow(index)}>
                                                        <RiCloseLine />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>

                            <Box style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
                                <Box onClick={() => addRow()} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'blue', fontSize: '18px' }}>
                                    <AiOutlinePlusCircle /> Line item
                                </Box>
                                <Box onClick={() => addRow(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'blue', fontSize: '18px' }}>
                                    <CiDiscount1 /> Discount
                                </Box>
                            </Box>



                            <Box>
                                <Box>
                                    <Typography sx={{ mt: 2, mb: 2 }} variant='h5'>Summary</Typography>
                                </Box>
                                <TableContainer component={Paper} >
                                    <Table sx={{ backgroundColor: '#fff' }}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>SUBTOTAL</TableCell>
                                                <TableCell>TAX RATE</TableCell>
                                                <TableCell>TAX TOTAL</TableCell>
                                                <TableCell>TOTAL</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    <input
                                                        type="number"
                                                        value={subtotal}
                                                        onChange={handleSubtotalChange}
                                                        style={{ border: 'none' }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <input
                                                        type="number"
                                                        value={taxRate}
                                                        onChange={handleTaxRateChange}
                                                        style={{ border: 'none' }}
                                                    />%
                                                </TableCell>
                                                <TableCell>${taxTotal.toFixed(2)}</TableCell>
                                                <TableCell>${totalAmount}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>


                        </Box>
                        <Box sx={{ pt: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
                            <Button variant="contained" color="primary" onClick={createinvoice}>Save</Button>
                            <Button variant="outlined">Cancel</Button>
                        </Box>

                    </Box>

                </Box>
            </Drawer>
        </Box>
    );
};

export default Invoices;

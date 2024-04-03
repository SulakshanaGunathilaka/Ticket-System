import { IconButton } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthenticationService';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import urls from "../common/Urls";
import CommonToasts from "../common/Toasts";

export default function StatusBar() {

    const user = AuthService.getCurrentUser();

    console.log("first name");
    console.log(user.user.firstName);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openReset, setOpen] = React.useState(false);

    const handleClickOpenReset = () => {
        setAnchorEl(null);
        setOpen(true);
    };

    const handleCloseReset = () => {
        setOpen(false);
    };

    const submitResetPassword =(data) => {
        const currentpassword = data.currentpassword;
        const newpassword = data.newpassword;
        const confirmpassword = data.confirmpassword;

        if (newpassword !== confirmpassword){
            CommonToasts.errorToast("Password mismatch !!");
        }else{
            try {
                axios({
                    method: "put",
                    url: urls.RESET_PASSWORD,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        "Authorization": `Bearer ` + user.jwt,
                    },
                    data: {
                        userId: user.user.userId,
                        currentPassword: currentpassword,
                        password: confirmpassword
                    },
                    mode: "cors",
                }).then((res) => {
                    console.log("response", res);
                    if (res.status == 200 && res.data.status=="success") {

                        CommonToasts.basicToast("Successfully Password Changed");
                    }
                }).catch((error) => {
                    CommonToasts.errorToast(error.message);

                });
            } catch (e) {
                CommonToasts.errorToast(e.message);

            }
        }

    };

    return (
        <div className='absolute right-6 top-4'>

            <div className="p-2 max-w-sm bg-white rounded-lg border-2 border-sky-400 shadow-md flex flex-col">
                <div className='flex flex-row justify-center content-center items-center ml-1 '>
                    <div className=" overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        
                        <svg className="absolute -left-1 w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                    </div>

                    <div className='mx-4 flex flex-col justify-center items-center '>
                        <p4 className=" text-black text-sm ">Welcome</p4>
                        <p4 className=" text-black text-sm ">{user.user.firstName === null ? "User": user.user.firstName}</p4>
                    </div>

                    <div className="grid grid-cols-3 my-2 justify-center items-center content-center text-center divide-x">
                   
                        {/*<Link end to="" className="p-2 bg-white w-fit h-fit hover:bg-gray-200 rounded-lg shadow-md ml-1">*/}
                        <Tooltip title="Notification" position="bottom" trigger="mouseenter">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#444444" className="w-6 h-6  ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />

                            </svg>
                            </Tooltip>
                        {/*</Link>*/}
                    
                        
                        {/*<Link end to="" className="p-2 bg-white w-fit h-fit hover:bg-gray-200 rounded-lg shadow-md ml-1">*/}
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                        <Tooltip title="Setting" position="bottom" trigger="mouseenter">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#444444" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            </Tooltip>
                        {/*</Link>*/}
                        </Button>

                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClickOpenReset}>Reset Password</MenuItem>
                        </Menu>

                        {/*reset password dialog start*/}
                        <Dialog
                            open={openReset}
                            onClose={handleCloseReset}
                            PaperProps={{
                                component: 'form',
                                onSubmit: (event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries(formData.entries());
                                    submitResetPassword(formJson);
                                    handleCloseReset();
                                },
                            }}
                        >
                            <DialogTitle>Reset Password</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please reset your password
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="currentpassword"
                                    name="currentpassword"
                                    label="current password"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="newpassword"
                                    name="newpassword"
                                    label="New Password"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                    min={6}
                                />
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                    min={6}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Submit</Button>
                            </DialogActions>
                        </Dialog>

                        {/*reset password dialog end*/}


                        <Link end to="/login" className=" p-2 bg-white w-fit h-fit hover:bg-gray-200 rounded-lg shadow-md ml-1 ">
                        <Tooltip title="Log Out" position="bottom" trigger="mouseenter">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#444444" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            </Tooltip>
                        </Link>
                      

                 

                    </div>


                </div>

            </div>

        </div>
    );
}
import { React, useState, useEffect } from "react";
import CommonSpinners from "../common/Spinners";
import CommonToasts from "../common/Toasts";
import TitleText from "../components/TitleText";
import UserService from "../services/UserService";
import axios from "axios";
import Badge from "react-badges";
import SearchBar from "../components/SearchBar";
import ModalLable from "../components/ModalLable";
import AuthService from "../services/AuthenticationService";
import { Link } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { Fragment } from "react";
// import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import AuthService from "../services/AuthenticationService";
import {
  Accordion,
  AccordionHeader,
  AccordionBody, IconButton,
} from "@material-tailwind/react";
// import TitleText from "../components/TitleText";
import FormInputText from "../components/FormInputText";
import FormInputField from "../components/FormInputField";
import { useForm } from 'react-hook-form';
import urls from "../common/Urls";
import {Tooltip} from "react-tippy";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Alert, Box, Grid, InputAdornment, Paper, Snackbar, TextField} from "@mui/material";
import {PublishedWithChanges} from "@mui/icons-material";
import SockJsClient from "react-stomp";
import ReactPaginate from "react-paginate";


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}


export default function EmployeePage() {


  const [userList, setUserList] = useState([]);
  // const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showBulkUserUpload, setBulkUserUpload] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [data, setData] = useState(null);
  const [userDetails, setUserDetails] = useState("");
  const [selectedTicket, setSelectedTicket] = useState('');

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  const user1 = AuthService.getCurrentUser();



  const performSearch = async () => {
    try {
      const response = await axios.get(urls.USER_FILTER_URL, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Authorization: `Bearer ${user1.jwt}`,
        },
        params: {
          q: searchQuery,
          status: status,
        },
      });

      console.log(response.data);
      setUserList(response.data.body.content);
    } catch (error) {
      console.error(error);
    }
  };


  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage =10;
  const pageVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(userList.length / usersPerPage);
  console.log("User List ",userList.length);
  console.log("Page Visited ",pageVisited);
  console.log("Page count ",pageCount);

  const changePage = ({selected}) => {
    console.log("selected page",selected);
    setPageNumber(selected);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  console.log("roles");
  console.log(user1.user.roles[0].name);

  useEffect(() => {
    console.log("initial load");

    async function getAllUsers() {
      setLoading(true);
      try {
        const response = await UserService.getAllUsers(1, 5);
        //await delay(2000);

        console.log("Hellooo", response)
        setData(response.data.body.content);
        console.log("user data: ",response.data.body);
        setUserList(response.data.body);

        // setTotalPages(response.data.body.totalPages);
        // setCurrentPage(1);
        setLoading(false);
      } catch (e) {
        CommonToasts.errorToast(e.message);
        setLoading(false);
      }
    }

    getAllUsers();
    // setCurrentPage(1);
  }, []);

  // useEffect(() => {
  //   console.log("updatePageNumbers");
  //
  //   updatePageNumbers();
  // }, [totalPages]);


  async function getNewPage(pageNo) {
    setLoading(true);
    try {
      const response = await UserService.getAllUsers(pageNo, 5);
      //await delay(2000);

      setData(response.data.body.content);
      setUserList(response.data.body);
      setUserList(response.data)
      setTotalPages(response.data.body.totalPages);
      setCurrentPage(pageNo);
      setLoading(false);
    } catch (e) {
      CommonToasts.errorToast(e.message);
      setLoading(false);
    }
  }

  // function updatePageNumbers() {
  //   const pageNumberArray = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pageNumberArray.push(i);
  //   }
  //   // setPageNumbers(pageNumberArray);
  // }

  const handleDelete = async (userId) => {
    // loginUser(username,password)
    setLoading(true);
    await delay(1000);
    console.log("start");
    console.log(loading);

    try {
      await UserService.DeleteUser(userId).then(() => {
        console.log("sucess");
        setLoading(false);

        // CommonToasts.basicToast("Successfully Logged In")
        // navigate("/home")
      });
    } catch (e) {
      console.log("Error");
      console.log(e);
      setLoading(false);
      // CommonToasts.errorToast(e.message)
    }
  };
  const handleClick = (userId) => {
    setShowModal(true);
    handleDelete(userId);
  };




  const ViewUser = (userId) => {
    // const UserID = props.userID
    console.log(userId);
    axios({
      method: "get",
      url: urls.USER_BASE_URL + userId,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization:
          `Bearer ` +
          user1.jwt,
      },
      data: null,

      mode: "cors",
    }).then((res) => {
      console.log("response", res);
      // var users = res.data.body;
      setedituserDetails(res.data.body);
      // setShowModal2(true);

      // setUserDetails(users);

    });
  };

  const [open, setOpen] = useState(0);


  console.log("test", user1)

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const [state, setState] = useState({
    firstName: "",
    // otherNames: "",
    lastName: "",
    // email: "",
    // password: "",
    // nicNo: "",
    // joinDate: "",
    userStatus: "",
    primaryContactNo: "",
    secondaryContactNo: "",
    // gender: "",
    // dateOfBirth: "",

    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",

    accountNo: "",
    bankName: "",
    bankBranch: "",
    bankAccountType: "",

    designationName: "",
    designationLevel: "",


    departmentname: "",
    agency: "",

    // rolesname: "",

    // privilegesname: "",
    // roles: ""







  });



  const { register, handleSubmit, formState: { errors }, } = useForm({});



  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const finalSubmit = (data) => {
    let submitValues = {
      firstName: data.firstName,
      // otherNames: state.otherNames,
      lastName: data.lastName,
      // email: state.email,
      // password: state.password,
      // nicNo: state.nicNo,
      // joinDate: state.joinDate,
      primaryContactNo: data.primaryContactNo,
      secondaryContactNo: data.secondaryContactNo,
      // gender: state.gender,
      // dateOfBirth: state.dateOfBirth,
      userStatus: data.userStatus,

      address: {
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        province: data.province,
      },

      bankDetails: {
        accountNo: data.accountNo,
        bankName: data.bankName,
        bankBranch: data.bankBranch,
        bankAccountType: data.bankAccountType,
      },

      department: {
        name: data.name,
        agency: data.agency,
      },

      // roles: {
      //   name:state.rolesname,
      //   privileges: [
      //     {
      //       name: state.privilegesname,
      //       roles: [state.roles],
      //     }
      //   ]
      // },

      designation: {
        designationName: data.designationName,
        designationLevel: data.designationLevel,
      },

    };

    console.log(data);
    try {
      axios({
        method: "put",
        url: urls.USER_BASE_URL+ `${edituserDetails.id}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Authorization": `Bearer ${user1.jwt}`,
        },
        data: submitValues,
        mode: "cors",
      }).then((res) => {
        console.log("response", res);
        if (res.status === 200) {

          CommonToasts.basicToast("Successfully Edited");
          // setUserList(res.data)
        }
      }).catch((error) => {
        CommonToasts.errorToast(error.message);
        setLoading(false);
      });
    } catch (e) {
      CommonToasts.errorToast(e.message);
      setLoading(false);
    }


  };


  //Edit user new//

  const [edituserDetails, setedituserDetails] = useState({
    id: '',
    firstName: '',

    lastName: '',

    primaryContactNo: '',
    secondaryContactNo: '',

    userStatus: '',

    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      province: '',
    },

    bankDetails: {
      accountNo: '',
      bankName: '',
      bankBranch: '',
      bankAccountType: '',
    },

    department: {
      name: '',
      agency: '',
    },


    designation: {
      designationName: '',
      designationLevel: '',
    },
  });









  const EditUser = () => {
    try {
      axios({
        method: "put",
        url: urls.USER_BASE_URL+`${edituserDetails.id}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Authorization": `Bearer ${user1.jwt}`,
        },
        data: edituserDetails,
        mode: "cors",
      }).then((res) => {
        console.log("response", res);
        if (res.status === 200) {

          CommonToasts.basicToast("Successfully Edited");
          // setUserList(res.data)
        }
      }).catch((error) => {
        CommonToasts.errorToast(error.message);
        setLoading(false);
      });
    } catch (e) {
      CommonToasts.errorToast(e.message);
      setLoading(false);
    }
  };


  const handleClickView2 = (userId) => {
    // ViewUser(userId);
    console.log("User id: ",userId);
    showUserDetails(userId);
    setShowModal3(true);
  };

  const [updateUserData,setUpdateUserData] =useState({
    id:0,
    userStatus:""
  })

  const showUserDetails = (userId) =>{
    axios({
      method: "get",
      url: urls.USER_BASE_URL + userId,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization:
            `Bearer ` +
            user1.jwt,
      },
      data: null,

      mode: "cors",
    }).then((res) => {
      console.log("response user details", res);
      // var users = res.data.body;
      var userid = res.data.body.id;
      var status = res.data.body.userStatus;
      setUpdateUserData({
        id:userid,
        userStatus:status
      });
      // setShowModal2(true);
      console.log("set user data: ",updateUserData);
      // setUserDetails(users);

    });
  }

  const updateUserStatus =() =>{
    console.log("updated User Data from Button: ",updateUserData);

    if (updateUserData.userStatus === ''){
      CommonToasts.errorToast("Please select valid status");
    }else {


      axios({
        method: "PATCH",
        url: urls.UPDATE_USER_STATUS + updateUserData.id,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          Authorization:
              `Bearer ` +
              user1.jwt,
        },
        params: {
          status: updateUserData.userStatus
        },


        mode: "cors",
      }).then((res) => {
        console.log("update user status: ", res);
        // var users = res.data.body;
        setUpdateUserData({
          id: 0,
          userStatus: ""
        });
        // setShowModal2(true);
        console.log("set user data: ", updateUserData);
        // setUserDetails(users);
        CommonToasts.basicToast("Status Updated");


      });
    }
  }



  const handleClickView = (userId) => {
    ViewUser(userId);
    setShowModal1(true);
  };

  // const handleClickedit = (userId) => {
  //   finalSubmit(userId);
  //   setShowModal2(true);
  // };
  const handleClickUpdate = (userId) => {
    finalSubmit(userId);
    setShowModal2(true);
    ViewUser(userId);
  };


  const UserStatus = (userId) => {
    axios({
      method: "put",
      url: urls.USER_BASE_URL+ userId,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        Authorization:
          `Bearer ` +
          user1.jwt,
      },
      data: {
        userStatus: userStatus,
        // userId: parseInt(userId),
        // leaveApplicationId: parseInt(leaveApplicationId),

      },
      // withCredentials: true,
      mode: "cors",
    }).then((res) => {
      console.log("response", res);
      if (res.status == 200) {
        alert("Successfully Added");
        //   toast('Added Successfully' + res.data.body.user.firstName);
        // setBookID(res.data.body.bookId)
        // setUserStatus(res.data.body)
        // navigate("/")
      }
    });
  };

  // const handleClickUpdate = (userId) => {
  //   ViewUser (userId)
  //   setShowModal2(true);
  // };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };




  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const getEmployeePage = (page) => {
    axios({
      method: 'get',
      url: urls.GET_ALL_USERS_URL,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: `Bearer ${user1.jwt}`,
      },
      mode: 'cors',
    })
      .then((res) => {
        console.log('response', res);
        if (res.status === 200) {
          // setTotalPages(res.data.totalPages);
          setUserList(res.data.body);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getEmployeePage(currentPage);
  }, [currentPage]);



  const handleView = (data) => {
    // ViewTicketDetails (data)
    setedituserDetails(data)

    setShowModal3(true)
  };


  console.log("test update Ticket", edituserDetails)


  // bulk user upload

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };

    const handleUpload = async () => {
      if (!selectedFile) {
        setUploadMessage('Please select an Excel file to upload.');
        setOpenSnackbar(true);
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post(urls.BULK_USER_UPLOAD, formData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Authorization": `Bearer ${user1.jwt}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status ===200){
          CommonToasts.basicToast("Excel file uploaded successfully!");
          setOpenSnackbar(true);
          setSelectedFile(null);
          setBulkUserUpload(false);
          getEmployeePage();

        }else{
          CommonToasts.errorToast("Error uploading file. Please try again.");
          setOpenSnackbar(true);
          setSelectedFile(null);
          setBulkUserUpload(false);
        }

      } catch (error) {
        console.error('Upload error:', error);
        setUploadMessage('Error uploading file. Please try again.');
        setOpenSnackbar(true);
      }
    };

    const handleSnackbarClose = () => {
      setOpenSnackbar(false);
    };


  let onConnected = () => {
    console.log("connected to ws");
  }

  let onReceived=(data) => {
    console.log("ws data user data ", data);
    setUserList(data);
  }




  return (
    <>

      <SockJsClient url={urls.WEBSOCKET}
                    topics={['/topic/users']}
                    onConnect ={onConnected}
                    onDisconnect = {console.log("Ws Disconnected !")}
                    onMessage ={msg => onReceived(msg)}
                    debug={false}
      />

      <div className=" bg-grey h-fit w-full ">
        <TitleText titleText="Employees" />




        {loading ? CommonSpinners.pageSpinner("Fetching Users")
          :



          <div className=" absolute mt-4  w-[82%] bg-white rounded-lg border-2 border-gray-200 shadow-md">

            <div class="space-y-10">


              <div className="flex items-center p-3 space-x-6 bg-sky-300  shadow-lg hover:shadow-xl">

                <div className="flex bg-white p-2 w-96 space-x-4 rounded-lg">


                  <input
                      className="bg-white  outline-none"
                      type="text"
                      placeholder="Search......"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      onKeyDown={handleKeyDown}
                  />
                </div>


                <div className="p-1 bg-white w-10 h-10 hover:bg-gray-200 rounded-lg shadow-md mx-1 ">
                  <button onClick={performSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6 mt-1 mx-1 ">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                    </svg>

                  </button>
                </div>

                <div className="w-48">
                  <select
                      id="type"
                      className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="DEACTIVATED">DEACTIVATED</option>
                  </select>
                </div>
                <div className="flex justify-between">

                  <button
                      className="p-1 bg-white w-10 h-10 hover:bg-gray-200 rounded-lg shadow-md mx-1 absolute right-16 top-3"
                      type="button"

                      onClick={() => setBulkUserUpload(true)}
                  >
                    <Tooltip title="Bulk User Upload" position="bottom" trigger="mouseenter " className="right-16 top-3">
                      {/*<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"*/}
                      {/*     stroke="currentColor" className="w-6 h-6 mt-1 mx-1 ">*/}
                      {/*  <path stroke-linecap="round" stroke-linejoin="round"*/}
                      {/*        d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>*/}
                      {/*</svg>*/}
                      <CloudUploadIcon/>
                    </Tooltip>
                  </button>


                </div>

              </div>
            </div>


            {/* {user && ( */}
            <table className="table-auto m-4 border-separate border-spacing-y-2">
              <thead>
              <tr>
                <th className="text-center w-64" scope="col">Employee ID</th>
                <th className="text-center w-64" scope="col">First Name</th>
                <th className="text-center w-64">Last Name</th>
                <th className="text-center w-64">Email</th>
                <th className="text-center w-64">Role</th>
                <th className="text-center w-64">Status</th>
                {/* <th className="text-center w-64">Commands</th> */}
              </tr>
              </thead>
              <tbody>
              {/* const items = userList.map((user) => ( */}
              {userList?.slice(pageVisited, pageVisited + usersPerPage).map((user) => (
                  <tr className="" key={user.id}>
                    <td className="text-center">{user.employeeId}</td>
                    <td className="text-center">{user.firstName}</td>
                    <td className="text-center">{user.lastName}</td>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">{user.roles[0]?.name}</td>
                    <td className="text-center">
                      {user.userStatus === "ACTIVE" ? (
                          <span
                              className="m-2 px-3 py-1 bg-green-200 hover:bg-green-300 rounded-full text-sm font-semibold text-green-600">
                          ACTIVE
                        </span>
                      ) : user.userStatus === "INACTIVE" ? (
                          <span
                              className="m-2 px-3 py-1 bg-red-200 hover:bg-red-300 rounded-full text-sm font-semibold text-red-600">
                          INACTIVE
                        </span>
                      ) : user.userStatus === "DEACTIVATED" ? (
                          <span
                              className="m-2 px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded-full text-sm font-semibold text-blue-600">
                          DEACTIVATED
                        </span>
                      ) : (
                          <span
                              className="m-2 px-3 py-1 bg-green-200 hover:bg-green-300 rounded-full text-sm font-semibold text-green-600">
                          DORMANT
                        </span>
                      )}
                    </td>
                    <td>
                      {((user1.user.roles[0].name == "ADMIN" || user1.user.roles[0].name == "IT_ADMIN") && (user1.user.userId !== user.id)) ? (

                          <button
                              type="button"
                              class="p-2 bg-white w-fit h-fit hover:bg-gray-200 rounded-lg shadow-md mx-1"
                              onClick={() => handleClickView2(user.id)}
                          >
                          <PublishedWithChanges/>

                          </button>
                      ) : null}
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>

            <br/>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"} />


          </div>




        }






      </div>


      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700">
                <div className="mt-3 sm:flex">
                  <button
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>

                  <div className="p-6 text-center">
                    <svg
                      aria-hidden="true"
                      class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this product?
                    </h3>
                    <button
                      type="button"
                      class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      onClick={() => setShowModal(false)}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      type="button"
                      class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      onClick={() => setShowModal(false)}
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {showModal1 ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal1(false)}
            ></div>
            <div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h5 className="text-4xl font-bold text-sky-600">
                      User Details
                    </h5>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setShowModal1(false)}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    {/* <form> */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">First Name</h3>
                          <p className="text-gray-600">
                            {edituserDetails.firstName}
                          </p>
                        </div>
                      </div>

                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Last Name</h3>
                          <p className="text-gray-600">
                            {edituserDetails.lastName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full p-4 shadow-md lg:max-w-lg">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-gray-600">{edituserDetails.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">
                            Primary Contact
                          </h3>
                          <p className="text-gray-600">
                            {edituserDetails.primaryContactNo}
                          </p>
                        </div>
                      </div>

                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">
                            Secondary Contact
                          </h3>
                          <p className="text-gray-600">
                            {edituserDetails.secondaryContactNo}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">User Status</h3>
                          <p className="text-gray-600">
                            {edituserDetails.userStatus}
                          </p>
                        </div>
                      </div>

                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Gender</h3>
                          <p className="text-gray-600">{edituserDetails.gender}</p>
                        </div>
                      </div>
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">NIC</h3>
                          <p className="text-gray-600">{edituserDetails.nicNumber}</p>
                        </div>
                      </div>

                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Date Of Birth</h3>
                          <p className="text-gray-600">
                            {edituserDetails.dateOfBirth}
                          </p>
                        </div>


                      </div>
                    </div>
                    <br />
                    {/* <Link to="/edituser">
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Update
                      </button>
                    </Link> */}
                  </div>
                </div>


              </div>


            </div>
          </div>


        </>
      ) : null}


      {showModal2 ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto w-full">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal2(false)}
            ></div>
            <div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700">
                  <form onSubmit={handleSubmit(finalSubmit)}>
                    <Fragment>
                      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(1)}>
                          Basic Information
                        </AccordionHeader>
                        <AccordionBody>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col mb-2">
                              <FormInputText formInputText="First Name" />
                              <FormInputField
                                value={state.firstName}
                                inputHandle={inputHandle}
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="First Name"
                                {...register("firstName", { required: "This is required" })}
                              />



                            </div>
                            <div className="flex flex-col mb-2">
                              <FormInputText formInputText="Last Name" />
                              <FormInputField
                                value={state.lastName}
                                inputHandle={inputHandle}
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Last Name"
                                {...register("lastName", { required: "This is required" })}
                              />

                            </div>


                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col mb-2">
                              <FormInputText formInputText="User Status" />
                              <FormInputField
                                value={state.userStatus}
                                inputHandle={inputHandle}
                                type="text"
                                name="userStatus"
                                id="userStatus"
                                placeholder="userStatus"
                                {...register("userStatus", { required: "This is required" })}
                              />

                            </div>

                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col mb-2">
                              <FormInputText formInputText="Primary Contact" />
                              <FormInputField
                                value={state.primaryContactNo}
                                inputHandle={inputHandle}
                                type="text"
                                name="primaryContactNo"
                                id="primaryContactNo"
                                placeholder="Primary Contact"
                                {...register("primaryContactNo", { required: "This is required" })}
                              />

                            </div>
                            <div className="flex flex-col mb-2">
                              <FormInputText formInputText="Secoundary Contact" />
                              <FormInputField
                                value={state.secondaryContactNo}
                                inputHandle={inputHandle}
                                type="text"
                                name="secondaryContactNo"
                                id="secondaryContactNo"
                                placeholder="Secoundary Contact"
                                {...register("secondaryContactNo", { required: "This is required" })}
                              />

                            </div>
                          </div>

                        </AccordionBody>
                      </Accordion>
                      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(2)}>
                          Address
                        </AccordionHeader>
                        <AccordionBody>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col mb-2">
                              <FormInputText formInputText="Address Line1" />
                              <FormInputField
                                value={state.addressLine1}
                                inputHandle={inputHandle}
                                type="text"
                                name="addressLine1"
                                id="addressLine1"
                                placeholder="Address Line1"
                                {...register("addressLine1", { required: "This is required" })}
                              />

                            </div>
                            <div className="flex flex-col mb-2">
                              <FormInputText formInputText="Address Line2" />
                              <FormInputField
                                value={state.addressLine2}
                                inputHandle={inputHandle}
                                type="text"
                                name="addressLine2"
                                id="addressLine2"
                                placeholder="Address Line2"
                                {...register("addressLine2", { required: "This is required" })}
                              />

                            </div>
                          </div>
                          <div className="flex flex-col mb-2">
                            <FormInputText formInputText="City" />
                            <FormInputField
                              value={state.city}
                              inputHandle={inputHandle}
                              type="text"
                              name="city"
                              id="city"
                              placeholder="City"
                              {...register("city", { required: "This is required" })}
                            />

                          </div>
                          <div className="flex flex-col mb-2">
                            <FormInputText formInputText="Province" />
                            <FormInputField
                              value={state.province}
                              inputHandle={inputHandle}
                              type="text"
                              name="province"
                              id="province"
                              placeholder="Province"
                              {...register("province", { required: "This is required" })}
                            />

                          </div>

                        </AccordionBody>
                      </Accordion>
                      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(3)}>
                          Bank Details
                        </AccordionHeader>
                        <AccordionBody>
                          <div className="flex flex-col mb-2">
                            <FormInputText formInputText="Account Number" />
                            <FormInputField
                              value={state.accountNo}
                              inputHandle={inputHandle}
                              type="text"
                              name="accountNo"
                              id="accountNo"
                              placeholder="Account Number"
                              {...register("accountNo", { required: "This is required" })}
                            />

                          </div>
                          <div className="flex flex-col mb-2">
                            <FormInputText formInputText="Bank Name" />
                            <FormInputField
                              value={state.bankName}
                              inputHandle={inputHandle}
                              type="text"
                              name="bankName"
                              id="bankName"
                              placeholder="Bank Name"
                              {...register("bankName", { required: "This is required" })}
                            />

                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col mb-2">
                              <FormInputText formInputText="Bank Branch" />
                              <FormInputField
                                value={state.bankBranch}
                                inputHandle={inputHandle}
                                type="text"
                                name="bankBranch"
                                id="bankBranch"
                                placeholder="Bank Branch"
                                {...register("bankBranch", { required: "This is required" })}
                              />

                            </div>
                            <div className="flex flex-col mb-2">
                              <FormInputText formInputText="Account Type" />
                              <FormInputField
                                value={state.bankAccountType}
                                inputHandle={inputHandle}
                                type="text"
                                name="bankAccountType"
                                id="bankAccountType"
                                placeholder="Account Type"
                                {...register("bankAccountType", { required: "This is required" })}
                              />



                            </div>
                          </div>

                        </AccordionBody>
                      </Accordion>
                      <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(4)}>
                          Designation
                        </AccordionHeader>
                        <AccordionBody>
                          <div className="flex flex-col mb-2">
                            <FormInputText formInputText="Designation Name" />
                            <FormInputField
                              value={state.designationName}
                              inputHandle={inputHandle}
                              type="text"
                              name="designationName"
                              id="designationName"
                              placeholder="Designation Name"
                              {...register("designationName", { required: "This is required" })}
                            />

                          </div>
                          <div className="flex flex-col mb-2">
                            <FormInputText formInputText="Designation Level" />
                            <FormInputField
                              value={state.designationLevel}
                              inputHandle={inputHandle}
                              type="text"
                              name="designationLevel"
                              id="designationLevel"
                              placeholder="Designation Level"
                              {...register("designationLevel", { required: "This is required" })}
                            />

                          </div>



                        </AccordionBody>
                      </Accordion>
                      <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
                        <AccordionHeader onClick={() => handleOpen(5)}>
                          Department
                        </AccordionHeader>
                        <AccordionBody>
                          <div className="flex flex-col mb-2">
                            <FormInputText formInputText="Department name" />
                            <FormInputField
                              value={state.departmentname}
                              inputHandle={inputHandle}
                              type="text"
                              name="departmentname"
                              id="departmentname"
                              placeholder="departmentname"
                              {...register("departmentname", { required: "This is required" })}
                            />

                          </div>
                          <div className="flex flex-col mb-2">
                            <FormInputText formInputText="Agency" />
                            <FormInputField
                              value={state.agency}
                              inputHandle={inputHandle}
                              type="text"
                              name="agency"
                              id="agency"
                              placeholder="agency"
                              {...register("agency", { required: "This is required" })}
                            />

                          </div>

                          <div className="grid grid-cols-2 gap-4">

                          </div>

                          <button
                            onClick={finalSubmit}
                            className="px-3 py-2 text-lg rounded-md w-full text-black bg-sky-500"


                          >
                            Submit
                          </button>
                        </AccordionBody>
                      </Accordion>


                    </Fragment>
                  </form>
                </div>


              </div>


            </div>
          </div>


        </>
      ) : null}






      {showModal3 ? (
          <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div
                  className="fixed inset-0 w-full h-full bg-black opacity-40"
                  onClick={() => setShowModal3(false)}
              ></div>
              <div>

                <div className="flex items-center min-h-screen px-4 py-8">
                  <div
                      className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700 modal-container1">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h5 className="text-4xl font-bold text-blue-400">
                        Update User Status
                      </h5>
                      <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => setShowModal3(false)}
                      >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                              fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <input type={"hidden"}/>
                    <div className="w-full">
                      <label htmlFor="employeeId"
                             className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300">
                        Employee ID - {updateUserData.id}
                      </label>
                    </div>
                    <div className="w-full flex items-center">
                      <label htmlFor="status"
                             className="block mb-2 w-32 text-sm font-medium text-gray-900 dark:text-gray-600">
                        Status
                      </label>
                      <select
                          id="status"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 p-2.5 ml-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white justify-end"
                          // onClick={handleSearchStatus}
                          onChange={(e) => {
                            setUpdateUserData({
                              id: updateUserData.id,
                              userStatus: e.target.value
                            });
                            console.log(e.target.value)
                          }
                          }
                          // value={status}
                      >
                        {/* <option value="">Status</option> */}
                        <option value="">Select Status</option>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="DEACTIVATED">DEACTIVATED</option>
                      </select>
                    </div>
                    <br/>
                    <button
                        type="button"
                        className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                        // onClick={CloseComment}
                        onClick={() => {
                          updateUserStatus();
                          setShowModal3(false);
                        }}
                    >
                      Update User Status
                    </button>


                  </div>
                </div>


              </div>


            </div>
          </>
      ) : null}

      {showBulkUserUpload ? (
          <>

            <Box display="flex" justifyContent="center">
              <Paper
                  className="fixed inset-0 w-full h-full bg-dark opacity-40 "
                  onClick={() => setBulkUserUpload(false)}
                  elevation={24} square sx={{width: '100%'}}
                  variant="outlined"
              ></Paper>
              <div>

                <div className="flex items-center min-h-screen px-4 py-8 ">
                  <div
                      className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700 modal-container1">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h5 className="text-4xl font-bold text-blue-400">
                        Bulk User Upload
                      </h5>
                      <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => setBulkUserUpload(false)}
                      >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                              fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <Grid sx={{my: 1, mx: 1}}>
                      <label>Please Upload the Excel sheet ..</label>
                      <br></br>
                      <br></br>
                      <div className="flex">
                        <TextField sx={{width: '500px'}}
                                   id="file-upload"
                                   type="file"
                                   variant="outlined"
                                   accept=".xlsx"
                                   onChange={handleFileChange}
                                   InputProps={{
                                     endAdornment: (
                                         <InputAdornment position="end">

                                         </InputAdornment>
                                     ),
                                   }}
                        />
                      </div>

                      <br></br>
                      <div className="flex justify-end items-end">
                        <Button variant="contained" component="span" onClick={handleUpload}>
                          Upload
                        </Button>
                      </div>
                      <Snackbar
                          open={openSnackbar}
                          autoHideDuration={6000}
                          onClose={handleSnackbarClose}
                      >
                        <Alert onClose={handleSnackbarClose}
                               severity={uploadMessage.includes('Error') ? 'error' : 'success'}>
                          {uploadMessage}
                        </Alert>
                      </Snackbar>
                    </Grid>
                    <div>

                    </div>

                  </div>
                </div>
              </div>


            </Box>


          </>
      ) : null}


      <style js>{`
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
.ellipsis {
  overflow-wrap: break-word;
  white-space: nowrap;
  overflow:hidden;
  text-overflow: ellipsis;
  width:250px;
  font-weight: bold;
  text-align: left;
}
.break {
  overflow-wrap: break-word;
  white-space: break;
  overflow:hidden;
  width:400px;
  text-align: left;
}
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  overflow-y: auto;
  width: 800px;
  height: 500px;
  margin: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
}
.modal-container1 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  overflow-y: auto;
  width: 800px;
  height: 500px;
  margin: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
}

  
  
        
      `}</style>

    </>
  );
}
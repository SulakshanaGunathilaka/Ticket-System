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
  AccordionBody,
} from "@material-tailwind/react";
// import TitleText from "../components/TitleText";
import FormInputText from "../components/FormInputText";
import FormInputField from "../components/FormInputField";
import { useForm } from 'react-hook-form';


function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
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
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);
   const [searchQuery, setSearchQuery] = useState('');

  const [data, setData] = useState(null);
  const [userDetails, setUserDetails] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  const user1 = AuthService.getCurrentUser();

 

  const performSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users/filter', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Authorization: `Bearer ${user1.jwt}`,
        },
        params: {
          q: searchQuery,
          status:status,
        },
      });

      console.log(response.data);
      setUserList(response.data.body.content);
    } catch (error) {
      console.error(error);
    }
  };

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

        console.log("Hellooo",response)
        setData(response.data.body.content);
        setUserList(response.data.body);
        
        setTotalPages(response.data.body.totalPages);
        setCurrentPage(1);
        setLoading(false);
      } catch (e) {
        CommonToasts.errorToast(e.message);
        setLoading(false);
      }
    }

    getAllUsers();
    setCurrentPage(1);
    updatePageNumbers();
  }, []);

  useEffect(() => {
    console.log("updatePageNumbers");

    updatePageNumbers();
  }, [totalPages]);
 

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

  function updatePageNumbers() {
    const pageNumberArray = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumberArray.push(i);
    }
    setPageNumbers(pageNumberArray);
  }

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
      url: "http://localhost:8080/users/"+ userId,
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
      var users = res.data.body;
      // console.log("lkhsfjhskf", users)
      setUserDetails(users);
      // localStorage.setItem("Singleuser", JSON.stringify(users))
    });
  };

  const [open, setOpen] = useState(0);
  // const [userDetails, setUserDetails] = useState("");

  console.log("test",user1)

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

  const finalSubmit = (userId) => {
    let submitValues = {
      firstName: state.firstName,
      // otherNames: state.otherNames,
      lastName: state.lastName,
      // email: state.email,
      // password: state.password,
      // nicNo: state.nicNo,
      // joinDate: state.joinDate,
      primaryContactNo: state.primaryContactNo,
      secondaryContactNo: state.secondaryContactNo,
      // gender: state.gender,
      // dateOfBirth: state.dateOfBirth,
      userStatus: state.userStatus,

      address: {
        addressLine1: state.addressLine1,
        addressLine2: state.addressLine2,
        city: state.city,
        province: state.province,
      },

      bankDetails: {
        accountNo: state.accountNo,
        bankName: state.bankName,
        bankBranch: state.bankBranch,
        bankAccountType: state. bankAccountType,
      },

      department: {
        name: state.departmentname,
        agency: state.agency,
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
        designationName: state.designationName,
        designationLevel: state.designationLevel,
      },

    };
    console.log(state);
    axios({
      method: "put",
      url: "http://localhost:8080/users/"+ userId,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: `Bearer ` + user1.jwt,
      },
      data: submitValues,

      mode: "cors",
    }).then((res) => {
      console.log("response", res);
      // console.log("final " + state);
      setState(res.data.body);
    });


  };




  

  
    
  

  const handleClickView = (userId) => {
    ViewUser(userId);
    setShowModal1(true);
  };

  // const handleClickedit = (userId) => {
  //   finalSubmit(userId);
  //   setShowModal2(true);
  // };


  const UserStatus = (userId) => {
    axios({
      method: "put",
      url: "http://localhost:8080/users/" + userId,
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

  const handleClickUpdate = (userId) => {
    finalSubmit(userId);
    setShowModal2(true);
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };



  return (
    <>
      <div className=" bg-grey h-fit w-full ">
        <TitleText titleText="Employees" />




        {loading ? CommonSpinners.pageSpinner("Fetching Users")
          :



          <div className=" absolute mt-4 h-[82%] w-[82%] bg-white rounded-lg border border-gray-200 shadow-md">

            <div class="space-y-10">





    


<div class="flex items-center p-3 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl">

  <div class="flex bg-gray-200 p-2 w-96 space-x-4 rounded-lg">
   
  

<input
        className="bg-gray-200  outline-none"
        type="text"
        placeholder="Search......"
        value={searchQuery}
        onChange={handleSearchInputChange}
        onKeyDown={handleKeyDown}
      />
  </div>
 

  <div class="p-1 bg-white w-10 h-10 hover:bg-gray-200 rounded-lg shadow-md mx-1 ">
                <button onClick={performSearch}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-1 mx-1 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>

                </button>
              </div>

              <div className="w-48">
                    <select
                      id="type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select type</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="DEACTIVATED">DEACTIVATED</option>
                      <option value="DORMANT">DORMANT</option>
                    </select>
                  </div>

</div>
</div>



            {/* {user && ( */}
            <table className="table-auto m-4 border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="text-center w-64" scope="col">First Name</th>
                  <th className="text-center w-64">Last Name</th>
                  <th className="text-center w-64">Email</th>
                  <th className="text-center w-64">Status</th>
                  {/* <th className="text-center w-64">Commands</th> */}
                </tr>
              </thead>
              <tbody>
                {/* const items = userList.map((user) => ( */}
                {userList?.map((user) => (
                  <tr className="" key={user.id}>
                    <td className="text-center">{user.firstName}</td>
                    <td className="text-center">{user.lastName}</td>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">
                      {/* {" "}
                      {user.userStatus == "ACTIVE" ? (
                        <span className="m-2 px-3 py-1 bg-green-200 hover:bg-green-300 rounded-full text-sm font-semibold text-green-600">
                          ACTIVE
                        </span>
                      ) : user.userStatus == " INACTIVE" ?  (
                        <span className="m-2 px-3 py-1 bg-red-200 hover:bg-red-300 rounded-full text-sm font-semibold text-red-600">
                          INACTIVE
                        </span>
                      ): user.userStatus == " DEACTIVATED" ? (
                        <span className="m-2 px-3 py-1 bg-red-200 hover:bg-red-300 rounded-full text-sm font-semibold text-red-600">
                           DEACTIVATED
                        </span>):(<span className="m-2 px-3 py-1 bg-red-200 hover:bg-red-300 rounded-full text-sm font-semibold text-red-600">
                        DORMANT
                        </span>)} */}
                        
                        {user.userStatus}
                    </td>
                    <td className="text-center">
                      {/* {console.log("admin"+ user1.roles.name)} */}
                      {user1.user.roles[0].name == "ADMIN" ? (
                        <button
                          type="button"
                          class="p-2 bg-white w-fit h-fit hover:bg-gray-200 rounded-lg shadow-md mx-1"
                          onClick={() => handleClick(user.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      ) : null

                      }
                      {user1.user.roles[0].name == "ADMIN" ? (
                        <button
                          type="button"
                          class="p-2 bg-white w-fit h-fit hover:bg-gray-200 rounded-lg shadow-md mx-1"
                          onClick={() => handleClickUpdate(user.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                      ) : null

                      }
                    </td>
                    <td>
                      <button
                        type="button"
                        class="p-2 bg-white w-fit h-fit hover:bg-gray-200 rounded-lg shadow-md mx-1"
                        onClick={() => handleClickView(user.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* )} */}

            <nav className='block'>
              <ul className='flex pl-0 pb-4 rounded list-none flex-wrap justify-end mr-8'>
                <li>
                  {pageNumbers.map((number) => (
                    <a
                      onClick={() => {
                        getNewPage(number);
                      }}
                      href='#'
                      className={
                        currentPage === number
                          ? "bg-blue border-sky-500  mx-1 text-sky-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border-2 rounded-lg text-sm font-medium"
                          : "bg-white border-gray-300 mx-1 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border-2 rounded-lg text-sm font-medium"
                      }
                    >
                      {number}
                    </a>
                  ))}
                </li>
              </ul>
            </nav>

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
                            {userDetails.firstName}
                          </p>
                        </div>
                      </div>

                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Last Name</h3>
                          <p className="text-gray-600">
                            {userDetails.lastName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full p-4 shadow-md lg:max-w-lg">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="text-gray-600">{userDetails.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">
                            Primary Contact
                          </h3>
                          <p className="text-gray-600">
                            {userDetails.primaryContactNo}
                          </p>
                        </div>
                      </div>

                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">
                            Secondary Contact
                          </h3>
                          <p className="text-gray-600">
                            {userDetails.secondaryContactNo}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">User Status</h3>
                          <p className="text-gray-600">
                            {userDetails.userStatus}
                          </p>
                        </div>
                      </div>

                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Gender</h3>
                          <p className="text-gray-600">{userDetails.gender}</p>
                        </div>
                      </div>
                    </div>


                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">NIC</h3>
                          <p className="text-gray-600">{userDetails.nicNumber}</p>
                        </div>
                      </div>

                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Date Of Birth</h3>
                          <p className="text-gray-600">
                            {userDetails.dateOfBirth}
                          </p>
                        </div>
                       
                       
                      </div>
                    </div>
                    <br/>
                    <Link to="/edituser">
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Update
                        </button>
                        </Link>
                  </div>
                </div>


              </div>


            </div>
          </div>


        </>
      ) : null}


{showModal2 ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
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
                {/* <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button> */}
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
                    {/* <p className="text-red-400 text-xs"> {errors.firstName?.message}</p> */}
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
                    {/* <p className="text-red-400 text-xs"> {errors.lastName?.message}</p> */}
                  </div>
                    {/* <p className="text-red-400 text-xs"> {errors.otherNames?.message}</p> */}
                  {/* </div> */}
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
                    {/* <p className="text-red-400 text-xs"> {errors.lastName?.message}</p> */}
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
                    {/* <p className="text-red-400 text-xs"> {errors.primaryContactNo?.message}</p> */}
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
                    {/* <p className="text-red-400 text-xs"> {errors.secondaryContactNo?.message}</p> */}
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
                    {/* <p className="text-red-400 text-xs"> {errors.addressLine1?.message}</p> */}
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
                    {/* <p className="text-red-400 text-xs"> {errors.addressLine2?.message}</p> */}
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
                  {/* <p className="text-red-400 text-xs"> {errors.city?.message}</p> */}
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
                  {/* <p className="text-red-400 text-xs"> {errors.province?.message}</p> */}
                </div>
                {/* <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">
                SAVE
              </button> */}
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
                  {/* <p className="text-red-400 text-xs"> {errors.accountNo?.message}</p> */}
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
                  {/* <p className="text-red-400 text-xs"> {errors.bankName?.message}</p> */}
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
                    {/* <p className="text-red-400 text-xs"> {errors.bankBranch?.message}</p> */}
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


                    {/* <p className="text-red-400 text-xs"> {errors.accountType?.message}</p> */}
                  </div>
                </div>
                {/* <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">
                SAVE
              </button> */}
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
                  {/* <p className="text-red-400 text-xs"> {errors.designationName?.message}</p> */}
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
                  {/* <p className="text-red-400 text-xs"> {errors.designationLevel?.message}</p> */}
                </div>

                {/* <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg" >
                SAVE
              </button> */}
          
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
                  {/* <p className="text-red-400 text-xs"> {errors.employmentStatus?.message}</p> */}
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
                  {/* <p className="text-red-400 text-xs"> {errors.start?.message}</p> */}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* <div className="flex flex-col mb-2">
                    <FormInputText formInputText="Duration" />
                    <FormInputField
                      value={state.duration}
                      inputHandle={inputHandle}
                      type="text"
                      name="duration"
                      id="duration"
                      placeholder="duration"
                      {...register("duration", { required: "This is required" })}
                    /> */}
                    {/* <p className="text-red-400 text-xs">{errors.duration?.message}</p> */}
                  {/* </div> */}
                </div>
                {/* <button class="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg">
                SAVE
              </button> */}
                  <button
                  onClick={finalSubmit}
                  className="px-3 py-2 text-lg rounded-md w-full text-black bg-sky-500"


                >
                  Submit
                </button>
              </AccordionBody>
            </Accordion>
            {/* <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(6)}>
                Roles
              </AccordionHeader>
              <AccordionBody>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Roles name" />
                  <FormInputField
                    value={state.rolesname}
                    inputHandle={inputHandle}
                    type="text"
                    name="rolesname"
                    id="rolesname"
                    placeholder="rolesname"
                    {...register("rolesname", { required: "This is required" })}
                  /> */}
                  {/* <p className="text-red-400 text-xs"> {errors.value?.message}</p> */}
                {/* </div>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Privilages name" />
                  <FormInputField
                    value={state.privilegesname}
                    inputHandle={inputHandle}
                    type="text"
                    name="privilegesname"
                    id="privilegesname"
                    placeholder="privilegesname"
                    {...register("privilegesname", { required: "This is required" })}
                  /> */}
                  {/* <p className="text-red-400 text-xs"> {errors.type?.message}</p> */}
                {/* </div>
                <div className="flex flex-col mb-2">
                  <FormInputText formInputText="Roles" />
                  <FormInputField
                    value={state.roles}
                    inputHandle={inputHandle}
                    type="text"
                    name="roles"
                    id="roles"
                    placeholder="roles"
                    {...register("roles", { required: "This is required" })}
                  /> */}
                  {/* <p className="text-red-400 text-xs"> {errors.type?.message}</p> */}
                {/* </div> */}
                {/* <button
                  onClick={finalSubmit}
                  className="px-3 py-2 text-lg rounded-md w-full text-black bg-sky-500"


                >
                  Submit
                </button>
              </AccordionBody> */}
            {/* </Accordion> */}

          </Fragment>
        </form>
                </div>


              </div>


            </div>
          </div>


        </>
      ) : null}


    
    </>
  );
}
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



 //---------------Users Filter Function----------------//

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


  //-----------------UserService.getAllUsers Function--------------//

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
 


//-----------------GetNewPage Function--------------//



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

//-----------------UpdatePageNumbers Function--------------//

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

//-----------------ViewUser Function--------------//

  const ViewUser = (userId) => {
    // const UserID = props.userID
    console.log(userId);
    axios({
      method: "get",
      url: "http://localhost:8080/users/" + userId,
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

  




  

  
    
  

  const handleClickView = (userId) => {
    ViewUser(userId);
    setShowModal1(true);
  };

 


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

  const handleClickUserStatusUpdate = (userId) => {
    // UserStatus(userId);
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





    


<div class="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl">
  <div class="flex bg-gray-100 p-4 w-72 space-x-4 rounded-lg">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>


<input
        className="bg-gray-100 outline-none"
        type="text"
        placeholder="Article name or keyword..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        onKeyDown={handleKeyDown}
      />
  </div>
  <div class="relative">
  <div className="flex py-3 px-4 rounded-lg text-gray-500 font-semibold cursor-pointer">
      <span>All categorie</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
 
  </div>
  <div class="bg-black py-3 px-5 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer">
    <button  onClick={performSearch}  >
      <span>Search</span>
    </button>
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
                 
                </tr>
              </thead>
              <tbody>
               
                {userList?.map((user) => (
                  <tr className="" key={user.id}>
                    <td className="text-center">{user.firstName}</td>
                    <td className="text-center">{user.lastName}</td>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">
                     
                    </td>
                    <td className="text-center">
                     
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

    
    </>
  );
}
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import TitleText from "../components/TitleText";
import { useForm } from "react-hook-form";
import AuthService from "../services/AuthenticationService";
import LeaveService from "../services/LeaveService";
import CommonToasts from "../common/Toasts";
import SearchBar from "../components/SearchBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Leave() {
  const [showModal, setShowModal] = React.useState(false);
  const [showModal1, setShowModal1] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);
  const [showModal3, setShowModal3] = React.useState(false);
  const [showModal4, setShowModal4] = React.useState(false);
  const [createLeaveForm, setCreateLeave] = React.useState("");
  const [leaveType, setleaveType] = useState("");
  const [reason, setReason] = useState("");
  const [userId, setUserId] = useState(0);
  // const [userid, setuserid] = useState(0);
  const [leaveRequestStatus, setleaveRequestStatus] = useState("");
  const [leaveApplicationId, setleaveApplicationId] = useState(0);
  const [date, setDate] = useState("");
  const [leaveDetails, setleaveDetails] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [historyDetails, setHistoryDetails] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);


  const user1 = AuthService.getCurrentUser();

  console.log("roles");
  console.log(user1.user.roles[0].name);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      leaveType: "",
      reason: "",
      userId: "",
      date: "",
      userid:"",
      leaveRequestStatus:"",
      leaveApplicationId:"",
    },
  });

  const {

    formState: { error1 }
  } = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",

    },
  });

  const LeaveApprove = (e) => {
    axios({
      method: "put",
      url: "http://localhost:8080/leaveApplication/",
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
        leaveRequestStatus: leaveRequestStatus,
        userId: parseInt(userId),
        leaveApplicationId: parseInt(leaveApplicationId),
        
      },
      // withCredentials: true,
      mode: "cors",
    }).then((res) => {
      console.log("response", res);
      if (res.status == 200) {
        alert("Successfully Added");
        //   toast('Added Successfully' + res.data.body.user.firstName);
        // setBookID(res.data.body.bookId)
        // setShowModal(false)
        // navigate("/")
      }
    });
  };
  const dateFilter = (e) => {
    axios({
      method: "post",
      url: "http://localhost:8080/leaveApplication/",
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
        startDate: startDate,
        endDate: endDate
      },
      // withCredentials: true,
      mode: "cors",
    }).then((res) => {
      console.log("response", res);
      if (res.status == 200) {
       alert("Successfully Added");
        // toast('Added Successfully');
        // setBookID(res.data.body.bookId)
        // setShowModal(false)
        // navigate("/")
      }
    });
  };


  const getAllLeaveList = (e) => {
    axios({
      method: "get",
      url: "http://localhost:8080/leaveApplication/",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,PATCH,OPTIONS",
        Authorization:
          `Bearer ` +
          user1.jwt,
      },
      data: null,

      mode: "cors",
    })
      .then((res) => {
        console.log("response", res.data.body);
        var users = res.data.body;
        // setAllUserList(users)
        localStorage.setItem("AllLeaveList", JSON.stringify(users));
      })
      .catch((err) => {
        console.log("error ; " + err.name);
      });
  };

  const usersObj = localStorage.getItem("AllLeaveList");
  const AllLeaveList = JSON.parse(usersObj);
  console.log(AllLeaveList);

  useEffect(() => {
    getAllLeaveList();
  }, getAllLeaveList());

  const DeleteUser = (leaveApplicationId) => {
    // const UserID = props.userID
    console.log(leaveApplicationId);
    axios({
      method: "delete",
      url: "http://localhost:8080/leaveApplication/" + leaveApplicationId,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        Authorization:
          `Bearer ` +
          user1.jwt,
      },
      data: null,

      mode: "cors",
    }).then((res) => {
      console.log("response", res);
      // var users = res.data;
      // localStorage.setItem("UserList", JSON.stringify(users))
    });
  };
  const handleClick = (leaveApplicationId) => {
    setShowModal(true);
    DeleteUser(leaveApplicationId);
  };

  const AddLeave = (e) => {
    axios({
      method: "post",
      url: "http://localhost:8080/leaveApplication/",
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
        leaveType: leaveType,
        reason: reason,
        userId: userId,
        date: date,
      },
      // withCredentials: true,
      mode: "cors",
    }).then((res) => {
      console.log("response", res);
      if (res.status == 200) {
        alert("Successfully Added");
        //   toast('Added Successfully' + res.data.body.user.firstName);
        // setBookID(res.data.body.bookId)
        // setShowModal(false)
        // navigate("/")
      }
    });
  };

  


 
  const ViewUser1 = (e) => {
    // const UserID = props.userID
    // console.log(userId);
    axios({
      method: "get",
      url: "http://localhost:8080/users/" + user1.user.userId,
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
  useEffect(() => {
    ViewUser1();
  }, []);

  // const userobj = localStorage.getItem("user");
  // const user = JSON.parse(userobj);
  // console.log("user" + user.userId);

  const ViewUser = (leaveApplicationId) => {
    // const UserID = props.userID
    console.log(leaveApplicationId);
    axios({
      method: "get",
      url: "http://localhost:8080/leaveApplication/" + leaveApplicationId,
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
      setleaveDetails(users);
      // localStorage.setItem("Singleuser", JSON.stringify(users))
    });
  };

  const handleClickView = (leaveApplicationId) => {
    ViewUser(leaveApplicationId);
    setShowModal3(true);
  };

  const UserHistory = (e) => {
    // const UserID = props.userID
    // console.log(leaveApplicationId)
    axios({
      method: "get",
      url:
        "http://localhost:8080/leaveApplication/filterby/" + user1.user.userId,
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
      setHistoryDetails(users);
      // localStorage.setItem("AllHistoryUserId", JSON.stringify(users))historyDetails
    });
  };

  // const usersObj1 = localStorage.getItem("AllHistoryUserId");
  // const AllHistoryUserId = JSON.parse(usersObj1);
  // console.log(AllHistoryUserId);

  useEffect(() => {
    UserHistory();
  }, []);

  return (
    <>
      <div className=" bg-grey h-fit w-full ">
        <TitleText titleText="Leave Details" />

        <div className=" absolute mt-4 h-[82%] w-[75%] bg-white rounded-lg border border-gray-200 shadow-md align-middle">
          <div>
            <div className="flex justify-between items-center pb-4">
              <button
                className="relative text-white bg-gradient-to-br from-sky-600 to-sky-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center top-2 left-3"
                onClick={() => setShowModal2(true)}
              >
                Leave Apply
              </button>
            </div>
            {/* <div className="grid space-x-1 lg:grid-cols-3"> */}
              {/* <div className="px-4 py-4 bg-sky-800 border-2 border-sky-400 border-spacing-y-2 rounded"> */}
                {/* <h3 className="text-2xl text-center text-white"> */}
                  {/* {console.log(user1.user.roles[0].name)} */}
                  {/* {userDetails.user.leaveAllocation.totalAllocation}  */}
                  {/* {console.log(userDetails.user1.leaveAllocation)} */}
                {/* </h3> */}
                {/* <p className="text-center text-white"> */}
                  {/* {userDetails.leaveAllocation[0].leaveType} */}
                {/* </p> */}
              {/* </div> */}
              {/* <div className="px-4 py-4 bg-sky-800 border-2 border-sky-400 border-spacing-y-2 rounded"> */}
                {/* <h3 className="text-2xl text-center text-white">{userDetails.leaveAllocation[0].totalAllocation}</h3> */}
                {/* <p className="text-center text-white">{userDetails.leaveAllocation[0].leaveType}</p> */}
              {/* </div> */}
              {/* <div className="px-4 py-4 bg-sky-800 border-2 border-sky-400 border-spacing-y-2 rounded"> */}
                {/* <h3 className="text-2xl text-center text-white">{userDetails.leaveAllocation[0].totalAllocation}</h3> */}
                {/* <p className="text-center text-white">{userDetails.leaveAllocation[0].leaveType}</p> */}
              {/* </div> */}
            {/* </div> */}
            <br />
            <div className="flex left-4 px-3 py-3">
              {/* <div class="flex justify-center">
                <div class="mb-3 xl:w-96">
                  <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
                    <input type="search" class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon3"/>
                  </div>
                </div>
              </div> */}
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
            </div>
            <br />
            {user1.user.roles[0].name == "ADMIN" ? (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead>
                  <tr>
                    <th scope="col" className="py-3 px-6 text-center">
                      User ID
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      First Name
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Last Name
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Email
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Date
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Leave Type
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AllLeaveList?.map((blog) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      {console.log("all", AllLeaveList)}
                      <th className="text-center w-64">{blog.userid}</th>
                      <td className="text-center w-64">{blog.firstName}</td>
                      <td className="text-center w-64">{blog.lastName}</td>
                      <td className="text-center w-64">{blog.email}</td>
                      <td className="text-center w-64">{blog.date}</td>
                      <td className="text-center w-64">{blog.leaveType}</td>
                      <td className="text-center w-64">
                        {" "}
                        {blog.leaveRequestStatus == "APPROVED" ? (
                          <span className="m-2 px-3 py-1 bg-green-200 hover:bg-green-300 rounded-full text-sm font-semibold text-green-600">
                            APPROVED
                          </span>
                        ) : blog.leaveRequestStatus == "PENDING" ? (
                          <span className="m-2 px-3 py-1 bg-yellow-200 hover:bg-yellow-300 rounded-full text-sm font-semibold text-yellow-600">
                            PENDING
                          </span>
                        ) : (
                          blog.leaveRequestStatus ==
                          "REJECTED"(
                            <span className="m-2 px-3 py-1 bg-red-200 hover:bg-red-300 rounded-full text-sm font-semibold text-red-600">
                              REJECTED
                            </span>
                          )
                        )}
                      </td>
                      <td className="text-center">
                        {/* <button
                          type="button"
                          className="p-2 bg-white w-fit h-fit hover:bg-gray-200 rounded-lg shadow-md mx-1"
                          onClick={() => setShowModal1(true)}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                            <path
                              fill-rule="evenodd"
                              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button> */}

                        <button
                          type="button"
                          className="p-2 bg-white w-fit h-fit hover:bg-gray-200 rounded-lg shadow-md mx-1"
                          onClick={() => handleClick(blog.leaveApplicationId)}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="p-2 bg-white w-fit h-fit hover:bg-gray-200 rounded-lg shadow-md mx-1"
                          onClick={() =>
                            handleClickView(blog.leaveApplicationId)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
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
            ) : null}
            {user1.user.roles[0].name == "EMPLOYEE" ? (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead>
                  <tr>
                    <th scope="col" className="py-3 px-6 text-center">
                      ID
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Leave Type
                    </th>
                    {/* <th scope="col" className="py-3 px-6 text-center">
                  Reason
                  </th> */}
                    <th scope="col" className="py-3 px-6 text-center">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Date
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Reason
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historyDetails.map((blog) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      {/* {console.log("all", blog.user.userId)} */}
                      <th className="text-center w-64">
                        {blog.leaveApplicationId}
                      </th>
                      <td className="text-center w-64">{blog.leaveType}</td>
                      {/* <td className="text-center w-64">{blog.reason}</td> */}
                      <td className="text-center w-64">
                        {blog.leaveRequestStatus}
                      </td>
                      <td className="text-center w-64">{blog.date}</td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="p-2 text-black bg-white w-fit h-fit hover:bg-gray-200 rounded-lg shadow-md mx-1"
                          onClick={() => setShowModal4(true)}
                        >
                          Reason
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
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
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      aria-hidden="true"
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
                    <span className="sr-only">Close modal</span>
                  </button>

                  <div className="p-6 text-center">
                    <svg
                      aria-hidden="true"
                      className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
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
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      onClick={() => setShowModal(false)}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Update Leave Details
                  </h3>
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
                <div className="p-6 space-y-6">
                  <form>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-6">
                        <label
                          for="leaveapplicationid"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Leave application ID
                        </label>
                        <input
                          type="text"
                          id="leaveapplicationid"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          for="userid"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          User ID
                        </label>
                        <input
                          type="text"
                          id="userid"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-6">
                        <label
                          for="leaverequeststatus"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Leave request status
                        </label>
                        <input
                          type="text"
                          id="leaverequeststatus"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          for="leavetype"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Leave type
                        </label>
                        <select className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light">
                          <option>ANNUAL</option>
                          <option>SICK</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        for="reason"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Reason
                      </label>
                      <textarea
                        id="reason"
                        rows="4"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      ></textarea>
                    </div>
                    <div className="mb-6">
                      <label
                        for="text"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </form>
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
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Apply Leave Details
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setShowModal2(false)}
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
                <div className="p-6 space-y-6">
                  <form>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-6">
                        <label
                          for="userid"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          User ID
                        </label>
                        <input
                          type="text"
                          id="userid"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          onChange={(e) => setUserId(e.target.value)}
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          for="text"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                          required
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        for="leavetype"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Leave type
                      </label>
                      <select
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        onChange={(e) => setleaveType(e.target.value)}
                      >
                        <option>SELECT</option>
                        <option>ANNUAL</option>
                        <option>SICK</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label
                        for="reason"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Reason
                      </label>
                      <textarea
                        id="reason"
                        rows="4"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        onChange={(e) => setReason(e.target.value)}
                      ></textarea>
                    </div>

                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={AddLeave}
                    >
                      Submit
                    </button>
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
                <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h5 className="text-4xl font-bold text-sky-600">
                      Leave Details
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
                  <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                    {/* <form> */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">
                            Leave Application Id
                          </h3>
                          <p className="text-gray-600">
                            {leaveDetails.leaveApplicationId}
                          </p>
                        </div>
                      </div>

                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Leave Type</h3>
                          <p className="text-gray-600">
                            {leaveDetails.leaveType}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full p-4 shadow-md lg:max-w-lg">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Reoson</h3>
                        <p className="text-gray-600">{leaveDetails.reason}</p>
                      </div>
                    </div>
                    <div className="w-full p-4 shadow-md lg:max-w-lg">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">
                          Leave Request Status
                        </h3>
                        <p className="text-gray-600">
                          {leaveDetails.leaveRequestStatus}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full p-4 shadow-md lg:max-w-lg">
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">Date</h3>
                          <p className="text-gray-600">{leaveDetails.date}</p>
                        </div>
                      </div>
                    </div>
                    {user1.user.roles[0].name == "ADMIN" ? (
                        
                        <div className="w-full p-4 shadow-md lg:max-w-lg">
                          <div className="space-y-2">
                            <div><center>Leave Handle</center></div>
                          <h3 className="text-lg font-semibold">Leave Application ID</h3>
                          <input
                          type="text"
                          id="text"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                         
                          value={leaveDetails.leaveApplicationId}
                          onChange={(e) => setleaveApplicationId(e.target.value)}
                        />
                         <h3 className="text-lg font-semibold">UserId</h3>
                        <input
                          type="text"
                          id="text"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                         value={leaveDetails.userId}
                         onChange={(e) => setUserId(e.target.value)}
                        />
                            <h3 className="text-lg font-semibold">Status</h3>
                            <select
                              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                              onChange={(e) => setleaveRequestStatus(e.target.value)}>
                              <option>Select</option>
                              <option>PENDING</option>   
                              <option>APPROVED</option>
                              <option>REJECTED</option>
                            </select>

                            <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={LeaveApprove}
                    >
                      Update
                    </button>
                          </div>
                        </div>
                    
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {showModal4 ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal4(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Update Leave Details
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => setShowModal4(false)}
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
                <div class="modal-body relative p-4">
                  {/* {console.log("reason"+historyDetails.user.reason)} */}
                  {historyDetails.reason}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}  </>
  );
}

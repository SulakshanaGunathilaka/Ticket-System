import { React, useState, useEffect } from "react";
import CommonSpinners from "../common/Spinners";
import CommonToasts from "../common/Toasts";
import TitleText from "../components/TitleText";
import axios from "axios";
import AuthService from "../services/AuthenticationService";
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
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  MenuItem,
  Select,
  Button,
} from "@material-tailwind/react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import useDidMountEffect from "../common/didMountEffect";
import UserService from "../services/UserService";
import Ticket from "./Ticket";
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import urls from "../common/Urls";

import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import SockJsClient from 'react-stomp';





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

export default function TicketPage1() {


  const [userList, setUserList] = useState([]);
  // const [page, setPage] = useState([]);
  // const [totalPages, setOffset] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [totalPages, setTotalPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showTicketHistoryModel, setTicketHistoryModel] = useState(false);
  const [showEmployeeCloseModel, setShowEmployeeCloseModel] = useState(false);
  const [showDeleteTicketModel, setShowDeleteTicketModel] = useState(false);
  const [deleteStatus, set] = useState(false);

  const [userStatus, setUserStatus] = useState("");
  const [status, setStatus] = useState("");
  const [status1, setStatus1] = useState("");
  const [user, setUser] = useState(null);
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [userId1, setUserId1] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState('');
  const [selectedUserId,setSelectedUserId] =useState('');

  const [selectedTicket2, setSelectedTicket2] = useState({
    status: '',
    description: '',
    title: '',
    userId: '',
    ticketId: '',




  });

  const [refreshFlag, setRefreshFlag] = useState(false)
  const [tickets, setTickets] = useState([])
  // const [ticketId, setTicketId] = useState([]);
  const [id, setId] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [sendEmail, setsendEmail] = useState('');
  const [recipient, setrecipient] = useState('');


  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      userId: "",
      type: "",
      description: "",
      title: "",
      sendEmail: true,
      recipient: ""
    }

  });

  const user1 = AuthService.getCurrentUser();

  console.log("current user details : "+ user1.user.userId);

// websocket
//   useEffect(() => {
//     connect()
//   }, []);
//    var stompClient =null;
//
//    const connect = () =>{
//      let Sock = new SockJS(urls.WEBSOCKET);
//      stompClient = over(Sock);
//      stompClient.connect({}, onConnected, onError);
//    };
//
//    const onConnected = () => {
//
//      stompClient.subscribe("/topic/tickets", onTicketReceived);
//      console.log("Connected .......");
//    }
//
//   const onTicketReceived = (payload) => {
//      let payloadData = JSON.parse(payload.body);
//      console.log("payload Data ", payloadData);
//   };
//
//    const onError = () =>{
//      console.log("Error in Connecting to WS");
//    };


  useEffect(() => {
    console.log("initial load");

    async function getAllUsers() {
      setLoading(true);
      try {
        const response = await UserService.getAllUsers(1, 5);
        //await delay(2000);

        console.log("Hellooo", response)
        // setData(response.data.body.content);
        setUserList(response.data.body);

        // setTotalPages(tickets?.searchResults?.body?.totalPages);
        // setCurrentPage(1);
        setLoading(false);
      } catch (e) {
        CommonToasts.errorToast(e.message);
        setLoading(false);
      }
    }

    getAllUsers();
    // setCurrentPage(1);
    // updatePageNumbers();
  }, []);

  const CreatTicket = (e) => {
    const sendEmail = true;
    const recipient = user1.user.email;
    try {
      axios({
        method: "post",
        url: urls.CREATE_TICKET,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Authorization": `Bearer ` + user1.jwt,
        },
        data: {
          userId: user1.user.userId,
          type: type,
          description: description,
          title: title,
        },
        params: {
          sendEmail: sendEmail,
          recipient: recipient,
        },
        mode: "cors",
      }).then((res) => {
        console.log("response", res);
        if (res.status == 200) {

          CommonToasts.basicToast("Successfully Ticket Added");
          setShowModal1(false);
          AllTicketBasedOnUser();


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

  const EditTicket = (e) => {

    const ticketId =selectedTicket2.id;
    try {
      axios({
        method: "put",
        url: urls.TICKET_BASE_URL+ticketId,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Authorization": `Bearer ` + user1.jwt,
        },
        data: {
          userId: selectedTicket2.user.id,
          description: selectedTicket2.description,
          title: selectedTicket2.title,
          ticketType: selectedTicket2.type,
        },
        mode: "cors",
      }).then((res) => {
        console.log("response", res);
        if (res.status == 200) {

          CommonToasts.basicToast("Successfully Updated Ticket");
          setShowModal1(false);
          console.log(res)
          AllTicketBasedOnUser()

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



  const CreateComment = () => {
    const ticketId = selectedTicket.id;
    if(comment.trim().length === 0){
      CommonToasts.errorToast("Comment field is Mandatory");
    }else{
    try {
      axios({
        method: "post",
        url: urls.TICKET_BASE_URL+ticketId+'/comments',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Authorization": `Bearer ` + user1.jwt,
        },
        data: {

          id: id,
          comment: comment,
          createdDate: createdDate,
          userId: user1.user.userId,
          userName: userName,


        },
        params: {
          q: searchQuery,
          status: status,
          userId: userId,
        },
        mode: "cors",
      }).then((res) => {
        console.log("response", res);
        if (res.status == 200) {

          CommonToasts.basicToast("Successfully Comment Added");
          AllTicketBasedOnUser();



        }
      }).catch((error) => {
        CommonToasts.errorToast(error.message);
        setLoading(false);
      });
    } catch (e) {
      CommonToasts.errorToast(e.message);
      setLoading(false);
    }
  }};

  const CloseComment = () => {
    const ticketId = selectedTicket.id;
    const userId = user1.user.userId;
    try {
      axios({
        method: "put",
        url: urls.TICKET_BASE_URL+ticketId+'/status?status='+status1,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Authorization": `Bearer ` + user1.jwt,
        },
        data: {

          // id: id,
          comment: comment,
          userId : userId

          // createdDate: createdDate,
          // userId: user1.user.userId,
          // userName:  userName,


        },
        mode: "cors",
      }).then((res) => {
        console.log("response close ticket admin", res);
        if (res.status == 200) {
          setComment('');
          if(res.data.status === 'failed'){
            CommonToasts.errorToast(res.data.message);
          }else{
            CommonToasts.basicToast("Successfully Closed the Ticket");
          }
          AllTicketBasedOnUser();


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

  const CloseEmployeeTicket = () => {
    const ticketId = selectedTicket.id;
    const status = "CLOSED";
    const userId = user1.user.userId;
    if(comment.trim().length === 0){
      CommonToasts.errorToast("Comment is Mandatory When closing the ticket");
    }else{
    try {
      axios({
        method: "put",
        url: urls.TICKET_BASE_URL+ticketId+'/status?status='+status,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Authorization": `Bearer ` + user1.jwt,
        },
        data: {

          // id: id,
          comment: comment,
          userId : userId
          // createdDate: createdDate,
          // userId: user1.user.userId,
          // userName:  userName,


        },
        mode: "cors",
      }).then((res) => {
        console.log("response close ticket employee", res);
        if (res.status == 200) {
          setComment('');
          if(res.data.status === 'failed'){
            CommonToasts.errorToast(res.data.message);
          }else{
            CommonToasts.basicToast("Successfully Closed the Ticket");
          }
          AllTicketBasedOnUser();


        }
      }).catch((error) => {
        CommonToasts.errorToast(error.message);
        setLoading(false);
      });
    } catch (e) {
      CommonToasts.errorToast(e.message);
      setLoading(false);
    }
    }
  };


  const AllTicketBasedOnUser = async () => {
    const userId = user1.user.userId;
    let url;
    let usersRole = user1.user.roles[0].name;
    if (usersRole === 'EMPLOYEE'){
      url = urls.GET_TICKETS_BY_USER+userId;
    }else{
      url = urls.GET_ALL_TICKETS_URL;
    }
    console.log('This is the url = '+url)
    const response = await axios.get(url,{
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Authorization": `Bearer ` + user1.jwt,
  }
    });
    console.log(response.data);
    setTickets(response.data.body);

  }




  const GetTickets = async () => {
    // const userId = user1.user.userId;
    let userId;
    let usersRole = user1.user.roles[0].name;
    if (usersRole !== 'EMPLOYEE'){
      userId = selectedUserId;
    }else{
      userId = user1.user.userId;
    }

    console.log("user id - "+ selectedUserId);
    try {

      const response = await axios.get(urls.GET_TICKETS_WITH_FILTER_URL, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          "Authorization": `Bearer ` + user1.jwt,
        },
        params: {
          q: searchQuery,
          status: status,
          userId: userId,
        },
      });

      console.log(response.data);
      setTickets(response.data.body.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    AllTicketBasedOnUser();


  }, []);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      GetTickets();
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const formatCreatedDate = (createdDate) => {
    const formattedDate = moment(createdDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
    return formattedDate;
  };



  const ViewTicketDetails = (id) => {

    try {
      // const tickets = { id: ticketId };
      axios({
        method: "get",
        url: urls.TICKET_BASE_URL + id,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Authorization": `Bearer ` + user1.jwt,
        },
        data: null,
        mode: "cors",
      }).then((res) => {
        console.log("response", res);
        if (res.status == 200) {

          setSelectedTicket2(res.data.body);

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

  // get updated time
  function timeSince(date) {
    // Get the current timestamp in milliseconds
    const now = Date.now();
    const givenDate = new Date(date).getTime();
    // Calculate the difference between current time and the provided date
    const difference = now - givenDate;
    // Handle cases where the date is in the future (shouldn't happen, but protect against it)
    if (difference <= 0) {
      return "Just now";
    }

    // Convert the difference to seconds
    const seconds = Math.floor(difference / 1000);

    // Define intervals and their corresponding units
    const intervals = [
      { value: 31536000, unit: "year" },
      { value: 2592000, unit: "month" },
      { value: 86400, unit: "day" },
      { value: 3600, unit: "hour" },
      { value: 60, unit: "minute" },
    ];

    // Find the largest interval that fits into the difference
    let biggestInterval = intervals.find((interval) => seconds >= interval.value);

    // If no interval fits (less than a minute), return "Just now"
    if (!biggestInterval) {
      return "Just now";
    }

    // Calculate the number of units for the chosen interval
    const count = Math.floor(seconds / biggestInterval.value);

    // Return the formatted string with count and unit
    return `${count} ${biggestInterval.unit}${count > 1 ? "s" : "" } ago`;
  }



  const handleView = (data) => {
    // ViewTicketDetails (data)
    setSelectedTicket(data)
    console.log("View Ticket", data)
    setShowModal2(true);

  };

  const handleViewForSetSelectedUser = (data) => {
    setSelectedUserId(data);
    console.log("selected User - "+ data);
  }

  const handleView6 = (data) => {
    // ViewTicketDetails (data)
    setSelectedTicket(data)

    setShowModal4(true)
  };

  const handleView7 = (data) => {
    // ViewTicketDetails (data)
    setSelectedTicket(data)
    // setStatus1("CLOSED")
    setShowEmployeeCloseModel(true)
  };

  const handleView2 = (id) => {
    // ViewTicketDetails (data)
    ViewTicketDetails(id)

    setShowModal3(true)
  };


  const handleView4 = (data) => {
    // ViewTicketDetails (data)
    setSelectedTicket(data)

    setShowModal5(true)
  };

  const handleTicketHistory = (data) => {
    setSelectedTicket(data);
    setTicketHistoryModel(true);
  };



  const handleDeleteTicket = (ticketId) => {
    setShowDeleteTicketModel(false);
    TicketDelete(ticketId);


  };


  const TicketDelete = (ticketId) => {
    setLoading(true);
    try {
      axios({
        method: "delete",
        url: urls.TICKET_BASE_URL+ticketId,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Authorization": `Bearer ` + user1.jwt,
        },
        data: null,
        mode: "cors",
      })
        .then((res) => {
          console.log("response", res);
          if (res.status === 200) {
            // setFaqItems(res.data.body);
            const updatedTickets = tickets.filter(
              (tickets) => tickets.id !== ticketId
            );

            setTickets(updatedTickets);

            CommonToasts.basicToast("Successfully Deleted");
          }
          setLoading(false);
        })
        .catch((error) => {
          CommonToasts.errorToast(error.message);
          setLoading(false);
        });
    } catch (e) {
      CommonToasts.errorToast(e.message);
      setLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



  const getTicketpage = (page) => {
    console.log("logged user : "+user1.user.userId);
    const userId= user1.user.userId;
    axios({
      method: 'get',
      url: urls.GET_TICKETS_BY_USER+userId,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "Authorization": `Bearer ` + user1.jwt,
      },
      mode: 'cors',
    })
      .then((res) => {
        if (res.status === 200) {
          setTickets(res.data.body);
          setTotalPages(res.data.totalPages);
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
    getTicketpage(currentPage);
  }, [currentPage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  console.log("test update tic", selectedTicket2)

  let onConnected = () => {
    console.log("connected to ws");
  }

  let onReceived=(data) => {
    console.log("ws data ", data);
    setTickets(data);
  }


  return (
    <>
      <SockJsClient url={urls.WEBSOCKET}
                    topics={['/topic/tickets']}
                    onConnect ={onConnected}
                    onDisconnect = {console.log("Ws Disconnected !")}
                    onMessage ={msg => onReceived(msg)}
                    debug={false}
      />
      <div className=" bg-grey h-fit w-full ">
        <TitleText titleText="Ticket" />


        {/* {loading ? CommonSpinners.pageSpinner("Fetching Users")
          : */}
        <div className=" absolute mt-4 h-[82%] w-[82%] bg-white rounded-lg border border-gray-200 shadow-md">

          <div class="space-y-10">


            <div class="flex items-center p-3 space-x-6  bg-sky-300  shadow-lg hover:shadow-xl">

              <div class="md:flex bg-white  p-2 w-96 space-x-4 rounded-lg">

                <input
                  className="bg-white  outline-none"
                  type="text"
                  placeholder="Search......"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyDown={handleKeyDown}
                />

              </div>

              <div class="p-1 bg-white w-10 h-10 hover:bg-gray-200 rounded-lg shadow-md mx-1 ">
                <Tooltip title="Search" position="bottom" trigger="mouseenter">
                  <button
                    onClick={GetTickets}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="md:w-6 h-6 mt-1 mx-1 ">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                  </button>
                </Tooltip>
              </div>
              <select
                id="type"
                className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                // onClick={handleSearchStatus}
                onChange={(e) => setStatus(e.target.value)}
              //    value={status}
              >
                <option value="">Status</option>
                <option value="">All</option>
                <option value="OPEN">OPEN</option>
                <option value="ACCEPTED">ACCEPTED</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CLOSED">CLOSED</option>
              </select>

              {user1.user.roles[0].name == "ADMIN" || user1.user.roles[0].name == "IT_ADMIN" ? (
              <select
                id="type"
                className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                // onClick={handleSearchStatus}
                onChange={(e) => handleViewForSetSelectedUser(e.target.value)}
              // value={tickets?.user?.id}
              >
                <option value="">Select...</option>
                {userList?.map((user) => (
                  <option
                    key={user.id} value={user.id}
                  >
                    {user.firstName} {user.lastName}
                  </option>
                ))}

              </select>
                  ):null}




              <div class="flex justify-between">

                <button
                  className="p-1 bg-white w-10 h-10 hover:bg-gray-200 rounded-lg shadow-md mx-1 absolute right-16 top-3"
                  type="button"

                  onClick={() => setShowModal1(true)}
                >
                  <Tooltip title="Add Ticket" position="bottom" trigger="mouseenter " className="right-16 top-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-1 mx-1 ">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                  </Tooltip>
                </button>


              </div>
            </div>
          </div>




          <br></br>

          <div className="flex flex-wrap overflow-auto h-3/4  ">




            {tickets.map((ticket, index) => (

              <div class=" relative block overflow-hidden rounded-lg border border-gray-100 p-2 sm:p-6 lg:p-2 mx-2 mt-4 max-w-sm shadow-lg w-5/6 h-auto">
                <span class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-sky-300 via-blue-100 to-sky-500"></span>
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">

                      <button className=" text-gray-700 text-base font-bold " className="ellipsis"
                              onClick={() => handleView2(ticket.id)}

                      >
                        {ticket.title}
                      </button>
                      <div className="text-base mb-2">{ticket?.user?.firstName} {""} {ticket?.user?.lastName}</div>

                      {ticket.type == "SOFTWARE" ? (
                          <span className=" py-1 text-blue-700 text-sm font-semibold text-black-600">
                          SOFTWARE
                        </span>
                      ) : (
                          <span className="  py-1 text-blue-500 text-sm font-semibold text-black-600">
                          HARDWARE
                        </span>
                      )}
                    </div>

                    <a href="#" class="inline-block pb-12">

                      <span
                          class="inline-flex items-center justify-center  font-bold w-9 h-9 mx-2 text-sm  text-gray-800 bg-gradient-to-r from-sky-300 via-sky-200 to-blue-200 rounded-full">
                        {ticket.id}
                      </span>
                    </a>
                  </div>
                  <dl class="mt-4 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                      <dt class="text-sm font-medium text-gray-600">{formatCreatedDate(ticket.createdDate)}</dt>
                      <dd className="text-sm text-gray-500">Date</dd>
                    </div>

                  </dl>

                  <dd className="text-sm text-gray-500 mt-4 font-bold ">
                    <Tooltip title="View Comment" position="bottom" trigger="mouseenter">
                      <button

                          type="button"
                          className="p-2 bg-white border  w-fit h-fit hover:bg-blue-200 rounded-lg shadow-md mx-1 "

                          onClick={() => handleView4(ticket)}

                      >
                        <div className="flex  ">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                               stroke="currentColor" className="w-4 h-4 text-black ">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
                          </svg>


                        </div>


                      </button>
                    </Tooltip>
                  {/*  Ticket History */}

                    <Tooltip title="View Ticket History" position="bottom" trigger="mouseenter">
                      <button

                          type="button"
                          className="p-2 bg-white border  w-fit h-fit hover:bg-blue-200 rounded-lg shadow-md mx-1 "

                          onClick={() => handleTicketHistory(ticket)}

                      >
                        <div className="flex  ">
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18"
                               viewBox="0 0 48 48">
                            <path
                                d="M 15.5 5 C 11.928062 5 9 7.9280619 9 11.5 L 9 34 L 5.5 34 C 4.1364058 34 3 35.136406 3 36.5 L 3 38.5 C 3 40.967501 5.0324991 43 7.5 43 L 34.5 43 C 36.967501 43 39 40.967501 39 38.5 L 39 14 L 42.5 14 C 43.863594 14 45 12.863594 45 11.5 L 45 9.5 C 45 7.1132596 43.09387 5.1504737 40.736328 5.0234375 A 1.50015 1.50015 0 0 0 40.5 5 L 15.5 5 z M 15.5 8 L 36.306641 8 C 36.134564 8.4744795 36 8.9694092 36 9.5 L 36 12.253906 A 1.50015 1.50015 0 0 0 36 12.740234 L 36 38.5 C 36 39.346499 35.346499 40 34.5 40 C 33.653501 40 33 39.346499 33 38.5 L 33 36.5 C 33 35.136406 31.863594 34 30.5 34 L 12 34 L 12 11.5 C 12 9.5499381 13.549938 8 15.5 8 z M 40.5 8 C 41.346499 8 42 8.6535009 42 9.5 L 42 11 L 39 11 L 39 9.5 C 39 8.6535009 39.653501 8 40.5 8 z M 17.5 13 A 1.50015 1.50015 0 1 0 17.5 16 L 30.5 16 A 1.50015 1.50015 0 1 0 30.5 13 L 17.5 13 z M 17.5 20 A 1.50015 1.50015 0 1 0 17.5 23 L 30.5 23 A 1.50015 1.50015 0 1 0 30.5 20 L 17.5 20 z M 17.5 27 A 1.50015 1.50015 0 1 0 17.5 30 L 28.5 30 A 1.50015 1.50015 0 1 0 28.5 27 L 17.5 27 z M 6 37 L 10.253906 37 A 1.50015 1.50015 0 0 0 10.740234 37 L 30 37 L 30 38.5 C 30 39.030591 30.134564 39.52552 30.306641 40 L 7.5 40 C 6.6535009 40 6 39.346499 6 38.5 L 6 37 z"></path>
                          </svg>


                        </div>


                      </button>
                    </Tooltip>

                  </dd>
                  <dl class="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                      <dt class="text-sm font-medium text-gray-600">{}</dt>

                    </div>

                  </dl>


                  <div className="flex items-center justify-between ">
                    <dt class="text-sm font-medium text-gray-600 ">
                      <dd className="text-xs text-gray-500">Ticket Status</dd>
                      {ticket.status === "OPEN" ? (
                          <span
                              className="text-green-600 bg-green-300  px-2  rounded-full text-sm font-semibold text-black-600 ">
                        OPEN
                      </span>
                      ) : ticket.status === "IN_PROGRESS" ? (
                          <span
                              className="text-blue-600  bg-blue-400  px-2  rounded-full text-sm font-semibold text-black-600 ">
                        IN_PROGRESS
                      </span>
                      ) : ticket.status === "ACCEPTED" ? (
                          <span
                              className="text-pink-600 text-sm font-semibold text-black-600 bg-pink-400  px-2  rounded-full mt-2 ">
                        ACCEPTED
                      </span>
                    ): ticket.status === "COMPLETED" ? (
                      <span className="text-pink-900 text-sm font-semibold text-black-600 bg-pink-200  px-2  rounded-full mt-2 ">
                        COMPLETED
                      </span>
                      ) : (
                          <span
                              className="text-red-500 text-sm font-semibold text-black-600 bg-red-200  px-2  rounded-full mt-2 ">
                        CLOSED
                      </span>
                      )}</dt>

                    <div className="flex items-center">
                      {user1.user.roles[0].name == "ADMIN"  ? (
                          <Tooltip title="Delete" position="bottom" trigger="mouseenter">
                            <button
                                type="button"
                                className="p-2 bg-white border  w-fit h-fit hover:bg-red-200 rounded-lg shadow-md mx-1"

                                onClick={() => setShowDeleteTicketModel(true)}
                            >
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-4 h-4"
                              >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </Tooltip>
                      ) : null}
                      <Tooltip title="Add Comment" position="bottom" trigger="mouseenter">
                        <button
                            type="button"
                            className="p-2 bg-white border  w-fit h-fit hover:bg-blue-200 rounded-lg shadow-md mx-1"

                            onClick={() => handleView(ticket)}

                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                               stroke="currentColor" className="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                          </svg>

                        </button>
                      </Tooltip>
                      {user1.user.roles[0].name == "ADMIN" ? (
                          <Tooltip title="Close Comment" position="bottom" trigger="mouseenter">
                            <button
                                type="button"
                                className="p-2 bg-white border  w-fit h-fit hover:bg-blue-200 rounded-lg shadow-md mx-1"

                                onClick={() => handleView6(ticket)}

                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                   stroke="currentColor" className="w-4 h-4 text-black">

                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
                              </svg>


                            </button>

                          </Tooltip>
                      ) : null}
                      {user1.user.roles[0].name === 'EMPLOYEE' && (ticket.status === "OPEN" || ticket.status === "COMPLETED" ) ? (
                          <Tooltip title="Close Comment" position="bottom" trigger="mouseenter">
                            <button
                                type="button"
                                className="p-2 bg-white border  w-fit h-fit hover:bg-blue-200 rounded-lg shadow-md mx-1"

                                onClick={() => handleView7(ticket)}

                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                   stroke="currentColor" className="w-4 h-4 text-black">

                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
                              </svg>


                            </button>

                          </Tooltip>
                      ) : null

                      }

                      {showDeleteTicketModel ? (
                          <>
                            <div className="fixed inset-0 z-10 overflow-y-auto">
                              <div
                                  className="fixed inset-0 w-full h-full bg-black opacity-40"
                                  onClick={() => setShowDeleteTicketModel(false)}
                              ></div>
                              <div className="flex items-center min-h-screen px-4 py-8">
                                <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700">
                                  <div className="mt-3 sm:flex">
                                    <button
                                        type="button"
                                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                        onClick={() => setShowDeleteTicketModel(false)}
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
                                        Are you sure you want to delete this ticket?
                                      </h3>
                                      <button
                                          type="button"
                                          class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                          onClick={() => handleDeleteTicket(ticket.id)}
                                      >
                                        Yes, I'm sure
                                      </button>
                                      <button
                                          type="button"
                                          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                          onClick={() => setShowDeleteTicketModel(false)}
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

                    </div>

                  </div>


                </div>
              </div>



            ))}
          </div>


          <nav className='block'>
            <ul className='flex pl-0 pb-4 rounded list-none flex-wrap justify-end mr-8'>
              {pageNumbers.map((number) => (
                  <li key={number}>
                    <a
                        onClick={() => handlePageChange(number)}
                        href='#'
                        className={
                          currentPage === number
                              ? 'bg-blue border-sky-500 mx-1 text-sky-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border-2 rounded-lg text-sm font-medium'
                              : 'bg-white border-sky-500 mx-1 text-gray-500 hover:bg-blue-200 relative inline-flex items-center px-4 py-2 border-2 rounded-lg text-sm font-medium'
                        }
                    >
                      {number}
                    </a>
                  </li>
              ))}
            </ul>
          </nav>
        </div>


        {/* <button onClick={() => getTikctetpage(currentPage + 1)}>Next Page</button> */}

        {/* } */}


      </div>


      {showModal1 ? (
          <>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div
                  className="fixed inset-0 w-full h-full bg-black opacity-40"
                  onClick={() => setShowModal1(false)}
              ></div>
              <div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700 modal-container1">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h5 className="text-4xl font-bold text-blue-400">
                      Create New Tickets
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

                  <div className=' w-full '>
                    <label for="email" class="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300 ">User name</label>
                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={user1.user.firstName} onChange={(e) => setUserId(user1.user.userId)} />

                  </div>

                  <div className=' w-full '>
                    <label for="email" class="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300 ">Title</label>
                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => setTitle(e.target.value)} />

                  </div>

                  <div className="w-full">
                    <label htmlFor="type" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300">
                      Type
                    </label>
                    <select
                      id="type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Select type</option>
                      <option value="SOFTWARE">SOFTWARE</option>
                      <option value="HARDWARE">HARDWARE</option>
                    </select>
                  </div>




                  <div className="w-full">
                    <label htmlFor="description" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Description"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                  </div>


                  <br />

                  <button
                    type="button"
                    className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                    // onClick={CreatTicket}
                    onClick={() => {
                      CreatTicket();
                      setShowModal1(false);
                    }}
                  >
                    Add
                  </button>


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
                <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700 modal-container1">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h5 className="text-4xl font-bold text-blue-400">
                      Add Comment
                    </h5>
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







                  <div className="w-full">
                    <label htmlFor="description" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-600">
                      ID
                    </label>

                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={selectedTicket.id} onChange={(e) => setId(selectedTicket.id)} />

                  </div>
                  <div className="w-full">
                    <label htmlFor="description" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-600">
                      Comment
                    </label>
                    <textarea
                      id="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => setComment(e.target.value)}
                      placeholder="Description"

                    ></textarea>

                  </div>





                  <div className="w-full">
                    <label htmlFor="description" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-600">
                      User Id
                    </label>

                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={user1.user.userId} onChange={(e) => setUserId(user1.user.userId)} />

                  </div>
                  <div className="w-full">
                    <label htmlFor="description" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-600">
                      User Name
                    </label>

                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={user1.user.firstName} onChange={(e) => setUserName(user1.user.firstName)} />

                  </div>
                  <br />
                  <button
                    type="button"
                    className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                    onClick={() => {
                      CreateComment();
                      setShowModal2(false);
                    }}
                  >
                    Add
                  </button>


                </div>
              </div>


            </div>


          </div>



        </>
      ) : null}

      {showModal3 ? (
        <>
          {/* {tickets?.tickets?.body?.map((ticket, index) => ( */}
          <div className="fixed inset-0 z-10 overflow-y-auto " >
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal3(false)}
            ></div>
            <div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700 modal-container ">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <div class="font-bold text-xl mb-2">View Ticket</div>
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



                  <p class="text-gray-700 text-base font-bold "   >



                  </p>
                  <div class="px-6 py-4">
                    <h1>User Name</h1>
                    {/* <p class="text-gray-700 text-base" className="break">
                      {selectedTicket.title}
                    </p> */}
                    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={selectedTicket2?.user?.firstName} onChange={(e) =>
                      setSelectedTicket2({
                        ...selectedTicket2,
                        userId: e.target.value,
                      })
                    } /></div>
                  <div class="px-6 py-4">
                    <h1>Ticket Id</h1>
                    {/* <p class="text-gray-700 text-base" className="break">
                      {selectedTicket.title}
                    </p> */}
                    <input
                      type="text"
                      id="question"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      disabled="true"
                      value={selectedTicket2?.id}
                      onChange={(e) =>
                        setSelectedTicket2({
                          ...selectedTicket2,
                          ticketId: e.target.value,
                        })
                      }

                    /></div>


                  {user1.user.roles[0].name === "ADMIN" || user1.user.roles[0].name === "IT_ADMIN"?(
                  <div class="px-6 py-4">
                    <h1>Description</h1>
                    {/* <p class="text-gray-700 text-base" className="break">
                      {selectedTicket.description}
                    </p> */}
                    <textarea
                      type="text"
                      id="question"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      disabled="true"
                      value={selectedTicket2.description}
                      onChange={(e) =>
                        setSelectedTicket2({
                          ...selectedTicket2,
                          description: e.target.value,
                        })
                      }

                    />
                  </div>):(
                    <div class="px-6 py-4">
                    <h1>Description</h1>
                    {/* <p class="text-gray-700 text-base" className="break">
                      {selectedTicket.description}
                    </p> */}
                    <textarea
                      type="text"
                      id="question"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedTicket2.description}
                      onChange={(e) =>
                        setSelectedTicket2({
                          ...selectedTicket2,
                          description: e.target.value,
                        })
                      }

                    />
                  </div>
                  )}

                  {user1.user.roles[0].name === "ADMIN" || user1.user.roles[0].name === "IT_ADMIN"?(
                    <div class="px-6 py-4">
                    <h1>Type</h1>
                    <input
                      type="text"
                      id="question"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      disabled="true"
                      value={selectedTicket2?.type}
                      onChange={(e) =>
                        setSelectedTicket2({
                          ...selectedTicket2,
                          ticketId: e.target.value,
                        })
                      }

                    />
                  </div>):(<div class="px-6 py-4">
                    <h1>Type</h1>
                    <select
                      id="type"
                      className="w-full p-2 border border-gray-50 rounded-md"
                      value={selectedTicket2.type}
                      onChange={(e) =>
                        setSelectedTicket2({
                          ...selectedTicket2,
                          type: e.target.value,
                        })
                      }
                    >
                      <option value="SOFTWARE">SOFTWARE</option>
                      <option value="HARDWARE">HARDWARE</option>
                    </select>
                  </div>)}
                  
                  {user1.user.roles[0].name === "ADMIN" || user1.user.roles[0].name === "IT_ADMIN" ?(
                  <div class="px-6 py-4">
                    <h1>Title</h1>
                    
                    <input
                      type="text"
                      id="question"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      disabled="true"
                      value={selectedTicket2.title}
                      onChange={(e) =>
                        setSelectedTicket2({
                          ...selectedTicket2,
                          title: e.target.value,
                        })
                      }

                    />

                  </div>):(
                    <div class="px-6 py-4">
                    <h1>Title</h1>
                    
                    <input
                      type="text"
                      id="question"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedTicket2.title}
                      onChange={(e) =>
                        setSelectedTicket2({
                          ...selectedTicket2,
                          title: e.target.value,
                        })
                      }

                    />
                    <div class="mt-4">
                      <button
                        type="button"
                        className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                        // onClick={EditTicket}
                        onClick={() => {
                          EditTicket();
                          setShowModal3(false);
                        }}
                      >
                        Update
                      </button>


                    </div>


                  </div>
                  )}


                </div>


                <br />

              </div>
            </div>


          </div>

          <div class="max-w-sm rounded overflow-hidden shadow-lg ">


          </div>



          {/* ))}  */}

        </>
      ) : null}

      {showModal4 ? (
        <>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal4(false)}
            ></div>
            <div>

              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700 modal-container1">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h5 className="text-4xl font-bold text-blue-400">
                      Update Ticket Status
                    </h5>
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

                  <br />
                  <div className="w-full flex items-center">
                    <label htmlFor="status" className="block mb-2 w-32 text-sm font-medium text-gray-900 dark:text-gray-600">
                      Status
                    </label>
                    <select
                      id="type"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 p-2.5 ml-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white justify-end"
                      // onClick={handleSearchStatus}
                      onChange={(e) => setStatus1(e.target.value)}
                    // value={status}
                    >
                      {/* <option value="">Status</option> */}
                      <option value="">All</option>
                      <option value="OPEN">OPEN</option>
                      <option value="ACCEPTED">ACCEPTED</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>

                  <br />
                  <div className="w-full">
                    <label htmlFor="description" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-600">
                      Comment
                    </label>
                    <textarea
                      id="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" onChange={(e) => setComment(e.target.value)}
                      placeholder="Description"

                    ></textarea>

                  </div>






                  <br />
                  <button
                    type="button"
                    className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                    // onClick={CloseComment}
                    onClick={() => {
                      CloseComment();
                      setShowModal4(false);
                    }}
                  >
                    Add
                  </button>


                </div>
              </div>


            </div>


          </div>



        </>
      ) : null}



      {showModal5 ? (
        <>
          {/* {tickets?.tickets?.body?.map((ticket, index) => ( */}
          <div className="fixed inset-0 z-10 overflow-y-auto " >
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal5(false)}
            ></div>
            <div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700 modal-container ">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <div class="font-bold text-xl mb-2">View Comment</div>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setShowModal5(false)}
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




                  <p class="text-gray-700 text-base font-bold "   >



                  </p>


                  {selectedTicket.comments.map((comment) => (


                      <div className="mt-2  max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <span class="text-sm font-light text-gray-600 dark:text-gray-400">{comment.userName}</span>
                          <a className="px-3 py-1 text-sm font-bold text-gray-800 transition-colors duration-300 "
                             tabIndex="0" role="button"> {formatCreatedDate(comment.createdDate)}</a>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" tabIndex="0"
                             role="link">{comment.id}</a>
                        </div>
                        <div className="mt-2">

                          <p class="mt-2 text-gray-600 dark:text-gray-300">{comment.comment}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <label className="text-sm font-light text-gray-600 dark:text-gray-400">
                              <span
                                  className="text-sm font-bold text-gray-600 dark:text-gray-400"></span>
                          </label>
                          <label className="text-sm font-light text-gray-600 dark:text-gray-400">
                              <span
                                  className="px-3 py-1 text-sm font-bold text-gray-600 dark:text-gray-400 ">{timeSince(comment.createdDate)}</span>
                          </label>


                        </div>
                      </div>


                  ))}
                </div>


                <br/>

              </div>
            </div>


          </div>

          <div class="max-w-sm rounded overflow-hidden shadow-lg ">


          </div>


          {/* ))}  */}

        </>
      ) : null}

      {showTicketHistoryModel ? (
          <>
            {/* {tickets?.tickets?.body?.map((ticket, index) => ( */}
            <div className="fixed inset-0 z-10 overflow-y-auto ">
              <div
                  className="fixed inset-0 w-full h-full bg-black opacity-40"
                  onClick={() => setTicketHistoryModel(false)}
              ></div>
              <div>
                <div className="flex items-center min-h-screen px-4 py-8">
                  <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700 modal-container ">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <div class="font-bold text-xl mb-2">View Ticket History</div>
                      <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => setTicketHistoryModel(false)}
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




                    <p class="text-gray-700 text-base font-bold "   >



                    </p>


                    {selectedTicket.history.map((history) => (


                        <div className="mt-2  max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                          <div className="flex items-center justify-between">
                            <span
                                class="text-sm font-light text-gray-600 dark:text-gray-400">{history?.updatedUser?.firstName}</span>
                            <a class="px-3 py-1 text-sm font-bold text-gray-600 transition-colors duration-300 "
                               tabindex="0" role="button"> {formatCreatedDate(history?.date)}</a>
                          </div>

                          <div className="flex items-center justify-between">
                            <label className="text-sm font-light text-gray-600 dark:text-gray-400">Status From :
                              <span
                                  className="text-sm font-bold text-gray-600 dark:text-gray-400">{history?.oldStatus}</span>
                            </label>
                            <label className="text-sm font-light text-gray-600 dark:text-gray-400">Status To :
                              <span
                                  className="px-3 py-1 text-sm font-bold text-gray-600 dark:text-gray-400 ">{history?.newStatus}</span>
                            </label>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <p className="mt-2 text-gray-600 dark:text-gray-300">{history.comment}</p>


                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <label className="text-sm font-light text-gray-600 dark:text-gray-400">
                              <span
                                  className="text-sm font-bold text-gray-600 dark:text-gray-400"></span>
                            </label>
                            <label className="text-sm font-light text-gray-600 dark:text-gray-400">
                              <span
                                  className="px-3 py-1 text-sm font-bold text-gray-600 dark:text-gray-400 ">{timeSince(history?.date)}</span>
                            </label>


                          </div>
                        </div>


                    ))}
                  </div>


                  <br/>

                </div>
              </div>


            </div>

            <div class="max-w-sm rounded overflow-hidden shadow-lg ">


            </div>


            {/* ))}  */}

          </>
      ) : null}


      {showEmployeeCloseModel ? (
          <>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div
                  className="fixed inset-0 w-full h-full bg-black opacity-40"
                  onClick={() => setShowEmployeeCloseModel(false)}
              ></div>
              <div>

                <div className="flex items-center min-h-screen px-4 py-8">
                  <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700 modal-container1">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h5 className="text-4xl font-bold text-blue-400">
                        Ticket close
                      </h5>
                      <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={() => setShowEmployeeCloseModel(false)}
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
                      <label htmlFor="description" className="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300">
                        Comment
                      </label>
                      <textarea
                          id="description"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          onChange={(e) => setComment(e.target.value)
                      }
                          placeholder="Description"

                      ></textarea>

                    </div>






                    <br />
                    <button
                        type="button"
                        className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                        // onClick={CloseComment}
                        onClick={() => {
                          CloseEmployeeTicket();
                          setShowEmployeeCloseModel(false);
                        }}
                    >
                      Close Ticket
                    </button>


                  </div>
                </div>


              </div>


            </div>



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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getAllTickets: (pageNo, pageSize) => dispatch(getAllTickets(pageNo, pageSize)),
//   };
// };

// export default connect(null, mapDispatchToProps)(TicketPage);




import { React, useState, useEffect } from "react";
import CommonSpinners from "../common/Spinners";
import CommonToasts from "../common/Toasts";
import TitleText from "../components/TitleText";
import TicketService from "../services/TicketService";
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
import { connect, useDispatch } from "react-redux";
import { deleteTicket } from "../redux/actions/ticketAction";




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


export default function TicketPage() {


  const [ticketList, setTicketList] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState(null);
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [type, setType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshFlag, setRefreshFlag] = useState(false)








  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      userId: "",
      type: "",
      description: "",
     

    }

  });


  const [data, setData] = useState(null);
  const [userDetails, setUserDetails] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const formatCreatedDate = (createdDate) => {
    const formattedDate = moment(createdDate).format("dddd, MMMM Do YYYY, h:mm:ss a");
    return formattedDate;
  };
  const user1 = AuthService.getCurrentUser();

  // const ticket = {
  //   createdDate: new Date().toISOString()
  // };

 
  // const formattedDate = moment(ticket.createdDate).format('MMMM Do YYYY, h:mm:ss a');
  // console.log(formattedDate);
  // new Date().toISOString() 
  

  
  
  



 

  // this one is correc//

  const AddTickets = (e) => {
    try {
      axios({
        method: "post",
        url: 'http://localhost:8080/tickets/dto',
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Authorization": `Bearer ` + user1.jwt,
        },
        data: {
          userId: userId,
          type: type,
          description: description,
        },
        mode: "cors",
      }).then((res) => {
        console.log("response", res);
        if (res.status == 200) {
          // alert('Successfully Added')
          CommonToasts.basicToast("Successfully Added");
          setShowModal(false);
          setRefreshFlag(!refreshFlag)

          // navigate("/")
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

  const [tickets, setTickets] = useState([]);


  const dispatch = useDispatch();

  
  const handleDelete = (ticketId) => {
    dispatch(deleteTicket(ticketId));
    window.location.reload();
  };



  console.log("roles");
  console.log(user1.user.roles[0].name);

  useEffect(() => {
    console.log("initial load");

    async function getAllTickets() {
      setLoading(true);
      try {
        const response = await TicketService.getAllTickets(1, 5);
        //await delay(2000);

        console.log("Hellooo", response)
        setData(response.data.body.content);
        setTicketList(response.data.body);
        setTotalPages(response.data.body.totalPages);
        setCurrentPage(1);
        setLoading(false);
      } catch (e) {
        CommonToasts.errorToast(e.message);
        setLoading(false);
      }
    }

    getAllTickets();
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
      const response = await TicketService.getAllTickets(pageNo, 5);
      //await delay(2000);

      setData(response.data.body.content);
      setTicketList(response.data.body);
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

  
  // const handleDelete = async (ticketId) => {
  //   // loginUser(username,password)
  //   setLoading(true);
  //   await delay(1000);
  //   console.log("start");
  //   console.log(loading);

  //   try {
  //     await TicketService.DeleteTicket(ticketId).then(() => {
  //       console.log("sucess");
  //       setLoading(false);

  //       // CommonToasts.basicToast("Successfully Logged In")
  //       // navigate("/home")
  //     });
  //   } catch (e) {
  //     console.log("Error");
  //     console.log(e);
  //     setLoading(false);
  //     // CommonToasts.errorToast(e.message)
  //   }
  // };

  const handleClick = (ticketId) => {
    setShowModal(true);
   
    handleDelete(ticketId);
  };


  // useEffect((ticketId) => {
  //   handleLogin(ticketId);
  // }, );


  const performSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tickets/filter', {
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
      setTicketList(response.data.body.content);
      
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




  const [selectedType, setSelectedType] = useState();

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };









  return (
    <>
      <div className=" bg-grey h-fit w-full ">
        <TitleText titleText="Ticket" />


        {loading ? CommonSpinners.pageSpinner("Fetching Users")
          :
          <div className=" absolute mt-4 h-[82%] w-[82%] bg-white rounded-lg border border-gray-200 shadow-md">

            <div class="space-y-10">


 <div class="flex items-center p-3 space-x-6  bg-white rounded-xl shadow-lg hover:shadow-xl">

  <div class="flex bg-gray-200 p-2 w-96 space-x-4 rounded-lg">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
        className="bg-gray-200 outline-none"
        type="text"
        placeholder="Article name or keyword..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        onKeyDown={handleKeyDown}
      />
  </div>
 
  <div class="p-1 bg-white w-10 h-10 hover:bg-gray-200 rounded-lg shadow-md mx-1 ">
    <button onClick={performSearch}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

    </button>
  </div>

  <div class="flex justify-between">
  
  <button
    className="p-1 bg-white w-11 h-11 hover:bg-gray-200 rounded-lg shadow-md mx-1 absolute right-16 top-4"
       type="button"
    
       onClick={() => setShowModal1(true)}
      > 
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mx-1 top-16">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
</svg>
  </button>
  
     
</div>
</div> 
</div>  




            <br></br>

            <div className="flex flex-wrap overflow-auto h-3/4  ">


            {ticketList?.map((ticket,index) => (


<div class="relative block overflow-hidden rounded-lg border border-gray-100 p-2 sm:p-6 lg:p-2 mx-2 mt-4 max-w-sm shadow-lg w-5/6 h-auto">
  <span class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-300 via-blue-100 to-blue-600"></span>
  <div class="px-6 py-4">
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
       
        <button class="text-gray-700 text-base font-bold "onClick={() => setShowModal3(true)}>
         DESCRIPTION
        </button>
        <div class="text-base mb-2">{ticket.user.firstName} {""} {ticket.user.lastName}</div>
    
         {ticket.type== "SOFTWARE" ? (
                        <span className="px-3 py-1 bg-blue-300  rounded-full text-sm font-semibold text-black-600">
                          SOFTWARE
                        </span>
                      ) : (
                        <span className=" px-3 py-1 bg-blue-400  rounded-full text-sm font-semibold text-black-600">
                          HARDWARE
                        </span>
                      )}
      </div>

      <a href="#" class="inline-block pb-12">
       
      <span class="inline-flex items-center justify-center  font-bold w-9 h-9 mx-2 text-sm  text-gray-800 bg-gradient-to-r from-blue-300 via-blue-200 to-blue-200 rounded-full">
      {ticket.id}
  </span>
      </a>
    </div>
    <dl class="mt-6 flex gap-4 sm:gap-6">
      <div class="flex flex-col-reverse">
        <dt class="text-sm font-medium text-gray-600">{formatCreatedDate(ticket.createdDate)}</dt>
        <dd class="text-xs text-gray-500">Date</dd>
      </div>
      <div class="flex flex-col-reverse">
        <dt class="text-sm font-medium text-gray-600">{ticket.status}</dt>
        <dd class="text-xs text-gray-500">Ticket Status</dd>
      </div>
    </dl>
    <div class="flex flex-row-reverse ml-10">
  <div>
  <a href="#" className="inline-block mt-4 ml-10">
                     <button
                       type="button"
                       class="p-2 bg-white border border-red-400 w-fit h-fit hover:bg-red-200 rounded-lg shadow-md mx-1"
                       onClick={() => handleDelete(ticket.id)}
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
                  </a>

  </div>
  
</div>
    

   
  </div>
</div>


              
            ))}
   </div>

   
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
                      <label for="email" class="block mb-2 w-96 text-sm mt-2 font-medium text-gray-900 dark:text-gray-300 ">User Id</label>
                      <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="User Id" onChange={(e) => setUserId(e.target.value)} />

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
                        className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={AddTickets}
                     >
                       add
                      </button>
                      
                    
                  </div>
                </div>


              </div>


            </div>
         


        </>
      ) : null}



{showModal3 ? (
        <>
    {ticketList?.map((ticket,index) => (
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setShowModal3(false)}
            ></div>
            <div>
              <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative bg-white rounded-lg max-w-lg p-4 mx-auto shadow dark:bg-gray-700">
                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                   
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
                  {ticket.description}
                 </p>

               
                    <br />
             
                     
                      
                    
                  </div>
                </div>


              </div>


            </div>
       
       ))}

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

  
  
        
      `}</style>
    </>
  );
}
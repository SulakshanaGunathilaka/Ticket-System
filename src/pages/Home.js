import { React, useState, useEffect } from "react";
import TitleText from "../components/TitleText";
import CommonSpinners from "../common/Spinners";


import CanvasJSReact from '@canvasjs/react-charts';
import AuthService from "../services/AuthenticationService";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import CommonToasts from "../common/Toasts";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import UserService from "../services/UserService";
import urls from "../common/Urls";
// import './DatePickerCustom.css'; 
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function HomePage() {

  const user1 = AuthService.getCurrentUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [ticketHistorylinechart, setTicketHistory] = useState([]);
  const [ticketHistoryclosed, setTicketHistoryClosed] = useState([]);

  const [userId, setUserId] = useState([]);
  const [userList, setUserList] = useState([]);
  const [dashboardDetail, setDashboardDetails] = useState([])
  // const[userList,setUserList]=

  const [loading, setLoading] = useState(true);
  console.log("update", user1)

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "dark1", "dark2"
    title: {
      // text: "Trip Expenses"
    },
    data: [{
      type: "pie",
      indexLabel: "{label}: {y}%",
      startAngle: -90,
      dataPoints: [
        { y: dashboardDetail.completedTicketCount , label: "Completed" },
        { y: dashboardDetail.closedTicketCount, label: "Closed Tickets" },
        { y: dashboardDetail.inProgressTicketCount, label: "In Progress" },
        { y: dashboardDetail.openTicketCount, label: "Open Tickets" },
        { y: dashboardDetail.acceptedTicketCount, label: "Accepted" },

      ]
    }]
  }

  // get Dashboard details

  const getDashboardDetails = () => {

    try {
      setLoading(true);
      const userRole = user1.user.roles[0].name;
      const userId = user1.user.userId;


      let url;

      if (userRole === "EMPLOYEE"){
        url = urls.GET_USER_DASHBOARD+userId;
      }else{
        url = urls.GET_ADMIN_DASHBOARD;
      }

      axios({
        method: "GET",
        url: url,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Authorization": `Bearer ` + user1.jwt,
        },
        mode: "cors",
      }).then((res) => {
        console.log("Dashboard Response", res);
        if (res.status == 200) {

          // CommonToasts.basicToast("Successfully Comment Added");
          console.log(res.data.body);
          setDashboardDetails(res.data.body)

          // GetTickets()
          setLoading(false);

        }
      }).catch((error) => {
        CommonToasts.errorToast(error.message);
        setLoading(false);
      });
    }catch (e) {
      CommonToasts.errorToast(e.message);
      setLoading(false);
    }

  };


  const ticketHistory = () => {
    // const userId = user1?.user?.userId;

    try {
      axios({
        method: "get",
        url: urls.GET_TICKET_REPORT+`created?startDate=${selectedDate}&endDate=${selectedDate1}&userId=${userId}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Authorization": `Bearer ` + user1.jwt,
        },
        data: {
          // selectedDate1: selectedDate1,
          // selectedDate1: selectedDate1,
          // id: id,
          // comment: comment,
          // status1: status1
          // createdDate: createdDate,
          // userId: user1.user.userId,
          // userName:  userName,


        },
        mode: "cors",
      }).then((res) => {
        console.log("response", res);
        if (res.status == 200) {

          // CommonToasts.basicToast("Successfully Comment Added");

          setTicketHistory(res.data.body.items)

          // GetTickets()


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

  const ticketHistoryClosed = () => {
    // const userId = user1?.user?.userId;

    try {
      axios({
        method: "get",
        url: urls.GET_TICKET_REPORT+`closed?startDate=${selectedDate}&endDate=${selectedDate1}&userId=${userId}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
          "Authorization": `Bearer ` + user1.jwt,
        },
        data: {
          // selectedDate1: selectedDate1,
          // selectedDate1: selectedDate1,
          // id: id,
          // comment: comment,
          // status1: status1
          // createdDate: createdDate,
          // userId: user1.user.userId,
          // userName:  userName,


        },
        mode: "cors",
      }).then((res) => {
        console.log("response", res);
        if (res.status == 200) {

          // CommonToasts.basicToast("Successfully Comment Added");

          setTicketHistoryClosed(res.data.body.items)

          // GetTickets()


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
  const handleDateChange = (date) => {
    if (date) {
      const isoFormattedDate = moment(date).format("YYYY/MM/DD");
      setSelectedDate(isoFormattedDate);
    } else {
      setSelectedDate(null);
    }
  };
  const handleDateChange1 = (date) => {
    if (date) {
      const isoFormattedDate = moment(date).format("YYYY/MM/DD");
      setSelectedDate1(isoFormattedDate);
    } else {
      setSelectedDate1(null);
    }
  };

  console.log("history Line chart", ticketHistorylinechart)

  // useEffect(() => {
  //   ticketHistory();
  // }, );

  const data = {
    labels: ticketHistorylinechart.map((data) => data.date),
    // datasets: 
    datasets: [
      {
        label: 'Open Ticket',
        data: ticketHistorylinechart.map((data) => data.value),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Closed Ticket',
        data: ticketHistoryclosed.map((data) => data.value),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
    // [
    //   {
    //     label: "Ticket",
    //     data: ticketHistorylinechart.map((data) => data.value),
    //     borderColor: "rgba(16, 185, 129, 1)",
    //     backgroundColor: "rgba(16, 185, 129, 0.2)",
    //     borderWidth: 1,
    //   },
    // ],
  };
  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ticket History',
      },
    },
  };

  useEffect(()=>{
    getDashboardDetails();
  },[]);

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




  //   const labels = Utils.months({count: 7});
  // const data = {
  //   labels: labels,
  //   datasets: [{
  //     label: 'My First Dataset',
  //     data: [65, 59, 80, 81, 56, 55, 40],
  //     fill: false,
  //     borderColor: 'rgb(75, 192, 192)',
  //     tension: 0.1
  //   }]
  // };



  // const config = {
  //   type: 'line',
  //   data: data,
  // };



  return (

    <div className="fixed bg-grey h-fit w-full">
      <TitleText titleText="Dashboard" />

      {/* {CommonSpinners.pageSpinner("Fetching Details")} */}

      {user1.user.roles[0].name == "ADMIN" || user1.user.roles[0].name == "IT_ADMIN" ? (
        <body class="flex bg-white min-h-100 mt-4 " style={{
          height: '690px',
          width: '1358px',
          overflow: 'auto'
        }}>

          <div class=" fixed flex-grow text-gray-800">

            <main class=" p-6 sm:p-10 space-y-6 ">

              <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6 overflow-y-auto ">
                <div class="flex items-center p-8 bg-white shadow rounded-lg">
                  <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <span class="block text-2xl font-bold">{ dashboardDetail.userCount }</span>
                    <span class="block text-gray-500">Users</span>
                  </div>
                </div>
                <div class="flex items-center p-8 bg-white shadow rounded-lg">
                  <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <span class="block text-2xl font-bold">{ dashboardDetail.openTicketCount }</span>
                    <span class="block text-gray-500">Open Tickets</span>
                  </div>
                </div>
                <div class="flex items-center p-8 bg-white shadow rounded-lg">
                  <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  </div>
                  <div>
                    <span class="inline-block text-2xl font-bold">{ dashboardDetail.closedTicketCount }</span>
                    {/* <span class="inline-block text-xl text-gray-500 font-semibold">(14%)</span> */}
                    <span class="block text-gray-500">Closed Tickets</span>
                  </div>
                </div>
                <div class="flex items-center p-8 bg-white shadow rounded-lg">
                  <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <span class="block text-2xl font-bold">{ dashboardDetail.inProgressTicketCount }</span>
                    <span class="block text-gray-500">In Progress</span>
                  </div>
                </div>
              </section>
              <section class=" grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6 ">
                <div class="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg h-auto">
                  {/*<div class="px-6 py-5 font-semibold border-b border-gray-100">The number of applied and left tickets per month</div>*/}
                  <div class="p-4 flex-grow ">
                    <CanvasJSChart options={options}
                    />

                  </div>
                </div>

                {/*<div class=" row-span-3 bg-white shadow rounded-lg" style={{ maxHeight: '500px' }}>*/}
                {/*  <div class=" flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">*/}
                {/*    <span>users by average open tickets</span>*/}


                {/*  </div>*/}
                {/*  <div class="overflow-y-auto" style={{ maxHeight: '400px' }} >*/}
                {/*    <ul class="p-6 space-y-6">*/}
                {/*      <li class="flex items-center">*/}
                {/*        <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">*/}

                {/*        </div>*/}
                {/*        <span class="text-gray-600">Dhananjali Herath</span>*/}
                {/*        <span class="ml-auto font-semibold">1</span>*/}
                {/*      </li>*/}
                {/*      <li class="flex items-center">*/}
                {/*        <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">*/}

                {/*        </div>*/}
                {/*        <span class="text-gray-600">Dhananjali Herath</span>*/}
                {/*        <span class="ml-auto font-semibold">2</span>*/}
                {/*      </li>*/}
                {/*      <li class="flex items-center">*/}
                {/*        <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">*/}

                {/*        </div>*/}
                {/*        <span class="text-gray-600">Dhananjali Herath</span>*/}
                {/*        <span class="ml-auto font-semibold">3</span>*/}
                {/*      </li>*/}
                {/*      <li class="flex items-center">*/}
                {/*        <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">*/}

                {/*        </div>*/}
                {/*        <span class="text-gray-600">Dhananjali Herath</span>*/}
                {/*        <span class="ml-auto font-semibold">4</span>*/}
                {/*      </li>*/}
                {/*      <li class="flex items-center">*/}
                {/*        <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">*/}

                      {/*  </div>*/}
                      {/*  <span class="text-gray-600">Dhananjali Herath</span>*/}
                      {/*  <span class="ml-auto font-semibold">5</span>*/}
                      {/*</li>*/}



                {/*    </ul>*/}
                {/*  </div>*/}
                {/*</div>*/}


                {/*<div class="flex flex-col row-span-3 bg-white shadow rounded-lg" style={{ maxHeight: '500px' }}>*/}
                {/*  <div class="px-6 py-5 font-semibold border-b border-gray-100">Tickets in progress</div>*/}
                {/*  <div class="p-4 flex-grow">*/}
                {/*    <div class="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>*/}
                {/*  </div>*/}
                {/*</div>*/}




              </section>

            </main>
          </div>
        </body>
      ) : null}

      {user1.user.roles[0].name == "EMPLOYEE" ? (
        <body class="flex bg-white min-h-100 mt-4 " style={{
          height: '690px',
          width: '1358px',
          overflow: 'auto'
        }}>

          <div class=" fixed flex-grow text-gray-800">

            <main class=" p-6 sm:p-10 space-y-6 ">

              <section class="grid md:grid-cols-2 xl:grid-cols-4 gap-6 overflow-y-auto ">
                <div class="flex items-center p-8 bg-white shadow rounded-lg">
                  <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <span class="block text-2xl font-bold">{ dashboardDetail.userCount }</span>
                    <span class="block text-gray-500">Users</span>
                  </div>
                </div>
                <div class="flex items-center p-8 bg-white shadow rounded-lg">
                  <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <span class="block text-2xl font-bold">{ dashboardDetail.openTicketCount }</span>
                    <span class="block text-gray-500">Open Tickets</span>
                  </div>
                </div>
                <div class="flex items-center p-8 bg-white shadow rounded-lg">
                  <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  </div>
                  <div>
                    <span class="inline-block text-2xl font-bold">{ dashboardDetail.closedTicketCount }</span>
                    {/* <span class="inline-block text-xl text-gray-500 font-semibold">(14%)</span> */}
                    <span class="block text-gray-500">Closed Tickets</span>
                  </div>
                </div>
                <div class="flex items-center p-8 bg-white shadow rounded-lg">
                  <div class="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <span class="block text-2xl font-bold">{ dashboardDetail.inProgressTicketCount }</span>
                    <span class="block text-gray-500">In Progress</span>
                  </div>
                </div>
              </section>
              {/*<section class=" grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6 ">*/}
              {/*  <div class="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg h-auto">*/}
              {/*    <div class="px-6 py-5 font-semibold border-b border-gray-100">Ticket History</div>*/}
              {/*    <div className="container">*/}
                    {/*<div className="datepicker-wrapper">*/}
                    {/*  <DatePicker*/}
                    {/*    selected={selectedDate ? moment(selectedDate, "YYYY-MM-DD").toDate() : null}*/}
                    {/*    onChange={handleDateChange}*/}
                    {/*    dateFormat="yyyy/MM/dd"*/}
                    {/*    placeholderText="Select a date"*/}
                    {/*  />*/}
                    {/*</div>*/}

                    {/*<div className="datepicker-wrapper">*/}
                    {/*  <DatePicker*/}
                    {/*    selected={selectedDate1 ? moment(selectedDate1, "YYYY-MM-DD").toDate() : null}*/}
                    {/*    onChange={handleDateChange1}*/}
                    {/*    dateFormat="yyyy/MM/dd"*/}
                    {/*    placeholderText="Select a date"*/}
                    {/*  />*/}
                    {/*</div>*/}

                    {/*<select*/}
                    {/*  id="type"*/}
                    {/*  className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"*/}
                    {/*  onChange={(e) => setUserId(e.target.value)}*/}
                    {/*>*/}
                    {/*  <option value="">Select...</option>*/}
                    {/*  {userList?.map((user) => (*/}
                    {/*    <option key={user.id} value={user.id}>*/}
                    {/*      {user.firstName} {user.lastName}*/}
                    {/*    </option>*/}
                    {/*  ))}*/}
                    {/*</select>*/}

                    {/*<button*/}
                    {/*  onClick={() => {*/}
                    {/*    ticketHistory();*/}
                    {/*    ticketHistoryClosed();*/}
                    {/*  }}>*/}
                    {/*  <svg*/}
                    {/*    xmlns="http://www.w3.org/2000/svg"*/}
                    {/*    fill="none"*/}
                    {/*    viewBox="0 0 24 24"*/}
                    {/*    strokeWidth="1.5"*/}
                    {/*    stroke="currentColor"*/}
                    {/*    className="md:w-6 h-6 mt-1 mx-1"*/}
                    {/*  >*/}
                    {/*    <path*/}
                    {/*      strokeLinecap="round"*/}
                    {/*      strokeLinejoin="round"*/}
                    {/*      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"*/}
                    {/*    />*/}
                    {/*  </svg>*/}
                    {/*</button>*/}
                  {/*</div>*/}

                  {/*<div className="p-4 flex-grow">*/}
                  {/*  <Line data={data} options={options1} />*/}
                  {/*</div>*/}
                {/*</div>*/}
                {/*<div class=" row-span-3 bg-white shadow rounded-lg" style={{ maxHeight: '500px' }}>*/}
                {/*  <div class=" flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">*/}
                {/*    <span>users by average open tickets</span>*/}


                {/*  </div>*/}
                {/*  <div class="overflow-y-auto" style={{ maxHeight: '400px' }} >*/}
                {/*    <ul class="p-6 space-y-6">*/}
                {/*      <li class="flex items-center">*/}
                {/*        <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">*/}

                {/*        </div>*/}
                {/*        <span class="text-gray-600">Dhananjali Herath</span>*/}
                {/*        <span class="ml-auto font-semibold">1</span>*/}
                {/*      </li>*/}
                {/*      <li class="flex items-center">*/}
                {/*        <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">*/}

                {/*        </div>*/}
                {/*        <span class="text-gray-600">Dhananjali Herath</span>*/}
                {/*        <span class="ml-auto font-semibold">2</span>*/}
                {/*      </li>*/}
                {/*      <li class="flex items-center">*/}
                {/*        <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">*/}

                {/*        </div>*/}
                {/*        <span class="text-gray-600">Dhananjali Herath</span>*/}
                {/*        <span class="ml-auto font-semibold">3</span>*/}
                {/*      </li>*/}
                {/*      <li class="flex items-center">*/}
                {/*        <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">*/}

                {/*        </div>*/}
                {/*        <span class="text-gray-600">Dhananjali Herath</span>*/}
                {/*        <span class="ml-auto font-semibold">4</span>*/}
                {/*      </li>*/}
                {/*      <li class="flex items-center">*/}
                {/*        <div class="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">*/}

                {/*        </div>*/}
                {/*        <span class="text-gray-600">Dhananjali Herath</span>*/}
                {/*        <span class="ml-auto font-semibold">5</span>*/}
                {/*      </li>*/}



                {/*    </ul>*/}
                {/*  </div>*/}
                {/*</div>*/}


                {/*<div class="flex flex-col row-span-3 bg-white shadow rounded-lg" style={{ maxHeight: '500px' }}>*/}
                {/*  <div class="px-6 py-5 font-semibold border-b border-gray-100">Tickets in progress</div>*/}
                {/*  <div class="p-4 flex-grow">*/}
                {/*    <div class="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>*/}
                {/*  </div>*/}
                {/*</div>*/}




              {/*</section>*/}

            </main>
          </div>
        </body>
      ) : null}

      <style js>{`
.datepicker-wrapper {
  display: inline-block;
}

.react-datepicker {
  display: inline-block;
}

.react-datepicker__input-container input {
  display: inline-block;
}
  
        
      `}</style>
    </div>


























  );
}

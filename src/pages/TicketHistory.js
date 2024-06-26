import TitleText from "../components/TitleText";
import {React, useEffect, useRef, useState} from "react";
import {Tooltip} from "react-tippy";
import {CloudDownload, CloudDownloadOutlined, ForumOutlined, SearchOutlined} from "@mui/icons-material";
import CommonToasts from "../common/Toasts";
import UserService from "../services/UserService";
import axios from "axios";
import urls from "../common/Urls";
import AuthService from "../services/AuthenticationService";
import ReactPaginate from "react-paginate";
import moment from "moment";
import {downloadExcel, DownloadTableExcel} from 'react-export-table-to-excel';


export default function TicketHistory() {

    const user1 = AuthService.getCurrentUser();

    const [userList,setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState('')
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedTicketType, setSelectedTicketType] = useState('');
    const [startDate, setStartDate] = useState(null); // State for starting date
    const [endDate, setEndDate] = useState(null); // State for end date
    const [tickets, setTickets] = useState([]);
    const ticketData = useRef(null);
    const header = ["Ticket Number", "Title", "Description","Type", "Status","User Name","Employee ID"];

    // pagination
    const [pageNumber, setPageNumber] = useState(0);
    const ticketPerPage =10;
    const pageVisited = pageNumber * ticketPerPage;
    const pageCount = Math.ceil(tickets.length / ticketPerPage);

    const changePage = ({selected}) => {
        console.log("selected page",selected);
        setPageNumber(selected);
    }

    // set the search value
    const handleSearchInputChange = (evt) => {
        setSearchQuery(evt.target.value);
    }

    // search the reports when enter key is pressed
    const handleKeyDown = (evt) => {
        if (evt.key === "Enter") {
            getTicketHistoryData();
        }
    }

    // Function to handle starting date change
    const handleStartDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        // Validate if selected date is not in the future
        if (selectedDate > new Date()) {
            CommonToasts.errorToast("Starting date cannot be in the future.");
            return;
        }
        setStartDate(selectedDate);
    };

    const handleEndDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        // Validate if end date is not less than starting date
        if (startDate && selectedDate < startDate) {
            CommonToasts.errorToast("End date cannot be before starting date.");
            return;
        }
        setEndDate(selectedDate);
    };

    const getTicketHistoryData = async () =>{
        try {
            console.log("logged in user",user1.jwt);
            console.log("selected query",searchQuery);
            console.log("selected status",status);
            console.log("selected User",selectedUserId);
            console.log("selected ticket type",selectedTicketType);
            console.log("selected starting date",startDate);
            console.log("selected end date",endDate);

            let formatStartingDate = null;
            let formatEndingDate = null;


            let paramList = {
                search: searchQuery,
                status: status,
                userId: selectedUserId,
                type:selectedTicketType,
            }

            if (startDate != null){
                formatStartingDate =moment(startDate).format("YYYY/MM/DD");
                paramList.startDate = formatStartingDate
            }

            if(endDate != null){
                formatEndingDate =moment(endDate).format("YYYY/MM/DD");
                paramList.endDate = formatEndingDate;
            }

            console.log("paramList",paramList);

            const response = await axios.get(urls.GET_TICKET_HISTORY,{
                headers:{
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Authorization': `Bearer ` + user1.jwt,
                },
                params: paramList,
            });

            console.log(response.data.body);
            setTickets(response.data.body);


        }catch (err){
            console.log(err)
        }
    }


    // get All Users
    useEffect(() => {
        console.log("initial report load")

        async function getAllUserData() {
            try {
                const response = await UserService.getAllUsers(1, 5);
                setUserList(response.data.body);
            }catch(e){
                CommonToasts.errorToast(e.message);
            }
        }
        getAllUserData();

    }, []);

    // get Data to table
    useEffect(() => {
        getTicketHistoryData();
    }, []);


    // Download data
    const handleExport= () =>{
        // const worksheet = XLSX.utils.json_to_sheet(tickets);
        // const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(workbook,worksheet,'Data');
        //
        //
        //
        // XLSX.writeFile(workbook,'export.xlsx');
    };

    function handleDownloadExcel(){
        downloadExcel({
            fileName:"data",
            sheet:"data-export",
            tablePayload:{
                header,
                body: tickets.map((data) => {
                    // Destructure relevant properties from ticket object
                    const { ticketId, title, description, type, status, user } = data;

                    // Access nested user properties
                    const { firstName, lastName, employeeId } = user;

                    // Construct the data row with desired properties
                    return { ticketId, title, description, type, status, fullName: `${firstName} ${lastName}`, employeeId }
                })
            }
        });
    }





    return(
        <div className=" bg-gray h-fit w-full">
            <TitleText titleText="Deleted Ticket History" />
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
                                    onClick={getTicketHistoryData}>
                                    <SearchOutlined/>

                                </button>
                            </Tooltip>
                        </div>

                        {/*Ticket Status */}
                        <div className="w-40">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                Status:
                            </label>
                            <select
                                id="status"
                                className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500
                                focus:border-blue-500 block w-44 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                onChange={(e) => setStatus(e.target.value)}

                            >
                                <option value="">Status</option>
                                <option value="">All</option>
                                <option value="OPEN">OPEN</option>
                                <option value="ACCEPTED">ACCEPTED</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="CLOSED">CLOSED</option>
                            </select>
                        </div>

                        {/*All Users*/}
                        <div className="w-40">
                            <label htmlFor="userid" className="block text-sm font-medium text-gray-700">
                                User:
                            </label>
                            <select
                                id="userid"
                                className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-44 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                // onClick={handleSearchStatus}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                // value={tickets?.user?.id}
                            >
                                <option value="">Select User...</option>
                                <option value="">All Users</option>
                                {userList?.map((user) => (
                                    <option
                                        key={user.id} value={user.id}
                                    >
                                        {user.firstName} {user.lastName}
                                    </option>
                                ))}

                            </select>
                        </div>

                        {/*Select Ticket Type*/}
                        <div className="w-40">
                            <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700">
                                Ticket Type:
                            </label>
                            <select
                                id="ticketType"
                                className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500
                                focus:border-blue-500 block w-44 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                onChange={(e) => setSelectedTicketType(e.target.value)}

                            >
                                <option value="">Ticket Type</option>
                                <option value="">All</option>
                                <option value="HARDWARE">HARDWARE</option>
                                <option value="SOFTWARE">SOFTWARE</option>
                                <option value="OTHER">OTHER</option>
                            </select>
                        </div>

                        {/*starting Date*/}
                        <div className="w-40">
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                Starting Date:
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                className="bg-white focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm rounded-lg border border-gray-300"
                                onChange={handleStartDateChange}
                                max={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                        {/* End Date */}
                        <div className="w-40">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                End Date:
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                className="bg-white focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-sm rounded-lg border border-gray-300"
                                onChange={handleEndDateChange}
                                max={new Date().toISOString().split('T')[0]}
                            />
                        </div>

                    </div>
                </div>

                {/*body*/}
                {/*<ReactToExcel*/}
                {/*    className="relative flex items-center justify-center"*/}
                {/*    table="ticket-data"*/}
                {/*    filename="expot-data"*/}
                {/*    sheet="sheet 1"*/}
                {/*    buttonText="Expot"*/}
                {/*/>*/}
                <div>
                    {/* <div className="flex justify-end mr-5">
                        <Tooltip title="Export Excel" position="bottom" trigger="mouseenter">
                            <button onClick={handleDownloadExcel}>
                                <div className="flex  ">
                                    Export to Excel
                                    <CloudDownloadOutlined/>

                                </div>

                            </button>
                        </Tooltip>
                    </div> */}


                <table ref={ticketData} id="ticket-data"
                           className="table-auto m-4 border-separate border-spacing-y-2">
                        <thead>
                        <tr>
                            <th className="text-center w-64" scope="col"> Ticket number</th>
                            <th className="text-center w-64">Title</th>
                            <th className="text-center w-64">Description</th>
                            <th className="text-center w-64">Type</th>
                            <th className="text-center w-64">Status</th>
                            <th className="text-center w-64">User Name</th>
                            <th className="text-center w-64">Employee Id</th>
                            {/* <th className="text-center w-64">Commands</th> */}
                        </tr>
                        </thead>
                        <tbody>
                        {tickets.slice(pageVisited, pageVisited + ticketPerPage).map((ticket) => (
                            <tr className="" key={ticket.ticketId}>
                                <td className="text-center">{ticket.ticketId}</td>
                                <td className="text-center">{ticket.title}</td>
                                <td className="text-center">{ticket.description}</td>
                                <td className="text-center">{ticket.type}</td>
                                <td className="text-center">{ticket.status}</td>
                                <td className="text-center">{ticket.user.firstName} {ticket.user.lastName}</td>
                                <td className="text-center">{ticket.user.employeeId}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {/*</ExportToExcel>*/}
                </div>
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
                    activeClassName={"paginationActive"}
                />

            </div>

        </div>


    );
}
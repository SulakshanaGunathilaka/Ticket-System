import { React, useState, useEffect } from "react";
import CommonSpinners from "../common/Spinners";
import CommonToasts from "../common/Toasts";
import TitleText from "../components/TitleText";
import UserService from "../services/UserService";
import axios from "axios";
import AuthService from "../services/AuthenticationService";
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import urls from "../common/Urls";
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 

export default function Report(){
    const [userList, setUserList] = useState([]);
    // const [pageNumbers, setPageNumbers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [status, setStatus] = useState("");
    const [type, settype] = useState("");
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  
    const [data, setData] = useState(null);
  
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
            type: type,
            startDate: startDate ? startDate.toISOString() : null, // Convert to ISO format
            endDate: endDate ? endDate.toISOString() : null,
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
  
          console.log("Hellooo", response)
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
  
  
  
    function updatePageNumbers() {
      const pageNumberArray = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumberArray.push(i);
      }
      // setPageNumbers(pageNumberArray);
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
  
  
  
  
  
    const [open, setOpen] = useState(0);
  
  
    console.log("test", user1)
  
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

    });
  
  
  
    const { register, handleSubmit, formState: { errors }, } = useForm({});  
  
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
  

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  
    const getEmployeePage = (page) => {
      axios({
        method: 'get',
        url: urls.USER_BASE_URL + `page?page=${page}&offset=10`,
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
            setTotalPages(res.data.totalPages);
            setUserList(res.data.content);
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
  
    return(
    <div className=" bg-grey h-fit w-full ">
    <TitleText titleText="Report"/>
        {loading ? CommonSpinners.pageSpinner("Fetching Users")
          :
            <div className=" absolute mt-4 h-[82%] w-[82%] bg-white rounded-lg border-2 border-gray-200 shadow-md">

                <div class="space-y-10">

              <div class="flex items-center p-3 space-x-6 bg-sky-300  shadow-lg hover:shadow-xl">

                <div class="flex bg-white p-2 w-96 space-x-4 rounded-lg">



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
                  <button onClick={performSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mt-1 mx-1 ">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>

                  </button>
                </div>

                <div className="w-48">
                  <select
                    id="type"
                    className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Select status</option>
                    <option value="OPEN">OPEN</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>

                <div className="w-48">
                  <select
                    id="type"
                    className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={(e) => settype(e.target.value)}
                  >
                    <option value="">Select type</option>
                    <option value="HARDWARE">HARDWARE</option>
                    <option value="SOFTWARE">SOFTWARE</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>

                                <div className="flex flex-col space-y-2"> {/* Added space-y-4 for spacing */}
                <div className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">  {/* Nested flexbox for Start Date */}
                    <div className="text-sm font-low">Start Date:</div>
                    <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy/MM/dd"
                    />
                </div>
                <div className="bg-white border border-white text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"> {/* Nested flexbox for End Date */}
                    <div className="text-sm font-low">End Date:</div>
                    <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy/MM/dd"
                    selectsRange={startDate} // Disable selecting a date before startDate
                    startDate={startDate}  // Disable selecting a date after endDate
                    endDate={endDate}
                    />
                </div>
                </div>

              </div>
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




        }
    </div>
);
}
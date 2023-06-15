
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Outlet} from "react-router-dom";
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

import SideBar from './components/SideBar';
import StatusBar from './components/StatusBar';
import {ToastContainer} from  'react-toastify';
// import CreateUserPage from './pages/CreateUser';
// import CreateUserComponents from './pages/CreateUserComponents';
import CreateUser2 from './pages/CreateUser2';
// import Leave from './pages/Leave';
import EditUser from './pages/EditUser';
import Profile from './pages/Profile';
import Search from './components/Search';
import EmployeePage from './pages/Employees';
import { Calendar } from 'react-calendar';
import FullCalendarComponent from './components/Calendar/FullCalendar';
import ReactBigCalendar from './components/Calendar/ReactBigCalendar';
import TicketPage from './pages/Ticket';
import FAQPage from './pages/FaqPage';
import { Provider } from 'react-redux';
import store from './redux/store';










function App() {
  
  

   const SidebarLayout = () => (
    <>
    <SideBar />
      <StatusBar/>
      <div className='ml-64 pt-12 w-[80%] h-[85%]'>
      <Outlet />
        </div> 
    
    </>
  );
    
  return (

    <Provider store={store}>
    <BrowserRouter>
      <Routes>
      <Route element={<Outlet />}>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
        </Route>     

      <Route element={<SidebarLayout/>}>
        <Route path="/home" element={<HomePage />} />
        <Route path='/employees' element={<EmployeePage />} />
        
        {/* <Route path='/createUser/address' element={<CreateUserComponents.AddressInfoComponent />} /> */}
       
        
        {/* <Route path='/leave' element={<Leave />} /> */}
        
           {/* <Route path='/createUser' element={<CreateUserPage />} />, */}
            <Route path='/create' element={<CreateUser2 />} />,
            <Route path='/edituser' element={<EditUser />} />

         
          
            <Route path='/create' element={<CreateUser2 />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/search' element={<Search />} />
            <Route path='/calendar' element={<Calendar />} />
            {/* <Route path='/fullcalendar' element={<ReactBigCalendar />} /> */}
            <Route path='/leave' element={<TicketPage />} />
            <Route path='/fullcalendar' element={<FAQPage/>} />
            
         
          </Route>
      
      </Routes>
    
      <ToastContainer />
      
    </BrowserRouter>
    </Provider>  


  );
}

export default App;

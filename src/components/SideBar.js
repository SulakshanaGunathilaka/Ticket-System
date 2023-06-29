import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Collapse } from "react-collapse";
import { Flowbite } from "flowbite-react";
import { useState } from "react";
import AuthService from "../services/AuthenticationService";

export default function SideBar() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const [open, setOpen] = React.useState(true);

  const user1 = AuthService.getCurrentUser();

  console.log("roles");
  console.log(user1.user.roles[0].name);



  return (
    <aside
      className="absolute w-64 h-screen flex flex-col "
      aria-label="Sidebar"
    >
      <div className="flex flex-col ml-6 mr-8 mt-12 mb-6 h-full py-4 px-4 bg-white-600 rounded-lg shadow-md shadow-gray-500">
        <div className="flex items-center pl-2.5 mb-5 ">
          {/** <img src={require('../images/logo-small2.png')} className="mr-1 p-2 h-6 sm:h-10 bg-black" alt="CCMS Logo" /> **/}
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black ">
            CCMS HRIS
          </span>
        </div>
        <ul className="space-y-2">
          <li className={splitLocation[1] === "home" ? "active" : ""}>
            <div>
              <Link
                end
                to="/home"
                className="flex items-center p-2 text-base font-normal text-black rounded-lg  hover:bg-gray-300"
              >
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
                    d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
                  />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  {" "}
                  Dashboard
                </span>
              </Link>
            </div>
          </li>

          {user1.user.roles[0].name == "ADMIN" ? (
            <li className={splitLocation[1] === "employees" ? "active" : ""}>
              <Link
                end
                to="/employees"
                className="flex items-center p-2 text-base font-normal text-black  rounded-lg dark:text-white hover:bg-gray-300"
              >
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
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Employees</span>
              </Link>
            </li>
          ) : null}
          {user1.user.roles[0].name == "ADMIN" ? (
            <li className={splitLocation[1] === "createuser" ? "active" : ""}>
              <Link
                end
                to="/create"
                className="flex items-center p-2 text-base font-normal text-black  rounded-lg dark:text-white hover:bg-gray-300"
              >
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Create User</span>
              </Link>
            </li>
          ) : null}
          {user1.user.roles[0].name == "ADMIN" ? (
            <li className={splitLocation[1] === "edituser" ? "active" : ""}>
              <Link
                end
                to="/editUser"
                className="flex items-center p-2 text-base font-normal text-black  rounded-lg dark:text-white hover:bg-gray-300"
              >
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

                <span className="flex-1 ml-3 whitespace-nowrap">Edit User</span>
              </Link>
            </li>
          ) : null}
{/* 
          <li className={splitLocation[1] === "leave" ? "active" : ""}>
            <Link
              end
              to="/leave"
              className="flex items-center p-2 text-base font-normal text-black  rounded-lg dark:text-white hover:bg-gray-300"
            >
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
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                />
              </svg>

              <span className="flex-1 ml-3 whitespace-nowrap">
                Leave Details
              </span>
            </Link>
          </li>

          <li className={splitLocation[1] === "calendar" ? "active" : ""}>
            <Link
              end
              to="/fullcalendar"
              className="flex items-center p-2 text-base font-normal text-black  rounded-lg dark:text-white hover:bg-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>


              <span className="flex-1 ml-3 whitespace-nowrap">Calendar</span>
            </Link>
          </li> */}

            <li className={splitLocation[1] === "Ticket" ? "active" : ""}>
            <Link
              end
              to="/leave"
              className="flex items-center p-2 text-base font-normal text-black  rounded-lg dark:text-white hover:bg-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg"  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6">
                <path d="M3 6h18v12H3zm0 0v6h18v-6"></path>
                <path d="M3 18h18"></path>
                <path d="M12 3v6"></path>
              </svg>

              <span className="flex-1 ml-3 whitespace-nowrap">
                Tickets
              </span>
            </Link>
          </li>

          <li className={splitLocation[1] === "FAQPage" ? "active" : ""}>
            <Link
              end
              to="/fullcalendar"
              className="flex items-center p-2 text-base font-normal text-black  rounded-lg dark:text-white hover:bg-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>


              <span className="flex-1 ml-3 whitespace-nowrap">FAQPage</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { SidebarData } from './SidebarData';
// import SubMenu from './SubMenu';
// import { IconContext } from 'react-icons/lib';

// const Nav = styled.div`
//   background: #15171c;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const NavIcon = styled(Link)`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

// const SidebarNav = styled.nav`
//   background: #15171c;
//   width: 250px;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
//   transition: 350ms;
//   z-index: 10;
// `;

// const SidebarWrap = styled.div`
//   width: 100%;
// `;

// const Sidebar = () => {
//   const [sidebar, setSidebar] = useState(false);

//   const showSidebar = () => setSidebar(!sidebar);

//   return (
//     <>
//       <IconContext.Provider value={{ color: '#fff' }}>
//         <Nav>
//           <NavIcon to='#'>
//             <FaIcons.FaBars onClick={showSidebar} />
//           </NavIcon>
//         </Nav>
//         <SidebarNav sidebar={sidebar}>
//           <SidebarWrap>
//             <NavIcon to='#'>
//               <AiIcons.AiOutlineClose onClick={showSidebar} />
//             </NavIcon>
//             {SidebarData.map((item, index) => {
//               return <SubMenu item={item} key={index} />;
//             })}
//           </SidebarWrap>
//         </SidebarNav>
//       </IconContext.Provider>
//     </>
//   );
// };

// export default Sidebar;

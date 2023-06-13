const BASE_URL = "http://localhost:8080";

const LOGIN_URL = BASE_URL + "/authenticate";
const GET_ALL_USERS_URL  = BASE_URL + "/users";
const VIEW_USER = GET_ALL_USERS_URL + "/userId"
const GET_ALL_LEAVE_DETAILS_URL = BASE_URL + "/leaveApplication/";
const GET_ALL_TICKETS_URL  = BASE_URL + "/tickets";

const urls = {
    LOGIN_URL,
    GET_ALL_USERS_URL,
    GET_ALL_LEAVE_DETAILS_URL,
    VIEW_USER,
    GET_ALL_TICKETS_URL
  }

  export default urls;


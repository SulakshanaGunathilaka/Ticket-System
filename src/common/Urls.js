
//production
// const BASE_URL = "http://172.16.1.237:8080";
const BASE_URL = "http://localhost:8080";

// const WEBSOCKET = "http://172.16.1.237:8080/ws-message";
const WEBSOCKET = "http://localhost:8080/ws-message";

const LOGIN_URL = BASE_URL + "/authenticate";
const GET_ALL_USERS_URL  = BASE_URL + "/users";
const VIEW_USER = GET_ALL_USERS_URL + "/userId"
const GET_ALL_LEAVE_DETAILS_URL = BASE_URL + "/leaveApplication/";
const GET_ALL_TICKETS_URL  = BASE_URL + "/tickets";

const USER_BASE_URL = BASE_URL+"/users/";
const USER_FILTER_URL = BASE_URL+"/users/filter";

const HOLIDAY_URL = BASE_URL+"/holidays"

const GET_TICKETS_WITH_FILTER_URL  = BASE_URL + "/tickets/filter?";
const GET_TICKETS_BY_USER=BASE_URL+"/tickets/user/";
const CREATE_TICKET=BASE_URL+"/tickets/dto";
const UPDATE_TICKET=BASE_URL+"/tickets/";
const TICKET_BASE_URL = BASE_URL+"/tickets/";

const CREATE_USER = BASE_URL+"/users/dto";

const GET_ADMIN_DASHBOARD= BASE_URL+"/dashboard/admin";
const GET_USER_DASHBOARD =BASE_URL+"/dashboard/user/";

const GET_CURRENT_USER = BASE_URL + "/users/";

const FAQ_BASE_URL = BASE_URL+"/faqItems";

const GET_TICKET_REPORT = BASE_URL+"/reports/tickets/";

const BULK_USER_UPLOAD = BASE_URL+"/users/bulk";

const RESET_PASSWORD = BASE_URL+"/rest-password";

const TICKET_REPORT = BASE_URL+"/reports/tickets/report";

const GET_TICKET_HISTORY = BASE_URL+"/ticketHistory/deletedTicketHistory"

const DELETE_TICKET = BASE_URL+"/tickets/deleteTicket/"

const UPDATE_USER_STATUS = BASE_URL+"/users/update/"




const urls = {
    LOGIN_URL,
    GET_ALL_USERS_URL,
    GET_ALL_LEAVE_DETAILS_URL,
    VIEW_USER,
    GET_ALL_TICKETS_URL,
    GET_TICKETS_WITH_FILTER_URL,
    GET_TICKETS_BY_USER,
    CREATE_TICKET,
    UPDATE_TICKET,
    TICKET_BASE_URL,
    CREATE_USER,
    GET_ADMIN_DASHBOARD,
    GET_USER_DASHBOARD,
    GET_CURRENT_USER,
    USER_BASE_URL,
    FAQ_BASE_URL,
    GET_TICKET_REPORT,
    USER_FILTER_URL,
    HOLIDAY_URL,
    WEBSOCKET,
    BULK_USER_UPLOAD,
    RESET_PASSWORD,
    TICKET_REPORT,
    GET_TICKET_HISTORY,
    DELETE_TICKET,
    UPDATE_USER_STATUS
  }

  export default urls;


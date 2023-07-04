// actions.js
import axios from "axios";
import { DELETE_TICKET ,GET_ALL_TICKETS,SUCCESS,ERROR,TICKET_ADD_SUCCESS,VIEW_TICKET_DESCRIPTION,SET_TICKET_DETAILS,SEARCH_SUCCESS,SET_SEARCH_QUERY,SET_SEARCH_STATUS,SET_SEARCH_USERID,FETCH_TICKET_PAGE,FETCH_TICKET_OFFSET } from "./Types";
import AuthService from "../../services/AuthenticationService";
import urls from "../../common/Urls";
import CommonToasts from "../../common/Toasts";



export const deleteTicket = (ticketId) => {
  return (dispatch) => {
    const user1 = AuthService.getCurrentUser();

    axios({
      method: "delete",
      url: "http://localhost:8080/tickets/" + ticketId,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
        Authorization: `Bearer ` + user1.jwt,
      },
      data: null,
      mode: "cors",
    })
      .then((res) => {
        console.log("response", res);
        dispatch({
          type: DELETE_TICKET,
          ticketId: ticketId,
        });
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting ticket:", error);
      });
  };
};

export const getAllTickets = (page, pageSize,status,searchQuery) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_TICKETS });

    try {
      const user1 = AuthService.getCurrentUser();
      const response = await axios.get(urls.GET_ALL_TICKETS_URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + user1.jwt,
        },
        params: {
          page: page,
          pageSize: pageSize,
          searchQuery: searchQuery,
          status:status,
        },
      });

      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        dispatch({
          type: ERROR,
          error: 'Error. Token is not Valid',
        });
      } else {
        dispatch({
          type: ERROR,
          error: 'Error: Something Went Wrong',
        });
      }
    }
  };
};


export const addTickets = (userId1, type, description,title) => async (dispatch) => {
  const user1 = AuthService.getCurrentUser();

  try {
    const res = await axios.post(
      'http://localhost:8080/tickets/dto',
      {
        userId: userId1,
        type: type,
        description: description,
        title:title,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Authorization": `Bearer ${user1.jwt}`,
        },
        mode: "cors",
      }
    );

    if (res.status === 200) {
      dispatch({
        type: TICKET_ADD_SUCCESS,
        payload: res.data, // Modify this according to your response structure
      });

      CommonToasts.basicToast("Successfully Added");
    }
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message,
    });

    CommonToasts.errorToast(error.message);
  }
};


export const viewTicketDescription = (ticketId) => {
  const user1 = AuthService.getCurrentUser();

  return (dispatch) => {
    axios({
      method: "get",
      url: "http://localhost:8080/tickets/" + ticketId,
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
      var tickets = res.data.body;
      dispatch(setTicketDetails(tickets));
    });
  };
};
const setTicketDetails = (tickets) => {
  return {
    type: SET_TICKET_DETAILS,
    payload: tickets,
  };
};

export const performSearch = (searchQuery, status,userId,page,offset) => {
  const user1 = AuthService.getCurrentUser();
  return async (dispatch, getState) => {
    try {
     

      const response = await axios.get(`http://localhost:8080/tickets/filter?page=1&offset=10`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Authorization:
          `Bearer ` +
          user1.jwt,
        },
        params: {
          q: searchQuery,
          status: status,
          userId:userId,
         
        
        },
      });

      console.log(response.data);

      // Dispatch the response data to update the store
      dispatch({ type: SEARCH_SUCCESS, data: response.data });
      var tickets = response.data;
      dispatch(setTicketDetails(tickets));
      console.log("Search ticketssssssssssss",tickets)
      dispatch(fetchTicketpage(response.data.totalElements
        ));
      dispatch(fetchTicketoffset(response.data.totalPages))
   

      // dispatch(fetchTicket(page));
    } catch (error) {
      console.error(error);
      // Dispatch an error action if necessary
      dispatch({ type: ERROR, error: error.message });
    }
  };
};

export const handleSearchInputChange = (searchQuery) => {
  return { type: SET_SEARCH_QUERY, searchQuery };
};

export const handleSearchStatus = (status) => {
  return { type: SET_SEARCH_STATUS, status };
};
export const handleSearchUserId = (userId) => {
  return { type: SET_SEARCH_USERID, userId };
};




export const getTicketPages = (page,offset) => {
  const user1 = AuthService.getCurrentUser();
  return async (dispatch, getState) => {
    try {
     

      const res = await axios.get( `http://localhost:8080/tickets/page=${page}offset=10`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          Authorization:
          `Bearer ` +
          user1.jwt,
        },
      });

      console.log("pagination",res)

     if (res.status === 200) {
      dispatch({
        type: FETCH_TICKET_PAGE,
        payload: res.data.content, 
      });
      dispatch({
        type: FETCH_TICKET_OFFSET,
        payload: res.data.totalPages, 
      });
     
      var tickets = res.data.body;
      dispatch(setTicketDetails(tickets));
      
    }
    } catch (error) {
      console.error(error);
      // Dispatch an error action if necessary
      dispatch({ type: ERROR, error: error.message });
    }
  };
};



export const fetchTicketpage = (page) => {
  return {
    type: FETCH_TICKET_PAGE,page
  };
};



export const fetchTicketoffset = (offset) => {
  return {
    type: FETCH_TICKET_OFFSET,offset
  };
};




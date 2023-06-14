// reducer.js
import { DELETE_TICKET,GET_ALL_TICKETS,GET_ALL_TICKETS_SUCCESS,GET_ALL_TICKETS_ERROR } from "../actions/Types";

const initialState = {
  tickets: [],
  loading: false,
  error: null,

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_TICKET:
      const updatedTickets = state.tickets.filter(
        (ticket) => ticket.id !== action.ticketId
      );
      return {
        ...state,
        tickets: updatedTickets,
      };
      case GET_ALL_TICKETS:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_ALL_TICKETS_SUCCESS:
        return {
          ...state,
          tickets: action.payload,
          loading: false,
          error: null,
        };
      case GET_ALL_TICKETS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error,
        };
    default:
      return state;
  }
};

export default reducer;

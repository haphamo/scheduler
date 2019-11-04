import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
//const SET_INTERVIEW = "SET_INTERVIEW"
export default function useApplicationData() {
  const initial = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };

  function reducer(state, action) {
    if (action.type === SET_DAY) {
      return { ...state, ...action.value };
    } else if (action.type === SET_APPLICATION_DATA) {
      return { ...state, ...action.value };
    }
    // else if (action.type === SET_INTERVIEW) {
    //   return { ...state, ...action.value }
    // }
    else {
      console.log(` This ${action.type} does not exist!`);
    }
  }
  const [state, dispatch] = useReducer(reducer, initial);

  function bookInterview(id, interview) {
    //locally adds new appointment
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview }
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    //goes into api endpoint to permanently add appointment
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      // dispatch({ type: SET_INTERVIEW, value: { appointments } })
      axios
        .all([
          axios.get(`/api/days`),
          axios.get(`/api/appointments`),
          axios.get(`/api/interviewers`)
        ])
        .then(all => {
          let days = all[0].data;
          let appointments = all[1].data;
          let interviewers = all[2].data;
          dispatch({
            type: SET_APPLICATION_DATA,
            value: { days, appointments, interviewers }
          });
        });
    });
  }

  //deleting interview, first part deletes it on the client side
  function cancelInterview(id) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    //deletes the interview from database
    return axios.delete(`/api/appointments/${id}`).then(() => {
      //setState({ ...state, appointments })
      // dispatch({ type: SET_INTERVIEW, value: {appointments} })
      axios
        .all([
          axios.get(`/api/days`),
          axios.get(`/api/appointments`),
          axios.get(`/api/interviewers`)
        ])
        .then(all => {
          let days = all[0].data;
          let appointments = all[1].data;
          let interviewers = all[2].data;
          dispatch({
            type: SET_APPLICATION_DATA,
            value: { days, appointments, interviewers }
          });
        });
    });
  }

  const setDay = day => dispatch({ type: SET_DAY, value: { day } });

  useEffect(() => {
    axios
      .all([
        axios.get(`/api/days`),
        axios.get(`/api/appointments`),
        axios.get(`/api/interviewers`)
      ])
      .then(all => {
        let days = all[0].data;
        let appointments = all[1].data;
        let interviewers = all[2].data;
        dispatch({
          type: SET_APPLICATION_DATA,
          value: { days, appointments, interviewers }
        });
      });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

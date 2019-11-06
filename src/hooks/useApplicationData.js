import { useReducer, useEffect } from "react";
import axios from "axios";
import {
  reducer,
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


export default function useApplicationData() {
  const initial = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };

  const [state, dispatch] = useReducer(reducer, initial);

  const checkDay = (id) => {
    let dayID = null;
    for (const obj of state.days) {
      if (obj.appointments.includes(id)) {
        dayID = obj.id;
      }
    }
    return dayID;
  }

  function bookInterview(id, interview, createInterview = false) {
    //locally adds new appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map( day => {
      return (createInterview ? day.id === checkDay(id) ? { ...day, spots: day.spots - 1 } : { ...day } : { ...day })
    });
    //goes into api endpoint to permanently add appointment
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, value: { appointments , days } })

    });
  }

  //deleting interview, first part deletes it on the client side
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map( day => {
      return (day.id === checkDay(id) ? { ...day, spots: day.spots + 1 } : { ...day })
    });
    //deletes the interview from database
    return axios.delete(`/api/appointments/${id}`).then(() => {
      //setState({ ...state, appointments })
      dispatch({ type: SET_INTERVIEW, value: {appointments, days} })

    });
  }

  const setDay = day => dispatch({ type: SET_DAY, value: { day } });
  /*The axios.get() method will return a promise.
  The Promise.all() requires an array of promises. */
  useEffect(() => {
    Promise
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

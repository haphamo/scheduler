import { useState, useEffect } from "react";
import axios from 'axios';

//import "components/Application.scss";
//import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  function bookInterview(id, interview) {
    //locally adds new appointment
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //goes into api endpoint to permanently add appointment
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments })
      })
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
    //deletes the interview from database
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments })
      })
  }

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    axios.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
      .then((all) => {
        console.log(all[2].data)
        setState(prev => ({
          ...prev, days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))

      })
  }, []);
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview

  }
}
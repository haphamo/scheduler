import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "components/Appointment"
import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
   // axios.put(`/api/appointments/:${id}`,[interview])
  }

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    axios.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])

      // .then(response => response.data.map(obj => ({
      //   name: obj.name,
      //   spots: obj.spots
      // })))

      // .then(response => {
      //   setState({ ...state, days: response.data })
      // })

      .then((all) => {
        console.log(all[2].data)
        setState(prev => ({
          ...prev, days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }))

      })
  }, []);
  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    //console.log("appointment", appointment)
    return (
      <Appointment
        {...appointment}
        key={appointment.id}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview }
        // Within the save function in our Appointment component transition to the SHOW mode after calling props.bookInterview.


      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">

          <DayList
            key={state.day}
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />}
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

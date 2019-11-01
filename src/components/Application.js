import React from "react";
import "components/Application.scss";
import DayList from "./DayList"
import Appointment from "components/Appointment"
// import axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";



export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {}
  // });
  
  // function bookInterview(id, interview) {
  //   //locally adds new appointment
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   //goes into api endpoint to permanently add appointment
  //   return axios.put(`/api/appointments/${id}`, {interview})
  //   .then(()=> {
  //     setState({...state, appointments})
  //   })
  // }
  
  // //deleting interview, first part deletes it on the client side
  // function cancelInterview(id){
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: null
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   //deletes the interview from database
  //   return axios.delete(`/api/appointments/${id}`)
  //   .then(()=> {
  //     setState({...state, appointments})
  //   })
  // }

  // const setDay = day => setState(prev => ({ ...prev, day }));

  // useEffect(() => {
  //   axios.all([
  //     axios.get(`/api/days`),
  //     axios.get(`/api/appointments`),
  //     axios.get(`/api/interviewers`)
  //   ])
  //     .then((all) => {
  //       console.log(all[2].data)
  //       setState(prev => ({
  //         ...prev, days: all[0].data,
  //         appointments: all[1].data,
  //         interviewers: all[2].data
  //       }))

  //     })
  // }, []);

  const interviewers = getInterviewersForDay(state, state.day)
 

  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  // const schedule = appointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);
  //   //console.log("appointment", appointment)
  //   return (
  //     <Appointment
  //       {...appointment}
  //       key={appointment.id}
  //       interview={interview}
  //       interviewers={interviewers}
  //       bookInterview={bookInterview}
  //       cancelInterview={cancelInterview}
  //     />
  //   );
  // });

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
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

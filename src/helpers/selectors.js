export function getAppointmentsForDay(state, day) {

  const filteredDay = state.days.filter(days => days.name === day);
  const dayAppointments = filteredDay[0]
  if (dayAppointments === undefined || dayAppointments.length === 0) {
    return [];
  } else {
    const detailedAppointments = dayAppointments.appointments.map(id => state.appointments[id])
    return detailedAppointments
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(day => day.name === day);
  const dayInterviewers = filteredDay[0]

  if (dayInterviewers === undefined || dayInterviewers.length === 0) {
    return []
  } else {
    const detailedInterviewers = dayInterviewers.interviewers.map(id => state.interviewers[id])
    return detailedInterviewers
  }
}

export function getInterview(state, interview) {

  if (!interview) return null;
  return {
    "student": interview.student,
    "interviewer": state.interviewers[String(interview.interviewer)]
  }
}


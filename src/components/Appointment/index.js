import "./styles.scss";
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from '../../hooks/useVisualMode';
import Form from "./Form";
import Saving from "./Saving";
import Deleting from "./Deleting";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDITING = "EDITING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    //create promise to create delay
    transition(SAVING)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  function del() {
    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }


  return <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDITING)}
        onDelete={() => transition(CONFIRM)}
      />
    )}
    {mode === CREATE && (<Form
      name={props.name}
      interviewers={props.interviewers}
      interview={props.interview}
      onSave={save}
      onCancel={() => back()}
    />
    )}
    {mode === SAVING &&
      <Saving
        message="Saving" />}
    {mode === CONFIRM &&
      <Confirm
        message="Delete the Appointment?"
        onCancel={() => back()}
        onConfirm={() => del()}
      />}
    {mode === DELETING &&
      <Deleting
        message="Deleting" />}
    {mode === EDITING && (<Form
      name={props.interview.student}
      interviewers={props.interviewers}
      interview={props.interview.interviewer.id}
      //onSave={save}
      onCancel={() => back()}
    />
    )}

  </article>
}
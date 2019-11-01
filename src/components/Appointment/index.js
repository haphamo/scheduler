import "./styles.scss";
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from '../../hooks/useVisualMode';
import Form from "./Form";
import Saving from "./Saving";
//import Deleting from "./Deleting";
import Confirm from "./Confirm";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  //const DELETING = "DELETING";

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
    .then(()=>transition(SHOW))
    
  }
  return <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={props.onEdit}
        onDelete={() => transition(CONFIRM)}
        //onDelete={props.delete}
      />
    )}
    {mode === CREATE && (<Form
      name={props.name}
      interviewers={props.interviewers}
      interview={props.interview}
      onSave={save}
      onCancel={()=> back()}
      
    />
    )}
    {mode === SAVING && 
    <Saving 
    message="Saving"/>}
    {mode === CONFIRM && 
    <Confirm 
    message="Delete the Appointment?"
    //onConfirm={action("onConfirm")}
    onCancel={()=> back()}/>}
    
  </article>
}
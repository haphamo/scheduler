import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, toggleError] = useState(false); //a useState to give error if user does not fill in both the name and interviewer fields

  const reset = function() {
    setName("");
    setInterviewer(null);
  };
  const cancel = function() {
    reset();
    props.onCancel();
  };

  const onSave = () => {
    if (name && interviewer) {
      props.onSave(name, interviewer);
    } else {
      toggleError(true);
    }
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          {error && <h3> Can't be blank </h3>}
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter Student Name"
            /*
            This must be a controlled component
          */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => onSave()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

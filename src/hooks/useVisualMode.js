import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);
  //This feature will require the addition of a replace argument on the transition function. When replace is true then set the history to reflect that we are replacing the current mode.
  const transition = function (newMode, replace = false) {
    if (!replace) {
    setMode(newMode)
    setHistory([...history, newMode])
    } else {
      setMode(newMode)
      history.splice(history.length-1, 1, newMode)
    }

  }
  const back = function () {
    //pop method is okay on a copy of the array
    if (history.length > 1) {
      setHistory(prev => {
        prev.pop();
        setMode(prev[prev.length - 1]);
        return prev;
      })
    } else {
      setMode(history[0])
    }
  }
  return { mode, transition, back };
}


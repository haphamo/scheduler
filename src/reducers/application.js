const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW"


function reducer(state, action) {
  if (action.type === SET_DAY) {
    return { ...state, ...action.value };
  } else if (action.type === SET_APPLICATION_DATA) {
    return { ...state, ...action.value };
  }
  else if (action.type === SET_INTERVIEW) {
    return { ...state, ...action.value }
  }
  else {
    throw "tried to reduce with unsupported action type"
    
  }
}

export {
  reducer,
  SET_APPLICATION_DATA,
  SET_DAY,
  SET_INTERVIEW
}


import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  //console.log("this props", props)
  const DayListItems = props.days.map(day => {
    return (
    //<ul key={day.name}>
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}  
        /> 
      //</ul>
    )}
  );
  
  return (
    <ul>{
      DayListItems}
    </ul>
    )
}

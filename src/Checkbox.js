import React from 'react'

export const Checkbox = (props) => {
  return (
    <input type='checkbox' name='' id={props.id} checked={props.checked} value={props.value}
    onChange={(e)=>{props.handleChecked(e.target.id, e.target.checked)}}
    ></input>
  )
}

import React from 'react'

export default function InputGroup(props) {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <input type={props.type} 
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            className={props.className}
            required 

            />
        </div>
    )
}

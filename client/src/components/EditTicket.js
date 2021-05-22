import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";

export default function EditTicket(props) {
 
  const [ticket, setTicket] = useState({})
  const [ values, setValues] = useState ({
    ticketName: '',
    description: '',
    ticketType: '',
    category: '',
    priority: '',
    assignedTo: '',
    status: '',
    dueDate: '',
    comments: '',
  })
  const [editableForm, setEditableForm] = useState(false)

  const [toTickets, setToTickets] = useState(false)

  useEffect(() => {
    getData() 
  }, [])

 const getData = () => {
    axios
      .get(`http://localhost:5005/api/tickets/${props.match.params.id}`)
      .then((response) => {
        console.log('single ticket data', response)
        setTicket(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    //event.persist();
    const name = event.target.name
    const value = event.target.value
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch(`http://localhost:5005/api/tickets/${props.match.params.id}`, {
        ticketName: values.ticketName,
        description: values.description,
        ticketType: values.ticketType,
        category: values.category,
        priority: values.priority,
        //assignedTo: values.assignedTo,
        status: values.status,
        dueDate: values.dueDate,
        comments: values.comments,
      })
      .then(() => {
        setValues((values)=> ({
          ...values,
          ticketName: '',
          description: '',
          ticketType: '',
          category: '',
          priority: '',
          //assignedTo: '',
          status: '',
          dueDate: '',
          comments: '',
        }))
      })
      .then(() => {
        setToTickets(!toTickets)
      })
      .catch((err) => {
         console.log("Error while updating the event: ", err);
     });
  };
  
  if (toTickets) {
    return <Redirect to ={{pathname: '/tickets'}} />
  }
 
  return (
  <div>
     { !editableForm ? 
    <div>
      <h2>{ticket.ticketName}</h2>
      <p>{ticket.description}</p>
      <p>Type: {ticket.ticketType}</p>
      <p>Category: {ticket.category}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Assigned to: {ticket.assignedTo}</p>
      <p>Status: {ticket.status}</p>
      <p>Due by: {ticket.dueDate}</p>
      <p>Comments: {ticket.comments}</p>
      <button onClick={() => setEditableForm (true)}>Edit</button></div>

: <div>
<form className="" onSubmit={event => handleSubmit(event)}>

<label htmlFor="ticketName">Title: </label>
<input
  type="text"
  id="ticketName"
  name="ticketName"
  value={values.ticketName || ticket.ticketName}
  onChange={handleChange}
  required
/>

<label htmlFor="description">Description: </label>
<textarea
  name="description"
  id="description"
  cols="30"
  rows="8"
  value={values.description || ticket.description}
  onChange={handleChange}
></textarea>



<label htmlFor="priority">Priority: </label>
<select
  name="priority"
  id="priority"
  value={values.priority}
  onChange={handleChange}
>
  <option defaultValue>{ticket.priority}</option>
  <option value='P0'>P0</option>
  <option value='P1'>P1</option>
  <option value='P2'>P2</option>
  <option value='P3'>P3</option>

</select>

<label htmlFor="assignedTo">Assigned to: </label>
<input
  type="text"
  id="assignedTo"
  name="assignedTo"
  value={values.assignedTo || ''}
  onChange={handleChange}
  // required
/>


<label htmlFor="ticketType">Ticket Type: </label>
<select
  name="ticketType"
  id="ticketType"
  value={values.ticketType}
 onChange={handleChange}
>
  <option defaultValue>{ticket.ticketType}</option>
  <option value='task'>task</option>
  <option value='bug'>bug</option>
  <option value='request'>request</option>
  <option value='other'>other</option>

</select>

<label htmlFor="category">Category: </label>
<select
  name="category"
  id="category"
  value={values.category}
 onChange={handleChange}
>
  <option defaultValue>{ticket.category}</option>
  <option value='frontend'>frontend</option>
  <option value='backend'>backend</option>
  <option value='design'>design</option>

</select>

<label htmlFor="status">Status </label>
<select
  name="status"
  id="status"
  value={values.status}
 onChange={handleChange}
>
  <option defaultValue>{ticket.status}</option>
  <option value='new'>new</option>
  <option value='open'>open</option>
  <option value='in progress'>in progress</option>
  <option value='closed'>closed</option>

</select>

<label htmlFor="dueDate">Due by: </label>
<input
  type="date"
  id="dueDate"
  name="dueDate"
  value={values.dueDate || ''}
  onChange={handleChange}
  required
></input>

<label htmlFor="comments">Comments: </label>
<textarea
  name="comments"
  id="comments"
  cols="30"
  rows="8"
  value={values.comments || ''}
  onChange={handleChange}
></textarea>

<button className="" type="submit">Save</button>

</form>
</div>

    }

    </div>
  )
}

import { React, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";



export default function CreateTicket() {

  const [ values, setValues] = useState ({
    ticketName: '',
    description: '',
    ticketType: '',
    category: '',
    priority: '',
  })

  const [toTickets, setToTickets] = useState(false)

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
      .post('http://localhost:5005/api/tickets', {
        ticketName: values.ticketName,
        description: values.description,
        ticketType: values.ticketType,
        category: values.category,
        priority: values.priority,
      })
      .then(() => {
        setValues((values)=> ({
          ...values,
          ticketName: '',
          description: '',
          ticketType: '',
          category: '',
          priority: '',
        }));
      })
      .then(() => {
        setToTickets(!toTickets)
      });
  };
  
  if (toTickets) {
    return <Redirect to ={{pathname: '/tickets'}} />
  }

  return (
    <div>
      <h1>Report here a new issue</h1>

<form className="" onSubmit={event => handleSubmit(event)}>

  <label htmlFor="ticketName">Title: </label>
  <input
    type="text"
    id="ticketName"
    name="ticketName"
    value={values.ticketName || ''}
    onChange={handleChange}
    required
  />

  <label htmlFor="description">Description: </label>
  <textarea
    name="description"
    id="description"
    cols="30"
    rows="8"
    value={values.description}
    onChange={handleChange}
  ></textarea>



  <label htmlFor="priority">Priority: </label>
  <select
    name="priority"
    id="priority"
    value={values.priority}
    onChange={handleChange}
  >
    <option defaultValue></option>
    <option value='P0'>P0</option>
    <option value='P1'>P1</option>
    <option value='P2'>P2</option>
    <option value='P3'>P3</option>

  </select>


  <label htmlFor="ticketType">Ticket Type: </label>
  <select
    name="ticketType"
    id="ticketType"
    value={values.ticketType}
    onChange={handleChange}
  >
    <option defaultValue></option>
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
    <option defaultValue></option>
    <option value='frontend'>frontend</option>
    <option value='backend'>backend</option>
    <option value='design'>design</option>

  </select>

  <button className="" type="submit">Submit new ticket</button>

</form>

<Link to={"/tickets"}>Back to tickets Dashboard</Link>
    </div>
  )
}



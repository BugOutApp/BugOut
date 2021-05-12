import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AllTickets() {

  const [tickets, setTickets] = useState([])

  useEffect(() => {
    getData()
  }, [])

 const getData = () => {
    axios
      .get('http://localhost:5005/api/tickets')
      .then((response) => {
        console.log('response from API', response)
        setTickets(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ticketsList = tickets.map(ticket => {
    return (
      <tr key={ticket._id}>
        <td>{ticket.ticketName}</td>
        <td>{ticket.status}</td>
        <td>{ticket.updatedAt}</td>
        <td>{ticket.priority}</td>
      </tr>
    )
  })

  return (
    <div>
    {tickets.length > 0 && <h2>All tickets</h2>}
    <div>
    <span>Status</span>
    <button>
    <select
    name="status"
    id="status"
    // value={tickets.status}
    // onChange={handleChange}
  >
    <option defaultValue>All</option>
    <option value='new'>New</option>
    <option value='open'>Open</option>
    <option value='in progress'>In Progress</option>
    <option value='closed'>Closed</option>
  </select>
  </button>

  <span>Category</span>
    <button>
    <select
    name="category"
    id="category"
    // value={tickets.category}
    // onChange={handleChange}
  >
    <option defaultValue></option>
    <option value='frontend'>Frontend</option>
    <option value='backend'>Frontend</option>
    <option value='design'>Design</option>
    <option value='other'>Other</option>
  </select>
  </button>

  <span>  </span>
  <button /*onClick={}*/ >Created At</button>
 
    </div>

    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Last update</th>
        <th>Priority</th>
      </tr>
    </thead>
      <tbody>
      {ticketsList}
      </tbody>
    </table>
    
      
    </div>
  )
}

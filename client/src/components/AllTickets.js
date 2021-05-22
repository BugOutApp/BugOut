import { React, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function AllTickets() {

  const [tickets, setTickets] = useState([])
  const [ queries, setQueries] = useState ({
    status: '',
    category: '',
    ticketType: '',
    priority: '',
  })
  const [updatedAt, setDate] = useState(false)

  useEffect(() => {
    getData() 
  },[])


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


  const handleChange = (event) => {
      //event.persist();
      const name = event.target.name
    const value = event.target.value
    setQueries(queries => ({
      ...queries,
      [name]: value,
    }));
  };


  const filteredTickets = tickets.filter(ticket => {
    console.log(!queries.status)
    return ((ticket.category === queries.category) || !queries.category)
    &&
    ((ticket.status === queries.status) || !queries.status)
    &&
    ((ticket.ticketType === queries.ticketType) || !queries.ticketType)
    &&
    ((ticket.priority === queries.priority) || !queries.priority)
  })


  useMemo(() => {
    console.log(!updatedAt)
    if(!updatedAt) return tickets;
    return filteredTickets.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [filteredTickets, tickets, updatedAt]);

  const formattedDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  const ticketsList = filteredTickets.map(ticket => {
      let date = formattedDate(ticket.updatedAt)
    return (
      <tr key={ticket._id}>
        <td>{ticket.ticketName}</td>
        <td>{ticket.status}</td>
        <td>{date}</td>
        <td>{ticket.priority}</td>
        <td>{ticket.ticketType}</td>
        <td>{ticket.category}</td>
        <td><button><Link style={{ 'textDecoration': 'none'}} to={`/tickets/${ticket._id}`}>View</Link></button></td>
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
    value={queries.status}
    onChange={handleChange}
  >
    <option defaultValue></option>
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
    value={queries.category}
    onChange={handleChange}
  >
    <option defaultValue></option>
    <option value='frontend'>Frontend</option>
    <option value='backend'>Backend</option>
    <option value='design'>Design</option>
    <option value='other'>Other</option>
  </select>
  </button>

  <span>  </span>
  <button onClick={() => setDate (!updatedAt)} >Last Updated</button>

  <span>Type</span>
    <button>
    <select
    name="ticketType"
    id="ticketType"
    value={queries.ticketType}
    onChange={handleChange}
  >
    <option defaultValue></option>
    <option value='task'>Task</option>
    <option value='bug'>Bug</option>
    <option value='request'>Request</option>
    <option value='other'>Other</option>
  </select>
  </button>

  <span>Priority</span>
    <button>
    <select
    name="priority"
    id="priority"
    value={queries.priority}
    onChange={handleChange}
  >
    <option defaultValue></option>
    <option value='P0'>P0</option>
    <option value='P1'>P1</option>
    <option value='P2'>P2</option>
    <option value='P3'>P3</option>
  </select>
  </button>
 
    </div>

    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Updated At</th>
        <th>Priority</th>
        <th>Type</th>
        <th>Category</th>
      </tr>
    </thead>
      <tbody>
      {ticketsList}
      </tbody>
    </table>
    
      
    </div>
  )
}

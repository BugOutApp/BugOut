import { React, useState, useEffect } from 'react';
import axios from 'axios';

export default function EditTicket(props) {

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

  return (
    <div>
      <h1>Testing</h1>
    </div>
  )
}

/* eslint-disable no-unused-vars */
const router = require('express').Router();
const Ticket = require('../models/Ticket.model');
// const User = require('../models/User.model');

router.get('/', (req, res) => {
  res.json('All good in here');
});

// You put the next routes here 👇

// get all tickets

router.get('/tickets', (req, res) => {
  Ticket.find().then((tickets) => {
    // console.log("this is the first ticket", ticket[0])
    res.status(200).json(tickets);
  });
});

// get a specific ticket

router.get('/tickets/:id', (req, res, next) => {
  Ticket.findById(req.params.id)
    .then((ticket) => {
      if (!ticket) {
        res.status(404).json(ticket);
      } else {
        res.status(200).json(ticket);
      }
    })
    .catch((err) => {
      next(err);
    });
});

// to create a ticket

router.post('/tickets', (req, res, next) => {
  // console.log("IS THIS THE FILE?", req.file)
  const {
    ticketName,
    description,
    ticketType,
    category,
    priority,
  } = req.body;
  Ticket.create({
    ticketName,
    description,
    ticketType,
    category,
    priority,
    // eslint-disable-next-line no-underscore-dangle
    // createdBy: req.user._id,
  })
  // console.log("hello from backend:", req.body.title);
    .then((ticket) => {
      res.status(201).json(ticket);
    })
    .catch((err) => {
      next(err);
    });
});

// to update a ticket with put http verb

router.patch('/tickets/:id', (req, res, next) => {
  // console.log(req.file);
  // console.log(req.params.id);
  console.log('route TRIGGERED', req.params, req.body);
  const {
    ticketName,
    description,
    ticketType,
    category,
    priority,
    assignedTo,
    status,
    lastUpdated,
    dueDate,
    comments,
  } = req.body;
  Ticket.findByIdAndUpdate(
    req.params.id,
    {
      ticketName,
      description,
      ticketType,
      category,
      priority,
      assignedTo,
      status,
      lastUpdated,
      dueDate,
      comments,
    },
    {
      new: true,
    },
  )
    .then((ticket) => {
      console.log('this is the updated ticket', ticket);
      res.status(200).json(ticket);
    })
    .catch((err) => {
      next(err);
    });
});

// to delete a ticket

router.delete('/tickets/:id', (req, res, next) => {
  Ticket.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'ticket deleted' });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

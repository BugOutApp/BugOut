const { Schema, model } = require("mongoose");

const ticketSchema = new Schema({
  ticketName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new','open','in progress','closed'],
    default: 'new'
  },
  ticketType: {
    type: String,
    enum: ['task','bug','request','other'],
    required: true
  },
  category: {
    type: String,
    enum: ['frontend','backend','design','other'],
    required: true
  },
  createdBy: {
    type: this.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedTo: {
    type: this.Schema.Types.ObjectId,
    ref: 'User'
  },
  creationDate: Date,
  dueDate: Date,
  lastUpdated: [ Date ],
  priority: {
    type: String,
    enum: ['P0','P1','P2','P3']
  },
  comments: [{
    user: {
      type: this.Schema.Types.ObjectId,
      ref: 'User'
    }, 
    type: String
  }]
  

});

const User = model("Ticket", ticketSchema);

module.exports = Ticket;

const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
  ticketName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'open', 'in progress', 'closed'],
    default: 'new',
  },
  ticketType: {
    type: String,
    enum: ['task', 'bug', 'request', 'other'],
    required: true,
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'design', 'other'],
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dueDate: Date,
  priority: {
    type: String,
    enum: ['P0', 'P1', 'P2', 'P3'],
    default: 'P3',
  },
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    type: String,
  }],

},
{
  timestamps: { createdAt: 'creationDate', updatedAt: 'updatedAt' },
});

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;

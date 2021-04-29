const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['developer', 'contributor'],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  myTickets: [{
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
  }],
});

const User = model('User', userSchema);

module.exports = User;

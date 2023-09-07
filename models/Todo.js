/* eslint-disable func-names */
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String
  },
  
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = { Todo, TodoSchema };

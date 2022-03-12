const { Schema, model } = require('mongoose');
//const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
   //To Do: matching validation
    email: {
      type: String,
      required: true,
      unique: true,

    },
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);


const User = model('User', UserSchema);

module.exports = User;
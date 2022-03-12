const { Schema, model, Types } = require('mongoose');
const { stringify } = require('querystring');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with thought id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
      toJSON: {
        getters: true
      },
    }
  );

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String, 
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    reactions: [ReactionSchema]
  },
  
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);



const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

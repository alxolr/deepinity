'use strict';

const Sit = require('./models/sit.model');
const mongoose = require('mongoose');
const { prompt } = require('inquirer');

const { ObjectId } = mongoose.Types;

module.exports = {
  log,
  list,
  remove,
};

function log(duration, comment) {
  const sit = new Sit({ duration, comment });

  return sit
    .save()
    .then(() => {
      console.log('meditation was logged'.green);
      mongoose.disconnect();
    })
    .catch(handleError);
}

function list(limit = 10, skip = 0) {
  return Sit.find()
    .skip(+skip)
    .limit(+limit)
    .sort({ createdAt: -1 })
    .lean()
    .then((docs) => {
      const choices = docs.map(e => ({
        name: `${e.createdAt} - ${e._id.toHexString().magenta} - ${(`${e.duration} minutes`).green}`,
        value: e._id.toHexString(),
      }));

      const questions = {
        type: 'list',
        message: 'Select a meditation for details',
        name: 'sits',
        choices,
      };

      return prompt(questions);
    })
    .then(answer => Sit.findById(answer.sits))
    .then((sit) => {
      console.log(sit);
      mongoose.disconnect();
    })
    .catch(handleError);
}

function remove(entry) {
  return Sit.deleteOne({ _id: new ObjectId(entry) })
    .then(() => {
      console.log('%s entry was deleted', entry);
      mongoose.disconnect();
    })
    .catch(handleError);
}


function handleError(err) {
  console.error(err);
  mongoose.disconnect();
}

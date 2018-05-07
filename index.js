'use strict';

const mongoose = require('mongoose');
const program = require('commander');
const deepinity = require('./src/deepinity');

mongoose.Promise = Promise;
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASSWORD;
const uri = 'mongodb+srv://alxolr-apps-2j4du.mongodb.net/deepinity';

mongoose.connect(uri, { user, pass })
  .then(startProgram)
  .catch(handleError);

function startProgram() {
  console.log('Application has connected');

  program
    .version('0.0.1')
    .command('log <duration> [comment]')
    .description('add a meditation log')
    .action(deepinity.log);

  program.parse(process.argv);
  if (!program.args.length) program.help();
}

function handleError(err) {
  console.error(err);
}

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

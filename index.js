#!/usr/bin/node

'use strict';

const mongoose = require('mongoose');
const program = require('commander');
const dotenv = require('dotenv');
const deepinity = require('./src/deepinity');
require('colors');

dotenv.load();

mongoose.Promise = Promise;
const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://${user}:${pass}@alxolr-apps-2j4du.mongodb.net/deepinity`;

mongoose.connect(uri)
  .then(startProgram)
  .catch(handleError);

function startProgram() {
  program.parse(process.argv);

  if (!program.args.length) program.help();
}

function handleError(err) {
  console.error(err);
}

program
  .version('0.0.1');

program
  .command('log <duration> [comment]')
  .description('add a meditation log')
  .action(deepinity.log);

program
  .command('list [limit] [skip]')
  .description('list previous meditations')
  .action(deepinity.list);

program
  .command('remove <entry>')
  .description('remove an entry by id')
  .action(deepinity.remove);

program
  .command('sum')
  .description('get the total numbers of meditated hours')
  .action(deepinity.sum);

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

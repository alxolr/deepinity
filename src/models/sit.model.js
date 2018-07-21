'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;
const SitSchema = new Schema(
  {
    duration: {
      type: Number,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

require('../repositories/sit.repository')(SitSchema);


module.exports = mongoose.model('Worklog', SitSchema);

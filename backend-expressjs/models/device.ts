const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  status: String,
  request_id: String,
  id: String,
  name: String,
  aliases: [String],
  type: String,
  external_id: String,
  skill_id: String,
  state: String,
  groups: [],
  room: String,
  capabilities: [
    {
      retrievable: Boolean,
      type: String,
      parameters: {
        split: Boolean,
      },
      state: {
        instance: String,
        value: Boolean,
      },
      last_updated: BigInt,
    },
  ],
  properties: [
    {
      retrievable: Boolean,
      type: String,
      parameters: {
        instance: String,
        unit: String,
      },
      state: {
        instance: String,
        value: Number,
      },
      last_updated: BigInt,
    },
    {
      retrievable: Boolean,
      type: String,
      parameters: {
        instance: String,
        unit: String,
      },
      state: {
        instance: String,
        value: Number,
      },
      last_updated: BigInt,
    },
    {
      retrievable: Boolean,
      type: String,
      parameters: {
        instance: String,
        unit: String,
      },
      state: {
        instance: String,
        value: Number,
      },
      last_updated: BigInt,
    },
  ],
});
module.exports = mongoose.model('Device', UnitSchema, "devices");

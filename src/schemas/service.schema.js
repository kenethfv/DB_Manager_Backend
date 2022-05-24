const joiBase = require('joi');
const joiDate = require('@hapi/joi-date');

const joi = joiBase.extend(joiDate);

const login = joi.object().keys({
  host: joi.string().required(),
  user: joi.string().required(),
  password: joi.string().required(),
}).required()

const querys = joi.object().keys({
  host: joi.string().required(),
  user: joi.string().required(),
  password: joi.string().required(),
  database: joi.string().required(),
  query: joi.string().required(),
}).required()

const getConnections = joi.object().keys({
}).required()

const insertConnection = joi.object().keys({
  name: joi.string().required(),
  host: joi.string().required(),
  user: joi.string().required(),
  password: joi.string().required(),
  name: joi.string().required(),
}).required()

const getDatabases = joi.object().keys({
  host: joi.string().required(),
  user: joi.string().required(),
  password: joi.string().required(),
}).required()

const getTables = joi.object().keys({
  host: joi.string().required(),
  user: joi.string().required(),
  password: joi.string().required(),
  database: joi.string().required(),
}).required()

module.exports = {
  login,
  querys,
  getConnections,
  insertConnection,
  getDatabases,
  getTables,
}

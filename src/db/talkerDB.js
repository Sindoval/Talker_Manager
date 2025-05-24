const connection = require('./connection');

const findAll = () => connection.execute(`SELECT * FROM talkermanagerdb.talkers;`);

module.exports = {
  findAll,
};

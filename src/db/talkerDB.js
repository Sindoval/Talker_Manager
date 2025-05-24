const connection = require('./connection');

const findAll = () => connection.execute(`SELECT * FROM talkermanagerdb.talkers;`);

const findById = (id) => connection.execute(`SELECT * FROM talkermanagerdb.talkers WHERE id = ?;`, [id]);

module.exports = {
  findAll,
  findById,
};

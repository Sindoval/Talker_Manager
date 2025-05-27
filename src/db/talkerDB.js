const connection = require('./connection');

const findAll = () => connection.execute('SELECT * FROM talkermanagerdb.talkers;');

const findById = (id) => connection.execute(`
  SELECT * FROM talkermanagerdb.talkers WHERE id = ?;
  `, [id]);

const insert = ({ name, age, talk }) => (
  connection.execute(
    `INSERT INTO talkermanagerdb.talkers 
    (name, age, talk_watched_at, talk_rate)
    VALUES (?, ?, ?, ?)
    `, [name, age, talk.watchedAt, talk.rate],
  )
);

const update = (talker, id) => connection.execute(
  `UPDATE talkermanagerdb.talkers 
      SET name = ?, age = ?, talk_watched_at = ?, talk_rate = ? WHERE id = ?`,
  [talker.name, talker.age, talker.talk.watchedAt, talker.talk.rate, id],
);

const parcialUpdate = (rate, id) => connection.execute(
  `
  UPDATE talkermanagerdb.talkers
  SET talk_rate = ?
  WHERE id = ? 
  `, [rate, id]
)

const remove = (id) => connection.execute(
  `DELETE FROM talkermanagerdb.talkers WHERE id = ?`, [id],
);

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
  parcialUpdate,
};

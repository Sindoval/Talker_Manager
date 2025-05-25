const express = require('express');
const { findAll, findById, insert, update, remove, findSearch } = require('../db/talkerDB');
const { formatData } = require('../utils');
const {
  validToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('../middlewares/talker_middlewares');

const router = express.Router();


router.get('/', async (_req, res) => {
  try {
    const [result] = await findAll();
    if (!result) {
      return res.status(200).json([]);
    }
    return res.status(200).json(formatData(result));
  } catch (error) {
    return res.status(500).json({ message: error.sqlMessage });
  }
});

router.get('/search', validToken, async (req, res) => {
  const { q } = req.query;
  try {
    if (!q || q === '') {
      const [result] = await findAll();
      return res.status(200).json(formatData(result));
    }
    const [result] = await findSearch(q);
    return res.status(200).json(formatData(result));
  } catch (error) {
    return res.status(500).json({ message: error.sqlMessage })
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [[result]] = await findById(Number(id));

    if (!result) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(formatData([result]));
  } catch (error) {
    return res.status(500).json({ message: error.sqlMessage });
  }
});

router.use(validToken);

router.post('/',
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const talker = req.body;
    try {
      const [{ insertId }] = await insert(talker);
      res.status(201).json({ id: insertId, ...talker });
    } catch (error) {
      res.status(500).json({ message: error.sqlMessage });
    }
  });

router.put('/:id',
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const talker = req.body;
    const id = Number(req.params.id);

    try {
      const [result] = await update(talker, id);

      if (result.affectedRows > 0) {
        return res.status(200).json({ id, ...talker });
      }
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    } catch (error) {
      return res.status(500).json({ message: error.sqlMessage });
    }
  });

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const [result] = await remove(id);

    if (result.affectedRows > 0) {
      return res.sendStatus(204);
    }
    return res.status(404).json({ message: 'Palestrante não encontrado' });
  } catch (error) {
    return res.status(500).json({ message: error.sqlMessage });
  }
});

module.exports = router;

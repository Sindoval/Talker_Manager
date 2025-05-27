const express = require('express');
const { findAll, findById, insert, update, remove, parcialUpdate } = require('../db/talkerDB');
const { formatData, allFilters } = require('../utils');
const {
  validToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  validQueryRate,
  validBodyRate,
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

router.get('/search', validToken, validQueryRate, async (req, res) => {
  const { q, rate, date } = req.query;
  const [result] = await findAll();
  try {
    const filterResult = allFilters(result, { q, rate: Number(rate), date });
    return res.status(200).json(formatData(filterResult));

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

router.patch('/rate/:id', validBodyRate, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;

  try {
    await parcialUpdate(Number(rate), Number(id));
    res.status(204);
  } catch (error) {
    res.status(500).json({ message: error.sqlMessage });
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

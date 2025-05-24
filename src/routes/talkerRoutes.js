const express = require('express');
const { findAll, findById } = require('../db/talkerDB');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const [result] = await findAll();
    if (!result) {
      return res.status(200).json([]);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.sqlMessage });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    console.log({ id: id });
    const [[result]] = await findById(Number(id));
    console.log({ api: result });

    if (!result) {
      return res.status(404).json({ message: "Pessoa palestrante não encontrada" })
    }
    return res.status(200).json({
      id: result.id,
      name: result.name,
      age: result.age,
      talk: { watchedAt: result.talk_watched_at, rate: result.talk_rate }
    });
  } catch (error) {
    return res.status(500).json({ message: error.sqlMessage });
  }
});

module.exports = router;

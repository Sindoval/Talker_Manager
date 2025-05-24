const express = require('express');
const { findAll } = require('../db/talkerDB');

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

module.exports = router;

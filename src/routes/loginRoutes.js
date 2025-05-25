const express = require('express');
const { generateToken } = require('../utils');
const { validateEmail, validPassword } = require('../middlewares/login_middlewares');

const router = express.Router();

router.post('/', validateEmail, validPassword, (_req, res) => {
  const token = generateToken();
  try {
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;

// R1izMRH3l5nOeljt
const { isDataValidate } = require('../utils');

const validToken = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } else if (token.length !== 16 || typeof (token) !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (age === undefined) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof age !== 'number' || age < 18) {
    return res.status(400).json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk } = req.body;
  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  const isValidDate = isDataValidate(talk.watchedAt);

  if (!isValidDate) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa" em uma data válida',
    });
  }

  next();
};

const validateRate = (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (typeof talk.rate !== 'number' || talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

module.exports = {
  validToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return res.status(400).json({ message: 'O campo \"email\" é obrigatório' });
  } else if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O \"email\" deve ter o formato \"email@email.com\"' });
  }
  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;
  const validatePassword = (pass) => pass.length >= 6;

  if (!password) {
    return res.status(400).json({ message: 'O campo \"password\" é obrigatório' });
  } else if (!validatePassword(password)) {
    return res.status(400).json({ message: 'O \"password\" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = {
  validateEmail,
  validPassword,
};

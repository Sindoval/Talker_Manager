function generateToken(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i += 1) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    token += chars[randomIndex];
  }
  return token;
}

function isDataValidate(dataStr) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dataStr)) return false;

  const [dia, mes, ano] = dataStr.split('/').map(Number);
  const data = new Date(ano, mes - 1, dia);

  return (
    data.getFullYear() === ano &&
    data.getMonth() === mes - 1 &&
    data.getDate() === dia
  );
}

function formatData(array) {
  const mapData = array.map((talker) => (
    {
      id: talker.id,
      name: talker.name,
      age: talker.age,
      talk: {
        watchedAt: talker.talk_watched_at,
        rate: talker.talk_rate
      },
    }
  ))

  return mapData;
}

module.exports = {
  generateToken,
  isDataValidate,
  formatData,
};

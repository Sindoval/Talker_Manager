const app = require('./app');

const PORT = 3001;

app.listen(PORT, async () => {
  console.log(`API Talker Manager está rodando na porta ${PORT}`);

  // O código abaixo é para testarmos a comunicação com o MySQL
  // docker logs trybecash_api

  /*  const [result] = await connection.execute('SELECT 1');
   if (result) {
     console.log('MySQL connection OK');
   } */
});

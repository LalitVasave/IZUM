const { Client } = require('pg');
const client = new Client({
  user: 'postgres.oiqothabdoutnznjcvok',
  host: '57.182.231.186',
  database: 'postgres',
  password: 'Lalit#9822#',
  port: 5432,
});
client.connect()
  .then(() => {
    console.log('Connected successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection error', err.message);
    process.exit(1);
  });

const { Client } = require('pg');
const client = new Client({
  user: 'postgres.oiqothabdoutnznjcvok',
  host: 'aws-1-ap-northeast-1.pooler.supabase.com',
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

const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://postgres.oiqothabdoutnznjcvok:Lalit%239822%23@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"
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

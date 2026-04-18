const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://postgres.ewfrjpdmzfagvrogwrbw:Lalit%239822%23@aws-1-ap-south-1.pooler.supabase.com:5432/postgres"
});
client.connect()
  .then(() => {
    console.log('Connected successfully to the NEW project');
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection error', err.message);
    process.exit(1);
  });

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'yasin123',
  database: 'FullProje',
  port: 5432
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL veritabanına başarıyla bağlanıldı');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL bağlantı hatası:', err);
});

module.exports = pool;

